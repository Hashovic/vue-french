import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const issuePool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE_ISSUES
}).promise();

export async function addIssue(type, desc) {
    await issuePool.query("CALL add_issue(?, ?)", [type, desc]);

    return {success: true};
}

export async function viewAllIssues() {
    const [[ rows ]] = await issuePool.query("CALL view_all_issues()");

    return rows;
}

export async function viewUnsolvedIssues() {
    const [[ rows ]] = await issuePool.query("CALL view_unsolved_issues()");

    return rows;
}

export async function makeSolved(id) {
    await issuePool.query("CALL make_solved(?)", [id]);

    return {success: true};
}

export async function removeIssue(id) {
    await issuePool.query("CALL remove_issue(?)", [id]);

    return {success: true};
}
