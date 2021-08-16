const express = require('express');
const path = require('path');
const app=express();
const fetch = require("node-fetch");
const { response } = require('express');
const logger = require('./middleware/logger');
const exphbs=require('express-handlebars');
const members = require('./Members');


//handlebwars middleware

app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');





app.use(logger);

//body parser middleware 
app.use(express.json());
app.use(express.urlencoded({extended: false})); 



//home page
app.get('/',(req,res)=>res.render('index', {title: 'Member App',
members

}))

//static folder
app.use(express.static(path.join(__dirname, 'public')));   






app.use('/api/test1', require('./routes/api/members'));


/* app.get('/',(req, res) => {

    res.sendFile(path.join(__dirname, 'public', 'index.html'));


});
*/
//get all members


function fetchData(){
    fetch("http://localhost:5000/api/test1").then(response =>{
        return response.json();
    }).then(data=>{
        console.log(data);
        
    })
}

fetchData();


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Port: ${PORT}`));  