class Pokemon {
    constructor (name, hp, atk, level) {
        this.name = name
        this.hp = hp;
        this.atk = atk;
        if (level) {
            this.level = level
        } else {
            this.level = 1
        }
        this.currentHP = hp 
    }
    printStats() {
        console.log(`Name: ${this.name}\nAttack: ${this.atk}\nHitPoints: ${this.currentHP}/${this.hp}`)
      }
    isAlive() {
        if (this.currentHP > 0) {
            console.log(`${this.name} is Still Fighting`)
        } else {
            console.log(`${this.name} has fainted`)
        }
    }
    attack(opponent) {
        opponent.currentHP -= this.atk
    }
    healUp() {
        this.currentHP = this.hp
    }
}

module.exports = Pokemon