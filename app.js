// init project
var express = require('express');
require('express-async-errors');
var bodyP = require('body-parser');
var session = require('express-session');
var mysql = require('mysql');
var app = express();
nunjucks = require( 'nunjucks' ) ;
const hash = require('./hash');

app.use(bodyP.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(bodyP.json());

// Configure Nunjucks
nunjucks.configure('views', {
  express: app,
  noCache: true,
});

// Set Nunjucks as rendering engine for pages with .html suffix
app.engine( 'html', nunjucks.render ) ;
app.set( 'view engine', 'html' ) ;


console.log('Get connection ...');
 
var connection = mysql.createPool({
  connectionLimit: 1,
  database: 'post_it',
  host: "localhost",
  user: "root",
  password: ""
});

const options = {
  client: 'mysql',
  connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'post_it'
  }
}

const knex = require('knex')(options);

async function init() {

    await knex.schema.dropTableIfExists('users');
    await knex.schema.createTableIfNotExists('users', (table) => {
    table.string('email').primary();
    table.string('password').notNullable();
    table.string('pseudo');
  });
  
  await knex.schema.dropTableIfExists('notes');
  await knex.schema.createTableIfNotExists('notes', (table) => {
    table.string('titre').primary();
    table.string('note').notNullable();
    table.string('user').notNullable();
    table.string('x').notNullable();
    table.string('y').notNullable();
    table.foreign('user').references('users.email');
  });
}
//init();


app.listen(1337);


// attaques XSS
function xss(t){
  return t
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");
}

app.get('/',function(req, res) {
  if (req.session.user) {
    res.redirect('/post_it');
  } else {
   res.sendFile( __dirname  + '/views/login.html');
  }
});



app.get('/login',function(request, response) {
  response.sendFile( __dirname  + '/views/login.html');
});

app.get('/post_it',async (req, res) => {
  let users = await knex('users').select();
  if (!req.session.user) {
    return res.redirect('/');
  }

  let info = {
    email: req.session.user,
    pseudo: req.session.name,
    users: users,
  };

  if (req.xhr) {
    /* An XMLHTTPRequest--return JSON instead */
    return res.json(info);
  } else {
    return res.render('post_it.html', info);
  }
  /*
  if (req.session.user) {
   // try {
       res.sendFile( __dirname  + '/views/post_it.html');
     //res.render('post_it.html', {
     //   current: req.session.user
    // });
    //} catch (err) {
    //  console.error(err);
    //  res.status(500).send('Error');
   // }
  } else {
    res.redirect('/');
  }
  */
});

app.get('/inscription', async (req, res) => {
  res.render('inscription.html');
});

app.post('/inscription', async (req, res) => {
  let error;
  
  if (req.body.mail === undefined || req.body.mail == '') {
    error = 'A login is required.';
  } else if (req.body.motdepasse === undefined || req.body.motdepasse == '') {
    error = 'A password is required.';
  }
  if (error !== undefined) {
    res.render('/views/inscription.html', {error: error});
  }
  var data = {
    email: req.body.mail,
    pseudo: req.body.pseudo,
    password: hash.hashPassword(req.body.motdepasse),
  };
  try {
    if (data.email 
        && data.password
        && await knex('users').insert(data)) {
      res.redirect('/login');
    }

  } catch (err) {
    if (err.code == 'SQLITE_CONSTRAINT') {
      res.render('/views/inscription.html', { data: data, message: 'Login déjà pris' });
    } else {
      console.error(err);
      res.status(500).send('Error');
    }
  }
});

app.post('/verification', async (req, res) => {
  let error;
  
  if (req.body.mail === undefined || req.body.mail == '') {
    error = 'A login is required.';
  } else if (req.body.motdepasse === undefined || req.body.motdepasse == '') {
    error = 'A password is required.';
  }
  if (error !== undefined) {
    res.render('/views/inscription.html', {error: error});
  }
  var user = await knex('users').where({
    email: req.body.mail,
    password: hash.hashPassword(req.body.motdepasse),
  }).first();
  if (user) {
      req.session.user = user.email;
      req.session.name = user.pseudo;
    /*try {
      res.render('post_it.html', { 
        //users: await knex('users'),
        //current: req.session.user,
        email: req.body.mail,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error');
    }*/

    res.redirect('/post_it');
   // res.sendFile( __dirname  + '/post_it.html');
  } else {
    res.render('<wzlogin.html', { 
      login: req.body.login,
      message: 'Wrong login or password',
    });
  }
});


//gerer la deconnection
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});


/* *******************************************************************PAGE POST_IT*************************************************************** */

app.post('/note',  async (req, res) => {

  var data = {
    titre: req.body.titre,
    note: req.body.note,
    user: req.body.auteur,
    x: req.body.x,
    y:req.body.y,
  };
  try {
    if (data.titre 
        && data.note
        && await knex('notes').insert(data)) {
      /*res.render('views/popup.html', {    // ?????????????? il trouve pas le chemin exacte
        titre :data.titre,
        note :data.titre 
      });
      */
      res.redirect('/');
    } else {
      alert('BAD DATA');
      //res.render('/views/inscription.html', { data: data, message: 'Bad data' });
    }
  } catch (err) {
    if (err.code == 'SQLITE_CONSTRAINT') {
      res.render('/views/post_it.html', { data: data, message: 'Login already taken' });
    } else {
      console.error(err);
      res.status(500).send('Error');
    }
  }
  
});
app.post('/supprimer',async function(req,res){
  var event = {
 
      email: req.body.mail,
      x : req.body.x,
      y : req.body.y,
  };

   try{
     if(await knex('notes').where({'x' : event.x,
        'y' : event.y,'email':event.eamil}).del())
     {
         res.status(200).send("Succes");
     }
       
   }catch(err){
       console.log(err);
       if(err.code == "ER_DUP_ENTRY"){
           res.status(500).send('Erreur : element non trouvée');
       }
     res.status(404).send("Erreur")
   }});

app.post('/modifier',async function(req,res){
  
  var event = {
    email: req.body.mail,
     titre : req.body.titre,
     note : req.body.date,
     x : req.body.x,
      y : req.body.y,
   };
        
          try{
    if (await knex('notes').where({'x':event.x ,'y':event.y,'email':event.email}).update({'note':event.note })){
      res.status(200).send("modifier avec succes");
    } else {
      res.status(500).send("modification échouer");
    }
    }catch(err){
        if(err.code == "ER_DUP_ENTRY"){
            res.status(500).send('Erreur : Evenement déjà remplie');
        }
      res.status(404).send("Erreur")
    }
        
        
});         


app.get('/affichage', async (req, res) => {
  if (req.session.user) {
    try {
      res.render('/views/post_it.html', { 
        notes: await knex('notes'),
        current: req.session.user,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error');
    }
  } else {
    res.redirect('/');
  }
}); 