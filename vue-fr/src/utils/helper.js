export function encode(obj) {
    let str = "";
    let tmp = "";

    str += "o";

    obj.vs ? str += "1" : null;
    obj.fm ? str += "2" : null;
    obj.fp ? str += "3" : null;
    obj.cl ? str += "4" : null;

    tmp = obj.prRad1.replace("pn-", "");
    str += "p" + tmp;
    if(tmp === 's') str += "P" + (obj.prRad2 ?? '1').toString();

    tmp = obj.tnRad.replace("tn-", "");
    str += "n" + tmp;
    str += "N" + ((tmp === 'a' || tmp === 'v' || tmp === 'R') ? '' : obj.tnCh.map(n => n.toString(36)).sort().join("").toUpperCase());

    return str;
}

export function decode(str) {
        const obj = {};

        // match key + value parts
        const regex = /([opPnN])([^opPnN]*)/g;
        let match;
        while ((match = regex.exec(str)) !== null) {
            const key = match[1];
            const val = match[2];
            const len = val.length;
            
            switch (key) {
                case 'o': val.split('').forEach(ch => {
                    if (ch === '1') obj.vs = 1;
                    if (ch === '2') obj.fm = 1;
                    if (ch === '3') obj.fp = 1;
                    if (ch === '4') obj.cl = 1;
                })

                case 'p': obj.prRad1 = 'pn-' + (len > 1 && !(['r','s'].includes(val)) ? 'r' : val); break;
                case 'P': obj.prRad2 = val; break;

                case 'n': obj.tnRad = 'tn-' + (len > 1 && !(['a','v','s','R'].includes(val)) ? 'v' : val); break;
                case 'N': obj.tnCh = val.split('').map(ch => parseInt(ch, 36)); break;
            }

            if (obj.fp === undefined) obj.fp = 0;
            if (obj.vs === undefined) obj.vs = 0;
            if (obj.fm === undefined) obj.fm = 0;
            if (obj.cl === undefined) obj.cl = 0;
            if (obj.prRad1 === undefined) obj.prRad1 = 'pn-r';
            if (obj.prRad2 === undefined) obj.prRad2 = '0';
            if (obj.tnRad === undefined) obj.tnRad = 'tn-v';
            if (obj.tnCh === undefined) obj.tnCh = [];

        }
        // Deals with case where URL doesn't give any tenses
        if (obj.tnRad === 'tn-s' && !obj.tnCh?.length) obj.tnRad = 'tn-v'
        return obj;
    }

export const pronounArr = [
    {pronoun: 'je',     formId: 1,          id: 1},
    {pronoun: 'tu',     formId: 2,          id: 2},
    {pronoun: 'il',     formId: 3, fm: 0,   id: 3},
    {pronoun: 'on',     formId: 3, fm: 0,   id: 4},
    {pronoun: 'elle',   formId: 3, fm: 1,   id: 5},
    {pronoun: 'nous',   formId: 4,          id: 6},
    {pronoun: 'vous',   formId: 5,          id: 7},
    {pronoun: 'ils',    formId: 6, fm: 0,   id: 8},
    {pronoun: 'elles',  formId: 6, fm: 1,   id: 9}
];

export function getRandomElement(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

const defectiveVerbs = new Map([
    ['falloir', ['il']],
    ['pleuvoir', ['il', 'ils']],
]);

export function checkNotDefective(verb){ 
    // check if the verb is defective in the given form

    const defective = defectiveVerbs.get(verb);
    return defective ? pronounArr.filter(pr => defective.includes(pr.pronoun)) : pronounArr;
};

export function checkImperatif(tense){
    return tense === 'imperatif' || tense === 'passe_imperatif';
}

export const frenchAccentMap = {
  "a`": "à",
  "a\\":"à",
  "e`": "è",
  "e\\":"è",
  "u`": "ù",
  "u\\":"ù",
  "e/": "é",
  "a/": "á",
  "a^": "â",
  "e^": "ê",
  "i^": "î",
  "a^": "â",
  "o^": "ô",
  "u^": "û",
  "e:": "ë",
  "i:": "ï",
  "u:": "ü",
  "y:": "ÿ",
  "c,": "ç",
  "A`": "À",
  "A\\":"À",
  "E`": "È",
  "E\\":"È",
  "U`": "Ù",
  "U\\":"Ù",
  "E/": "É",
  "A/": "Á",
  "A^": "Â",
  "E^": "Ê",
  "I^": "Î",
  "A^": "Â",
  "O^": "Ô",
  "U^": "Û",
  "E:": "Ë",
  "I:": "Ï",
  "U:": "Ü",
  "Y:": "Ÿ",
  "C,": "Ç"
}

export function handleInput(event, updateModel) {
    const el = event.target
    const pos = el.selectionStart
    const before = el.value.slice(0, pos)
    const after = el.value.slice(pos)

    for(const [pattern, replacement] of Object.entries(frenchAccentMap)){
        if (before.endsWith(pattern)) {
            const newVal = before.slice(0, -2) + replacement + after
            updateModel(newVal);
            // put cursor right after the inserted character
            requestAnimationFrame(() => {
                el.selectionStart = el.selectionEnd = pos - 1
            })

            return;
        }
    }
}

export const normalizeVerbInput = (input) => {
    const res = input
        .toLowerCase()
        .trim()
        .replace(/\s+/g, ' ');

    const pronominalMatch = /^(se\s+|s['`])(.+)/i.exec(res);

    if (pronominalMatch) {
        return {
            verb: pronominalMatch[2].split(' ')[0],
            forcePronomial: 1
        };
    }

    return {
        verb: res.split(' ')[0],
        forcePronomial: 0
    };
};

export const normalizeAccent = (str) => {
    return str
        .normalize('NFD')           // split letters + accents
        .replace(/\p{Diacritic}/gu, '') // remove accents
        .toLowerCase();
}

// Get the autocompleted verbs from the server
export async function getAutocomplete(searchTerm) {
    try{
        const res = await fetch(`http://localhost:8080/api/autocomplete/${searchTerm}`);

        if (!res.ok) return [];

        return await res.json();
    }
    catch {
        return [];
    }
}
