//FileName: app.js
var express = require('express');
var common = require("/opt/routes/common.js");
var passport = require('passport-oauth2');

var app = express();

passport.use(new OAuth2Strategy({
      authorizationURL: 'https://www.example.com/oauth2/authorize', //Change to OAuth2 Server's authorization endpoint
      tokenURL: 'https://www.example.com/oauth2/token', // Change to OAuth2 Server's token generation endpoint
      clientID: EXAMPLE_CLIENT_ID, // Change to Client ID
      clientSecret: EXAMPLE_CLIENT_SECRET, // Change to Client secret
      callbackURL: "http://localhost:3000/auth/callback" // Change to public IP callback endpoint
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ exampleId: profile.id }, function (err, user) {
        return cb(err, user);
      }
    );
  }
));

app.get('/auth/callback',
  passport.authenticate('oauth2', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

app.get('/', common.getDefaultResponse);
app.get('*', passport.authenticate('oauth2'), common.getResource);
app.put('*', common.updResource);
app.post('*', common.updResource);
app.delete('*', common.updResource);

var http = require('http').Server(app);
http.listen(3000, function(){
  console.log('Server up: http://localhost:3000');
});
