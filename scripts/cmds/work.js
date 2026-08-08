module.exports = {
  config: {
    name: "work",
    aliases: ["travailler", "job"],
    version: "1.0",
    author: "Admin",
    countDown: 3600, // 1 heure d'attente (3600 secondes)
    role: 0,
    shortDescription: "Travailler pour de l'argent",
    longDescription: "Faites un petit boulot aléatoire pour gagner un salaire.",
    category: "economy",
    guide: "{pn}"
  },

  onStart: async function ({ message, event, usersData }) {
    try {
      const targetID = event.senderID;

      // Liste de petits boulots
      const jobs = [
        "avez aidé une personne âgée à traverser la rue",
        "avez réparé le PC de votre voisin",
        "avez lavé des voitures",
        "avez travaillé comme serveur dans un café",
        "avez vendu des vieux objets sur internet",
        "avez fait du baby-sitting",
        "avez promené le chien du maire"
      ];

      // Choix du boulot et d'un salaire aléatoire (entre 100 et 500)
      const randomJob = jobs[Math.floor(Math.random() * jobs.length)];
      const reward = Math.floor(Math.random() * 401) + 100;

      const userData = await usersData.get(targetID) || {};
      const currentMoney = userData.money || 0;

      const newBalance = currentMoney + reward;

      await usersData.set(targetID, {
        ...userData,
        money: newBalance
      });

      const formattedReward = reward.toLocaleString('fr-FR');
      const formattedBalance = newBalance.toLocaleString('fr-FR');

      return message.reply(`💼 | Vous ${randomJob} et gagnez ${formattedReward} $.\n\n💳 | Nouveau solde : ${formattedBalance} $`);
      
    } catch (error) {
      console.error("ERREUR COMMANDE WORK :", error);
      return message.reply("❌ | Une erreur est survenue pendant votre travail.");
    }
  }
};
```
