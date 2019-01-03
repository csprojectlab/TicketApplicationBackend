const {User} = require('./../setup')

module.exports = (app) => {
    const API = app.ticketapp.app.api.LoginUser;
    /**
     * LOGIN USER API.
     */
    app.route('/login').post(API.login(User))
}