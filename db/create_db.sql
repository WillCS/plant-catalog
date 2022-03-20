DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS plants;

DROP TYPE IF EXISTS light_level;
DROP TYPE IF EXISTS acidity;

CREATE TYPE light_level   AS ENUM ('indirect', 'partial', 'full');
CREATE TYPE acidity       AS ENUM ('basic', 'slightly_basic', 'neutral', 'slightly_acidic', 'acidic');

CREATE TABLE watering_schedules (
  schedule_id SERIAL PRIMARY KEY,
  name        VARCHAR(128) NOT NULL,
  filename    VARCHAR(250) NOT NULL
);

CREATE TABLE feeding_schedules (
  schedule_id SERIAL PRIMARY KEY,
  name        VARCHAR(128) NOT NULL,
  filename    VARCHAR(250) NOT NULL
);

CREATE TABLE plants (
  plant_id             SERIAL PRIMARY KEY,
  species              VARCHAR(128),
  colloquial_name      VARCHAR(128),
  nickname             VARCHAR(128),
  watering_schedule_id INTEGER,
  light_needs          light_level,
  feeding_schedule_id  INTEGER,
  ph_needs             acidity,
  help_url             VARCHAR(256),
  notes                VARCHAR(1024),
  CONSTRAINT watering_schedule_ref
    FOREIGN KEY (watering_schedule_id) REFERENCES watering_schedules (schedule_id),
  CONSTRAINT feeding_schedule_ref
    FOREIGN KEY (feeding_schedule_id)  REFERENCES feeding_schedules  (schedule_id),
  CONSTRAINT is_named
    CHECK (species IS NOT NULL OR colloquial_name IS NOT NULL or nickname IS NOT NULL)
);

CREATE TABLE images (
  image_id   SERIAL  PRIMARY KEY,
  plant_id   INTEGER      NOT NULL,
  filename   VARCHAR(256) NOT NULL,
  date       TIMESTAMP    NOT NULL,
  CONSTRAINT plant_ref FOREIGN KEY (plant_id) REFERENCES plants (plant_id) ON DELETE CASCADE
);