'use strict'

import CONFIG from "./const.js";
import {mongoose} from 'mongoose';

console.log(`env : ${CONFIG.ENV}`)

const {default: app}  = await import ('./app.js')

// Connexion à la BD
if (CONFIG.ENV === 'TEST') {
    //en test le travail est en mémoire
    const {MongoMemoryServer}  = await import('mongodb-memory-server')
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri)
    console.log("MONGODB : Mongo on memory "+uri)
} else {
    await mongoose.connect(CONFIG.MONGO_URL + '/' + CONFIG.MONGO_DB)
    console.log("MONGODB : Mongo on "+ CONFIG.MONGO_URL + '/' + CONFIG.MONGO_DB)
}

const server = app.listen(CONFIG.PORT, () =>
    console.log(`--- Pokapi-data listening on port ${CONFIG.PORT} ! ---`)
)

//Pour les interrucptions utilisateur
for (let signal of ["SIGTERM", "SIGINT"]) {
    process.on(signal,  () => {
        console.info(`${signal} signal received.`)
        console.log("Closing http server.");
        server.close(async (err) => {
            console.log("Http server closed.")
            await mongoose.connection.close()
            console.log("MongoDB connection closed.")
            process.exit(err ? 1 : 0)
        });
    });
}

export default server
