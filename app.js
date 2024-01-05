const express = require('express')
const { HLTV } = require('hltv')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.json('Welcome to HLTV-leaderboard-fetcher API.')
})

app.get('/leaderboard', async (req, res) => {
    try {
        const teamRanking = await HLTV.getTeamRanking()
        res.status(200).json(teamRanking)
    } catch (e) {
        console.error(e)
        res.status(500).json()
    }
})

app.listen(process.env.PORT || port, () => {
    console.log(`App listening on port ${process.env.PORT || port}`)
});
