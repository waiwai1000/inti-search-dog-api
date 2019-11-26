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
        user: { type: String }
      

 
});




// });

// const Dog = mongoose.model('Dog', schema, 'dogCollection');
const Key = mongoose.model('Key', schema, 'keyCollection');

module.exports = Key;