import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth2';
import error501 from '../../utils/error501';

passport.use('google', new GoogleStrategy({
    clientID     : `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret : `${process.env.GOOGLE_CLIENT_SECRET}`,
    callbackURL  : "http://localhost:3000/api/comresident/user/google/callback"
  },
  async function(accessToken, refreshToken, profile, done){
    if(!profile){
      done(error501('Cannot login with google'),null);
    }
    done(undefined, profile)
  }
  
));

passport.serializeUser((user:any, done) => {
  done(null, user);
});

passport.deserializeUser((user:any, done) => {
  done(null, user);
});
