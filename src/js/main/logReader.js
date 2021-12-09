const EventEmmiter = require('events')
const fs = require('fs')

class LogReader extends EventEmmiter {
    constructor (path) {
        super()

        this.path = path

        this.read()
    }

    read = () => {
        let lastLog = []
        let logs = []
        let changedLogs = []

        fs.watchFile(this.path, {persistent: true, interval: 4}, (curr, prev) => {
            const logFile = fs.readFileSync(this.path, {encoding: "utf8"})

            logs = logFile.split("\n")

            if (lastLog.length > 0) {
                for (let i = 0; i < logs.length; i++) {
                    if (logs[i] != lastLog[i]) {
                        changedLogs.push(logs[i])
                    }
                }
            }

            lastLog = logs

            for (const latestLog of changedLogs) {
                if (/\[[^]*\] \[Client thread\/INFO\]: \[CHAT\] [^]*/.test(latestLog)) {
                    const message = latestLog.split("[CHAT] ")[1].trim()
                    // console.log(message)

                    if (/Sending you to (.*)!/.test(message)) {
                        this.emit("server_change")
                    }

                    if (/(.*) has joined \(\d*\/\d*\)!/.test(message)) {
                        const name = message.split(" ")[0]
                        this.emit("join", name)
                    }

                    if (/(.*) has quit!/.test(message)) {
                        const name = message.split(" ")[0]
                        this.emit("leave", name)
                    }

                    if (/(.*) was killed by (.*)/.test(message)) {
                        const name = message.split(" ")[0]
                        this.emit("death", name)
                    }

                    if (/(.*) was killed!/.test(message)) {
                        const name = message.split(" ")[0]
                        this.emit("death", name)
                    }

                    if (/(.*) was killed by (.*)/.test(message)) {
                        const name = message.split(" ")[4].replace(/!/, "")
                        this.emit("kill", name)
                    }

                    if (/,\s/g.test(message)) {
                        let players = []
                        players = message.split(", ")

                        if (!message.includes(":") && players.length > 6 || players.length > 6) this.emit("players", players)
                    }
                }
            }

            changedLogs = []
        })
    }
}

module.exports = LogReader