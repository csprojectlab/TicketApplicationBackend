const passport = require('passport')

module.exports = (app) => {
    const API = app.ticketapp.app.api.Comment;

    /**
     * GET THE COMMENTS ON A TICKET.
     */
    app.route('/tickets/:ticketId/comments').get(passport.authenticate('jwt', { session: false }), API.getComments())

    /**
     * ADDING NEW COMMENT TO A TICKET.
     */
    app.route('/tickets/addcomment').post(passport.authenticate('jwt', { session: false }), API.addComment())
}