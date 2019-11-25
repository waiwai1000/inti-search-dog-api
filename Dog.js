const mongoose = require('mongoose');
const db = 'mongodb+srv://waiwai_1:KgSlVAZD8xHanb30@cluster123-gzhmi.mongodb.net/dog?retryWrites=true&w=majority';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Mongoose connetion error: ', error);
  });

const schema = mongoose.Schema({
        weight: { type: String },
        height: { type: String },
        name: { type: String },
        bred_for: { type: String },
        breed_group: { type: String },
        life_span: { type: String },
        temperament: { type: String },
        image: { type: String }


 
});
// const apikey = mongoose.Schema({
//   weight: { type: String },
//   height: { type: String },
//   name: { type: String },
//   bred_for: { type: String },
//   breed_group: { type: String },
//   life_span: { type: String },
//   temperament: { type: String },
//   image: { type: String }



// });

const Dog = mongoose.model('Dog', schema, 'dogCollection');
// const api_key = mongoose.model('Key', apikey, 'keyCollection');

module.exports = Dog,api_key;