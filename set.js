const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0ZjM1ZXazBBSnFiaUVucW5PeWpidzkvSTlqalJKTjFvVUVKaEpaRmVVOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZHd2SjlXK1ZlMFlRanhyNzRLSE1sSTlqV1JrY09ZbnJjUkJ0cVA2VkRRWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3UEtNOUZ4aVNnQS91WTZCRnp3KzZiZ2g5ZURyU3ByZytqQnBYOFFsNzNJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxRWxOekI2N2Z0NTNaaFk2NTh0TnFxK1hNVkNKd0MxT0g1Ylp3YWs2SGhjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlNNndDWnJzcTFpS1JoaVVHa3dCVGpWY01lYzlIQkx2bmRyUWl4MEZiV0E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxHMDMya2dTcE9XcG1yL1dnRjdSTFdteFc0YjdySnJCU05CN295TmtoM2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY09WbmU0M2F1cUhjYUh0STRSeXo3aXpyMUVtbUJRS3gyMTFnVnd6eGhrOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTXUvRHBrTVR5akFOMUtrS3NuaDIzdzlmWUpZYzBQS0hETFYrNU1ZRHFoaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5XdTloWmJTUGdreVpUdE5peUtRcEs3QkRPekpwaUJ2cEZ5WEM3OWpldjI1eVFxdW5KUVJ5bERxVVQvWGZweGFobDV6bkMybG16T2ZHUE5yZldnWGhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI1LCJhZHZTZWNyZXRLZXkiOiJHalFuQ1crbkpJSTU0SXVNa3B6YmxSNEkvcDVKODExV2JjVjlPODNZTU9jPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJxRkQ5RHVEcVNaT3lRWnhjRkMtTkJnIiwicGhvbmVJZCI6IjRmOWFmNzAyLTEyOTctNGI0NS05N2UzLWZiYzYwNWRjYmIxYiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJuWVpwYlZ3aWpKaXBPSGQ5WHB5S08wMlBQeTA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVFJFVkY5aE5nOXBjZWswUW1Bb0F6TGRWSEtNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlRKOU5aTE1KIiwibWUiOnsiaWQiOiI5NDcyNTA1NDc3NTo2NkBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT0NneTg4R0VMU2hnNzBHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiME94ci80K3JmaHZ6RWtzMGhUY2NJYkhlWFdlRS9abVNMZlNpTm9UVmtHcz0iLCJhY2NvdW50U2lnbmF0dXJlIjoicEtQcUphRnJFdEY2Mlg1ZnpMZ2F3M3liN2V3R3BiT2NtTFQyNXE4ZWg5eGY5ZmNDVExqR3JreXdmTUF5RXI2Tmg0a0VsMGVSdjQvYTVmOHgxb29IQlE9PSIsImRldmljZVNpZ25hdHVyZSI6ImJyM1crSEpac25kZlBlRERKK0tXa3AxN1dmbGY2UUMxNjUzRm5kaEdQRXl0ZkxIMEgxVElqRGZGUDJOdGROWWFhOUxyZ2NVWDM0bFVZSjdqRUZoamp3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3MjUwNTQ3NzU6NjZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZERzYS8rUHEzNGI4eEpMTklVM0hDR3gzbDFuaFAyWmtpMzBvamFFMVpCciJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczODU5MjQ1MCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFOd2YifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "⚔  dexter  ⚔",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "oui",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'DEXTER-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
