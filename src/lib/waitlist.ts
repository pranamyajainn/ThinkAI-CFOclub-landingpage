import { WaitlistRegion } from "@/types/waitlist";

export interface WaitlistRegionOption {
  code: WaitlistRegion;
  /** Shown on the form chip. */
  label: string;
}

/**
 * The regions offered on the waitlist form, in display order.
 *
 * "OTHER" is deliberately last and deliberately present: without it,
 * someone in Africa, LATAM or Oceania has to pick a region they aren't
 * in, which quietly poisons the very segmentation this field exists for.
 */
export const WAITLIST_REGIONS: WaitlistRegionOption[] = [
  { code: "NA", label: "North America" },
  { code: "UK", label: "United Kingdom" },
  { code: "EU", label: "Europe" },
  { code: "ME", label: "Middle East" },
  { code: "IN", label: "India" },
  { code: "APAC", label: "Asia-Pacific" },
  { code: "OTHER", label: "Other" },
];

export function isWaitlistRegion(value: unknown): value is WaitlistRegion {
  return (
    typeof value === "string" &&
    WAITLIST_REGIONS.some((r) => r.code === value)
  );
}

/** Max stored length for the optional free-text company name. */
export const COMPANY_NAME_MAX_LENGTH = 120;

/**
 * Loose international phone check for the optional phone field. Accepts
 * digits with the usual separators and an optional leading "+", and
 * requires 7-15 actual digits (ITU E.164 allows at most 15). Kept
 * deliberately permissive: rejecting a real number is worse here than
 * accepting an odd-looking one, since nothing downstream auto-dials it.
 */
export function isPlausiblePhone(value: string): boolean {
  if (!/^\+?[\d\s()./-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}
