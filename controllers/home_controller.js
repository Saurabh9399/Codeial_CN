const Post = require("../models/post");

module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // res.cookie('user_id', 99);

  // Post.find({}, function (err, posts) {
  //   return res.render("home", {
  //     title: "Codeial | Home",
  //     posts,
  //   });
  // });

  // populate the user of each post
  Post.find({}).populate('user').exec(function (err, posts) {
    return res.render("home", {
      title: "Codeial | Home",
      posts,
    });
  })
};
