const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 4400;
const Datastore = require('nedb');
const { O_CREAT } = require('constants');
let dataCount = 0;
let pageCount;
let size = 10;
const user = new Datastore({ filename: 'collections/user.db', autoload: true });
const session = new Datastore({ filename: 'collections/session.db', autoload: true });
const todo = new Datastore({ filename: 'collections/todo.db', autoload: true });
//admin query
user.find({username:"admin"}, function(err, docs){
    if (!docs.length) {
        user.insert(
            { username:"admin",  password:"admin", firstName:"administrator", lastName:"", email:"", phone:"", address:"" },
            function(err, docs) {}
        )
    }
})
user.find({}, function(err, docs){
    dataCount = docs.length;
    pageCount = (Math.ceil(dataCount / size));
})
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'public')))
var myLogger = function (req, res, next) {
    if (req.headers.token) {
        let token = req.headers.token
        session.find({ token }, function(err, docs) {
            if (err) {
                res.json({ msg: "Unauthorize access" }, 401);
            }
            if (docs) {
                next();
            }
            else {
                res.json({ msg: "Unauthorize access" }, 401);
            }
        });
    }
    else {
        res.json({ msg: "Unauthorize access" }, 401);
    }
}
// Authentication
app.post('/api/auth/login', (req, res) => {
    user.find(req.body, function (err, docs) {
        if (err) {
            res.json({ user: null, token: null, msg: 'Internal Server Error' }, 500);
        }
        if (docs.length) {
            const token = makeid(15);
            session.insert([{ userId: docs[0]._id, token: token,loginAt:Date.now()}], function (err, newDocs) {
                if (err) {
                    res.json({ user: null, token: null, msg: 'Internal Server Error' }, 500);
                }
                res.header({ "token": token });
                res.json({ user: newDocs[0],docs, msg: 'Successfully Logged-in' }, 200);
            });
        }
        else {
            res.json({ user: null, token: null, msg: 'Invalid Username/Password' }, 400);
        }
    })
})
app.put('/api/auth/logout', (req, res) => {
    session.find({ token:req.body.token }, function(err, docs){
        if (docs.length) {
            session.update({ token:req.body.token }, { $set: { "loggedOut":Date.now() } }, {}, function () { 
                res.json({ docs },200)
            }) 
        }
        else {
            res.json({ msg:"token not found" });
        }
    })
})
app.get('/user', myLogger, (req, res) => {
    user.count({}, function (err, total) {
        const pageNbr = +req.query.pageNbr;
        const pageSize = 10;
        const recordStart = (pageNbr - 1) * pageSize;
        const pages = Math.floor(total / pageSize) + ((total % pageSize) ? 1 : 0);
        user.find({})
            .skip(recordStart)
            .limit(pageSize)
            .exec(function(err, docs) {
                if (err) {
                    res.json({ msg: 'Internal Server Error' }, 500);
                }
                else {
                    const responseObj = {
                        dataitems: docs,
                        pagination: {
                            recordStart: recordStart + 1,
                            recordEnd: ((recordStart + pageSize)>total ? total : recordStart + pageSize),
                            size: pageSize,
                            page: pageNbr,
                            total: total,
                            pages: pages,
                        },
                    }
                    res.json(responseObj, 200);
                }
            });
    });
});
app.get('/user/:id', myLogger, (req, res) => {
    let _id = req.params.id;
    user.find({ _id }, function (err, docs) {
        if (err) {
            res.json({ user: null, token: null, msg: 'Internal Server Error' }, 500);
        }
        else {
            res.json(docs, 200);
        }
    });
})
app.post('/user', myLogger, (req, res) => {
    const data = req.body;
    user.insert(data, function (err, newDoc) {
        if (err) {
            res.json({ user: null, token: null, msg: 'Internal Server Error' }, 500);
        }
        else {
            res.json(newDoc, { msg: 'User created successfully' }, 200);
        }
    });
})
app.put('/user/:id', myLogger, (req, res) => {
    let _id = req.params.id;
    user.update(
        { _id },
        { $set: { username: req.body.username, password:req.body.password } },
        { multi: false },
        function (err, numReplaced) {
            if (err || numReplaced == 0) {
                res.json({  msg: 'Error while updating user' }, 500);
            }
            res.json({  msg: 'User updated successfully' }, 200);
        }
    );
});
app.delete('/user/:id', myLogger, (req, res) => {
    let _id = req.params.id;
    user.remove(
        { _id },
        function (err, numRemoved) {
            if (err) {
            res.json({ msg: 'Error while deleting list' }, 500);
            }
            res.json({ msg: 'List deleted successfully' }, 200);
        }
    );
});
// Todo routes
app.get('/todo/:userId', myLogger, (req, res) => {
    let userId = req.params.userId;
    todo.count({userId}, function (err, total) {
        const pageNbr = +req.query.pageNbr;
        const pageSize = 10;
        const recordStart = (pageNbr - 1) * pageSize;
        const pages = Math.floor(total / pageSize) + ((total % pageSize) ? 1 : 0);
        todo.find({ userId })
            .skip(recordStart)
            .limit(pageSize)
            .exec(function(err, docs) {
                if (err) {
                    res.json({ msg: 'Internal Server Error' }, 500);
                }
                else {
                    const responseObj = {
                        dataitems: docs,
                        pagination: {
                            recordStart: recordStart + 1,
                            recordEnd: ((recordStart + pageSize)>total ? total : recordStart + pageSize),
                            size: pageSize,
                            page: pageNbr,
                            total: total,
                            pages: pages,
                        },
                    }
                    res.json(responseObj, 200);
                }
            //, function(err,docs) {
            // if (err) {
            //     console.log("error");
            //     res.json({ user: null, token: null, msg: 'Internal Server Error' }, 500);
            // }
            // else {
            //     console.log(docs);
            //     res.json(docs,{ msg: 'List found successfully' }, 200);
            // }
    });
});
})
app.get('/todo/:userId/:id', myLogger, (req, res) => {
    let _id = req.params.id;
    todo.find({ _id }, function(err, docs) {
        if (err) {
            res.json({ user: null, token: null, msg: 'Internal Server Error' }, 500);
        }
        else {
            res.json(docs,{ msg: 'List found successfully' }, 200);
        }
    });
})
app.post('/todo/:userId', myLogger, (req, res) => {
    var data = req.body;
    data.userId = req.params.userId;
    todo.insert(data, function (err, newDoc) {
        if (err) {
            res.json({  msg: 'Error while creating list' }, 500);
        }
        else {
            res.json(newDoc, { msg: 'List created successfully' }, 200);
        }
    });
});
app.put('/todo/:userId/:id', myLogger, (req, res) => {
    let _id = req.params.id;
    todo.update(
        { _id },
        { $set: { title: req.body.title, description:req.body.description } },
        { multi: false },
        function (err, numReplaced) {
            if (err || numReplaced == 0) {
                res.json({ msg: 'Error while updating list' }, 500);
            }
            res.json({ msg: 'List updated successfully' }, 200);
        }
    );
});
app.delete('/todo/:userId/:id', myLogger, (req, res) => {
    let _id = req.params.id;
    todo.remove(
        { _id },
        function (err, numRemoved) {
            if (err) {
                res.json({ msg: 'Error while deleting list' }, 500);
            }
            res.json({ msg: 'List deleted successfully' }, 200);
        }
    );
})
// Stating Express JS server
app.listen(port, () => {
    console.log(`Angular app listening at http://localhost:${port}`);
});
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
