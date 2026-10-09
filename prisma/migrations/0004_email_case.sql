-- Preserve original email spellings while rejecting case-only duplicates.
CREATE UNIQUE INDEX User_email_nocase_key ON User (email COLLATE NOCASE);
