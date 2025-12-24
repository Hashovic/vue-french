import { createRouter, createWebHistory } from 'vue-router';
import { decode } from '@/utils/helper.js';
import { tenseCheckList, verbathonTenses, allButRareTensesIdList, allTensesIdList } from '@/utils/tenseLists.js';
import {
    chosenDefaultsCheckList, chosenPronounRadio1, chosenPronounRadio2,
    chosenTenseRadio, chosenTenseChecks, chosenVerb 
} from '@/stores/preferences.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
		path: '/',
		name: 'home',
		component: () => import('@/views/HomeView.vue'),
    },
    {
		path: '/conjugation',
		name: 'conjugation-home',
		component: () => import('@/views/ConjugationHomeView.vue'),
    },
    {
		path: '/conjugation/:verb',
		name: 'conjugation',
		component: () => import('@/views/ConjugationView.vue'),
		props: (route) => ({
			verbIn: route.params.verb,
			forcePronomial: route.query.fp !== undefined && route.query.fp !== '0' ? '1' : '0',
		}),
    },
    {
		path: '/practice',
		name: 'practice-home',
		component: () => import('@/views/PracticeHomeView.vue'),
    },
    {
		path: '/practice/:verb',
		name: 'practice',
		component: () => import('@/views/PracticeView.vue'),
		props: (route) => ({
			verbIn: route.params.verb,
			options: route.query.opt,
		}),
    },
    {
      path: '/p/:verb/:options',
      name: 'share',
      beforeEnter(to) {
        const decoded = decode(to.params.options);
        console.log(decoded);
        const temp = [];
        if(Object.hasOwn(decoded, 'fm') && decoded.fm === 1) temp.push('fm');
        if(Object.hasOwn(decoded, 'fp') && decoded.fp === 1) temp.push('fp');
        if(Object.hasOwn(decoded, 'vs') && decoded.vs === 1) temp.push('vs');
        chosenDefaultsCheckList.value = temp;
        
        chosenPronounRadio1.value = Object.hasOwn(decoded, 'prRad1') ? decoded.prRad1 : '';
        chosenPronounRadio2.value = Object.hasOwn(decoded, 'prRad2') ? decoded.prRad2 : '0';
        chosenTenseRadio.value =    Object.hasOwn(decoded, 'tnRad') ? decoded.tnRad : '';
        if(Object.hasOwn(decoded, 'tnCh')) {
          	switch (decoded.tnRad) {
				case 'tn-v':
					chosenTenseChecks.value = verbathonTenses; break;
				case 'tn-a': 
				    chosenTenseChecks.value = allTensesIdList; break;
				case 'tn-R':
					chosenTenseChecks.value = allButRareTensesIdList; break;
				case 'tn-s':
					chosenTenseChecks.value = decoded.tnCh.map(x => tenseCheckList.find(y => y.shortId === x).id); break;
				default:
					chosenTenseChecks.value = []; break;
			}
        }
        else chosenTenseChecks.value = [];

        chosenVerb.value = to.params.verb;

        return {
          	name: 'practice-home',
        }
      }
    },
  ],
})

export default router
