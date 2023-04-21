CREATE DATABASE pokequiz;

\c pokequiz

DROP TABLE IF EXISTS wordwallLeaderboard;
DROP TABLE IF EXISTS triviaLeaderboard;

CREATE TABLE wordWallLeaderboard (
    id SERIAL PRIMARY KEY,
    username VARCHAR(3) NOT NULL,
    score INTEGER NOT NULL
);

CREATE TABLE triviaLeaderboard (
    id SERIAL PRIMARY KEY,
    username VARCHAR(3) NOT NULL,
    score INTEGER NOT NULL
);
