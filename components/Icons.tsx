import type { ReactNode } from "react";

const PATHS = {
  report: <><path d="M9 4h10l6 6v18H9z" /><path d="M19 4v6h6M13 16h8M13 20h8M13 24h5" /></>,
  doctor: <><circle cx="16" cy="10" r="5" /><path d="M7 28c0-5 4-9 9-9s9 4 9 9" /><path d="M12 20v3a3 3 0 0 0 6 0" /></>,
  path: <><circle cx="8" cy="24" r="3" /><circle cx="24" cy="8" r="3" /><path d="M10.5 22.5C16 18 14 12 21.5 9.5" /></>,
  cost: <><rect x="5" y="7" width="22" height="18" rx="2" /><path d="M5 12h22M10 19h5M20 19h2" /></>,
  visa: <><rect x="8" y="4" width="16" height="24" rx="2" /><circle cx="16" cy="13" r="4" /><path d="M12 22h8" /></>,
  plane: <path d="M4 18l24-9-6 15-5-5-6 3 1-5z" />,
  guide: <><circle cx="11" cy="10" r="4" /><circle cx="22" cy="12" r="3" /><path d="M4 27c0-4 3-8 7-8s7 4 7 8M18 27c0-3 2-6 4-6s5 2 5 6" /></>,
  home: <><path d="M5 15L16 6l11 9" /><path d="M8 13v14h16V13" /><path d="M14 27v-6h4v6" /></>,
  halal: <><path d="M5 17h22a11 11 0 0 1-22 0z" /><path d="M12 12c0-2 2-2 2-4M17 12c0-2 2-2 2-4" /></>,
  ground: <><path d="M16 28s-9-8-9-15a9 9 0 0 1 18 0c0 7-9 15-9 15z" /><circle cx="16" cy="13" r="3" /></>,
  hospital: <><rect x="6" y="6" width="20" height="22" rx="2" /><path d="M16 11v8M12 15h8M13 28v-4h6v4" /></>,
  follow: <><path d="M26 16a10 10 0 1 1-3-7" /><path d="M26 5v5h-5" /><path d="M16 11v5l3 3" /></>,
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof PATHS;

export function Icon({ name }: { name: IconName }) {
  return <svg viewBox="0 0 32 32" aria-hidden="true">{PATHS[name]}</svg>;
}

export function Check() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>;
}

export function Logo({ ring = "var(--teal)" }: { ring?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="20" fill="none" stroke={ring} strokeWidth="2.4" />
      <circle cx="24" cy="24" r="15.5" fill="none" stroke="var(--line)" strokeWidth="1" />
      <path d="M7 33 C 16 30, 20 18, 41 13" fill="none" stroke="var(--gold)" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="7.6" cy="32.8" r="2.6" fill={ring} />
      <circle cx="40.6" cy="13.2" r="2.6" fill="var(--gold)" />
    </svg>
  );
}

export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" fill="none">
      <path d="M16 4.5c-6.4 0-11.5 5-11.5 11.2 0 2.2.6 4.2 1.8 6L5 27.5l6-1.6a11.7 11.7 0 0 0 5 1.1c6.4 0 11.5-5 11.5-11.3S22.4 4.5 16 4.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12.3 10.6c.3 0 .6 0 .8.5l1.1 2.6c.1.3 0 .6-.1.8l-.8 1c-.2.2-.2.5 0 .8.9 1.5 2.1 2.6 3.7 3.4.3.1.5.1.7-.1l1-1.2c.2-.3.5-.3.8-.2l2.5 1.2c.3.2.5.4.4.8-.2 1.3-1.5 2.4-2.8 2.4-3.9 0-8.6-4.3-8.6-8.4 0-1.6 1-3.6 2.4-3.6Z" fill="currentColor" />
    </svg>
  );
}
