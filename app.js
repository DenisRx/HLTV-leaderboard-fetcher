const express = require('express')
const { HLTV } = require('hltv')
const cron = require('node-cron')
const fs = require('fs');

const app = express();
const port = 3000;

async function fetchHLTVRanking() {
    const now = new Date()
    let y = addZero(now.getFullYear())
    let mo = addZero(now.getMonth())
    let d = addZero(now.getDate())
    let h = addZero(now.getHours())
    let m = addZero(now.getMinutes())
    let s = addZero(now.getSeconds())
    console.log(`[${h}:${m}:${s}] Fetching leaderboard from hltv.org`)
    const teamRanking = await HLTV.getTeamRanking();

    const filename = `${y}${mo}${d}-${h}${m}${s}.txt`;
    fs.writeFile(`rankingsLogs/${filename}`, JSON.stringify(teamRanking), (err) => {
        if (err) {
            console.log(err)
            throw err
        }
        console.log(`Data has been written to file ${filename} successfully.`);
    });
}

function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
}

const job = cron.schedule('*/30 * * * *', fetchHLTVRanking)

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
