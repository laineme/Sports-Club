/*
 * Sports club - Running is fun
 * Marjaana Laine
 *
 * userModel.js
 */

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const saltRounds = 12; // For password bcrypt
const uristring = process.env.MONGODB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/:27017';

/**
 * MongoDB connection
 * connects to the database with Mongoose
 */

mongoose.connect(uristring, {
  /** Fixes for the deprecation warnings */
  useUnifiedTopology: true,
  useNewUrlParser: true, 
  useFindAndModify: false,
  useCreateIndex: true
}, (err, res) => {
  if (err) {
    console.log ('MongoDB error connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('MongoDB successfully connected: ' + uristring);
  }
});

/*
const db = mongoose.connection
// Check db connection
db.once('open', () => console.log("Connected to MongoDB"))
db.on('error', console.error.bind(console, 'MongoDB connection error: '))*/

// User schema
const userSchema = mongoose.Schema({
  username:{
    type: String, 
    required: true,
    unique: true,
  },
  email:{
    type: String,
    required: false,
    unique: true,
  },
  password:{
    type: String,
    required: true
  },
  firstname:{
    type: String,
    required: true
  },
  lastname:{
    type: String,
    required: true
  },
  phone:{
    type: String
  },
  fee:{
    type: Boolean,
    default: false
  },
  role: {
    type: Number,
    default: 1
  }
})

userSchema.virtual('links').get(() => {
  return [{
    'self': 'api/users/' + this._id
  }]
})

userSchema.plugin(uniqueValidator, { 
  type: 'mongoose-unique-validator' 
}, { 
  message: 'Error, expected {PATH} to be unique.' 
})

// Don't return hashed password
userSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.password
  }
})

const User = mongoose.model('User', userSchema);

let users = [
  {
    username: 'admin',
    email: 'admin@runningisfun.com',
    password: 'admin',
    firstname: 'Admin',
    lastname: 'Admin',
    phone: '',
    fee: 'true',
    role: 0
  },
  {
    username: 'maija',
    email: 'maija@runningisfun.com',
    password: 'member',
    firstname: 'Maija',
    lastname: 'Malli',
    phone: '04012345678',
    fee: 'false',
    role: 1
  },
];

const addInitUsers = () => {

  for (let i = 0; i < users.length; i++) {
    User.findOne({
      'username': users[i].username
    }, (err, user) => {
      if (err) return console.error(err)
      if (!user) {
        bcrypt.hash(users[i].password, saltRounds, function(err, hash) {
            
          let newUser = new User({
            username: users[i].username,
            email: users[i].email,
            password: hash,
            firstname: users[i].firstname,
            lastname: users[i].lastname,
            phone: users[i].phone,
            fee: users[i].fee,
            role: users[i].role,
          })
      
          newUser.save((err) => {
            if (err) {
              return console.error(err.message)
            }
            console.log("Inserted 1 example user into the collection")
            console.log(newUser)
          })
      
        })
      }
    })
  }
}

module.exports = { User, addInitUsers };
