const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const keys = require('../config/keys');
const { ensureAuthenticated } = require('../config/auth');
const Bill = require('../models/Bill');

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

router.get('/incomepage', function(req, res) {
  Bill.find({}, function(err, docs) {
      if (!err){
          console.log(docs);
          res.render('incomepage', {incomelist : docs});
      } else {throw err;}
  });
});

router.post('/incomepage', (req, res) => {
  const { query } = req.body;
  let errors = [];
  if (!query) {
    res.redirect('/incomepage');
  } else {
    Bill.find({"$or":[
        {billDate:{$regex:query, $options: 'i'}},
        {clientName:{$regex:query, $options: 'i'}},
        {billNum:{$regex:query, $options: 'i'}},
        {agency:{$regex:query, $options: 'i'}},
        {type:{$regex:query, $options: 'i'}},
        {amount:{$regex:query, $options: 'i'}},
        {ORNumber:{$regex:query, $options: 'i'}},
        {collected:{$regex:query, $options: 'i'}},
        {uncollected:{$regex:query, $options: 'i'}}
        ]}, function(err, docs) {
        if (!err){
            console.log(query);
            res.render('incomepage', {incomelist : docs});
        } else {throw err;}
    });
  }
});


module.exports = router;
