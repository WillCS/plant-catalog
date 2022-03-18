DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS plants;

CREATE TABLE plants (
  plant_id        SERIAL PRIMARY KEY,
  species         VARCHAR(128),
  colloquial_name VARCHAR(128),
  nickname        VARCHAR(128),
  help_url        VARCHAR(128),
  notes           VARCHAR(1024)
);

CREATE TABLE images (
  image_id   SERIAL  PRIMARY KEY,
  plant_id   INTEGER      NOT NULL,
  image_url  VARCHAR(256) NOT NULL,
  image_date TIMESTAMP    NOT NULL,
  CONSTRAINT plant_ref FOREIGN KEY(plant_id) REFERENCES plants(plant_id) ON DELETE CASCADE
);
