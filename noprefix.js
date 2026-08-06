```javascript
module.exports = {
  config: {
    name: "noprefix",
    version: "1.1",
    author: "Admin",
    countDown: 5,
    role: 2,
    shortDescription: "Réponse automatique pour admin",
    longDescription: "Répond automatiquement à certains mots clés, uniquement si l'expéditeur est un administrateur.",
    category: "owner",
    guide: "Le bot écoute les mots-clés de l'admin en arrière-plan."
  },

  onChat: async function ({ message, event }) {
    if (!event.body) return;

    const { adminBot } = global.GoatBot.config;
    if (!adminBot.includes(event.senderID)) return;

    const motCle = "bonjour"; 
    
    if (event.body.toLowerCase() === motCle) {
      return message.reply("Salut Boss ! 👋");
    }
  },

  onStart: async function ({ message }) {
    return message.reply("Cette commande fonctionne toute seule en arrière-plan, mais elle est strictement réservée aux admins !");
  }
};
```
