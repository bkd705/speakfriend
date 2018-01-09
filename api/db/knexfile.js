const path = require("path");

const dbPath = path.join(__dirname, '../db/dev.sqlite3');

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      // this is brittle but fine for now.
      // Just don't move where we init the db from without changing this:
      filename: dbPath,
      useNullAsDefault: true
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
