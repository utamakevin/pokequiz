export function saveResult(username, score) {
  return fetch(`/api/pokequiz/wordWallLeaderboard/`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, score: score }),
  }).then(res => res.json())
}
