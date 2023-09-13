CREATE TYPE public.account_type AS ENUM ('Client', 'Admin');

ALTER TYPE public.account_type OWNER TO oldcarstoredb;

-- Table structure for table `inventory`
CREATE TABLE IF NOT EXISTS public.inventory(
   inv_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
   inv_model character varying NOT NULL,
   inv_year character(4) NOT NULL,
   inv_description text NOT NULL,
   inv_image character varying NOT NULL,
   inv_price numeric(9, 0) NOT NULL,
   inv_color character varying NOT NULL,
   inv_rating numeric(9, 0) NOT NULL,
   CONSTRAINT inventory_pkey PRIMARY KEY (inv_id)  
);

-- Table structure for table `account`
CREATE TABLE IF NOT EXISTS public.account(
    account_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    account_firstname character varying NOT NULL,
    account_lastname character varying NOT NULL,
    account_email character varying NOT NULL,
    account_password character varying NOT NULL,
    account_type account_type NOT NULL DEFAULT 'Client'::account_type,
    CONSTRAINT account_pkey PRIMARY KEY (account_id)
);


-- Data for table `inventory`

INSERT INTO public.inventory (
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_price,
    inv_color,
    inv_rating
  )
VALUES   (
    'Mercedes-Benz 190 SL',
    '1961',
    'The Mercedes-Benz 190 SL, a classic produced between 1955 and 1963, is renowned for its graceful design, featuring flowing lines and a distinctive front grille. With a 1.9-liter engine and a balance of style and performance, it remains a beloved symbol of vintage automotive luxury.',
    '/images/car.png',
    145000,
    'Black',
    469
  ), (
    'Citroën DS 21 Cabriolet',
    '1965',
    'The Citroën DS 21 Cabriolet is an elegant and iconic convertible, showcasing the distinctive design language of the DS series. Produced by the French automaker Citroën, this model seamlessly blends avant-garde aesthetics with advanced engineering, epitomizing mid-century automotive innovation.',
    '/images/car1.png',
    109000,
    'Gray',
    83
  ), (
    'VW Type 34',
    '1968',
    'The VW Type 34, also known as the "Karmann Ghia Type 34" or "Razor Edge," is a lesser-known variant of the classic Volkswagen Karmann Ghia. Produced from 1961 to 1969, its unique angular design sets it apart from its more recognizable sibling, offering a stylish alternative with a hint of the modernist aesthetics of its time.',
    '/images/car2.png',
    34928,
    'Blue',
    152
  ), (
    'Cadillac DeVille',
    '1962',
    'The Cadillac DeVille is a nameplate associated with a series of luxurious and full-size sedans produced by Cadillac. Renowned for their opulent features and comfortable ride, Cadillac DeVille models have been emblematic of American automotive luxury and refinement for decades.',
    '/images/car3.png',
    22127,
    'Red',
    235
  ), (
    'Lincoln Continental Mark V',
    '1978',
    'The Lincoln Continental Mark V is a classic luxury coupe that embodies the extravagant styling of the 1970s. With its long, sleek lines, distinctive grille, and plush interior, the Mark V exemplifies the era''s emphasis on comfort and sophistication in American automotive design.',
    '/images/car4.png',
    319000,
    'Gold',
    289
  ), (
    'Mercedes-Benz 260 D',
    '1940',
    'The Mercedes-Benz 260 D holds the distinction of being one of the world''s first diesel-powered passenger cars. Introduced in the 1930s, it showcased Mercedes-Benz''s engineering prowess by combining fuel efficiency with the brand''s reputation for luxury and quality.',
    '/images/car5.png',
    775000,
    'Cream',
    58
  ), (
    'Peugeot 203',
    '1950',
    'The Peugeot 203 is a post-war French automobile that played a significant role in the reconstruction of the nation''s automotive industry. Introduced in 1948, it featured a modern design for its time and contributed to making Peugeot a prominent name in the global automotive market.',
    '/images/car6.png',
    27000,
    'Blue',
    35
  ), (
    'BMW 1502',
    '1977',
    'The BMW 1502 is a compact and charismatic model that contributed to BMW''s reputation for producing engaging and well-crafted vehicles. Introduced in the early 1970s, the 1502 combined dynamic driving characteristics with a more accessible entry point to the BMW brand, making it a notable part of the company''s history.',
    '/images/car7.png',
    8881,
    'Green',
    176
  ), (
    'Opel Olympia',
    '1953',
    'The Opel Olympia is a historic nameplate associated with a range of cars produced by the German automaker Opel. Introduced in the 1930s and revived at various points, the Olympia series showcased Opel''s engineering innovation and played a role in shaping the brand''s legacy in the automotive industry.',
    '/images/car8.png',
    9900,
    'Beige',
    301
  ), (
    'BMW 1602',
    '1978',
    'The BMW 1602 holds significance as a compact executive car that played a key role in establishing BMW''s reputation for sporty and enjoyable driving experiences. Introduced in the 1960s, the 1602 paved the way for the later "02 Series" models that would become iconic for their combination of performance and practicality.',
    '/images/car9.png',
    10000,
    'Green',
    224
  );


-- Data for cart table
CREATE TABLE IF NOT EXISTS public.cart(
  cart_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
  account_id integer NOT NULL,
  inv_id integer NOT NULL,
	inv_model character varying NOT NULL,
	inv_year character(4) NOT NULL,
  inv_image character varying NOT NULL,
  inv_price numeric(9, 0) NOT NULL,
  inv_color character varying NOT NULL,
  inv_rating numeric(9, 0) NOT NULL
);