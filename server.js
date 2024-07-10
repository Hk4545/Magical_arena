const express = require('express');
const Player = require('./player');

const app = express();
const PORT = 4005;
app.use(express.json());

let playerA = null;
let playerB = null;

app.post('/initialize', (req, res) => {
    const { playerAData, playerBData } = req.body;

    if (!playerAData || !playerBData) {
        res.status(400).json({ error: "Player parameters are required." });
        return;
    }

    playerA = new Player(playerAData.name, playerAData.health, playerAData.strength, playerAData.attack);
    playerB = new Player(playerBData.name, playerBData.health, playerBData.strength, playerBData.attack);

    res.json({
        message: "Players initialized successfully.",
        players: {
            playerA: playerA,
            playerB: playerB
        }
    });
});

app.post('/attack', (req, res) => {
    if (!playerA || !playerB) {
        res.status(400).json({ error: "Players have not been initialized." });
        return;
    }
    if(playerA.health === 0 || playerB.health === 0){
        res.json({
            message:"Already the game is completed"
        })
        return;
    }
    let attacker = null;
    let defender = null;
    if(playerA.health > playerB.health){
        attacker = playerB;
        defender = playerA;
    } else {
        attacker = playerA;
        defender = playerB;
    }
    // Attacking the player B
    let attackRollA = Math.floor(Math.random() * 6) + 1;
    let defenseRollB = Math.floor(Math.random() * 6) + 1;

    let attackDamageA = attacker.attackDamage(attackRollA);
    let defendedDamageB = defender.defendedDamage(defenseRollB);

    let damageToB = Math.max(0, attackDamageA - defendedDamageB);
    defender.receiveDamage(damageToB);
    if (defender.health <= 0) {
        res.json({
            message: `${attacker.name} wins!`,
            players: {
                playerA: attacker,
                playerB: defender
            }
        });
        return;
    }
    [attacker, defender] = [defender, attacker]
    // Attacking the player A
    let attackRollB = Math.floor(Math.random() * 6) + 1;
    let defenseRollA = Math.floor(Math.random() * 6) + 1;

    let attackDamageB = attacker.attackDamage(attackRollB);
    let defendedDamageA = defender.defendedDamage(defenseRollA);

    let damageToA = Math.max(0, attackDamageB - defendedDamageA);
    defender.receiveDamage(damageToA);
    if (defender.health <= 0) {
        res.json({
            message: `${attacker.name} wins!`,
            players: {
                playerA: attacker,
                playerB: defender
            }
        });
        return;
    }
    res.json({
        message: "Round completed.",
        players: {
            playerA: {...attacker, healthReduced:damageToB},
            playerB: {...defender, healthReduced: damageToA}
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});