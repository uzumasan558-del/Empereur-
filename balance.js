```javascript
module.exports = {
  config: {
    name: "daily",
    aliases: ["quotidien", "cadeau"],
    version: "1.0",
    author: "Admin",
    countDown: 86400, // 24 heures d'attente
    role: 0,
    shortDescription: "Récompense quotidienne",
    longDescription: "Réclamez votre bonus d'argent gratuit chaque jour.",
    category: "economy",
    guide: "{pn}"
  },

  onStart: async function ({ message, event, usersData }) {
    try {
      const targetID = event.senderID;
      const reward = 1000; // Montant de la récompense

      const userData = await usersData.get(targetID) || {};
      const currentMoney = userData.money || 0;

      const newBalance = currentMoney + reward;

      await usersData.set(targetID, {
        ...userData,
        money: newBalance
      });

      const formattedReward = reward.toLocaleString('fr-FR');
      const formattedBalance = newBalance.toLocaleString('fr-FR');

      return message.reply(`🎁 | Félicitations ! Vous venez de recevoir votre récompense quotidienne de ${formattedReward} $.\n\n💳 | Votre nouveau solde est de : ${formattedBalance} $`);
      
    } catch (error) {
      console.error("ERREUR COMMANDE DAILY :", error);
      return message.reply("❌ | Une erreur est survenue lors de l'attribution de la récompense.");
    }
  }
};
```
