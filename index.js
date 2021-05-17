const express=require('express');
const path =require('path'); 
const { title } = require('process');
const port=8000;

const db=require('./config/mangoose');
const Contact=require('./models/contact');

const app=express();


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());

app.use(express.static('assets'));
// middleware1
// app.use(function(req,res,next){
//     //console.log("Middleware 1 is called");
//     req.name='AYush';
//     next();
// });
// //middleware 2
// app.use(function(req,res,next){
//      console.log(req.name);
//     //console.log("Middleware 2 is called");
//     next();
// });

var contactList=[
    {
        name:"Ayush",
        phone:"807714175"
    },
    {
        name:"Coding Ninjas",
        phone:"979864186"
    },
    {
        name:"Arpan",
        phone:"9798645586"
    }
]

app.get('/',function(req,res){
    //console.log(req.name);
  //  console.log(__dirname);

//res.send('<h1>Cool, it is running!<h1>')

Contact.find({},function(err,contacts){
    if(err){
        console.log("Error in fetching contacts from db");
        return;
    }

    return res.render('home',{
        title:"My Contact List",
        contact_list: contacts
    });
});

});

app.get('/practise',function(req,res){
    return res.render('practise',{
        title:"Let us play with ejs"
    });
});

app.post('/create-contact',function(req,res){
  //  return res.redirect('/practise');
//   console.log(req.body);
//   console.log(req.body.name);
//   console.log(req.body.phone);
//   contactList.push({
//         name:req.body.name,
//         phone:req.body.phone

// });
Contact.create({
name:req.body.name,
phone:req.body.phone
},function(err,newContact){
    if(err)
    {
        console.log("Error in creating a contact !");
        return;
    }
    console.log('************',newContact);
    return res.redirect('back');
});
//return res.redirect('/');

// return res.redirect('back');
});

app.get('/delete-contact/',function(req,res){
    // console.log(req.params);
    // let phone = req.params.phone;
   // console.query(req.query);
   
     let phone= req.query.phone;
//get the id from query in the url
    let id=req.query.id; 
    //find the contact in the db and delete
    Contact.findByIdAndDelete(id,function(err){
        if(err)
        {
            console.log("Error in deleting");
            return;
        }
        return res.redirect('back');
    });    
    //  let contactIndex=contactList.findIndex(contact => contact.phone == phone);

    //  if(contactIndex!=-1)
    //  {
    //     contactList.splice(contactIndex,1);
    //  }
     //return res.redirect('back');

});

app.listen(port,function(err)
{
    if(err)

    {
        console.log("Error is running in the server",err);

    }
    console.log("Yup my server is up and running on port:",port);
});