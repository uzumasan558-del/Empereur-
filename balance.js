
```javascript
const { createCanvas } = require("canvas");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "balance",
    aliases: ["bal", "solde", "money", "compte"],
    version: "1.0",
    author: "Admin",
    countDown: 5,
    role: 0,
    shortDescription: "Affiche votre solde avec une carte stylisée",
    longDescription: "Génère une image premium affichant votre solde actuel et votre nom.",
    category: "economy",
    guide: "{pn}"
  },

  onStart: async function ({ message, event, usersData }) {
    try {
      const targetID = event.senderID;

      let userData = await usersData.get(targetID);
      
      if (!userData) {
        userData = { money: 0, name: "Utilisateur" };
        await usersData.set(targetID, userData);
      }

      const currentMoney = userData.money || 0;
      const userName = userData.name || "Utilisateur";
      const formattedBalance = currentMoney.toLocaleString('fr-FR');
      const dateStr = new Date().toLocaleDateString('fr-FR');

      const width = 800;
      const height = 400;
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext("2d");

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#0f2027");
      gradient.addColorStop(0.5, "#203a43");
      gradient.addColorStop(1, "#2c5364");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
      }
      for (let i = 0; i < height; i += 40) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(width, i); ctx.stroke();
      }

      ctx.shadowColor = "#00ffff";
      ctx.shadowBlur = 15;
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 30px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`💰 SOLDE DE ${userName.toUpperCase()}`, width / 2, 90);

      ctx.shadowColor = "#ffcc00";
      ctx.shadowBlur = 30;
      ctx.fillStyle = "#ffd700";
      ctx.font = "bold 80px sans-serif";
      ctx.fillText(`${formattedBalance} 🪙`, width / 2, 220);

      ctx.shadowBlur = 0;

      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.font = "20px sans-serif";
      ctx.fillText("Devise : Coins", width / 2, 290);
      
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.font = "italic 16px sans-serif";
      ctx.fillText(`Consulté le : ${dateStr}`, width / 2, 360);

      ctx.strokeStyle = "rgba(0, 255, 255, 0.5)";
      ctx.lineWidth = 4;
      ctx.strokeRect(10, 10, width - 20, height - 20);

      const cachePath = path.join(__dirname, `balance_${targetID}.png`);
      const buffer = canvas.toBuffer("image/png");
      fs.writeFileSync(cachePath, buffer);

      await message.reply({
        body: `⚡ Voici les informations de ton compte, ${userName} !\n💳 Solde : ${formattedBalance} Coins`,
        attachment: fs.createReadStream(cachePath)
      });

      if (fs.existsSync(cachePath)) {
        fs.unlinkSync(cachePath);
      }

    } catch (error) {
      console.error("ERREUR COMMANDE BALANCE :", error);
      return message.reply("❌ | Une erreur est survenue lors de la génération de votre carte de solde.");
    }
  }
};
```
