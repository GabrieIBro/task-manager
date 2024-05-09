const express = require('express');
const path = require('path')
const router = express.Router();
const db = require('../models/database');
const {nanoid} = require('nanoid');

const root = process.env.PWD;

router.get('/', (req, res) => {
    // res.status(200).sendFile(path.join(root, 'src/public/html/index.html'))
    res.render(path.join(root, '/src/views/index'));
})

router.get('/tasks', async (req, res) => {
    let tasks = await db.getTasks();
    res.status(200).send(tasks[0]);
})

router.get('/task=:taskID([\\w\\W]{21})', async (req, res) => {
    let {taskID} = req.params;
    let [task] = await db.getTaskById(taskID);
    let taskText = task[0].value;
    let complete = task[0].complete;
    res.render(path.join(root, 'src/views/task'), {
        taskID,
        taskText,
        complete
    })
}) 

router.post('/', (req, res) => {
    let task = req.body.task || null; 

    if(!task || task.length > 200) {
        res.status(400).send("Invalid task content!")
    }
    else {
        let taskID = nanoid();
        let time = Date.now()/1000;
        db.addTaskDB(taskID, task, time, 0);
        res.status(201).send("Task added!");
    }
})

router.delete('/taskdel=:taskID([\\w\\W]{21})', (req, res) => {
    let {taskID} = req.params;

    if(taskID.length === 21) {
        db.deleteTask(taskID);
        res.status(204).send();
    }
})

module.exports = router;