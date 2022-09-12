
Creer un fichier .env contenant:

PORT = 

Il faut mettre le port sur lequel le server va se lancer (par default: 3000)

DB_USER =  (vous)
DB_PASSWORD = vous creer votre mot de passe
DB_CLUSTER = 
DB_NAME = 

il faut juste mettre les informations de la base de donnees fournies par mongodb.
 

JWT_KEY_TOKEN =  (c est la cle de chiffrage du token , qui peut etre quelconque)
CRYPTOJS_EMAIL = (cle de cryptage pour crypter l email des nouveaux utilisateurs, qui peut etre quelconque).

Maintenant, il, convient de preciser que le mot de passe doit contenir : au moins 
8 caracteres, dont : 1 majuscule, 1 minuscule, 2 chiffres, etc.).


Le procede:

Ouvrir un terminal dans le dossier et faire les commandes suivantes :

Backend : 

cd backend
npm install
nodemon

Frontend :

cd frontend
npm install
npm run start
