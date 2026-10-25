import { createClient } from "@supabase/supabase-js";

export const MAX_EVENTS = 12;

export type ClubEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  status: string;
};

export type EventDraft = Omit<ClubEvent, "id">;

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: false,
        },
      })
    : null;

export async function loadEvents(): Promise<ClubEvent[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("events")
      .select("id, title, date, time, venue, status")
      .order("date", { ascending: true })
      .limit(MAX_EVENTS);

    if (!error) return data;
    console.error("Could not load live events; using the published event list.", error);
  }

  const response = await fetch("/events.json");
  if (!response.ok) {
    throw new Error(`Could not load events (${response.status}).`);
  }

  const events = (await response.json()) as Array<Omit<ClubEvent, "id">>;
  return events.slice(0, MAX_EVENTS).map((event, index) => ({
    ...event,
    id: `published-${index}`,
    time: event.time ?? "",
    venue: event.venue ?? "",
    status: event.status ?? "",
  }));
}

export async function listAdminEvents(): Promise<ClubEvent[]> {
  if (!supabase) throw new Error("Event management has not been configured.");

  const { data, error } = await supabase
    .from("events")
    .select("id, title, date, time, venue, status")
    .order("date", { ascending: true })
    .limit(MAX_EVENTS);

  if (error) throw error;
  return data;
}

export async function saveEvent(
  draft: EventDraft,
  id?: string,
): Promise<void> {
  if (!supabase) throw new Error("Event management has not been configured.");

  const result = id
    ? await supabase.from("events").update(draft).eq("id", id)
    : await supabase.from("events").insert(draft);

  if (result.error) throw result.error;
}

export async function removeEvent(id: string): Promise<void> {
  if (!supabase) throw new Error("Event management has not been configured.");

  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw error;
}
