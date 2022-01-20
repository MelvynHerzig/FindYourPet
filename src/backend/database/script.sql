INSERT INTO member(firstname, name, email, password, street, "NPA", city, phone, "isAdmin", location)
VALUES ('Contact', 'FindYourPet', 'contact@findyourpet.ch', '$2a$10$ZbAcQnoqsYweBGODSwXNg.R2imGVpRgMKDcU5EnXNxQyn2erZ1Pr6', 'Rte de Cheseaux 1', 1400, 'Yverdon-les-Bains', 0796132606, true, '0101000020E6100000000000E06FA31A4000000040C3634740');

INSERT INTO species(name)
VALUES
    ('{"en":"dog", "fr":"chien", "de":"Hund", "it":"cane"}'),
    ('{"en":"cat", "fr":"chat", "de":"Katze", "it":"gatto"}'),
    ('{"en":"bird", "fr":"oiseau", "de":"Vogel", "it":"ucello"}'),
    ('{"en":"reptile", "fr":"reptile", "de":"Reptil", "it":"rettile"}'),
    ('{"en":"horse", "fr":"cheval", "de":"Pferd", "it":"pesce"}'),
    ('{"en":"rabbit", "fr":"lapin", "de":"Hase", "it":"coniglio"}'),
    ('{"en":"poultry", "fr":"volaille", "de":"Geflügel", "it":"pollame"}'),
    ('{"en":"hamster", "fr":"hamster", "de":"Hamster", "it":"criceto"}'),
    ('{"en":"ferret", "fr":"furet", "de":"Frettchen", "it":"furetto"}');


