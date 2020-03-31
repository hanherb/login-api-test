const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook');

passport.use(new GoogleStrategy({
    clientID: '738742710995-fb8r9338lmvs20pg4cs0rk3b3jruqf7c.apps.googleusercontent.com',
    clientSecret: '3MwB0ddZageLuEswnnvjwJ4A',
    callbackURL: 'http://localhost:3000/auth/google/callback'
},
function(accessToken, refreshToken, profile, cb) {
	var json = {
		id: profile.id,
		displayName: profile.displayName,
		name: profile.name,
		emails: profile.emails,
		photos: profile.photos,
		provider: profile.provider,
		accessToken: accessToken,
		refreshToken: refreshToken
	}
	// console.log(json);
	return cb(json);
}));

passport.use(new FacebookStrategy({
    clientID: '535035844060225',
    clientSecret: 'fc279f78b74a5973ad269564dc6c175c',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ["email", "name"]
},
function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    return cb(profile);
}));

router.route('/').get(function(req, res) {
	res.end("hi");
});

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback', 
	passport.authenticate('google', { successRedirect:'/', failureRedirect: '/' }),
	function(req, res) {
    	res.end();
  	}
);

router.get('/auth/facebook',
  passport.authenticate('facebook')
);

router.get('/auth/facebook/callback', 
	passport.authenticate('facebook', { successRedirect:'/', failureRedirect: '/' }),
	function(req, res) {
    	res.end();
  	}
);

module.exports = router;