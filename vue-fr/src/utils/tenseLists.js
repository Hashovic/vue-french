export const tenses = {
    "Indicative": {
        'Présent': 'present',
        'Imparfait': 'imparfait',
        'Passé Simple': 'passe_simple',
        'Futur Simple': 'futur_simple',
    },
    "Compound Tenses": {
        'Futur Proche': 'future_proche',
        'Passé Composé': 'passe_compose',
        'Plus-que-parfait': 'plus_que_parfait',
        'Futur Antérieur': 'futur_anterieur',
        'Passé Antérieur': 'passe_anterieur',
    },
    "Subjunctive": {
        'Présent du Subjonctif': 'pres_subj',
        'Passé du Subjonctif': 'passe_subj',
        'Subjonctif Imparfait': 'subj_imparfait',
        'PQP du Subjonctif': 'plus_que_parfait_subj',
    },
    "Conditional": {
        'Conditionnel': 'conditionnel',
        'Passé Conditionnel': 'passe_conditionnel',
        'Passé Conditionnel II': 'passe_conditionnel_II',
    },
    "Imperative": {
        'Impératif': 'imperatif',
        'Passe Impératif': 'passe_imperatif',
    }
};

export const rareTenses = new Set([
    'passe_anterieur',
    'subj_imparfait',
    'passe_imperatif',
    'passe_conditionnel_II',
    'plus_que_parfait_subj'
]);

export const secondaryEquivalents = {
    'present': 'present_secondary',
    'imparfait': 'imparfait_secondary',
    'futur_simple': 'futur_simple_secondary',
    'conditionnel': 'conditionnel_secondary',
    'imperatif': 'imperatif_secondary',
    'pres_subj': 'pres_subj_secondary',
}

export const imperatifEquivalents = {
    'imperatif': {tu: 'tu_form_imperatif', nous: 'nous_form_imperatif', vous: 'vous_form_imperatif'},
    'imperatif_secondary': {tu: 'tu_form_imperatif_secondary', nous: 'nous_form_imperatif_secondary', vous: 'vous_form_imperatif_secondary'},
    'passe_imperatif': {tu: 'tu_form_passe_imperatif', nous: 'nous_form_passe_imperatif', vous: 'vous_form_passe_imperatif'}
}

export const verbathonTenses = [
    'present', 'future_proche', 'imperatif',
    'passe_compose', 'imparfait', 'futur_simple',
    'conditionnel', 'pres_subj', 'passe_conditionnel',
    'plus_que_parfait', 'passe_subj'
];

export const allTensesIdList = [
    'present','future_proche','imperatif',
    'passe_compose','imparfait','pres_subj',
    'futur_simple','conditionnel','plus_que_parfait',
    'passe_subj','futur_anterieur','passe_simple','passe_anterieur',
    'subj_imparfait','plus_que_parfait_subj',
    'passe_conditionnel','passe_conditionnel_II','passe_imperatif'
]

export const allButRareTensesIdList = [
    'present','future_proche','imperatif',
    'passe_compose','imparfait','pres_subj',
    'futur_simple','conditionnel','plus_que_parfait',
    'passe_subj','futur_anterieur','passe_simple',
    'passe_conditionnel',
];

export const tenseCheckList = ([
    { label: 'Présent',                 id: 'present',                  shortId: 1},
    { label: 'Imparfait',               id: 'imparfait',                shortId: 2},
    { label: 'Passé Simple',            id: 'passe_simple',             shortId: 3},
    { label: 'Futur Simple',            id: 'futur_simple',             shortId: 4},
    { label: 'Futur Proche',            id: 'future_proche',            shortId: 5},
    { label: 'Passé Composé',           id: 'passe_compose',            shortId: 6},
    { label: 'Plus-que-parfait',        id: 'plus_que_parfait',         shortId: 7},
    { label: 'Futur Antérieur',         id: 'futur_anterieur',          shortId: 8},
    { label: 'Passé Antérieur',         id: 'passe_anterieur',          shortId: 9},
    { label: 'Présent du Subjonctif',   id: 'pres_subj',                shortId: 10},
    { label: 'Passé du Subjonctif',     id: 'passe_subj',               shortId: 11},
    { label: 'Subjonctif Imparfait',    id: 'subj_imparfait',           shortId: 12},
    { label: 'PQP du Subjonctif',       id: 'plus_que_parfait_subj',    shortId: 13},
    { label: 'Conditionnel',            id: 'conditionnel',             shortId: 14},
    { label: 'Passé Conditionnel',      id: 'passe_conditionnel',       shortId: 15},
    { label: 'Passé Conditionnel II',   id: 'passe_conditionnel_II',    shortId: 16},
    { label: 'Impératif',               id: 'imperatif',                shortId: 17},
    { label: 'Passé Impératif',         id: 'passe_imperatif',          shortId: 18}
]);