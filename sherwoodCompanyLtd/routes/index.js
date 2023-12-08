var express = require('express');
var router = express.Router();

const Preworkout = require('../models/preworkout'); //pre js
const preworkout = require('../models/preworkout');

var User = require('../models/user');
var passport = require('passport');

const Protein = require('../models/protein'); //pre js

const Creatine = require('../models/creatine');


// protect func
function IsLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Sherwood Company Limited', user: req.user });
});

// Login ****************************************************************************************** 
//get


router.get("/login", (req, res, next) => {
  let messages = req.session.messages || [];
  req.session.messages; // always clear messages
  res.render("login", { title: "Login", messages: messages });
});


// post
router.post("/login", passport.authenticate(
  "local", // strategy name
  {
    successRedirect: "./preworkout",
    failureRedirect: "/login",
    failureMessage: "Invalid Credentials"
  }
));


//******************************************************************************************

// Register  ******************************************************************************************
//get
router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Create a New Account' });
});

//post
router.post('/register', (req, res, next) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, newUser) => {
      req.login(newUser, (err) => { res.redirect('/preworkout'); });
    }
  );
});

//  ******************************************************************************************

/* GET PreWorkout page. */
router.get('/preworkout', function (req, res, next) {
  //res.render('preworkouts/preworkout', { title: 'Pre-Workout' });

  Preworkout.find((err, preworkouts) => {
    if (err) {
      console.log(err);
    } else {
      res.render('preworkouts/preworkout', { title: 'Pre-Workout', dataset: preworkouts, user: req.user });
    }
  });
});



/* Get Protein Page */
router.get('/protein', function (req, res, next) {

  Protein.find((err, proteins) => {
    if (err) {
      console.log(err);
    } else {

      res.render('proteins/protein', { title: 'Protein', dataset: proteins, user: req.user });
    }
  });
});

/* GET Creatine page. */
router.get('/creatine', function (req, res, next) {

  Creatine.find((err, creatines) => {
    if (err) {
      console.log(err);
    } else {

      res.render('creatines/creatine', { title: 'Creatine', dataset: creatines, user: req.user });
    }
  });
});


// PreWorkout ****************************************************************************************** 

// GET handle
router.get('/add', IsLoggedIn, function (req, res, next) {
  res.render('preworkouts/add', { title: 'Add', user: req.user });
});

//Post 
router.post('/add', IsLoggedIn, (req, res, next) => {
  Preworkout.create({
    product: req.body.product,
    image: req.body.image,
    price: req.body.price,
    description: req.body.description
  }, (err, newPreworkout) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('../preworkout')
    }
  })
});

// U > Update a given project in DB by ID
// GET /projects/edit/ID
router.get("/edit/:_id", IsLoggedIn, (req, res, next) => {
  Preworkout.findById(req.params._id, (err, preworkoutObj) => {
    Preworkout.find((err, preworkout) => {
      res.render("preworkouts/edit",
        {
          title: "Edit a Pre-Workout",
          preworkout: preworkoutObj,
          user: req.user

        });
    });
  });
});
// POST /projects/edit/ID
router.post("/edit/:_id", IsLoggedIn, (req, res, next) => {
  Preworkout.findOneAndUpdate(
    { _id: req.params._id }, // filter to find the project
    {
      product: req.body.product,
      image: req.body.image,
      price: req.body.price,
      description: req.body.description
    }, // updated project info
    (err, updatedPreworkout) => { res.redirect("../preworkout"); } // callback function
  );
});

// deleted
router.get('/delete/:_id', IsLoggedIn, (req, res, next) => {

  let preworkoutId = req.params._id;

  Preworkout.remove(
    { _id: preworkoutId }, // find id 
    (err) => {
      res.redirect('../preworkout');
    });
});
// *****************************************************************************************


// Creatine  ****************************************************************************************** 

// GET handle
router.get('/addCreatine', IsLoggedIn, function (req, res, next) {
  res.render('creatines/addCreatine', { title: 'Add', user: req.user });
});

//Post 
router.post('/addCreatine', IsLoggedIn, (req, res, next) => {
  Creatine.create({
    product: req.body.product,
    image: req.body.image,
    price: req.body.price,
    description: req.body.description
  }, (err, newCreatine) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('../creatine')
    }
  })
});


// edit
router.get("/editCreatine/:_id", IsLoggedIn, (req, res, next) => {
  Creatine.findById(req.params._id, (err, creatineObj) => {
    Creatine.find((err, creatine) => {
      res.render("creatines/editCreatine",
        {
          title: "Edit a Creatine",
          creatine: creatineObj,
          user: req.user

        });
    });
  });
});


// POST /projects/edit/ID
router.post("/editCreatine/:_id", IsLoggedIn, (req, res, next) => {
  Creatine.findOneAndUpdate(
    { _id: req.params._id }, // filter to find the project
    {
      product: req.body.product,
      image: req.body.image,
      price: req.body.price,
      description: req.body.description
    }, // updated project info
    (err, updatedCreatine) => { res.redirect("../creatine"); } // callback function
  );
});

// deleted
router.get('/deleteCreatine/:_id', IsLoggedIn, (req, res, next) => {

  let creatineId = req.params._id;

  Creatine.remove(
    { _id: creatineId }, // find id 
    (err) => {
      res.redirect('../creatine');
    });
});


// *****************************************************************************************


// Protein  ****************************************************************************************** 


// GET handle
router.get('/addProtein', IsLoggedIn, function (req, res, next) {
  res.render('proteins/addProtein', { title: 'Add', user: req.user });
});

//Post 
router.post('/addProtein', IsLoggedIn, (req, res, next) => {
  Protein.create({
    product: req.body.product,
    image: req.body.image,
    price: req.body.price,
    description: req.body.description
  }, (err, newProtein) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('../protein')
    }
  })
});


// edit
router.get("/editProtein/:_id", IsLoggedIn, (req, res, next) => {
  Protein.findById(req.params._id, (err, proteinObj) => {
    Protein.find((err, protein) => {
      res.render("proteins/editProtein",
        {
          title: "Edit a Protein",
          protein: proteinObj,
          user: req.user

        });
    });
  });
});


// POST /projects/edit/ID
router.post("/editProtein/:_id", IsLoggedIn, (req, res, next) => {
  Protein.findOneAndUpdate(
    { _id: req.params._id }, // filter to find the project
    {
      product: req.body.product,
      image: req.body.image,
      price: req.body.price,
      description: req.body.description
    }, // updated project info
    (err, updatedProtein) => { res.redirect("../protein"); } // callback function
  );
});

// deleted
router.get('/deleteProtein/:_id', IsLoggedIn, (req, res, next) => {

  let proteinId = req.params._id;

  Protein.remove(
    { _id: proteinId }, // find id 
    (err) => {
      res.redirect('../protein');
    });
});

// *****************************************************************************************
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    res.redirect('login');
  })
});



// git hub 

router.get('/gitHub', passport.authenticate('github', { scope: ['user.email'] }));


router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res, next) => {
    res.redirect('/preworkout');
  })
  
module.exports = router;
