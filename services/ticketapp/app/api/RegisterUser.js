const bcrypt = require('bcryptjs')
const api = {}

api.register = (User) => async (request, response) => {
    const {username, password} = request.body
    const hash = bcrypt.hashSync(password, 10)
    User.create({
        username: username,
        password: hash,
        email: request.body.email
    }).then(added_user => response.status(200).json(added_user))
      .catch(error => {
          let {fields} = error
          response.status(400).json({message: "UNABLE TO ADD NEW USER", cause: fields});
      })
}

module.exports = api;