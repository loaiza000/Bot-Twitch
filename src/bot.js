import { config } from "dotenv";
import tmi from "tmi.js";
import schedule from "node-schedule";

config({ path: "./src/.env" });

console.log("🔹 TWITCH_USERNAME:", process.env.TWITCH_USERNAME);
console.log(
  "🔹 TWITCH_OAUTH:",
  process.env.TWITCH_OAUTH ? "Token Cargado" : "Error: No se cargó el token"
);
console.log("🔹 TWITCH_CHANNEL:", process.env.TWITCH_CHANNEL);
console.log("🔹 WALLET_ADDRESS:", process.env.WALLET_ADDRESS);

const client = new tmi.Client({
  identity: {
    username: process.env.TWITCH_USERNAME,
    password: process.env.TWITCH_OAUTH,
  },
  channels: [process.env.TWITCH_CHANNEL],
  connection: {
    reconnect: true,
    secure: true,
  },
});

let alreadyReplied = false;

client
  .connect()
  .then(() => console.log(`Bot conectado a ${process.env.TWITCH_CHANNEL}`))
  .catch((err) => console.error("Error al conectar el bot:", err));

client.on("message", (channel, tags, message, self) => {
  if (self) return;

  const triggerMessage =
    "0xultMuevalo Recogiendo direcciones de formato de ethereum pal airdrop en avalanche! escribe la tuya rrrrapidamente 0xultMuevalo";

  console.log(`Usuario: ${tags.username}`);
  console.log(`Mensaje recibido: "${message}"`);
  console.log(`alreadyReplied: ${alreadyReplied}`);

  if (
    tags.username === "0xultravioleta" &&
    message.trim() === triggerMessage.trim() &&
    !alreadyReplied
  ) {
    setTimeout(() => {
      client.say(channel, process.env.WALLET_ADDRESS);
      console.log(`Respondí con la billetera: ${process.env.WALLET_ADDRESS}`);
      alreadyReplied = true;
    }, 1000);
  }

  if (message === "!test" && tags.username.toLowerCase() === "0xultravioleta") {
    client.say(channel, "¡Funciono!");
    console.log("Prueba exitosa");
  }
});

schedule.scheduleJob({ hour: 10, minute: 0, tz: "America/Bogota" }, () => {
  alreadyReplied = false;
  client
    .connect()
    .then(() =>
      console.log(`Bot reconectado a ${process.env.TWITCH_CHANNEL} a las 10 AM`)
    )
    .catch((err) => console.error("Error al reconectar:", err));
  console.log("El bot ha sido activado (10 AM - 6 PM)");
});

schedule.scheduleJob({ hour: 18, minute: 0, tz: "America/Bogota" }, () => {
  client
    .disconnect()
    .then(() => console.log("Bot desconectado a las 6 PM"))
    .catch((err) => console.error("Error al desconectar:", err));
  console.log("El bot ha sido desactivado (fuera del horario)");
});
