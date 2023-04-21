CREATE DATABASE pokequiz;

CREATE TABLE wordwallLeaderboard (
    id SERIAL PRIMARY KEY,
    username VARCHAR(3) NOT NULL,
    score INTEGER NOT NULL
);

CREATE TABLE triviaLeaderboard (
    id SERIAL PRIMARY KEY,
    username VARCHAR(3) NOT NULL,
    score INTEGER NOT NULL
);
