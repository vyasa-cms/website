/**
 * The Vyasa mark and lockup, as in the admin (admin/src/components/ui/logo.tsx):
 * a solid half-disc resolving into lines of text, drawn in the brand colour,
 * next to a serif wordmark.
 */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M31 5 A27 27 0 0 0 31 59 Z" />
      <rect x="36" y="14" width="25" height="5.5" rx="2.75" />
      <rect x="36" y="24.5" width="25" height="5.5" rx="2.75" />
      <rect x="36" y="35" width="21" height="5.5" rx="2.75" />
      <rect x="36" y="45.5" width="13" height="5.5" rx="2.75" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <Mark className="h-6 w-6 text-fd-primary" />
      <span className="font-serif text-[17px] font-semibold tracking-tight">Vyasa</span>
    </span>
  );
}
