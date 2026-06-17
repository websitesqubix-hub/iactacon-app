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

    const contentType = res.headers.get("content-type") || "";
    const rawText = await res.text();

    if (!res.ok) {
      let errMessage = `Upload failed (HTTP ${res.status})`;
      if (contentType.includes("application/json")) {
        try {
          const err = JSON.parse(rawText);
          errMessage = err.detail || err.error || errMessage;
        } catch {}
      } else {
        // It's HTML - try to extract the h2 error message if present
        const match = rawText.match(/<h2[^>]*>(.*?)<\/h2>/i);
        if (match) errMessage = match[1].replace(/&amp;/g, "&");
      }
      return NextResponse.json({ error: errMessage }, { status: res.status });
    }

    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      data = { success: true };
    }
    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
