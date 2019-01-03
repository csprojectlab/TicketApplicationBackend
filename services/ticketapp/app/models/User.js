const bcrypt = require('bcryptjs')

module.exports = (sequelilze, DataTypes) => {
    const User = sequelilze.define('user', {
        username : {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false
        },
        email : {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        admin : {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })

    User.prototype.authorize = function () {
        const user = this;
        return user;
    }


    // THIS IS A CLASS METHOD.
    User.authenticate = async function (username, password) {
        const user = await User.findOne({ where: {username}})
        if(bcrypt.compareSync(password, user.password)) {            
            return user.authorize();
        }
        throw new Error ("INVALID PASSWORD");
    }
    
    return User
}