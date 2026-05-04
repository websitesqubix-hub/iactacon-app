import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const guestId = req.nextUrl.searchParams.get("id");

  if (!guestId) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const apiKey = process.env.IACTA_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://iacta.qubixvirtual.in/api/v1/guests/${guestId}/photo`,
      { headers: { "X-IACTA-API-Key": apiKey } }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    const buffer = await res.arrayBuffer();
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": res.headers.get("Content-Type") || "image/jpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}