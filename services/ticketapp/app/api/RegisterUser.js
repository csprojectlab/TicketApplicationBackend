const bcrypt = require('bcryptjs')
const api = {}

api.register = (User) => async (request, response) => {
    const {username, password, email} = request.body
    let admin = false;
    if(request.body.admin)  admin = request.body.admin;
    const hash = bcrypt.hashSync(password, 10)   
    try {
        const user = await  User.create({ username: username, password: hash, email: email, admin: admin })
        response.status(200).json(user);
    } catch (error) {
        let {fields} = error
        let {message} = error.errors[0]
        response.status(400).json({message: message, cause: fields});
    }
}

module.exports = api;