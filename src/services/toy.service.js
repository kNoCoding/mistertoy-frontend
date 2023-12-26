
import Axios from 'axios'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { storageService } from './async-storage.service.js'


// for cookies
const axios = Axios.create({
    withCredentials: true
})

const BASE_URL = 'toy/'


const TOY_KEY = 'toyDB'
// _createToys()


export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    // return httpService.get(BASE_URL, filterBy)
    return storageService.query(TOY_KEY)
}

function getById(toyId) {
    // return httpService.get(BASE_URL + toyId)
    return storageService.get(TOY_KEY, toyId)
}

function remove(toyId) {
    // return httpService.delete(BASE_URL + toyId)
    return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        // return httpService.put(BASE_URL, toy)
        return storageService.put(TOY_KEY, toy)
    } else {
        // return httpService.post(BASE_URL, toy)
        return storageService.post(TOY_KEY, toy)
    }
}

const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered'
]

const toyNames = [
    'WhizBang Racer',
    'Twinkle Star Doll',
    'Mystic Puzzle Cube',
    'Jungle Jim Monkey',
    'Rocket Blaster Kit',
    'Magic Paint Sea Horse',
    'Echo Echo Microphone',
    'BlastOff Space Shuttle',
    'Dino Dig Kit',
    'Flutter Fairy Princess',
    'GiggleBot Clown',
]

// function getEmptyToy(name = '', price = '', labels, inStock = 'true') {
//     return { name, price, labels, inStock }
// }


function getEmptyToy(name = '', price = '', chosenLabels = [], inStock = true) {
    // If no name is provided, pick a random one from the toyNames array
    if (!name) name = toyNames[Math.floor(Math.random() * toyNames.length)];
    // If no price is provided, generate a random one between 10 to 100
    if (!price) price = utilService.getRandomIntInclusive(10, 100);
    // If no labels are provided, pick 2-3 random labels
    if (!chosenLabels.length) {
        const shuffled = labels.sort(() => 0.5 - Math.random());
        chosenLabels = shuffled.slice(0, utilService.getRandomIntInclusive(2, 3));
    }
    return { name, price, labels: chosenLabels, inStock };
}

// function getEmptyToy(name = '', price = '', chosenLabels = [], inStock = true) {
//     // If no name is provided, pick a random one from the toyNames array
//     if (!name) name = toyNames[Math.floor(Math.random() * toyNames.length)];
//     // If no price is provided, generate a random one between 10 to 100
//     if (!price) price = utilService.getRandomIntInclusive(10, 100);
//     // If no labels are provided, pick 2-3 random labels
//     if (!chosenLabels.length) {
//         const shuffled = labels.sort(() => 0.5 - Math.random());
//         chosenLabels = shuffled.slice(0, utilService.getRandomIntInclusive(2, 3));
//     }
//     // Join the labels array into a string, separated by commas and spaces
//     const labelString = chosenLabels.join(', ');
//     return { name, price, labels: labelString, inStock };
// }

function getDefaultFilter() {
    return { name: '', price: '' }
}

function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = []
        toys.push(_createToy('Talking Doll', 444, 'On Wheels, Doll', true))
        utilService.saveToStorage(TOY_KEY, toys)
    }
}

function _createToy(name, price = utilService.getRandomIntInclusive(1000, 9000), labels, inStock) {
    const toy = getEmptyToy(name, price, labels, inStock)
    toy._id = utilService.makeId()
    toy.createdAt = Date.now()
    return toy
}

// price: utilService.getRandomIntInclusive(1000, 9000),
