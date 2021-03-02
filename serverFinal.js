const express = require('express');
const bodyParser = require ('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require ('cors');
const app =express();
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//const { default: SignIn } = require('../facerecognitionbrain/src/components/SignIn/SignIn');
const db= knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'yazbek123@',
      database : 'smartbrain'
    }
  });
//KNEX.js
db.select('*').from('users').then(data =>{
   // console.log(data);
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
//app.use(express.json()); 



const database = {
    users: [
        {
            id:'123',
            name: 'john',
            password: 'cookies',
            email: 'john@gmail.com',
            entries:0,
            joined: new Date()
        },
        {
            id:'124',
            name: 'sally',
            password: 'bananas',
            email: 'sally@gmail.com',
            entries:0,
            joined: new Date()
        }
    ],
    login:[
        {
            id: '987',
            has:'',
            email: 'john@gmail.com'
        }
    ]
}




app.get('/' , (req ,res) =>{
    db.select('*').from('users').then(data =>{
        // console.log(data);

     })
    res.send(database.users);
})

app.post ('/signin' ,(req,res) => {signin.handleSignin(req,res,db,bcrypt)})

app.post('/register' ,(req,res) => {register.handleRegister(req,res,db,bcrypt)})


app.get('/profile/:id', (req,res) => {profile.handlrProfileGet(req,res,db)})

app.put('/im' ,(req,res) => {image.handleImage(req,res,db)} );

app.post ('/imurl',(req,res) => {image.handleApiCall(req,res)} );


/*
bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});*/
/*
// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});

*/

app.listen(3001,()=>{
    console.log('app is running on port 3001');
});





/**

/  --> res this is working
sign in   -->  POST success / fail  (send password insude the body )
register  --> POST (add data to database) user
/Profile/ : userId --> GET = user
/image --> PUT --> user


 */


 // bcrypt-nodejs