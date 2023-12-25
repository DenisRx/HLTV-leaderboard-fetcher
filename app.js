const express = require('express')
const { HLTV } = require('hltv')

const app = express();
const port = 3000;

app.get('/leaderboard', async (req, res) => {
    const teamRanking = await HLTV.getTeamRanking();
    res.send(teamRanking);
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
