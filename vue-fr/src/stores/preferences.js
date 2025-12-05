import { useStorage } from '@vueuse/core'

export const chosenDefaultsCheckList = useStorage('chosen-defaults-checklist', [])
export const chosenPronounRadio1     = useStorage('chosen-pronoun-radio-1', '')
export const chosenPronounRadio2     = useStorage('chosen-pronoun-radio-2', '')
export const chosenTenseRadio        = useStorage('chosen-tense-radio', '')
export const chosenTenseChecks       = useStorage('chosen-tense-checks', [])
export const chosenVerb              = useStorage('chosen-verb', '')

export const clearSelections = () => {
  console.log("chosenDefaultsCheckList before clear: ", chosenDefaultsCheckList.value);
  console.log("chosenPronounRadio1 before clear: ", chosenPronounRadio1.value);
  console.log("chosenPronounRadio2 before clear: ", chosenPronounRadio2.value);
  console.log("chosenTenseRadio before clear: ", chosenTenseRadio.value);
  console.log("chosenTenseChecks before clear: ", chosenTenseChecks.value);
  console.log("chosenVerb before clear: ", chosenVerb.value);

  chosenDefaultsCheckList.value = []
  chosenPronounRadio1.value = ''
  chosenPronounRadio2.value = ''
  chosenTenseRadio.value = ''
  chosenTenseChecks.value = []
  chosenVerb.value = ''
}
