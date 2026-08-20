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
  {
    id: 'toggle-x-ray-mode',
    tip: 'Ctrl + Alt + X — toggle x-ray mode',
    description: 'Toggle x-ray mode. Hover any element to see its Vue component name, click to copy it.',
    display: [['Ctrl', '+', 'Alt', '+', 'X']],
    mac: {
      tip: '⌘ + ⌥ + X — toggle x-ray mode',
      display: [['⌘', '+', '⌥', '+', 'X']],
    },
  },
  {
    id: 'x-ray-mode-navigate-ancestors',
    tip: 'Alt + ↑ / ↓ — navigate component ancestors',
    description:
      'While x-ray mode is hovering an element, step through its component-only ancestor chain (Alt/Option + ↑ for the parent component, Alt/Option + ↓ back down).',
    display: [['Alt', '+', '↑'], ['Alt', '+', '↓']],
    mac: {
      tip: '⌥ + ↑ / ↓ — navigate component ancestors',
      display: [['⌥', '+', '↑'], ['⌥', '+', '↓']],
    },
  },
  {
    id: 'x-ray-mode-copy',
    tip: 'Enter — copy selected component',
    description:
      'While x-ray mode is hovering an element, copy the currently selected component (same as clicking it) without needing the mouse.',
    display: [['Enter']],
  },
];
