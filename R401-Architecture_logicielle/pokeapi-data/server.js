'use strict'

import dotenv from 'dotenv'

dotenv.config()

// ENV variables
const serverPort = process.env.PORT || 8080
const env = process.env.ENV || 'PROD'
console.log(`env : ${env}`)

const {default: app}  = await import ('./app.js')

const server = app.listen(serverPort, () =>
    console.log(`--- Pokeapi-data listening on port ${serverPort} ! ---`)
)

//Pour les interrucptions utilisateur
for (let signal of ["SIGTERM", "SIGINT"]) {
    process.on(signal,  () => {
        console.info(`${signal} signal received.`)
        console.log("Closing http server.");
        server.close(async (err) => {
            console.log("Http server closed.")
            // TODO : Add MongoDB close
            process.exit(err ? 1 : 0)
        });
    });
}

export default server
