// Importation de password-validator
const passwordValidator = require('password-validator');
const { schema } = require('../models/User');

// Création du schéma password
const passwordSchema = new passwordValidator();

// Le schéma que doit respecter le mot de passe
passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values



// Vérification de la qualité du password par rapport au schéma
module.exports = (req, res , next) => {
    if(passwordSchema.validate(req.body.password)) {
        next();
    } else {
        let text = 'Le mot de passe n\'est pas assez fort, il doit contenir : '+ passwordSchema.validate(req.body.password, { list: true});
        text = text.replace('min', '- minimum 8 caractères');
        text = text.replace('max', '- maximum 100 caractères');
        text = text.replace('uppercase', '- 1 majuscule');
        text = text.replace('lowercase', '- 1 minuscule');
        text = text.replace('digits', '- 2 nombres');
        text = text.replace('spaces', '- aucun espace');
        text = text.replace('oneOf', '- être interdit (Password123)');
        return res.status(400)
        .json({error : {message: text}})
    }
}
