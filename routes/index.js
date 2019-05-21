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
    errors.push({ msg: 'Hmm. Nothing in search bar' });
  } else {
    Bill.find({agency: query}, function(err, docs) {
        if (!err){
            console.log(query);
            res.render('incomepage', {incomelist : docs});
        } else {throw err;}
    });
  }
});


module.exports = router;
