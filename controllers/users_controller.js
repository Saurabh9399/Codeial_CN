const User = require('../models/user');

module.exports.profile = function (req, res) {
 
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, function (err, user) {
      if (user) {
        return res.render('user_profile', {
          title: 'User Profile', 
          user:user,
        })
      }

      return res.redirect('/users/user-signin');
    })
  } else {
    return res.redirect('/users/user-signin');
  }

};

// render the signup page
module.exports.signUp = function (req, res) {
  res.render("signup", {
    title: "Codeial | Sign Up"
  });
};

// render the signin page
module.exports.signIn = function (req, res) {
  res.render("signin", {
    title: "Codeial | Sign In" 
  });
};

// get the signup data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding user in signing up");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in creating user while signing up");
          return;
        }
        return res.redirect("/users/user-signin");
      });
    } else {
      return res.redirect('back');
    }
  })
  
}

// sign in and create session for user
module.exports.createSession = function (req, res) {
  // steps to authenticate
  // find the user
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding user in signing in");
      return;
    }
     // handle user found 
    if (user) {
       // handle password which doesn't match
      if (user.password !== req.body.password) {
          return res.redirect('back')
        }
       // handle session creation
      res.cookie('user_id', user.id);

      return res.redirect('/users/profile'); 
       
    } else {
      // handle user not found
      return res.redirect('back');
    }
  })

}


module.exports.signOut = function (req, res) {
  res.cookie('user_id', null);
  return res.redirect('/users/user-signin');
}
