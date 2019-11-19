BEGIN;

TRUNCATE
  "word",
  "language",
  "user";

INSERT INTO "user" ("id", "username", "name", "password")
VALUES
  (
    1,
    'admin',
    'Dunder Mifflin Admin',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  );

INSERT INTO "language" ("id", "name", "user_id")
VALUES
  (1, 'Morse Code', 1);

INSERT INTO "word" ("id", "language_id", "original", "translation", "next")
VALUES
  (1, 1, '.-', 'A', 2),
  (2, 1, '-...', 'B', 3),
  (3, 1, '-.-.', 'C', 4),
  (4, 1, '-..', 'D', 5),
  (5, 1, '.', 'E', 6),
  (6, 1, '..-.', 'F', 7),
  (7, 1, '--.', 'G', 8),
  (8, 1, '....', 'H', 9),
  (9, 1, '..', 'I', 10),
  (10, 1, '.---', 'J', 11),
  (11, 1, '-.-', 'K', 12),
  (12, 1, '.-..', 'L', 13),
  (13, 1, '--', 'M', 14),
  (14, 1, '-.', 'N', 15),
  (15, 1, '---', 'O', 16),
  (16, 1, '.--.', 'P', 17),
  (17, 1, '--.-', 'Q', 18),
  (18, 1, '.-.', 'R', 19),
  (19, 1, '...', 'S', 20),
  (20, 1, '-', 'T', 21),
  (21, 1, '..-', 'U', 22),
  (22, 1, '...-', 'V', 23),
  (23, 1, '.--', 'W', 24),
  (24, 1, '-..-', 'X', 25),
  (25, 1, '-.--', 'Y', 26),
  (26, 1, '--..', 'Z', null);

UPDATE "language" SET head = 1 WHERE id = 1;

-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('word_id_seq', (SELECT MAX(id) from "word"));
SELECT setval('language_id_seq', (SELECT MAX(id) from "language"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

COMMIT;
