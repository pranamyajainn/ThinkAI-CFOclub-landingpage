"use server";

import {
  grantDashboardAccess,
  isCorrectPasscode,
  revokeDashboardAccess,
} from "@/lib/dashboardAuth";

export interface PasscodeState {
  error: string | null;
}

export async function submitPasscode(
  _prev: PasscodeState,
  formData: FormData
): Promise<PasscodeState> {
  const passcode = String(formData.get("passcode") ?? "");
  if (!isCorrectPasscode(passcode)) {
    // Small pause so the form can't be hammered with guesses.
    await new Promise((r) => setTimeout(r, 800));
    return { error: "That passcode is not right. Please try again." };
  }
  await grantDashboardAccess();
  return { error: null };
}

export async function signOut(): Promise<void> {
  await revokeDashboardAccess();
}
