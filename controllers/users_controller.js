
const User = require('../models/user')

module.exports.profile = function (req, res) {
  res.render("user_profile", {
    title: "Users profile"
  });
};

// render the signup page
module.exports.signUp = function (req, res) {
  res.render("signup", {
    title: "Codeial | Sign Up"
  });
};

// render the signin page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
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
// render the signup page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  res.render('signup', {
    title: 'Sign Up',
  });
}

// sign in and create session for user
module.exports.createSession = function (req, res) {
  
  return res.redirect('/');

}

module.exports.destroySession = function (req, res) {

  req.logout();

  return res.redirect('/');
}



