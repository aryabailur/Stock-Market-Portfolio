import knex from "knex"; //import knex
import config from "../../knexfile.js"; //import knexfile
const dbconfig = config.development; //  selecting environment
const dbClient = knex(dbconfig); //creating db client instance
export default dbClient; //exporting
