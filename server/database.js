import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

export async function getSingleForm(verb, formId, isFeminine, isVousPlural, forcePronomial) {
    const [[rows]] = await pool.query("CALL get_verb_forms(get_infinitive_id(?), ?, 0, ?, ?, ?)", [verb, formId, isFeminine, isVousPlural, forcePronomial]);

    return rows[0];
}

export async function getAllForms(verb, forcePronomial) {
    const [[rows]] = await pool.query("CALL get_combined_forms(get_infinitive_id(?), ?)", [verb, forcePronomial]);

    return rows;
}

export async function getAutocomplete(searchTerm) {
    const [[rows]] = await pool.query("CALL get_autocomplete_verbs(?)", [searchTerm]);
    return rows;
}