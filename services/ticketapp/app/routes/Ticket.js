const passport = require('passport')

module.exports = (app) => {
    const API = app.ticketapp.app.api.Ticket;

    /**
     * GET ALL THE TICKETS.
     */
    app.route('/tickets').get(passport.authenticate('jwt', { session: false }), API.getTickets())

    /**
     * GET THE TICKETS FOR A USER.
     */
    app.route('/tickets/user/:userId').get(passport.authenticate('jwt', { session: false }), API.getTickets());

    /**
     * ADD A NEW TICKET.
     */
    app.route('/tickets/addticket').post(passport.authenticate('jwt', { session: false }), API.addTicket());

    /**
     * GET THE COUNT OF THE TICKETS
     */
    app.route('/tickets/count').get(passport.authenticate('jwt', { session: false }), API.getNumberOfTickets())

    /**
     * GET THE COUNT OF TICKETS OF A USER.
     */
    app.route('/tickets/user/:userId/count').get(passport.authenticate('jwt', { session: false }), API.getNumberOfTickets())

    /**
     * ASSIGN THE TICKET.
     */
    app.route('/tickets/assignticket').post(passport.authenticate('jwt', { session: false }), API.assignTicket())

    /**
     * GET THE TICKETS PAGINATED
     */
    app.route('/tickets/paginated').post(passport.authenticate('jwt', { session: false }), API.getTickets())

    /**
     * GET PAGINATED TICKETS FOR A USER.
     */
    app.route('/tickets/user/:userId/paginated').post(passport.authenticate('jwt', { session: false }), API.getTickets())
}