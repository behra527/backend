const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        passwordHash: bcrypt.hashSync('123456', 10),
        role: 'admin',
        isVerified: true,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        passwordHash: bcrypt.hashSync('123456', 10),
        role: 'user',
        isVerified: true,
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        passwordHash: bcrypt.hashSync('123456', 10),
        role: 'user',
        isVerified: true,
    },
];

module.exports = users;
