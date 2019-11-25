CREATE DATABASE supersearch;
\c supersearch

CREATE TABLE stores (
	id serial PRIMARY KEY,
	name text NOT NULL,
	address text NOT NULL,
	city text NOT NULL,
	zipcode INT NOT NULL
);

INSERT INTO stores (name, address, city, zipcode) VALUES
('25 30 Expresso','400 Princess Anne St.','Fredericksburg',22401),
('Agora Downtown','520 Caroline St.','Fredericksburg',22401),
('Aladin Restaurant & Cafe','2052 Plank Rd','Fredericksburg',22401),
('Basilico','2577 Cowan Blvd','Fredericksburg',22401),
('BJ’s Restaurant & Brewhouse','1861 Carl D. Silver Pkwy','Fredericksburg',22401),
('Chipotle','5955 Kingstowne','Fredericksburg',22401),
('Cork and Table','909 Caroline St.','Fredericksburg',22401),
('Duck Donuts','1223 Jefferson Davis Hwy','Fredericksburg',22401),
('El Pino','4211 Plank Rd','Fredericksburg',22401),
('Highpoint coffe','615 Caroline St.','Fredericksburg',22401),
('Hyperion Espresso','301 William St.','Fredericksburg',22401),
('Kybecca','402 William St.','Fredericksburg',22401),
('Mason-Dixon Cafe','2100 Princess Anne St.','Fredericksburg',22401),
('Orofino','1251 Carl D Silver Pkwy','Fredericksburg',22401),
('Pancho Villa Mexican Rest','10500 Spotsylvania Ave','Fredericksburg',22401),
('Pueblo''s Tex Mex Grill','1320 Jefferson Davis Hwy','Fredericksburg',22401),
('Sammy T''s','801 Caroline St.','Fredericksburg',22401),
('Sedona Taphouse','591 Williams St.','Fredericksburg',22401),
('Starbucks','2001 Plank Rd','Fredericksburg',22401),
('The Tavern','10649 Spotsylvania Ave','Fredericksburg',22401),
('Bean','2011 Avenida De Mesilla','Las Cruces',88005),
('El Comedor','2190 Avenida De  Mesilla','Las Cruces',88005),
('El Jacalito','2215 Missouri Ave','Las Cruces',88005),
('La Fuente','1710 S Espina','Las Cruces',88005),
('La Posta','2410 Calle De San Albino','Las Cruces',88005),
('Los Compas','603 S Nevarez St.','Las Cruces',88005),
('Milagro Coffee Y Espresso','1733 E. University Ave','Las Cruces',88005),
('Peet''s','2260 Locust','Las Cruces',88005),
('Starbucks','2808 Telshor Blvd','Las Cruces',88005),
('Starbucks','2511 Lohman Ave','Las Cruces',88005),
('Starbucks','1500 South Valley','Las Cruces',88005);

CREATE TABLE types (
	id serial PRIMARY KEY,
	type text NOT NULL UNIQUE
);

INSERT INTO types (type) VALUES
('american'),
('bars'),
('breakfast'),
('breweries'),
('brunch'),
('coffee'),
('donuts'),
('fast food'),
('italian'),
('mediterranean'),
('mexican restaurant'),
('sandwiches'),
('vegetarian'),
('wine bars');

CREATE TABLE stores_types (
	id serial PRIMARY KEY,
	store_id int NOT NULL,
    type_id int NOT NULL
);

INSERT INTO stores_types(store_id, type_id) VALUES
(1,6),
(2,6),
(3,10),
(3,2),
(4,9),
(5,1),
(5,2),
(5,4),
(6,11),
(6,8),
(7,1),
(7,14),
(8,6),
(8,7),
(8,3),
(9,11),
(10,6),
(11,6),
(12,2),
(12,1),
(13,3),
(13,5),
(13,12),
(14,9),
(15,11),
(16,11),
(17,12),
(17,13),
(18,1),
(18,14),
(19,6),
(19,8),
(20,1),
(20,12),
(21,6),
(22,11),
(23,11),
(24,11),
(25,11),
(26,11),
(27,6),
(28,6),
(29,6),
(30,6),
(31,6);

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    movie text NOT NULL,
    theater text NOT NULL,
    address text NOT NULL,
	city text NOT NULL,
	zipcode INT NOT NULL
);

INSERT INTO movies (movie, theater, address, city, zipcode) VALUES
('Nobody''s Watching', 'Regal Fredericksburg 15', '3301 Plank Road Route 3W', 'Fredericksburg', 22401),
('It', 'Regal Fredericksburg 15', '3301 Plank Road Route 3W', 'Fredericksburg', 22401),
('The Limehouse Golem', 'Regal Fredericksburg 15', '3301 Plank Road Route 3W', 'Fredericksburg', 22401),
('Despicable Me 3', 'Regal Fredericksburg 15', '3301 Plank Road Route 3W', 'Fredericksburg', 22401),
('Wonder Woman', 'Regal Fredericksburg 15', '3301 Plank Road Route 3W', 'Fredericksburg', 22401),
('The Emoji Movie', 'Regal Fredericksburg 15', '3301 Plank Road Route 3W', 'Fredericksburg', 22401),
('Year By The Sea', 'Marquee Cinemas Southpoint 9', '5800 South Point Centre', 'Fredericksburg',  22401),
('Rememory', 'Allen Cinema 4 Mesilla Valley', '700 South Telshor Boulevard', 'Las Cruces', 88005),
('Wonder Woman', 'Allen Cinema 4 Mesilla Valley', '700 South Telshor Boulevard', 'Las Cruces', 88005),
('Dunkirk', 'Allen Cinema 4 Mesilla Valley', '700 South Telshor Boulevard', 'Las Cruces', 88005),
('Anti Matter', 'Allen Cinema 4 Mesilla Valley', '700 South Telshor Boulevard', 'Las Cruces', 88005);

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username text NOT NULL UNIQUE,
	password text NOT NULL,
	zipcode int NOT NULL
);

GRANT SELECT ON stores to searchuser;
GRANT USAGE on stores_id_seq to searchuser;

GRANT SELECT ON types to searchuser;
GRANT USAGE on types_id_seq to searchuser;

GRANT SELECT ON stores_types to searchuser;
GRANT USAGE on stores_types_id_seq to searchuser;

GRANT SELECT ON movies to searchuser;
GRANT USAGE on movies_id_seq to searchuser;

GRANT SELECT, INSERT ON users to searchuser;
GRANT USAGE on users_id_seq to searchuser;
