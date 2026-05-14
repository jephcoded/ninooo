create table if not exists public.app_collections (
  key text primary key,
  value jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.app_collections enable row level security;

create or replace function public.set_app_collections_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists app_collections_set_updated_at on public.app_collections;

create trigger app_collections_set_updated_at
before update on public.app_collections
for each row
execute function public.set_app_collections_updated_at();
