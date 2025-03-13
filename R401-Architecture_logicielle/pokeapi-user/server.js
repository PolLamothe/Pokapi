'use strict'

import CONFIG from './const.js'

console.log(`ENV : ${CONFIG.ENV}`)

const {default: app}  = await import ('./app.js')

const server = app.listen(CONFIG.PORT, () =>
    console.log(`--- Pokeapi-user listening on port ${CONFIG.PORT} ! ---`)
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