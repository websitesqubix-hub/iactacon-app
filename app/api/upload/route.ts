import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.IACTA_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const guestId = formData.get("guestId") as string;

    if (!file || !guestId) {
      return NextResponse.json({ error: "Missing file or guest ID" }, { status: 400 });
    }

    // Forward to IACTA API
    const uploadForm = new FormData();
    uploadForm.append("file", file);

    const res = await fetch(
      `https://iacta.qubixvirtual.in/api/v1/guests/${guestId}/documents`,
      {
        method: "POST",
        headers: { "X-IACTA-API-Key": apiKey },
        body: uploadForm,
      }
    );

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json(
        { error: err.detail || "Upload failed" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 201 });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}