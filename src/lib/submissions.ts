/**
 * The single seam between the UI and whatever eventually stores a submission.
 *
 * The design has no backend: each form simply flips to a confirmation state.
 * These functions reproduce that behaviour while giving the forms one typed
 * contract to await, so wiring a real backend later touches only this file.
 */

export type SubmitResult = { ok: true } | { ok: false; error: string };

export interface MaterialsSubmission {
  files: File[];
  description: string;
  /** Consent to the terms and the non-exclusive licence. Required. */
  acceptsTerms: boolean;
  /** Acknowledgement of the GDPR information clause. Required. */
  acceptsGdpr: boolean;
  /** Optional: wants free early access. */
  wantsEarlyAccess: boolean;
  /** Optional: wants the progress newsletter. */
  wantsNewsletter: boolean;
  /** Required only when one of the two optional consents is given. */
  email: string;
}

// TODO: replace with a real endpoint (Server Action, API route, or provider SDK).
async function pretendToSend(): Promise<SubmitResult> {
  return { ok: true };
}

export function submitNewsletter(_email: string): Promise<SubmitResult> {
  return pretendToSend();
}

export function checkCredits(_email: string): Promise<SubmitResult> {
  return pretendToSend();
}

export function submitMaterials(_input: MaterialsSubmission): Promise<SubmitResult> {
  return pretendToSend();
}
