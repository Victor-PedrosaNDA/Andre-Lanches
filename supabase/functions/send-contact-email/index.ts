const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: Record<string, string>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Método não permitido." }, 405);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Corpo da requisição inválido." }, 400);
  }

  if (!isRecord(payload)) {
    return jsonResponse({ error: "Dados de contato inválidos." }, 400);
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";

  if (
    !name ||
    name.length > 120 ||
    !email ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !message ||
    message.length > 4000
  ) {
    return jsonResponse({ error: "Confira os dados do formulário." }, 400);
  }

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const sender = Deno.env.get("CONTACT_EMAIL_FROM");
  const recipient = Deno.env.get("CONTACT_EMAIL_TO");

  if (!resendApiKey || !sender || !recipient) {
    console.error(
      "Missing RESEND_API_KEY, CONTACT_EMAIL_FROM, or CONTACT_EMAIL_TO secret.",
    );
    return jsonResponse({ error: "Envio de e-mail não está configurado." }, 500);
  }

  let resendResponse: Response;
  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `Contato pelo app André Lanches: ${name}`,
        text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
      }),
    });
  } catch (error) {
    console.error("Could not reach the email provider:", error);
    return jsonResponse({ error: "Não foi possível enviar a mensagem." }, 502);
  }

  if (!resendResponse.ok) {
    const providerError = await resendResponse.text();
    console.error(
      "Email provider rejected the contact message:",
      resendResponse.status,
      providerError,
    );
    return jsonResponse({ error: "Não foi possível enviar a mensagem." }, 502);
  }

  return jsonResponse({ message: "Mensagem enviada com sucesso." }, 200);
});
