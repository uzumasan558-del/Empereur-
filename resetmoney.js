module.exports = {
  config: {
    name: "resetmoney",
    version: "1.0",
    author: "Admin",
    countDown: 5,
    role: 2,
    shortDescription: "Remet l'argent à zéro",
    longDescription: "Remet l'argent d'un utilisateur mentionné à zéro dans la base de données.",
    category: "owner",
    guide: "{pn} [@mention]"
  },

  onStart: async function ({ message, event, usersData }) {
    const mentions = Object.keys(event.mentions);
    
    if (mentions.length === 0) {
      return message.reply("⚠️ Tu dois mentionner la personne dont tu veux réinitialiser l'argent ! \nExemple : /resetmoney @pseudo");
    }

    try {
      for (const userID of mentions) {
        await usersData.set(userID, { money: 0 });
      }
      return message.reply("💸 Le compte en banque de cette personne a été entièrement vidé et remis à zéro !");
    } catch (error) {
      return message.reply("❌ Une erreur est survenue lors de la réinitialisation.");
    }
  }
};
```
