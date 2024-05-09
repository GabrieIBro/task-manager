const express = require('express');
const homeRouter = require('./routes/index');
const taskPageRouter = require('./routes/task-page');
const path = require('path');

const app = express();

app.listen(3000, () => {
    console.log('Listening on 3000');
})


app.use(express.json());
app.use(express.static('./src/public'));
app.use(express.urlencoded({extended:true}));

app.use(homeRouter);
app.use(taskPageRouter);

app.set('view engine', 'ejs');
app.set('views', path.join(process.env.PWD, '/src/views'));

module.exports = app;