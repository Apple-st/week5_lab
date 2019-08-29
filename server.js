var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// for webpage rendering
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// this is to load the image and css folder
app.use(express.static('image'));
app.use(express.static('css'));


app.get('/', function (req, res) {
    res.render('index.html');
});

app.use(bodyParser.urlencoded({
    extended: false
}))

app.get('/newTask', function (req, res) {
    res.render('newTask.html');
});
app.get('/listTask', function (req, res) {
    if (0 != db.length)
        res.render('listTask.html', { taskDb: db });
    else
        res.render('error.html', {error: "No task added, please Add New Task first"} )
})
let db = [];
app.post('/listTask', function (req, res) {
let newRec = {
        taskname: req.body.taskname,
        taskdue: req.body.taskdue,
        taskdesc: req.body.taskdesc,
        taskimportance: req.body.importance
    }

   if (newRec.taskname == '' || newRec.taskdue == '' || newRec.taskdesc == ''|| newRec.taskimportance =='')
   res.render('error.html', {error: "Please fill all information of Task"} )
    else {
        db.push(newRec);
        res.render('listTask.html', { taskDb: db });
    }
})
app.listen(8080);