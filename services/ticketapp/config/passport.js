const PassportJWT = require('passport-jwt'),
      ExtractJWT = PassportJWT.ExtractJwt,
      Strategy = PassportJWT.Strategy,
      config = require('./index.js'),
      {User} = require('../app/setup');

module.exports = (passport) => {
    const parameters = {
        secretOrKey: config.secret,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    }
    passport.use(new Strategy(parameters, (payload, done) => {
        User.findOne({
            where: { id: payload.user.id}
        }).then(user => {
            if(user)    done(null, user.dataValues)
            else done(null, false)
        })
    }))
}