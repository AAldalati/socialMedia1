
let id = null;
var DataStore = require('nedb');

var userDb = new DataStore('users.DB');
userDb.loadDatabase();

var Post = new DataStore('Post.DB');
Post.loadDatabase();

var PostTxt = new DataStore('PostText.DB');
PostTxt.loadDatabase();

var likeComment = new DataStore('likeComment.DB');
likeComment.loadDatabase();

var like = new DataStore('like.DB');
like.loadDatabase();

var express = require('express');
var app = express();

var Port = 4000;
app.listen(Port, () => console.log('listening to '+Port));
app.use(express.static('app'));
app.use(express.json({ limit : '1gb' }));

app.post('/add', (request, response) => {
    let data = request.body;
    userDb.insert(data);
    response.json({
        status: "success",
    });
});

app.get('/get', (request, response) => {
    userDb.find({}, (err, data) => {
        if(err){
            response.end();
            console.error(err);
            return;
        }
        response.json(data);
    });
});

app.post('/add1', (request, response) => {
    let data = request.body;
    data.id = id1();
    Post.insert(data);
    response.json({
        status: "success",
    });
});

app.get('/getPost', (request, response) => {
    Post.find({}, (err, data) => {
        if(err){
            response.end();
            console.error(err);
            return;
        }
        response.json(data);
    });
});

app.post('/add2', (request, response) => {
    let data = request.body;
    data.id = id1();
    PostTxt.insert(data);
    response.json({
        status: "success",
    });
});

app.get('/getPost1', (request, response) => {
    PostTxt.find({}, (err, data) => {
        if(err){
            response.end();
            console.error(err);
            return;
        }
        response.json(data);
    });
});

app.post('/add3', (request, response) => {
    let data = request.body;
    likeComment.insert(data);
    response.json({
        status: "success",
    });
});

app.get('/getPost2', (request, response) => {
    likeComment.find({}, (err, data) => {
        if(err){
            response.end();
            console.error(err);
            return;
        }
        response.json(data);
    });
});

app.post('/add4', (request, response) => {
    let data = request.body;
    like.find({}, (err, docs) => {
        if(err){
            response.end();
            console.error(err);
            return;
        }
        let count = 0;
        for(let i=0; i < docs.length; i++){
            if(data.user == docs[i].user){
                if(data.id == docs[i].id){
                    count++;
                }
            }
        }
        if(count == 0){
            like.insert(data);
        }
    });
    response.json({
        status: "success",
    });
});

app.get('/getPost3', (request, response) => {
    like.find({}, (err, data) => {
        if(err){
            response.end();
            console.error(err);
            return;
        }
        response.json(data);
    });
});

let bool = false;

function id1(){
    if(bool == false){
        id = crypto.randomUUID();
        bool = true;
        return id;
    }
    else{
        bool = false;
        return id;
    }
}