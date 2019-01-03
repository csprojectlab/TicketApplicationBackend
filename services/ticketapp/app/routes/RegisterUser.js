const {User} = require('../setup')
const passport = require('passport')


module.exports = (app) => {
    const API = app.ticketapp.app.api.RegisterUser;
    app.route('/').get(passport.authenticate('jwt', {session: false}), (_, response) => {
        response.send("TICKET SERVER BACKEND APPLICATION.")
    })

    /**
     * REGISTERS A NEW USER. HASH OF THE PASSWORD IS SAVED.
     */
    app.route('/register').post(API.register(User))
}