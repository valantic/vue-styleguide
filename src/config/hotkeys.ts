export type HotkeyEntry = {
  id: string;
  tip: string | null;
  description: string;
  display: string[][];
  mac?: {
    tip?: string | null;
    display?: string[][];
  };
};

export type ResolvedHotkey = {
  tip: string | null;
  description: string;
  display: string[][];
};

export function resolveHotkey(entry: HotkeyEntry, mac: boolean): ResolvedHotkey {
  return {
    tip: mac && entry.mac?.tip !== undefined ? entry.mac.tip : entry.tip,
    description: entry.description,
    display: mac && entry.mac?.display ? entry.mac.display : entry.display,
  };
}

export const HOTKEYS: HotkeyEntry[] = [
  {
    id: 'toggle-double-shift',
    tip: '⇧ + ⇧ — toggle sidebar',
    description: 'Toggle the styleguide sidebar. Opens the sidebar with the navigation tab preselected.',
    display: [['Shift'], ['Shift']],
  },
  {
    id: 'toggle-cmd-shift-o',
    tip: 'Ctrl + Shift + O — toggle sidebar',
    description: 'Toggle the styleguide sidebar. Opens the sidebar with the navigation tab preselected.',
    display: [['Ctrl', '+', 'Shift', '+', 'O']],
    mac: {
      tip: '⌘ + ⇧ + O — toggle sidebar',
      display: [['⌘', '+', 'Shift', '+', 'O']],
    },
  },
  {
    id: 'navigate-vertical',
    tip: '↑ / ↓ — navigate pages',
    description: 'Navigate through menu items.',
    display: [['↑'], ['↓']],
  },
  {
    id: 'navigate-enter',
    tip: 'Enter — open selected page',
    description: 'Open the selected menu item.',
    display: [['Enter']],
  },
  {
    id: 'escape',
    tip: 'Esc — close panel or modal',
    description: 'Closes the sidebar, closes modal.',
    display: [['Esc']],
  },
];
