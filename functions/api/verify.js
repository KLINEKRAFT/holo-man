export async function onRequestPost(context) {
  const correctPassword = context.env.HOLO_PASSWORD;

  if (!correctPassword) {
    return new Response(JSON.stringify({ valid: false, error: "not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { password } = await context.request.json();

  const valid = password &&
    password.trim().toUpperCase() === correctPassword.trim().toUpperCase();

  return new Response(JSON.stringify({ valid: !!valid }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
