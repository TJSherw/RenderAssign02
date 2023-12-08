// create & export config obj

const configurations = {
    'db': 'mongodb+srv://admin:LM6QkXO5V9P1g7H0@cluster0.rpxapls.mongodb.net/SherwoodCompanyLtd',

    github: {
        clientId: 'b3db9b3d0693c621bcb7',
        clientSecret: 'ae5bd9673032094164751208324d1c79cc565240',
        callbackUrl: 'http://localhost:3000/github/callback',
      },
    }
module.exports = configurations;