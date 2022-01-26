# FindYourPet

## Description 

Le but de ce projet de semestre de la HEIG-VD est de développer une application web innovente.\
Nous avons décidé de réaliser un site d'annonces d'animaux de compagnies 
qui centraliserait toutes les recherches et demandent de ce type (premièrement au niveau suisse) 
sur un site d'annonces spécifiques à ce besoin.

Le rendu final (dernière version réalisée) est disponible à l'adresse suivante:\
[https://findyourpet.ch/](https://findyourpet.ch/)

## Installation

### Technologies principales utilisées

Vous pouvez vous référer à la page du [wiki correspondant](https://github.com/FindYourPet-ch/FindYourPet/wiki/Choix-technologiques).

### Étapes d'installation

1. Installer la version minimale de [npm](https://docs.npmjs.com/getting-started)
2. Installer la version minimale [node](https://nodejs.org/en/download/)
3. Installer la dernière version de [docker](https://docs.docker.com/engine/install/)

### Ajout des .env

Vous devez maintenant ajouter tous les .env aux différents endroits du projet.
Respectez l'infrastructure décrite ci-dessous.

Architecture global du projet pour les _.env_ :
```
FindYourPet
│
└─── src
     │    
     └─── backend
     │    │
     │    └─── database
     │         │   .env
     │         │   docker-compose.yml
     │         │
     │         ├───data
     │         │    └───postgres
     │         │           01-init.sh
     │         .env
     |         [...]
     │    
     └─── frontend
            .env
            [...]
```

#### .env du backend

Contenu:
```
JWT_KEY=secret
JWT_EXPIRATION=15m
```

#### .env du frontend

Contenu:
```
VUE_APP_ROOT_API="http://localhost:3000"
VUE_APP_I18N_LOCALE=fr
VUE_APP_I18N_FALLBACK_LOCALE=fr
```


#### .env de la base de donnée
Le .env de la base de données étant sensible certains champs ne seront pas indiqué.
Si vous souhaitez les obtenir, contactez-nous via l'adresse email: contact@findyourpet.ch

Contenu sensuré:
```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
PGADMIN_PORT=8081

POSTGRES_USER=<user>
POSTGRES_PASSWORD=<password>

APP_DB_USER=findyourpet
APP_DB_PASS=findyourpet
APP_DB_NAME=findyourpet_db

APP_DB_NAME_TEST=findyourpet_db_test

PGADMIN_DEFAULT_EMAIL=<exemple@exemple.ch>
PGADMIN_DEFAULT_PASSWORD=<password>
```

## Utilisation

Une fois la partie "Installation" réalisée, il vous suffit de lancer votre IDE préféré pour le développement web. 
Nous avons ensuite réalisé 2 README, un pour chaque projet expliquant comment utiliser le projet.

Dans tous les cas il est nécessaire de réaliser la commande suivante pour chaque projet:

```bash
$ npm install
```

### Projet Backend

En résumé, il suffit de lancer un container docker de la base de données avec:
> Cette commande doit être exécutée depuis le dossier backend/database

```bash
$ docker-compose up
```

> Des espèces d'animaux peuvent être ajoutée grâce au script FindYourPet/src/server/FindYourPet/init-data.sql
> ```
> INSERT INTO member(firstname, name, email, password, street, "NPA", city, phone, "isAdmin", location)
>VALUES ('Contact', 'FindYourPet', 'contact@findyourpet.ch', '$2a$10$ZbAcQnoqsYweBGODSwXNg.R2imGVpRgMKDcU5EnXNxQyn2erZ1Pr6', 'Rte de Cheseaux 1', 1400, 'Yverdon-les-Bains', >0796132606, true, '0101000020E6100000000000E06FA31A4000000040C3634740');
>
>INSERT INTO species(name)
>VALUES
>    ('{"en":"dog", "fr":"chien", "de":"Hund", "it":"cane"}'),
>    ('{"en":"cat", "fr":"chat", "de":"Katze", "it":"gatto"}'),
>    ('{"en":"bird", "fr":"oiseau", "de":"Vogel", "it":"ucello"}'),
>    ('{"en":"reptile", "fr":"reptile", "de":"Reptil", "it":"rettile"}'),
>    ('{"en":"horse", "fr":"cheval", "de":"Pferd", "it":"pesce"}'),
>    ('{"en":"rabbit", "fr":"lapin", "de":"Hase", "it":"coniglio"}'),
>    ('{"en":"poultry", "fr":"volaille", "de":"Geflügel", "it":"pollame"}'),
>    ('{"en":"hamster", "fr":"hamster", "de":"Hamster", "it":"criceto"}'),
>    ('{"en":"ferret", "fr":"furet", "de":"Frettchen", "it":"furetto"}');
>```    

Puis lancer le mode voulu:
> Toutes les commandes décrites ci-dessous doivent être lancées depuis le dossier backend

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Projet Frontend

En résumé, il suffit de lancer le mode voulu:
> Toutes les commandes décrites ci-dessous doivent être lancées depuis le dossier frontend

```bash
# compiles and hot-reloads for development
$ npm run serve

# compiles and minifies for production
$ npm run build

# compiles and hot-reloads for development with production value
$ npm run serve -- --mode=production
or
$ vue-cli-service serve --mode=production 
```

## Support

En cas de problème contacter nous grâce à l'adresse email suivante: contact@findyourpet.ch

Si votre demande fait allusion à une nouvelle fonctionnalité, une erreur dans le code, 
un bug ou tout autre demande relative au code, 
il est toujours possible de contribuer au projet ou ouvrir une nouvelle issue.

## Contribuer

Avant de contribuer au projet, veuillez prendre connaissance des points suivants:

* [GitFlow](https://github.com/FindYourPet-ch/FindYourPet/wiki/Workflow-Git)
* [Conventions de nommage](https://github.com/FindYourPet-ch/FindYourPet/wiki/Conventions-de-nommage)

Veuillez ensuite installer l'environement de développement complet comme indiqué plus haut dans le document. 
Une fois l'environnement installé, vous pouvez contribuer au projet en:

1. Réalisant un fork ou un clone du projet au niveau de la branche develop.
2. Ouvrant une issue sur votre repository fraîchement cloné.
3. Développant votre ajout / fonctionnalité.
4. Réalisant une pull request une fois que tous les tests fonctionnent et que la fonctionnalité est terminée.

## Auteurs

Nous sommes une équipe de 4 étudiants de la HEIG-VD en informatique logiciel :

- Alec Berney (alecberney)
- Teo Ferrari (LordTT)
- Quentin Forestier (QuentinForestier)
- Melvyn Herzig (MelvynHerzig)

## License

MIT License

Copyright (c) 2021 FindYourPet

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
