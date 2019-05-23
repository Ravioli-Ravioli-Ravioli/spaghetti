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

router.get('/incomepage', ensureAuthenticated, function(req, res) {
  Bill.find({}, function(err, docs) {
      if (!err){
          console.log(docs);
          res.render('incomepage', {incomelist : docs});
      } else {throw err;}
  });
});

router.get('/finrep', ensureAuthenticated, (req, res) =>
  res.render('finrep', {
    user: req.user
  })
);

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

router.post('/finrep', (req, res) => {
  const { startyear, startmonth, endyear, endmonth } = req.body;
  let errors = [];
    var startyeari = parseInt(startyear, 10)
    var endyeari = parseInt(endyear, 10)
    var monthdic = {
    "Jan": 1,
    "Feb": 2,
    "Mar": 3,
    "Apr": 4,
    "May": 5,
    "Jun": 6,
    "Jul": 7,
    "Aug": 8,
    "Sep": 9,
    "Oct": 10,
    "Nov": 11,
    "Dec": 12
    };
    var startmonthi = monthdic[startmonth]
    var endmonthi = monthdic[endmonth]

  if (startyear > endyear) {
    console.log("Start year should be earlier than end year!")
    req.flash('error_msg', 'Start year should be earlier than end year!');
    res.redirect('/finrep');
  }
  if (startyear == endyear && startmonthi > endmonthi) {
    console.log("Start month should be earlier than end month!")
    req.flash('error_msg', 'Start month should be earlier than end month!');
    res.redirect('/finrep');
  } else {
    console.log("Else")
//    errors.push({ msg: 'Passwords do not match' });
    req.flash('success_msg', 'Okey');
    res.redirect('/finrep');
  }
});

module.exports = router;
