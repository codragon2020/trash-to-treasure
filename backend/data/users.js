const bcrypt = require("bcryptjs");

const users = [
    {
        name: 'Admin User',
        username: 'admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'John Doe',
        username: 'john',
        email: 'john@example.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Jane Doe',
        username: 'jane',
        email: 'jane@example.com',
        password: bcrypt.hashSync('123456', 10)
    }
]

module.exports = users