import express from 'express'
import things from './things.json' with {type: "json"}
import games from './games.json' with {type: "json"}
import {getNbaData} from './nbaData.js' 



const app = express();
const port = 3000;



app.get("/", (req, res) => {
    res.send("Hello");
});


app.get("/games/maps" , (req, res ) => {

res.send(games)

}) 
app.get("/things", (req, res) => {
    res.send(things);
    console.log(things);
});

app.get("/games", (req, res) => {
    res.send(games);
});

app.get("/nbaData", async (req,res) => {
res.json(await getNbaData())
})
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
