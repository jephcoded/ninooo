import { NextResponse } from "next/server";

import { getCollectionFallback } from "@/lib/backend-fallbacks";
import { isBackendCollectionKey } from "@/lib/backend-config";
import { createSupabaseServiceClient, hasSupabaseServerConfig } from "@/lib/supabase/server";

type RouteContext = {
  params: Promise<{
    key: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { key } = await context.params;

  if (!isBackendCollectionKey(key)) {
    return NextResponse.json({ error: "Unknown collection." }, { status: 404 });
  }

  if (!hasSupabaseServerConfig()) {
    return NextResponse.json({ data: getCollectionFallback(key), backendConfigured: false });
  }

  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("app_collections")
    .select("value")
    .eq("key", key)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: data?.value ?? getCollectionFallback(key), backendConfigured: true });
}

export async function PUT(request: Request, context: RouteContext) {
  const { key } = await context.params;

  if (!isBackendCollectionKey(key)) {
    return NextResponse.json({ error: "Unknown collection." }, { status: 404 });
  }

  const body = (await request.json()) as { data?: unknown };

  if (!hasSupabaseServerConfig()) {
    return NextResponse.json({ data: body.data ?? getCollectionFallback(key), backendConfigured: false });
  }

  const supabase = createSupabaseServiceClient();
  const { error } = await supabase.from("app_collections").upsert(
    {
      key,
      value: body.data ?? getCollectionFallback(key),
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "key",
    },
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: body.data ?? getCollectionFallback(key), backendConfigured: true });
}
