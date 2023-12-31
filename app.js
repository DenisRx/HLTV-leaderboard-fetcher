const express = require('express')
const { HLTV } = require('hltv')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Welcome to HLTV-leaderboard-fetcher API.')
})

app.get('/leaderboard', async (req, res) => {
    try {
        const teamRanking = await HLTV.getTeamRanking()
        res.send(teamRanking)
    } catch (e) {
        console.error(e)
    }
})

app.listen(process.env.PORT || port, () => {
    console.log(`App listening on port ${process.env.PORT || port}`)
});
