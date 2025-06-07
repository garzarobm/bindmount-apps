const mongoose = require('mongoose');
const mysql = require('mysql2/promise');
const { mysqlConfig } = require('../config/keys');
const { Pool } = require('pg');
const { postgresConfig } = require('../config/keys');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});
// Mongoose (MongoDB) export
module.exports = Todo = mongoose.model('todos', TodoSchema);

// MySQL interfacing (using mysql2)

const mysqlPool = mysql.createPool(mysqlConfig);

module.exports.createTodoMySQL = async (task) => {
    const [result] = await mysqlPool.execute(
        'INSERT INTO todos (task, created_at) VALUES (?, NOW())',
        [task]
    );
    return result.insertId;
};

module.exports.getTodosMySQL = async () => {
    const [rows] = await mysqlPool.execute('SELECT * FROM todos');
    return rows;
};

// Postgres interfacing (using pg)

const pgPool = new Pool(postgresConfig);

module.exports.createTodoPostgres = async (task) => {
    const res = await pgPool.query(
        'INSERT INTO todos (task, created_at) VALUES ($1, NOW()) RETURNING id',
        [task]
    );
    return res.rows[0].id;
};

module.exports.getTodosPostgres = async () => {
    const res = await pgPool.query('SELECT * FROM todos');
    return res.rows;
};