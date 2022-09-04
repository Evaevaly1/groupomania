// Importation de mongoose
const mongoose = require('mongoose'),Schema = mongoose.Schema;

// Le modèle de base pour les posts
const postSchema = mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: false }    ,
    likes: { type: Number, required: false, default: 0 },
    dislikes:{ type: Number, required: false, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: {type: [String]}
  },
  {
    timestamps: true
  }
  );

// Exportation du module
module.exports = mongoose.model('Posts', postSchema, 'posts');


