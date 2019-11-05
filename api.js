const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 12; // For password bcrypt
const secret = "very secret secret";

let { User } = require('./models/userModel');

const {
  check,
  validationResult
} = require('express-validator/check');

/** JSON REST API */

const api = express.Router();

/** react root */
api.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/front-end/build/index.html'));
});


/** A token is sent to the client after a successful authentication */
api.post('/api/login', (req, res, next) => {

  if (req.body && req.body.username && req.body.password) {
    const username = req.body.username
    const password = req.body.password

    User.findOne({
      'username': username
    }, (err, user) => {
      if (err) return console.error(err)
      if (user) {
        bcrypt.compare(password, user.password, (err, result) =>  {
          if (result) {
            jwt.sign({ user }, secret, { algorithm: 'HS256' }, (err, token) => {
             console.log("Token: " + token)
             res.json({ token: token, user: user, })
            })
          } else {
            res.sendStatus(401) // 401 Unauthorized
          }
        })
      } else {
        res.sendStatus(401) // 401 Unauthorized
      }
    })
  } else {
    res.sendStatus(401) // 401 Unauthorized
  }
})

/** Adds a user to the database */
api.post('/api/users', [check('email').isEmail().withMessage("Enter a valid email address."),
  check('username').isLength({
    min: 5
  }).withMessage("Username must be 5 characters or more"),
  check('password').isLength({
    min: 5
  }).withMessage("Password must be 5 characters or more"),
  function(req, res, next) {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).send({error: errors.mapped()})
      return console.error(errors.mapped())
    } else {

        if (req.body && req.body.username && req.body.email && req.body.password 
            && req.body.firstname && req.body.lastname) {
          console.log('adding user')

          bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

            let newUser = new User({
              username: req.body.username,
              email: req.body.email,
              password: hash,
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              phone: req.body.phone,
              fee: req.body.fee,
              role: req.body.role,
            })
            newUser.save(function(err) {
              if (err) {
                res.status(409).send({error: err.message})
                return console.error(err.message)
              }
              console.log("Inserted 1 document into the collection")
              res.set('Location', path + 'api/users/' + newUser._id)
              res.status(201) // 201 Created
              res.json(newUser)
            })

          })
        } else {
          res.sendStatus(400) // 400 Bad Request
        }
    }
  }
])

/** Token is verified */
const getToken = (req) => {
  if (req.headers.authorization) {
    if (req.headers.authorization.startsWith('Bearer ')) {
       return req.headers.authorization.slice(7, req.headers.authorization.length)
    }
  }
  return null
}

/** Sends user data to the client after token is verified */
api.get('/api/users/:id', (req, res) => {
  const token = getToken(req)

  if (token) {
    jwt.verify(token, secret, function(err, decoded) {
      if(err) res.sendStatus(401)

      else if (req.params.id === decoded.user.id || decoded.user.role === 0) {
        User.findOne({'_id':req.params.id},function (err, user) {
          if (err) {res.sendStatus(404); return console.error(err);};
          if (!user) {res.sendStatus(404)} else {
            res.set('Location', path+'api/users/'+user._id);
            res.status(200);
            res.json(user);
          }
        })
      }
    })
  } else {
    res.sendStatus(401)
  }
})

/** Sends data of all users to the client after token is verified */
api.get('/api/users', (req, res) => {
  const token = getToken(req)
  if (token) {
    jwt.verify(token, secret, function(err, decoded) {
      if(err) res.sendStatus(401)
      else if (decoded.user.role === 0) {
        User.find(function (err, users) {
          if (err) {
            res.sendStatus(404) 
            return console.error(err)
          }
          if (!users) {
            res.sendStatus(404)
          } else {
            res.set('Location', path + 'api/users/')
            console.log('Users: ', users);
            res.status(200)
            res.json(users)
          }
        })
      }
    })
  } else {
      res.sendStatus(401)
    }
})

/** Updates user data after token is verified */
api.put('/api/users/:id', function(req, res) {
  const token = getToken(req)
  if (token) {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.sendStatus(401)
      }
      else if (req.params.id === decoded.user.id || decoded.user.role === 0) {
        User.findByIdAndUpdate(req.params.id, req.body, {'new':true}, function (err, user) {
          if (err) {
            res.sendStatus(400)
            return console.error(err)
          }
          if (!user) {res.sendStatus(404)} else {
            res.set('Location', path+'api/tasks/'+user._id)
            res.status(200)
            res.json(user)
          }
        })
      }
    })
  } else {
    res.sendStatus(401)
  }
})

/** Updates user's membership fee */
api.put('/api/users/:id/fee', function(req, res) {
  const token = getToken(req)
  
  if (token) {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        console.log('decoded', decoded)
        res.sendStatus(401)
      }
      else if (req.params.id === decoded.user.id || decoded.user.role === 0) {

        User.update({ _id:req.params.id }, {
          fee: req.body.fee,
        }, function (err, affected, resp) {
          if (err) {
            res.sendStatus(400)
            return console.error(err)
          }
          console.log('affected: ', affected)
        })

        User.findOne({ '_id':req.params.id },function (err, user) {
          if (err) {
            res.sendStatus(404)
            return console.error(err)
          }
          if (!user) {
            res.sendStatus(404)
          } else {
            res.set('Location', path+'api/users/'+user._id);
            res.status(200)
            res.json(user)
          }
        })
      }
    })
  } else {
    res.sendStatus(401)
  }
})

/** Removes user from the database after token is verified */
api.delete('/api/users/:id', function(req, res) {
  console.log('deleting user')
  const token = getToken(req)
  if (token) {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.sendStatus(401)
      }
      else if (req.params.id === decoded.user.id || decoded.user.role === 0) {
        User.findByIdAndDelete(req.params.id, function (err, user) {
          if (err) {
            res.sendStatus(404)
            return console.error(err)
          }
          if (!user) {
            res.sendStatus(404)
          } else {
              res.set('Location', path + 'api/users/' + user._id)
              res.status(200)
              res.json(user)
            }
        })
      }
    })
  } else {
    res.sendStatus(401)
  }
})

module.exports = api;