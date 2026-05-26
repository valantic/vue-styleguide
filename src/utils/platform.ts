/**
 * Check if the current platform is Mac.
 * Uses the modern NavigatorUAData if available, falling back to navigator.userAgent or navigator.platform.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData
 */
export const isMac = (): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nav = navigator as any;

  if ('userAgentData' in nav && nav.userAgentData?.platform) {
    return nav.userAgentData.platform.toLowerCase().includes('mac');
  }

  if ('userAgent' in nav) {
    return /Mac/i.test(nav.userAgent);
  }

  // Fallback for very old browsers
  return /Mac/i.test(nav.platform);
};
