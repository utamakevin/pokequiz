require("dotenv").config()

let missing = ["DATABASE_URL"].filter(
  key => process.env[key] === undefined
)

if (missing.length > 0) {
  throw Error(`missing environment variables for ${missing.join(", ")}`)
}

module.exports = {
  db: {
    connectionString: process.env.DATABASE_URL,
  },
}
