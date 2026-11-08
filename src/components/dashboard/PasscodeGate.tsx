"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, ArrowRight, Loader2 } from "lucide-react";
import { submitPasscode, type PasscodeState } from "@/app/dashboard/actions";

const initialState: PasscodeState = { error: null };

export default function PasscodeGate() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(submitPasscode, initialState);
  // On a correct passcode the cookie is set; reload the page data.
  useEffect(() => {
    if (state !== initialState && !state.error) router.refresh();
  }, [state, router]);

  return (
    <main className="min-h-screen bg-surface-subtle flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Image
            src="/cfo-ai-hub-logo.png"
            alt="CFO AI Hub"
            width={160}
            height={48}
            className="h-10 w-auto"
            priority
          />
        </div>
        <form
          action={formAction}
          className="bg-white rounded-xl shadow-[0_4px_20px_rgba(26,26,46,0.04)] p-8"
        >
          <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5">
            <Lock className="w-5 h-5" aria-hidden />
          </div>
          <h1 className="font-display text-2xl font-semibold text-primary">Team dashboard</h1>
          <p className="mt-1.5 text-sm text-text-muted leading-6">
            Live numbers for subscribers, waitlist and polls. Enter the team passcode to continue.
          </p>

          <label htmlFor="passcode" className="block mt-6 text-sm font-semibold text-on-surface">
            Passcode
          </label>
          <input
            id="passcode"
            name="passcode"
            type="password"
            autoComplete="current-password"
            autoFocus
            required
            aria-invalid={!!state.error}
            aria-describedby={state.error ? "passcode-error" : undefined}
            className="mt-2 w-full h-11 rounded-lg border border-outline-variant bg-white px-3.5 text-base text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
          {state.error && (
            <p id="passcode-error" role="alert" className="mt-2 text-sm text-error">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-6 w-full h-11 rounded-lg bg-secondary-container text-white font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition hover:bg-secondary disabled:opacity-70 disabled:cursor-wait"
          >
            {pending ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
            ) : (
              <>
                Open dashboard <ArrowRight className="w-4 h-4" aria-hidden />
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
