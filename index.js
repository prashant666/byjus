const util = require('util');
var bodyParser = require('body-parser');
const fetch = require('node-fetch');

 const port = process.env.PORT || 3003;

 var express = require('express')
 var app = express();

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));



app.set('view engine','ejs');

app.use('/assets',express.static('assets'));

var obj;
app.get('/',(req,res)=>{    

fetch('https://jobsqared.herokuapp.com/jobs')
  .then(res => res.json())
  .then(data => obj = data)
 
     res.render('in',{obj:(obj.data)});
 });

var obj1;
var obj2;
app.post('/search', function (req, res){
fetch('https://jobsqared.herokuapp.com/jobs')
  .then(res => res.json())
  .then(data => obj1 = data)
   .then(obj1 => obj2 = obj1.data) 
  var reply = new Array();
for(var i=0,j=0; i<1709 ;i++){
    
   
    if(req.body.location==" " && (req.body.skills==obj2[i].skills)){
      reply[j] = obj2[i];
        j++;
    }
    else if((req.body.skills==obj2[i].skills)&&(req.body.location==obj2[i].location)){
        reply[j] = obj2[i];
        j++;
    }
    else if(req.body.skills==" " && (req.body.location==obj2[i].location)){
      reply[j] = obj2[i];
        j++;
    }
    else if(req.body.skills==" " && req.body.location==" "){
       reply[j] = obj2[i];
        j++; 
    }
   
}
   
    res.render('search',{reply:reply});
    
    
 });


app.listen(port,function () {
    console.log('Server running at http at ', port);
});
