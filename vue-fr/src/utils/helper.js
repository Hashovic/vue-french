export function encode(obj) {
    let str = "";
    let tmp = "";

    str += "o";

    obj.vs ? str += "1" : null;
    obj.fm ? str += "2" : null;
    obj.fp ? str += "3" : null;

    tmp = obj.prRad.replace("pn-", "");
    str += "p" + tmp;
    str += "P" + ((tmp === 'a' || tmp === 'r') ? '' : obj.prCh.join(""));

    tmp = obj.tnRad.replace("tn-", "");
    str += "n" + tmp;
    str += "N" + ((tmp === 'a' || tmp === 'v') ? '' : obj.tnCh.map(n => n.toString(36)).join("").toUpperCase());

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
            const num = Number(val);
            const len = val.length;
            
            switch (key) {
                case 'o': val.split('').forEach(ch => {
                    if (ch === '1') obj.vs = 1;
                    if (ch === '2') obj.fm = 1;
                    if (ch === '3') obj.fp = 1;
                })

                case 'p': obj.prRad = 'pn-' + (len > 1 && !(['a','r','s'].includes(val)) ? 'r' : val); break;
                case 'P': obj.prCh = val.split('').map(parseInt); break;

                case 'n': obj.tnRad = 'tn-' + (len > 1 && !(['a','v','s'].includes(val)) ? 'v' : val); break;
                case 'N': obj.tnCh = val.split('').map(ch => parseInt(ch, 36)); break;
            }

            (obj.fp === undefined) ? obj.fp = 0 : null;
            (obj.vs === undefined) ? obj.vs = 0 : null;
            (obj.fm === undefined) ? obj.fm = 0 : null;
            (obj.prRad === undefined) ? obj.prRad = 'pn-r' : null;
            (obj.prCh === undefined) ? obj.prCh = [] : null;
            (obj.tnRad === undefined) ? obj.tnRad = 'tn-v' : null;
            (obj.tnCh === undefined) ? obj.tnCh = [] : null;
        }
        return obj;
    }

export const pronounArr = [
    {pronoun: 'je',     formId: 1},
    {pronoun: 'tu',     formId: 2},
    {pronoun: 'il',     formId: 3, fm: 0},
    {pronoun: 'on',     formId: 3, fm: 0},
    {pronoun: 'elle',   formId: 3, fm: 1},
    {pronoun: 'nous',   formId: 4},
    {pronoun: 'vous',   formId: 5},
    {pronoun: 'ils',    formId: 6, fm: 0},
    {pronoun: 'elles',  formId: 6, fm: 1}
];

export function getRandomElement(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

const defectiveVerbs = new Map([
    ['falloir', ['il']],
    ['pleuvoir', ['il, ils']],
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
