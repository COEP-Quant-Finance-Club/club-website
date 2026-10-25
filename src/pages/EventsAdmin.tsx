import { FormEvent, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  EventDraft,
  ClubEvent,
  listAdminEvents,
  MAX_EVENTS,
  removeEvent,
  saveEvent,
  supabase,
} from "@/lib/events";

type Screen = "checking" | "login" | "mfa-enroll" | "mfa-challenge" | "admin";

const emptyDraft: EventDraft = {
  title: "",
  date: "",
  time: "",
  venue: "",
  status: "Planned",
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "An unexpected error occurred.";
}

export default function EventsAdmin() {
  const [screen, setScreen] = useState<Screen>("checking");
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [draft, setDraft] = useState<EventDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [factorId, setFactorId] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [manualSecret, setManualSecret] = useState("");
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function openAdmin(session: Session) {
    if (session.user.app_metadata?.role !== "events_admin") {
      const { error } = await supabase!.auth.signOut();
      setScreen("login");
      setErrorMessage(
        error
          ? `This account is not an event administrator, and sign-out failed: ${error.message}`
          : "This account is not authorized to manage events. Ask a club administrator for access.",
      );
      return;
    }

    const { data: assurance, error: assuranceError } =
      await supabase!.auth.mfa.getAuthenticatorAssuranceLevel();
    if (assuranceError) throw assuranceError;

    if (assurance.currentLevel === "aal2") {
      setEvents(await listAdminEvents());
      setScreen("admin");
      return;
    }

    const { data: factors, error: factorsError } =
      await supabase!.auth.mfa.listFactors();
    if (factorsError) throw factorsError;

    const verifiedFactor = factors.totp.find(
      (factor) => factor.status === "verified",
    );
    if (verifiedFactor) {
      const { data: challenge, error: challengeError } =
        await supabase!.auth.mfa.challenge({ factorId: verifiedFactor.id });
      if (challengeError) throw challengeError;
      setFactorId(verifiedFactor.id);
      setChallengeId(challenge.id);
      setScreen("mfa-challenge");
      return;
    }

    const { data: enrollment, error: enrollmentError } =
      await supabase!.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: "COEP Events Admin",
        issuer: "COEP Quant Finance Club",
      });
    if (enrollmentError) throw enrollmentError;
    setFactorId(enrollment.id);
    setQrCode(enrollment.totp.qr_code);
    setManualSecret(enrollment.totp.secret);
    setScreen("mfa-enroll");
  }

  useEffect(() => {
    if (!supabase) {
      setScreen("login");
      return;
    }

    let active = true;
    supabase.auth
      .getSession()
      .then(async ({ data, error }) => {
        if (error) throw error;
        if (data.session) await openAdmin(data.session);
        else if (active) setScreen("login");
      })
      .catch((error: unknown) => {
        if (!active) return;
        setScreen("login");
        setErrorMessage(`Could not verify your session: ${getErrorMessage(error)}`);
      });

    return () => {
      active = false;
    };
  }, []);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;

    setBusy(true);
    setErrorMessage("");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (!data.session) throw new Error("Sign-in did not create a session.");
      await openAdmin(data.session);
    } catch (error) {
      setErrorMessage(`Could not sign in: ${getErrorMessage(error)}`);
    } finally {
      setBusy(false);
    }
  }

  async function verifyMfa(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;

    setBusy(true);
    setErrorMessage("");
    try {
      let activeChallengeId = challengeId;
      if (!activeChallengeId) {
        const { data, error } = await supabase.auth.mfa.challenge({ factorId });
        if (error) throw error;
        activeChallengeId = data.id;
        setChallengeId(data.id);
      }

      const { error } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: activeChallengeId,
        code: code.trim(),
      });
      if (error) throw error;

      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      if (!data.session) throw new Error("The verified session could not be loaded.");
      await openAdmin(data.session);
    } catch (error) {
      setErrorMessage(`MFA verification failed: ${getErrorMessage(error)}`);
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    if (!supabase) return;
    setBusy(true);
    setErrorMessage("");
    const { error } = await supabase.auth.signOut();
    setBusy(false);
    if (error) {
      setErrorMessage(`Could not sign out: ${error.message}`);
      return;
    }
    setScreen("login");
    setEvents([]);
    setPassword("");
    setCode("");
  }

  async function refreshEvents() {
    setEvents(await listAdminEvents());
  }

  async function submitEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setErrorMessage("");

    try {
      await saveEvent(
        {
          title: draft.title.trim(),
          date: draft.date.trim(),
          time: draft.time.trim(),
          venue: draft.venue.trim(),
          status: draft.status.trim(),
        },
        editingId ?? undefined,
      );
      await refreshEvents();
      setDraft(emptyDraft);
      setEditingId(null);
    } catch (error) {
      setErrorMessage(`Could not save the event: ${getErrorMessage(error)}`);
    } finally {
      setBusy(false);
    }
  }

  function editEvent(event: ClubEvent) {
    const { id, ...values } = event;
    setDraft(values);
    setEditingId(id);
    setErrorMessage("");
  }

  async function deleteEvent(event: ClubEvent) {
    if (!window.confirm(`Delete "${event.title}"? This cannot be undone.`)) return;

    setBusy(true);
    setErrorMessage("");
    try {
      await removeEvent(event.id);
      await refreshEvents();
      if (editingId === event.id) {
        setEditingId(null);
        setDraft(emptyDraft);
      }
    } catch (error) {
      setErrorMessage(`Could not delete the event: ${getErrorMessage(error)}`);
    } finally {
      setBusy(false);
    }
  }

  const fieldClassName = "mt-1";

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          to="/"
          className="label-style text-muted-foreground underline underline-offset-4"
        >
          Back to website
        </Link>
        <header className="mb-8 mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label-style text-primary">Internal club tool</p>
            <h1 className="mt-2 text-3xl font-semibold">Events manager</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Changes publish to the public events list immediately.
            </p>
          </div>
          {screen === "admin" && (
            <Button type="button" variant="outline" onClick={signOut} disabled={busy}>
              Sign out
            </Button>
          )}
        </header>

        {!supabase && (
          <section className="rounded-xl border border-border p-5">
            <h2 className="text-lg font-semibold">Setup required</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Event management is not connected yet. Follow the Supabase setup in
              the repository README, then publish the site once.
            </p>
          </section>
        )}

        {supabase && screen === "checking" && (
          <p role="status" className="text-sm text-muted-foreground">
            Checking your session…
          </p>
        )}

        {supabase && screen === "login" && (
          <form
            onSubmit={signIn}
            className="max-w-md space-y-4 rounded-xl border border-border p-5"
          >
            <h2 className="text-lg font-semibold">Team sign in</h2>
            <p className="text-sm text-muted-foreground">
              Access is limited to club accounts invited by an administrator.
            </p>
            <label className="block text-sm">
              Club email
              <Input
                className={fieldClassName}
                type="email"
                autoComplete="username"
                required
                maxLength={254}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label className="block text-sm">
              Password
              <Input
                className={fieldClassName}
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <Button type="submit" disabled={busy}>
              {busy ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        )}

        {supabase && (screen === "mfa-enroll" || screen === "mfa-challenge") && (
          <section className="max-w-md space-y-4 rounded-xl border border-border p-5">
            <h2 className="text-lg font-semibold">Verify your identity</h2>
            {screen === "mfa-enroll" ? (
              <>
                <p className="text-sm text-muted-foreground">
                  Set up an authenticator app before managing events. Scan this
                  QR code, or enter the setup key manually.
                </p>
                {qrCode && (
                  <img
                    src={qrCode}
                    alt="Authenticator app setup QR code"
                    className="h-48 w-48 rounded bg-white p-2"
                  />
                )}
                <p className="break-all rounded bg-muted p-3 font-mono text-sm">
                  {manualSecret}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                Enter the current code from your authenticator app.
              </p>
            )}
            <form onSubmit={verifyMfa} className="space-y-4">
              <label className="block text-sm">
                Six-digit authenticator code
                <Input
                  className={fieldClassName}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]{6}"
                  minLength={6}
                  maxLength={6}
                  required
                  value={code}
                  onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
                />
              </label>
              <Button type="submit" disabled={busy || code.length !== 6}>
                {busy ? "Verifying…" : "Verify and continue"}
              </Button>
            </form>
          </section>
        )}

        {supabase && screen === "admin" && (
          <div className="space-y-8">
            <section className="rounded-xl border border-border p-5">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">
                  {editingId ? "Edit event" : "Add an event"}
                </h2>
                <span className="label-style text-muted-foreground">
                  {events.length}/{MAX_EVENTS} events
                </span>
              </div>
              <form onSubmit={submitEvent} className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm sm:col-span-2">
                  Event title
                  <Input
                    className={fieldClassName}
                    required
                    maxLength={160}
                    value={draft.title}
                    onChange={(event) =>
                      setDraft({ ...draft, title: event.target.value })
                    }
                  />
                </label>
                <label className="block text-sm">
                  Date
                  <Input
                    className={fieldClassName}
                    required
                    maxLength={80}
                    placeholder="e.g. 2026-10-25 or To be announced"
                    value={draft.date}
                    onChange={(event) =>
                      setDraft({ ...draft, date: event.target.value })
                    }
                  />
                </label>
                <label className="block text-sm">
                  Time
                  <Input
                    className={fieldClassName}
                    maxLength={80}
                    value={draft.time}
                    onChange={(event) =>
                      setDraft({ ...draft, time: event.target.value })
                    }
                  />
                </label>
                <label className="block text-sm">
                  Venue
                  <Input
                    className={fieldClassName}
                    maxLength={160}
                    value={draft.venue}
                    onChange={(event) =>
                      setDraft({ ...draft, venue: event.target.value })
                    }
                  />
                </label>
                <label className="block text-sm">
                  Status
                  <Input
                    className={fieldClassName}
                    required
                    maxLength={120}
                    value={draft.status}
                    onChange={(event) =>
                      setDraft({ ...draft, status: event.target.value })
                    }
                  />
                </label>
                <div className="flex flex-wrap gap-3 sm:col-span-2">
                  <Button
                    type="submit"
                    disabled={busy || (!editingId && events.length >= MAX_EVENTS)}
                  >
                    {busy ? "Saving…" : editingId ? "Save changes" : "Add event"}
                  </Button>
                  {editingId && (
                    <Button
                      type="button"
                      variant="outline"
                      disabled={busy}
                      onClick={() => {
                        setEditingId(null);
                        setDraft(emptyDraft);
                      }}
                    >
                      Cancel edit
                    </Button>
                  )}
                </div>
                {!editingId && events.length >= MAX_EVENTS && (
                  <p className="text-sm text-muted-foreground sm:col-span-2">
                    The event limit has been reached. Delete an event before adding
                    another.
                  </p>
                )}
              </form>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold">Published events</h2>
              {events.length === 0 ? (
                <p className="text-sm text-muted-foreground">No events yet.</p>
              ) : (
                <ul className="space-y-3">
                  {events.map((event) => (
                    <li
                      key={event.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border p-4"
                    >
                      <div className="min-w-0">
                        <h3 className="break-words font-medium">{event.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {event.date}
                          {event.status ? ` · ${event.status}` : ""}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          disabled={busy}
                          onClick={() => editEvent(event)}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          disabled={busy}
                          onClick={() => deleteEvent(event)}
                        >
                          Delete
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        )}

        {errorMessage && (
          <p
            role="alert"
            className="mt-5 rounded-lg border border-destructive/50 p-3 text-sm text-destructive"
          >
            {errorMessage}
          </p>
        )}
      </div>
    </main>
  );
}
