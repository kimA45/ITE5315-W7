//ITE5315--Professor: Shahdad - modified by Kim (21Jan24)
//WarmUp Activity downloaded .zip to run Nodejs project. Used ' npm i' to install all dependencies
//Group Activity performed on this file (Team Member-Sheri )

const express = require('express')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')
const path = require('path'); //used to ensure the path where main.hbs is refernced is correct. 

require('dotenv').config(); //act for env variable

const app = express()
const port = 5000
//const port = process.env.PORT || 5000; //| ||checks for .env file if dosent exist uses port 5000, we must use '=' to assign port to value.

// Set Templating Enginge
const handlebars = require('express-handlebars');
app.engine('hbs', handlebars.engine(
    {
        extname: '.hbs',
        //Act1 custom header
        defaultLayout: 'main', //grp activity1
        //partialsDir: path.join(__dirname, 'views', 'partials'), //optional step it helps handle the views directory path for the files in it to be referenced better in code
        helpers:{
            calculation:function(num){
                return (num+10)
            },
            //Act2 Cust header 2
            strong:function(options){// options can be opts, xyz etc. as it represent a variable and isnt a method 
                //return '<strong>'+options.fn(this)+'</strong>'
                return '<strong style="color:red">'+options.fn(this)+'</strong>'
            }
        }
    } ));
app.set('view engine', 'hbs');

//grp activity 1
//app.engine('.hbs', handlebars.engine
//({defaultLayout: 'main'})); //steeting main.hbs as defualt layout, .hbs file renders are places in the .hbs {{{body}}} location for rendering
//app.set('view engine', 'hbs'); //this code snipet is wrong andcauses error

app.set('views', path.join(__dirname, 'views'));

app.get('/demo', (req, res)=> {
    res.render('demo', {
       // layout: 'main.hbs' // do not use the default Layout (main.hbs) 
    });
})

const urlencodedParser = bodyParser.urlencoded({ extended: false }) //removed use of body-parser. 
//Express versions 4.16.0 and above hav ebuilt in modules of express that include middleware for parsing JSON nad URL-Encoded data. 

// Navigation
app.get('', (req, res)=> {
    res.render('index', {
        layout: 'main.hbs' // do not use the default Layout (main.hbs) 
    });
})

app.get('/register', (req, res)=> {
    res.render('register', {
        layout: 'main.hbs' // do not use the default Layout (main.hbs) 
    });
})

//handeling post- validation for Form fields
app.post('/register', urlencodedParser, [
    check('username', 'This username must be 3+ characters long')
        .exists()
        .isLength({ min: 3 }),
    check('email', 'Email is not valid')
        .isEmail()
        .normalizeEmail()

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array();
        res.render('register', {
            errs: alert,
            //layout: false // do not use the default Layout (main.hbs) 
            layout: 'main.hbs'
        });
    } 
    //else if (req.body.username && req.body.email) { // condition checks if username and email are present in the request body
      //  res.send('success'); } 
    /*alt code to handle via render success page view.
    /else {  res.render('success', layout: false }); */
    //else
     res.render('output', {
        data: req.body,
        //data: 'nothing',
        //layout: false //ensures deafult layout isnt used
        //layout: 'output.hbs' 
        layout: 'main.hbs' 
     });
});



app.listen(port, () => console.info(`App listening on port: ${port}`))