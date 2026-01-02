import { useStorage } from '@vueuse/core';

export const chosenDefaultsCheckList = useStorage('chosen-defaults-checklist', []);
export const chosenPronounRadio1     = useStorage('chosen-pronoun-radio-1', '');
export const chosenPronounRadio2     = useStorage('chosen-pronoun-radio-2', '');
export const chosenTenseRadio        = useStorage('chosen-tense-radio', '');
export const chosenTenseChecks       = useStorage('chosen-tense-checks', []);
export const chosenVerb              = useStorage('chosen-verb', '');

export const clearSelections = () => {
  chosenDefaultsCheckList.value = [];
  chosenPronounRadio1.value = '';
  chosenPronounRadio2.value = '';
  chosenTenseRadio.value = '';
  chosenTenseChecks.value = [];
  chosenVerb.value = '';
}
