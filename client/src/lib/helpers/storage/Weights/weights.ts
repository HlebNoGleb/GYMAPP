import config from "../../configs/config";
import weightsJson from "../../../testData/weight.json"
import random from "../../random";

interface Weight {
    id: string,
    date: number,
    weight: number,
    measure: number
}

const keys = {
    weights: "weights"
}

const weights = {
    get, add, change, remove
}

export default weights

function get(){
    if (config.useServer){
        // Add server implementation
    } else {
        return getWeightsFromLocalStorage();
    }
}

function add(newWeight: Weight){
    // Add server implementation
    return addNewWeightToLocalStorage(newWeight);
}

function change(newWeight: Weight){
    // Add server implementation
    return changeWeightInLocalStorage(newWeight);
}

function remove(newWeight: Weight){
    // Add server implementation
    return removeWeightFromLocalStorage(newWeight);
}

async function getWeightsFromLocalStorage() {
    try{
        await new Promise(res => setTimeout(res, 200));
        const objects = localStorage.getItem(keys.weights);
        return objects ? JSON.parse(objects) : [];
    } catch (error) {
        console.log('Error occured');
        return [];
    }
}

function addNewWeightToLocalStorage(newWeight){
    try {
        newWeight.id = random.generageUniqueId();
        const weights = localStorage.getItem(keys.weights);
        const weightsArray = weights ? JSON.parse(weights) : [];
        weightsArray.push(newWeight);
        localStorage.setItem(keys.weights, JSON.stringify(weightsArray));
    } catch (error){
        console.error(`Failed to add object to localStorage: ${error}`);
    }
}

function changeWeightInLocalStorage(newWeight){
    //debugger;
    const id = newWeight.id;
    const weights = localStorage.getItem(keys.weights);
    const weightsArray = weights ? JSON.parse(weights) : [];
    const changeIndex = weightsArray.findIndex(x => x.id === id);
    weightsArray[changeIndex] = newWeight;
    localStorage.setItem(keys.weights, JSON.stringify(weightsArray));
}

function removeWeightFromLocalStorage(newWeight){
    //debugger;
    const id = newWeight.id;
    const weights = localStorage.getItem(keys.weights);
    const weightsArray = weights ? JSON.parse(weights) : [];
    const removeIndex = weightsArray.findIndex(x => x.id === id);
    weightsArray.splice(removeIndex, 1)
    localStorage.setItem(keys.weights, JSON.stringify(weightsArray));
}