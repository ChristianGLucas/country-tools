import { GetNameInput, NameResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { classifyCode, nameForAlpha2 } from './lib';

/**
 * Look up a country's name from any ISO 3166-1 code form, in a given
 * language, e.g. "DE" -> "Germany" (lang="en") / "Allemagne" (lang="fr").
 * `lang_used` echoes back "en" when the requested `lang` has no bundled
 * localization and the lookup fell back to English. An unknown code returns
 * found=false. Wraps i18n-iso-countries' localized name data.
 */
export function getName(ax: AxiomContext, input: GetNameInput): NameResult {
  const out = new NameResult();
  const { alpha2, error } = classifyCode(input.getCode());
  if (!alpha2) {
    out.setFound(false);
    out.setError(error || 'UNKNOWN_CODE');
    return out;
  }
  const { name, langUsed } = nameForAlpha2(alpha2, input.getLang());
  out.setAlpha2(alpha2);
  out.setName(name);
  out.setLangUsed(langUsed);
  out.setFound(!!name);
  if (!name) out.setError('NAME_UNAVAILABLE');
  return out;
}
