const Pokemon = require("./Pokemon");

class Trainer {
    constructor(name, pokemon) {
        this. name = name;
        if (pokemon) {
            this.pokemon = pokemon;
        } else {
            this.pokemon = []
        }
    }
    addPokemon (name,hp,atk) {
        const newPokemon = new Pokemon(name,hp,atk)
        this.pokemon.push(newPokemon)
    }
    getRandomPokemon () {
        return this.pokemon[Math.floor(Math.random()*this.pokemon.length)]
    }
}

module.exports = Trainer