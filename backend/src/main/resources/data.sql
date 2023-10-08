DROP TABLE IF EXISTS boat;
DROP TABLE IF EXISTS boat_type;
DROP TABLE IF EXISTS user;

CREATE TABLE `user` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `email` varchar(255) NOT NULL UNIQUE,
    `password` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `boat` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `description` mediumtext NOT NULL,
    `user_id` INT(11) NOT NULL,
    PRIMARY KEY (`id`)
);

ALTER TABLE `boat` ADD CONSTRAINT `boat_fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`);

INSERT INTO user (email, password) VALUES ('example@email.com', '$2y$10$zZviAixfRlTvizWHpTQGNe2.b4hjFT1n7h0TpngYvC0ha7cjhjkKm');
INSERT INTO user (email, password) VALUES ('example2@email.com', '$2y$10$zZviAixfRlTvizWHpTQGNe2.b4hjFT1n7h0TpngYvC0ha7cjhjkKm');

INSERT INTO boat (name, description, user_id) VALUES
  ('Sea Explorer', 'A reliable family boat suitable for inland waters.', 1),
  ('Ocean Conqueror', 'Built for deep sea fishing adventures.', 1),
  ('Lake Dreamer', 'Ideal for casual outings on calm lakes.', 1),
  ('River Runner', 'Small and nimble, perfect for navigating rivers.', 1),
  ('SailMaster 3000', 'Equipped with the latest in sailing technology.', 1),
  ('Harbor Queen', 'Luxury yacht for socializing and partying in the harbor.', 2),
  ('Wave Dancer', 'A racing boat designed for speed and agility.', 2),
  ('Fish Tracker', 'Designed specifically for a great fishing experience.', 2),
  ('Sunset Cruiser', 'Comfortable cruiser for a relaxing journey.', 2),
  ('Storm Chaser', 'Built to withstand rough weather conditions.', 2);
