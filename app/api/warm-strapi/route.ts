// app/api/warm-strapi/route.ts  (App Router)

export const runtime = "edge";

function isBusinessHoursRome(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("it-IT", {
    timeZone: "Europe/Rome",
    hour: "2-digit",
    hour12: false,
  });
  const hour = parseInt(formatter.format(date), 10);
  return hour >= 7 && hour < 23;
}

export async function GET() {
  const url = process.env.STRAPI_WARM_URL;

  if (!url) {
    return new Response(JSON.stringify({ ok: false, error: "Missing STRAPI_WARM_URL" }), { status: 500 });
  }

  if (!isBusinessHoursRome()) {
    return new Response(JSON.stringify({ ok: true, skipped: true }), { status: 200 });
  }

  try {
    const res = await fetch(url, { headers: { "cache-control": "no-store" } });
    return new Response(JSON.stringify({ ok: res.ok }), { status: res.ok ? 200 : 502 });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), { status: 500 });
  }
}
