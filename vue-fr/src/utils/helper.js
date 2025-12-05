export function encode(obj) {
    let str = "";
    let tmp = "";

    str += "o";

    obj.vs ? str += "1" : null;
    obj.fm ? str += "2" : null;
    obj.fp ? str += "3" : null;

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
                })

                case 'p': obj.prRad1 = 'pn-' + (len > 1 && !(['r','s'].includes(val)) ? 'r' : val); break;
                case 'P': obj.prRad2 = val; break;

                case 'n': obj.tnRad = 'tn-' + (len > 1 && !(['a','v','s','R'].includes(val)) ? 'v' : val); break;
                case 'N': obj.tnCh = val.split('').map(ch => parseInt(ch, 36)); break;
            }

            (obj.fp === undefined) ? obj.fp = 0 : null;
            (obj.vs === undefined) ? obj.vs = 0 : null;
            (obj.fm === undefined) ? obj.fm = 0 : null;
            (obj.prRad1 === undefined) ? obj.prRad1 = 'pn-r' : null;
            (obj.prRad2 === undefined) ? obj.prRad2 = '0' : null;
            (obj.tnRad === undefined) ? obj.tnRad = 'tn-v' : null;
            (obj.tnCh === undefined) ? obj.tnCh = [] : null;
        }
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
