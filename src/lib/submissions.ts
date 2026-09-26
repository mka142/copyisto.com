/**
 * The single seam between the UI and whatever eventually stores a submission.
 *
 * The design has no backend: each form simply flips to a confirmation state.
 * These functions reproduce that behaviour while giving the forms one typed
 * contract to await, so wiring a real backend later touches only this file.
 */

export type SubmitResult = { ok: true } | { ok: false; error: string };

// TODO: replace with a real endpoint (Server Action, API route, or provider SDK).
async function pretendToSend(): Promise<SubmitResult> {
  return { ok: true };
}

export function checkCredits(_email: string): Promise<SubmitResult> {
  return pretendToSend();
}
