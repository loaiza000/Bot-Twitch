import { config } from "dotenv";
import tmi from "tmi.js";
import schedule from "node-schedule";

// ** variables .env
config({ path: "./src/.env" });


console.log("🔹 TWITCH_USERNAME:", process.env.TWITCH_USERNAME);
console.log("🔹 TWITCH_OAUTH:", process.env.TWITCH_OAUTH ? "Token Cargado" : "Error: No se cargó el token");
console.log("🔹 TWITCH_CHANNEL:", process.env.TWITCH_CHANNEL);
console.log("🔹 WALLET_ADDRESS:", process.env.WALLET_ADDRESS);

// ** Configuración del bot de Twitch **
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

client.connect()
  .then(() => console.log(`Bot conectado a ${process.env.TWITCH_CHANNEL}`))
  .catch(err => console.error("Error al conectar el bot:", err));

client.on("message", (channel, tags, message, self) => {
  if (self) return;

  const triggerMessage =
    "0xultMuevalo Recogiendo direcciones de formato de ethereum pal airdrop en avalanche! escribe la tuya rrrrapidamente 0xultMuevalo";

  if (
    tags.username.toLowerCase() === "0xultravioleta" &&
    message === triggerMessage &&
    !alreadyReplied
  ) {
    client.say(channel, `${process.env.WALLET_ADDRESS}`);
    alreadyReplied = true;
    console.log(`Respondí con la billetera: ${process.env.WALLET_ADDRESS}`);
  }
});

schedule.scheduleJob({ hour: 10, minute: 0, tz: "America/Bogota" }, () => {
  alreadyReplied = false;
  console.log("El bot ha sido activado (10 AM - 6 PM)");
});

schedule.scheduleJob({ hour: 18, minute: 0, tz: "America/Bogota" }, () => {
  client.disconnect();
  console.log("El bot ha sido desactivado (fuera del horario)");
});

