import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const guestId = req.nextUrl.searchParams.get("id");
    const phone = req.nextUrl.searchParams.get("phone");
    const apiKey = process.env.IACTA_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    // Lookup by guest ID directly
    if (guestId) {
      const res = await fetch(
        `https://iacta.qubixvirtual.in/api/v1/guests/${guestId}`,
        {
          method: "GET",
          headers: { "X-IACTA-API-Key": apiKey },
        }
      );

      if (!res.ok) {
        const err = await res.text();
        return NextResponse.json({ error: err }, { status: res.status });
      }

      const data = await res.json();
      return NextResponse.json(data);
    }

    // Lookup by phone — fetch guest list and match
    if (phone) {
      const cleanPhone = phone.replace(/\s+/g, "").replace(/^(\+91|91)/, "");

      // Try searching with full phone formats
      const attempts = [
        `+91${cleanPhone}`,
        `91${cleanPhone}`,
        cleanPhone,
      ];

      for (const phoneAttempt of attempts) {
        const res = await fetch(
          `https://iacta.qubixvirtual.in/api/v1/guests?phone=${encodeURIComponent(phoneAttempt)}`,
          {
            method: "GET",
            headers: { "X-IACTA-API-Key": apiKey },
          }
        );

        if (res.ok) {
          const data = await res.json();
          // If it returns a single guest object
          if (data.id) return NextResponse.json(data);
          // If it returns a list
          if (Array.isArray(data) && data.length > 0) return NextResponse.json(data[0]);
          if (data.guests && data.guests.length > 0) return NextResponse.json(data.guests[0]);
        }
      }

      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Missing id or phone parameter" }, { status: 400 });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}