const { star } = require("cli-spinners");
const inquirer = require("inquirer");
const Pokemon = require("../lib/Pokemon");
const Trainer = require("../lib/trainer");
let allTrainers = [new Trainer('Ash'), new Trainer('Brock')];
let allPokemon = [];

const startGame = () => {
    console.log(allTrainers)
    inquirer
      .prompt([
          {
              type: 'list',
              message: 'What would you like to do?',
              name: 'gameChoice',
              choices: ['Add Trainer', 'Add Pokemon', 'get Random Pokemon', 'Trainer Battle', 'Heal', 'Quit']
          }
      ]).then((response)=> {
        switch (response.gameChoice) {
            case 'Add Trainer':
                addTrainer();
                break;
            case 'Add Pokemon':
                addPokemon();
                break;
            case 'get Random Pokemon':
                randPokemon();
                break;
            case 'Trainer Battle':
                battle();
                break;
            case 'Heal':
                heal();
                break;
            default:
                console.log('Thanks for Playing')
                break;
        }
      }
      )}

const addTrainer = () => {
    inquirer
    .prompt ([
        {
            type: 'input',
            message: 'What is the Trainers name?',
            name: 'name',
        }
    ]).then((response) => {
        const newbie = new Trainer (`${response.name}`);
        console.log(`Good Luck ${response.name}`);
        allTrainers.push(newbie)
        startGame()
    })
    
}

const addPokemon = () => {
    inquirer
    .prompt ([
        {
            type: 'list',
            message: `What Trainer is getting a new Pokemon?`,
            name: 'trainer',
            choices: allTrainers
        },
        {
            type: 'input',
            message: `What is the Pokemon's name?`,
            name: 'name',
        },
        {
            type: 'input',
            message: `What is the Pokemon's Attack Value?`,
            name: 'atk',
        },
        {
            type: 'input',
            message: `What is the Pokemon's HitPoints Value?`,
            name: 'hp',
        }
    ]).then((response) => {
        const freshPokemon = new Pokemon (response.name, response.hp, response.atk)
        allPokemon.push(freshPokemon)
        const index = allTrainers.map((e) => e.name).indexOf(response.trainer)
        allTrainers[index].addPokemon(response.name, response.hp, response.atk)
        console.log(`${response.trainer} caught a ${response.name}!`)
        console.log(allPokemon)
        startGame()
    })
     
}
// console.log(allTrainers)
const randPokemon = () => {
    const randPoke = allPokemon[Math.floor(Math.random*allPokemon.length)]
    console.log(`Name: ${randPoke.name}\nHitPoints: ${randPoke.hp}\nAttack: ${randPoke.atk}`)

};

const battle = () => {
    let trainer1 
    let trainer2
    let remainingTrainers = allTrainers
    inquirer
    .prompt ([
        {
            type: 'list',
            message: `Who is the first Trainer to Battle?`,
            name: 'trainerOne',
            choices: allTrainers
        }
    ]).then((response) => {
        trainer1 = response.trainerOne
        const index = allTrainers.map((e) => e.name).indexOf(response.trainerOne)
        remainingTrainers = remainingTrainers.splice(index, 1)
    })
    .prompt ([
        {
            type: 'list',
            message: `Who is the second Trainer?`,
            name: 'trainerTwo',
            choices: remainingTrainers
        }
    ]).then((response) => {
        trainer2 = response.trainerTwo;
        startGame()
    })
    
}

const heal = () => {
    inquirer
    .prompt ([
        {
            type: 'list',
            message: 'Which Trainer will heal their Pokemon?',
            name: 'trainerHeal',
            choices: allTrainers
        }
    ]).then((response) => {
        const index = allTrainers.map((e) => e.name).indexOf(response.trainerHeal)
        allTrainers[index].pokemon.forEach(element => {
            element.healUp()
            console.log(`${element.name} is now healed`)
            // startGame()
        });
    })
    
}

startGame()