import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';

passport.use('facebook', new FacebookStrategy({
    clientID     : `${process.env.FACEBOOK_CLIENT_ID}`,
    clientSecret : `${process.env.FACEBOOK_CLIENT_SECRET}`,
    callbackURL  : "http://localhost:3000/api/comresident/user/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  async function(accessToken, refreshToken, profile, done){
    console.log("====================================================================== start")
    console.log(accessToken)
    console.log(refreshToken)
    console.log(profile)

    console.log("====================================================================== end task")
    done(undefined,true, profile)
  }
  
));
passport.serializeUser((user:any, done) => {
    done(null, user);
  });
  
passport.deserializeUser((user:any, done) => {
    done(null, user);
});
