const express = require('express'); 
const path = require('path'); 
const ejs = require('ejs'); 
const app = express(); 
app.use(express.static('./public')); 
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); 

app.get("/",(req,res)=>{ 
res.render('index'); 
}); 

app.get("/login",(req,res)=>{ 
    res.render('login'); 
}); 

app.get("/products",(req,res)=>{ 
    res.render('products'); 
}); 

app.get("/signup",(req,res)=>{ 
    res.render('signup'); 
});



app.listen(3000,(req,res)=>{ 
console.log(`Server is running at port 3000`); 
}); 