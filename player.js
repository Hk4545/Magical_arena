class Player {
    constructor(name, health, strength, attack) {
        this.name = name;
        this.health = health;
        this.strength = strength;
        this.attack = attack;
    }
    attackDamage(diceRoll) {
        return diceRoll * this.attack;
    }

    defendedDamage(diceRoll) {
        return diceRoll * this.strength;
    }

    receiveDamage(damage) {
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
        }
    }
}

module.exports = Player;
