const mysql = require('mysql2/promise');
const dbConfig = require('../config/databaseConfig');

const db = mysql.createPool(dbConfig);

// async function init() {

//     try {

//         let db = await mysql.createConnection(dbConfig);
        
//         await db.connect();
            
//         // await db.execute(`CREATE DATABASE IF NOT EXISTS taskapp`);
        
//         // await db.execute('USE taskapp');
        
//         await db.execute(`CREATE TABLE IF NOT EXISTS tasks(
//                     id varchar(21),
//                     value varchar(200),
//                     time int(11),
//                     complete tinyint,
//                     PRIMARY KEY(id),
//                     UNIQUE(id)
//         )`);
    
//         return db;
//     }
//     catch(error) {
//         console.error(error.message);
//     }
// }

async function addTaskDB(id, content, time, complete) {
    try {
        // let db = await init();
        await db.execute(`INSERT INTO tasks(id, value, time, complete) VALUES(?, ?, ?, ?)`, [id, content, time, complete]);
        return true;
        
    } catch (error) {
        console.error(error.message);    
        return false;    
    }
}

async function getTasks() {
    try {
        // let db = await init();
        let tasks = await db.execute(`SELECT * FROM tasks ORDER BY time ASC`);
        return tasks;

    } catch (error) {
        console.error(error.message);    
        return false;    
    }
}

async function getTaskById(id) {
    try {
        // let db = await init();
        let task = await db.execute(`SELECT id, value, complete FROM tasks WHERE id=?`, [id]);
        return task

    } catch (error) {
        console.error(error.message);
        return false;
    }
}

async function deleteTask(id) {
    // let db = await init()
    try {
        db.execute(`DELETE FROM tasks WHERE id=?`, [id]);
        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

async function updateTask(id, value, complete) {
    try {
        // let db = await init();
        db.execute(`UPDATE tasks SET value=?, complete=?
                  WHERE id=?`, [value, complete, id]);
        return true;

    } catch (error) {
        console.error(error.message);
        return false;
    }
}

module.exports = {
    addTaskDB,
    getTasks,
    deleteTask,
    getTaskById,
    updateTask
}