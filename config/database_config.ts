import path from "path"
import * as dotenv from "dotenv"
dotenv.config()

const databaseConfig = {
    mysql: {
        client: 'mysql',
        connection: {
            host: process.env.MYSQLHOST,
            user: process.env.MYSQLUSER,
            password: process.env.MYSQLPASSWORD,
            database: process.env.MYSQLDATABASE
        },
        pool: {
            min: 10,
            max: 24,
            propagateCreateError: false
        },
        migrations: {
            directory: path.resolve(__dirname, '..', 'src', 'database', 'migrations')
        },
        useNullAsDefault: true
    },
    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: path.resolve(__dirname, '..', 'src', 'database', 'database.sqlite')
        },
        pool: {
            min: 10,
            max: 24,
            propagateCreateError: false
        },
        migrations: {
            directory: path.resolve(__dirname, '..', 'src', 'database', 'migrations')
        },
        useNullAsDefault: true
    },
    mongodb: {
        address: process.env.MONGODBSTRING,
        collection: "agenda",
        options: {
            useUnifiedTopology: true
        }
    }
}

export default databaseConfig