--  create table
CREATE TABLE IF NOT EXISTS todolist (
    id TEXT PRIMARY KEY,
    text TEXT,
    isDone BOOLEAN NOT NULL DEFAULT 0
)
