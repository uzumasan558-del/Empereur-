```javascript
module.exports = {
  config: {
    name: "give",
    aliases: ["pay", "donner", "transfert"],
    version: "1.0",
    author: "Admin",
    countDown: 5,
    role: 0,
    shortDescription: "Donner de l'argent",
    longDescription: "Transférez une partie de votre solde à un autre utilisateur en le mentionnant.",
    category: "economy",
    guide: "{pn} @mention <montant>"
  },

  onStart: async function ({ message, event, args, usersData }) {
    try {
      const senderID = event.senderID;
      const mentions = Object.keys(event.mentions);
      
      if (mentions.length === 0) {
        return message.reply("❌ | Vous devez mentionner la personne à qui vous souhaitez envoyer de l'argent.\nExemple : /give @nom 500");
      }

      const targetID = mentions[0];
      
      if (senderID === targetID) {
        return message.reply("❌ | Vous ne pouvez pas vous transférer de l'argent à vous-même !");
      }

      const mentionText = event.mentions[targetID];
      const textWithoutMention = args.join(" ").replace(mentionText, "").trim();
      
      const amount = parseInt(textWithoutMention, 10);

      if (isNaN(amount) || amount <= 0 || textWithoutMention.includes(".")) {
        return message.reply("❌ | Veuillez indiquer un montant valide et entier supérieur à 0.\nExemple : /give @nom 500");
      }

      const senderData = await usersData.get(senderID) || {};
      const senderMoney = senderData.money || 0;

      if (senderMoney < amount) {
        return message.reply(`❌ | Fonds insuffisants ! Vous ne possédez que ${senderMoney.toLocaleString('fr-FR')} $.`);
      }

      const targetData = await usersData.get(targetID) || {};
      const targetMoney = targetData.money || 0;

      await usersData.set(senderID, { 
        ...senderData, 
        money: senderMoney - amount 
      });

      await usersData.set(targetID, { 
        ...targetData, 
        money: targetMoney + amount 
      });

      const targetName = mentionText.replace('@', '');
      const formattedAmount = amount.toLocaleString('fr-FR');
      const formattedNewBalance = (senderMoney - amount).toLocaleString('fr-FR');

      return message.reply(
        `✅ | Transfert réussi !\n\n` +
        `💸 Montant envoyé : ${formattedAmount} $\n` +
        `👤 Destinataire : ${targetName}\n` +
        `💳 Votre nouveau solde : ${formattedNewBalance} $`
      );
      
    } catch (error) {
      console.error("ERREUR COMMANDE GIVE :", error);
      return message.reply("❌ | Une erreur inattendue est survenue lors du transfert. Veuillez réessayer plus tard.");
    }
  }
};
```
