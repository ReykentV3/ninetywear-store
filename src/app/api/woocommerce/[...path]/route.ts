import { NextRequest, NextResponse } from "next/server";

const WC_API_URL = process.env.NEXT_PUBLIC_WC_API_URL;
const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

export async function GET(
  req: NextRequest,
  { params }: { params: any }
) {
  if (!WC_API_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
    return NextResponse.json({ error: "WooCommerce API not configured" }, { status: 500 });
  }

  const resolvedParams = await params;
  const path = resolvedParams.path as string[];
  const endpoint = path.join("/");
  const searchParams = req.nextUrl.searchParams;
  
  const url = new URL(`${WC_API_URL}/${endpoint}`);
  url.searchParams.set("consumer_key", WC_CONSUMER_KEY);
  url.searchParams.set("consumer_secret", WC_CONSUMER_SECRET);
  
  searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch from WooCommerce" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: any }
) {
  if (!WC_API_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
    return NextResponse.json({ error: "WooCommerce API not configured" }, { status: 500 });
  }

  const resolvedParams = await params;
  const path = resolvedParams.path as string[];
  const endpoint = path.join("/");
  const url = new URL(`${WC_API_URL}/${endpoint}`);
  url.searchParams.set("consumer_key", WC_CONSUMER_KEY);
  url.searchParams.set("consumer_secret", WC_CONSUMER_SECRET);

  try {
    const body = await req.json();
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: "Failed to post to WooCommerce" }, { status: 500 });
  }
}
