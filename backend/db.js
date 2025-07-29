const mysql = require("mysql2");
const signer = require("aws-rds-sign");

const dbConfig = {
  host: "your-rds-endpoint.rds.amazonaws.com",
  user: "admin",
  database: "login",
  ssl: "Amazon RDS",
};

async function getConnection() {
  const token = await signer.getAuthToken({
    username: dbConfig.user,
    hostname: dbConfig.host,
    region: "your-region", // e.g., ap-south-1
  });

  return mysql.createConnection({
    ...dbConfig,
    password: token,
    authPlugins: {
      mysql_clear_password: () => () => token,
    },
  });
}

module.exports = getConnection;
