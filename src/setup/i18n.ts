import { IntlDateTimeFormat, createI18n } from 'vue-i18n';
import fallbackMessages from '../translations/de.json';

type MessagesSchema = typeof fallbackMessages;

export const PAGE_LANG = document?.documentElement?.lang;

export const I18N_FALLBACK = 'de';
export const I18N_FALLBACK_MESSAGES = fallbackMessages;
export const I18N_LOCALES = [I18N_FALLBACK, 'fr'];

const datetimeFormats: IntlDateTimeFormat = {
  month: {
    // January, February, March, ...
    month: 'long',
  },
  weekday: {
    // Monday, Tuesday, Wednesday, ...
    weekday: 'long',
  },
};

// Add styleguide only translations
if (import.meta.env.MODE !== 'production') {
  const styleguideTranslations = import.meta.glob('./styleguide.translations.json', { eager: true })[
    './styleguide.translations.json'
  ] as Record<string, object>;

  if (styleguideTranslations[I18N_FALLBACK]) {
    Object.entries(styleguideTranslations[I18N_FALLBACK]).forEach(([key, value]) => {
      // @ts-ignore Needed because typescript cannot assign index.
      I18N_FALLBACK_MESSAGES[key] = value;
    });
  }
}

const i18n = createI18n<[MessagesSchema], 'de'>({
  legacy: true, // Inject translation methods
  locale: I18N_FALLBACK,
  fallbackLocale: I18N_FALLBACK,
  datetimeFormats: {
    [I18N_FALLBACK]: datetimeFormats,
    [PAGE_LANG]: datetimeFormats,
  },

  warnHtmlInMessage: import.meta.env.MODE !== 'production' ? 'error' : 'off',

  /**
   * Callback for the 'missing' event, during translation lookup.
   */
  missing(locale, messageKey) {
    console.error(`No '${locale}' translations found for '${messageKey}'`); // eslint-disable-line no-console
  },
  messages: {
    [I18N_FALLBACK]: I18N_FALLBACK_MESSAGES,
  },
  numberFormats: {
    de: {
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
      },
      percent: {
        style: 'percent',
        useGrouping: false,
      },
    },
  },
});

export default i18n;
