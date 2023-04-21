import WordWallLeaderboardModel from "../models/wordWallLeaderboardModel"

export default function WordWallLeaderboard() {
  WordWallLeaderboardModel.showAll().then(data => console.log(data))
}
