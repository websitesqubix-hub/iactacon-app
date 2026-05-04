import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const guestId = req.nextUrl.searchParams.get("id");
  if (!guestId) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const res = await fetch(
    `https://iacta.qubixvirtual.in/api/v1/guests/${guestId}/photo`,
    { headers: { "X-IACTA-API-Key": process.env.IACTA_API_KEY! } }
  );

  const buffer = await res.arrayBuffer();
  return new NextResponse(buffer, {
    headers: { "Content-Type": res.headers.get("Content-Type") || "image/jpeg" }
  });
}