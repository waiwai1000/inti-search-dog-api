const express = require('express');
const app = express();
const axios = require('axios');
const Dog = require('./Dog');
const Key = require('./Api-key');
const bodyParser = require("body-parser");

const apikey = '869744ce';
const api_key =  `b285f718-c95f-4368-9aa1-36d80d906d77`;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//localhost:5000/getdog?title=dogTitle
app.get('/getdog', (req, res) => {
  const q = req.query.q;
//  const q = "golden";
  const querystr = `https://api.thedogapi.com/v1/breeds/search?q=${q}`;
  axios
    .get(querystr)
    .then(response => {

      const dog = new Dog({
        weight: response.data[0].weight.metric,
        height: response.data[0].height.metric,
        name: response.data[0].name,
        bred_for: response.data[0].bred_for,
        breed_group: response.data[0].breed_group,
        life_span: response.data[0].life_span,
        temperament: response.data[0].temperament,
        image: null
      });
  
      if (!dog.name) {
        res.status(200).json('Not found');
        return;
      }
      dog
        .save()
        .then(response => {
          res.status(200).json(response);
        })
        .catch(error => {
          res.status(400).json(error);
         
        });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//localhost:5000/getalldogs
app.get('/getalldogs', (req, res) => {
  Dog.find({})
    .sort([['_id', -1]])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

app.get('/selectdogs', (req, res) => {
  Dog.find({ _id: req.query._id })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//localhost:5000/deletedog?title=dogTitle
app.get('/deletedog', (req, res) => {
  Dog.deleteMany({ _id: req.query._id })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

app.get('/updatedogimg', (req, res) => {
  const queryname = req.query.name;
  const id = req.query._id;
  const imgname = queryname.toLowerCase();
  //  const q = "golden";
    const querystr = `https://dog.ceo/api/breed/${imgname}/images/random`;
    axios
      .get(querystr)
      .then(response => {


        const img = response.data.message;
        if(!response.status=="sucess")
        {
          res.status(200).json('No image found');
          return;
        }
        Dog.updateOne(
          { _id : id },
          { $set: { "image" : img } })
       
        .then(response => {
          res.status(200).json(response);
        })    
        .catch(error => {
          res.status(400).json(error);
        });


      })
      .catch(error => {
        res.status(400).json(error);
      });
  });

  app.post('/add_api', (req, res) => {
    const email = req.body.email;
    const key = req.body.key;
    const apikey = new Key({
      user: email,
      key: key
  
    });
    apikey
    .save()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
     
    });
    });

    app.post('/selectapi', (req, res) => {
      Key.find({ key: req.body.key})
        .then(response => {
          res.status(200).json(response);
        })
        .catch(error => {
          res.status(400).json(error);
        });
    });

  app.post('/updatedogdetails', (req, res) => {
    
    const dogName = req.body.dogName;
    const id = req.body._id;
    const dogWeight = req.body.dogWeight;
    const dogHeight = req.body.dogHeight;
    const dogBred_for  = req.body.dogBred_for;
    const dogBreed_group = req.body.dogBreed_group;
    const dogLife_span = req.body.dogLife_span;
    const dogTemperament = req.body.dogTemperament;
    const dogImage_url = req.body.dogImage_url;

    
    Dog.updateOne(
      { _id : id },
      { $set: { 
        'weight':dogWeight,
        'height':dogHeight,
        'name':dogName,
        'bred_for':dogBred_for,
        'breed_group':dogBreed_group,
        'life_span':dogLife_span,
        'temperament':dogTemperament,
        'image' : dogImage_url
       } })
   
    .then(response => {
    
      res.status(200).json(response);
    })    
    .catch(error => {
      res.status(400).json(error);
    });
    });
if(process.env.NODE_ENV==="production"){
  app.use(express.static("client/build"));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname,"client","build","index.html"))
  })
}
app.listen(process.env.PORT || 5000)

