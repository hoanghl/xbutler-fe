import LocalizedStrings, {
  type LocalizedStringsMethods,
} from "localized-strings";

import en from "./locales/en";
import type { Strings } from "./type";

/**
 * Localized strings
 */
export const strings: Strings & LocalizedStringsMethods = new LocalizedStrings(
  {
    en: en,
  },
  { customLanguageInterface: () => "en-US" }
);

/**
 * Custom method to return translated string with template values
 *
 * @param str string to be translated
 * @param params params to be used in the translation
 * @returns translated value as string
 */
export const translate = (str: string, ...params: string[]) =>
  strings.formatString(str, ...params).toString();

export default strings;
