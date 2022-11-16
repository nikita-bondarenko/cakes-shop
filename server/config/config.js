
require("dotenv").config({ path: `./.development.env` })

console.log(process.env.POSTGRES_USER)

module.exports = {
    "development": {
        "username": process.env.POSTGRES_USER,
        "password": process.env.POSTGRESS_PASSWORD,
        "database": process.env.POSTGRES_DB,
        "host": process.env.POSTGRES_HOST,
        "dialect": process.env.DIALECT,
        "port": process.env.POSTGRESS_PORT
    },
    "test": {
        "username": "narada",
        "password": "jayajagadisha",
        "database": "baker",
        "host": "127.0.0.1",
        "dialect": "postgres",
        "port": "5432"

    },
    "production": {
        "username": "narada",
        "password": "jayajagadisha",
        "database": "baker",
        "host": "127.0.0.1",
        "dialect": "postgres",
        "port": "5432"

    }
}
