const { config } = require('dotenv');

config();

module.exports = {
    // Server Config
    port: process.env.PORT || 3000,
    env: process.env.env || 'Dev',

    // DBConn
    UserDB: process.env.UserDB,
    PasswordBD: process.env.PasswordDB,
    ServerDB: process.env.ServerDB,
    Database: process.env.Database,
    PortDB: process.env.PortDB,

    // DBConn
    UserDBImpuestos: process.env.UserDBImpuestos,
    PasswordBDImpuestos: process.env.PasswordDBImpuestos,
    DatabaseImpuestos: process.env.DatabaseImpuestos,
    
    // Auth
    JWT_SECRETO: process.env.JWT_SECRETO,
    SALT: process.env.JWT_SALT,
    JWT_TIEMPO_EXPIRA: process.env.JWT_TIEMPO_EXPIRA || '1h',

    //ETL Server
    ETL_HOST: process.env.ETL_HOST,
    //ETL_HOST: 'http://127.0.0.1:8000',
};