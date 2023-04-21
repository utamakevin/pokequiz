const db = require("../db")

class WordWallLeaderboardModel {
  static showAll() {
    return db.query("select * from leaderboard;").then(res => res.rows)
  }

  static showTopFive() {
    return db
      .query("select * from wordWallLeaderboard order by score asc;")
      .then(res => res.rows.slice(0, 5))
      .then(data => console.log(data))
  }

  static createRecord(name, score) {
    return db
      .query(
        `insert into wordWallLeaderboard (username, score) values ($1, $2) returning *;`,
        [name, score]
      )
      .then(res => console.log(res.rows[0]))
  }
}

module.exports = WordWallLeaderboardModel
