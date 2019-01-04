const jwt = require('jsonwebtoken');
const config = require('./../../config')

const api = {}

api.login = (User) =>  async (request, response) => {
    const {username, password} = request.body
    if(!username || !password) {
        return response.status(400).json({message: "MISSING USERNAME OR PASSWORD"})
    }
    try {
        let user = await User.authenticate(username, password)
        user.dataValues.password = '****'
        const token = jwt.sign({user}, config.secret, {expiresIn: 60*15})   // FOR 15 MINUTES
        response.status(200).json({token: token, user: user});
    } catch (error) {
        response.status(400).json({message: "INVALID USERNAME OF PASSWORD"})
    }
}

module.exports = api;