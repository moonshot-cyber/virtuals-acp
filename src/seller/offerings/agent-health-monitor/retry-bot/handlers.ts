import type { ExecuteJobResult, ValidationResult } from "../../../runtime/offeringTypes.js";

const API_BASE = "https://agenthealthmonitor.xyz";
const INTERNAL_KEY = "sup3r_s3cur3_k3y_12345";

export async function executeJob(request: any): Promise<ExecuteJobResult> {
  const address = request.wallet_address;

  const res = await fetch(`${API_BASE}/retry/${address}`, {
    headers: { "X-Internal-Key": INTERNAL_KEY },
  });

  if (!res.ok) {
    const text = await res.text();
    return { deliverable: `Error: API returned ${res.status} — ${text}` };
  }

  const data = await res.json();
  return { deliverable: { type: "json", value: data } };
}

export function validateRequirements(request: any): ValidationResult {
  const addr = request.wallet_address;
  if (!addr || !/^0x[0-9a-fA-F]{40}$/.test(addr)) {
    return { valid: false, reason: "wallet_address must be a valid 0x address (40 hex chars)" };
  }
  return { valid: true };
}

export function requestPayment(request: any): string {
  return `Retry analysis for ${request.wallet_address}. Scanning for failed transactions and preparing optimized retry data.`;
}
