export function encode(obj) {
    let str = "";
    let tmp = "";

    str += "t" + obj.fp;
    str += "_" + obj.vs;
    str += "f" + obj.fm;


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
        const regex = /([t_fpPnN])([^t_fpPnN]*)/g;
        let match;
        while ((match = regex.exec(str)) !== null) {
            const key = match[1];
            const val = match[2];
            const num = Number(val);
            const len = val.length;
            
            switch (key) {
            case 't': obj.fp = (num >= 0 && num <= 1) ? num : 0; break;
            case '_': obj.vs = (num >= 0 && num <= 1) ? num : 0; break;
            case 'f': obj.fm = (num >= 0 && num <= 1) ? num : 0; break;

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
        {pronoun: 'il/on',  formId: 3, fm: 0},
        {pronoun: 'elle',   formId: 3, fm: 1},
        {pronoun: 'nous',   formId: 4},
        {pronoun: 'vous',   formId: 5},
        {pronoun: 'ils',    formId: 6, fm: 0},
        {pronoun: 'elles',  formId: 6, fm: 1}
    ];

    export function getRandomElement(arr){
        return arr[Math.floor(Math.random() * arr.length)];
    }