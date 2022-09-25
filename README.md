
# Créez un réseau social d’entreprise

## Groupomania


### Scénario

> Vous êtes développeur depuis plus d'un an chez CONNECT-E, une petite agence web regroupant une douzaine d'employés.
> Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a imaginé plusieurs fonctionnalités pour favoriser les échanges entre collègues.

# Demarrage du projet

## Prérequis

- Node.js
- Npm
- Mongodb

## Installation

- Cloner le repository
- Installer les dépendances du backend avec `npm install` depuis le terminal du dossier server
- Installer les dépendances du frontend avec `npm install` depuis le terminal du dossier client

## Lancement

- Lancer le backend server avec `npm start` depuis le terminal du dossier server
- Lancer le frontend client avec `npm start` dpeuis le terminal du dossier client

## le fichier .env

- Dans le dossier server, créer un fichier .env
- Dans le fichier .env, ajouter les variables d'environnement suivantes:

PORT = your_port
MONGO_URI = your_database_url
ADMIN_EMAIL = your_admin_email
ADMIN_PASSWORD = your_admin_password
ADMIN_NAME = your_admin_name
SECRET = your__password_for_jwt_encrypted

## Utilisation

- Créer un compte
- Se connecter
- Créer un post
- Liker ou disliker un post
- Modifier ou supprimer un post
- Commenter un post
- Se deconnecter

## Technologies utilisées

- Node
- Express
- MongoDb
- React
