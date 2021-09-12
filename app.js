const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
//Express app
const app = express();

//Connect to mongodb
const dbURI = 'mongodb+srv://Sunil:Blogsite2202@nodetutorial.vfnh9.mongodb.net/NodeTutorial?retryWrites=true&w=majority';
mongoose.connect(dbURI,{ useNewUrlParser: true , useUnifiedTopology: true})
    .then((result) =>app.listen(3000))
    .catch((err)=>console.log(err));

//register view engine
app.set('view engine','ejs');

//Middleware and static files 
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//routes
app.get('/',(req,res)=>{
  res.redirect('/blogs')
});
app.get('/about',(req,res)=>{
    res.render('about',{title:'About'});
});

//Blog routes
app.use(blogRoutes)
//404 page
app.use((req,res)=>{
    res.status(404).render('404',{title:"404"});
})