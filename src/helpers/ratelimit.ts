let retryAt: number | null = null;

export function checkRateLimit(): { blocked: boolean; wait: number } {
  if (!retryAt) return { blocked: false, wait: 0 };

  const now = Date.now();
  if (now >= retryAt) {
    retryAt = null;
    return { blocked: false, wait: 0 };
  }

  return { blocked: true, wait: Math.ceil((retryAt - now) / 1000) };
}

export function applyRateLimit(seconds: number) {
  retryAt = Date.now() + seconds * 1000;
}
