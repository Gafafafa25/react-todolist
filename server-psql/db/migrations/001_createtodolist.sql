--  create table
CREATE TABLE IF NOT EXISTS todolist (
    id TEXT PRIMARY KEY,
    text TEXT NOT NULL,
    isDone BOOLEAN NOT NULL DEFAULT FALSE
)
