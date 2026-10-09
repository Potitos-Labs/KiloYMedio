CREATE TABLE RequestLimit (
  key TEXT PRIMARY KEY NOT NULL,
  hits INTEGER NOT NULL,
  expiresAt INTEGER NOT NULL
);
CREATE INDEX RequestLimit_expiresAt_idx ON RequestLimit(expiresAt);
