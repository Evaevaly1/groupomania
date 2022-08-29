// Importer le package pour utiliser les variables d'environnement
const dotenv = require('dotenv');
const result = dotenv.config();

// Importer mongoose pour me connecter à la base de donnée mongoDB
const mongoose = require('mongoose');
mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = mongoose;
