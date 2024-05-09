const express = require('express');
const db = require('../models/database');
const router = express.Router();

router.patch('/task=:taskID([\\w\\W]{21})', async (req, res) => {
    let {taskID} = req.params;
    let {taskText} = req.body;
    let {complete} = req.body;

    if(taskID.length === 21) {
        if(taskText.length > 0 && taskText.length <= 200) {
            if(complete === true || complete === false) {
                complete = (complete) ? 1 : 0;
                let ok = await db.updateTask(taskID, taskText, complete);

                if(ok) {
                    res.status(204).send();
                }
                else {
                    res.status(404).send();
                }
            }
        }
    }
})

module.exports = router;