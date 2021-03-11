const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 4300;
const Datastore = require('nedb');
const { O_CREAT } = require('constants'); 

// DB Collections
const user = new Datastore({ filename: 'collections/user.db', autoload: true });
const session = new Datastore({ filename: 'collections/session.db', autoload: true });
const todo = new Datastore({ filename: 'collections/todo.db', autoload: true });
// Express Body Parser
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')))

// Authentication
app.post('/api/auth/login', (req, res) => {
    // 1 - Query from DB username/password
    user.find(req.body, function(err, docs) { 
        if (err) {
            res.json({ user: null, token: null, msg: 'Internal Server Error' }, 500);         
        }

        // 2 - If found, Generate a token and Create an entry in session table with user id
        if (docs.length) { 
            const token = makeid(15);
            session.insert([{ userId: docs[0]._id, token: token }], function (err, newDocs) {
                if (err) {
                    res.json({ user: null, token: null, msg: 'Internal Server Error' }, 500);         
                }

                // 3 - Return a response with successful message
                res.json({ user: docs[0], token: token, msg: 'Successfully Logged-in' }, 200);
                // res.send('Authentication Login')
            });
        } else {
            res.json({ user: null, token: null, msg: 'Invalid Username/Password' }, 400);         
        }
    })
})
app.put('/api/auth/logout', (req, res) => {
    res.send('Authentication Logout')
})

// User Management 
app.get('/user', (req, res) => {
    // res.send('hello world')
    user.find({},function(err,docs){
    if (err) {
        res.json({ msg: 'Internal Server Error' }, 500);
    }
    else { 
    console.log(docs);
    }   
    res.send(docs);
    });
})
app.get('/user/:id', (req, res) => {
let _id = req.params.id;
user.find({_id}, function(err, docs) {
        if (err) {
            res.json({ user: null, token: null, msg: 'Internal Server Error' }, 500);
        }
        else { console.log(docs);
        }   
         res.send(docs);
});    
})
app.post('/user', (req, res) => {
    const data = req.body;
    user.insert(data, function (err, newDoc) {   
    if(err){
        res.json({ user: null, token: null, msg: 'Internal Server Error' }, 500);
        
    } 
    else{
        res.send(newDoc);
    }
    
    
    });
        
})
app.put('/user/:id', (req, res) => {
    let _id=req.params.id;
    user.update({_id}, 
        { $set: { username: req.body.username,password:req.body.password } }
        , { multi: false }, function (err, numReplaced) {
            console.log(numReplaced);
            if(err || numReplaced==0){
                res.json({  msg: 'Error while updating user' }, 500);
            }
            res.json({  msg: 'User updated successfully' }, 200);
           
        });
             
    
    
    
})
app.delete('/user/:id', (req, res) => {
    let _id=req.params.id;
    user.remove({ _id }, function (err, numRemoved) {
    });
    res.send('Deleted Successfully!');
})



// Todo routes
app.get('/todo/:userId', (req, res) => {
    
    let userId = req.params.userId
    todo.find({userId}, function(err,docs) {
        if (err) {
            res.json({ user: null, token: null, msg: 'Internal Server Error' }, 500);
        }
        else {
            console.log(docs);
        }   
        res.send(docs);
    });
});
app.get('/todo/:userId/:id', (req, res) => {
    let _id=req.params.id;
    todo.find({_id}, function(err,docs) {
        if (err) {
            res.json({ user: null, token: null, msg: 'Internal Server Error' }, 500);
        }
        else {
            console.log(docs);
        }   
        res.send(docs);
    });
})
app.post('/todo/:userId', (req, res) => {
    
    var data = req.body;
    data.userId = req.params.userId;
    todo.insert(data, function (err, newDoc) {   
    if(err){
        res.json({  msg: 'Error while creating list' }, 500);
        
        
    } 
    else{
        res.send(newDoc);
    }
    
    
    });
        
})
app.put('/todo/:userId/:id', (req, res) => {
    let _id=req.params.id;
    todo.update({_id}, 
        { $set: { title: req.body.title,description:req.body.description } }
        , { multi: false }, function (err, numReplaced) {
            console.log(numReplaced);
            if(err || numReplaced==0){
                res.json({  msg: 'Error while updating list' }, 500);
            }
            res.json({  msg: 'List updated successfully' }, 200);
           
        });
             
    
    
    
})
app.delete('/todo/:userId/:id', (req, res) => {
    let _id=req.params.id;
    todo.remove({ _id }, function (err, numRemoved) {
        if(err ){
            res.json({  msg: 'Error while deleting list' }, 500);
        }   
    res.json({  msg: 'List deleted successfully' }, 200);
    });
    
})



app.listen(port, () => {
    console.log(`Angular app listening at http://localhost:${port}`);   
});
  

















 
// todo.loadDatabase(function (err) {    
//    // Callback is optional

//     var todoList = [{ 
//         title: 'study', 
//         description: 'Chapter2 topic no 3',
//     },
//     {
//         title: 'Sports', 
//         description: 'Football Match at 7:30 ',
   
//     },
//     {
//         title: 'Extra', 
//         description: 'buy the grocery etc',
   
//     }



//  ];

 
//     todo.insert(todoList, function (err, newDoc) {   // Callback is optional
//     });});
  //  user.find({},function(err,docs){
    //console.log(docs);
    //});
    //user.update({username:"javad"},{username:"akhnus"},{},function(err,numReplaced){
      //  console.log(numReplaced);
    //});
//user.update({ username: 'moazam' }, { $set: { username: 'Ashraf' } }, { multi: true }, function (err, numReplaced) {
  
//});

//user.find({},function(err,docs){
  //  console.log(docs);
    //});

    // user.remove({ _id: 'BQsjylM5cDnBdyFO' }, {}, function (err, numRemoved) {
    //     // numRemoved = 1
    //   });
    //   user.find({},function(err,docs){
    //     console.log(docs);
    //     });
    

    // });
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
     
    
