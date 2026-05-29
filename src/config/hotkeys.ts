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
    description: 'Toggle the styleguide sidebar. Opens the sidebar with the last active tab preselected.',
    display: [['Shift'], ['Shift']],
  },
  {
    id: 'toggle-cmd-shift-o',
    tip: 'Ctrl + Shift + O — toggle sidebar',
    description: 'Toggle the styleguide sidebar. Opens the sidebar with the last active tab preselected.',
    display: [['Ctrl', '+', 'Shift', '+', 'O']],
    mac: {
      tip: '⌘ + ⇧ + O — toggle sidebar',
      display: [['⌘', '+', 'Shift', '+', 'O']],
    },
  },
  {
    id: 'tab-navigation',
    tip: 'Ctrl + 1 — Navigation tab',
    description: 'Open the sidebar and switch to the Navigation tab.',
    display: [['Ctrl', '+', '1']],
    mac: {
      tip: '⌘ + 1 — Navigation tab',
      display: [['⌘', '+', '1']],
    },
  },
  {
    id: 'tab-global-config',
    tip: 'Ctrl + 2 — Global Config tab',
    description: 'Open the sidebar and switch to the Global Configuration tab.',
    display: [['Ctrl', '+', '2']],
    mac: {
      tip: '⌘ + 2 — Global Config tab',
      display: [['⌘', '+', '2']],
    },
  },
  {
    id: 'tab-page-config',
    tip: 'Ctrl + 3 — Page Config tab',
    description: 'Open the sidebar and switch to the Page Configuration tab (only when available).',
    display: [['Ctrl', '+', '3']],
    mac: {
      tip: '⌘ + 3 — Page Config tab',
      display: [['⌘', '+', '3']],
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
