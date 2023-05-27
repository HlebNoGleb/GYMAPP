import config from "../../configs/config";
import weightsJson from "../../../testData/weight.json"
import random from "../../random";

interface Weight {
    date: number,
    weight: number,
    measure: number
}

const keys = {
    weights: "weights"
}

const weights = {
    get, add
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
    return addNewWeightToLocalStorage(newWeight);
}

async function getWeightsFromLocalStorage() {
    try{
        await new Promise(res => setTimeout(res, 2000));

        const objects = localStorage.getItem(keys.weights);
        return objects ? JSON.parse(objects) : [];
    } catch (error) {
        console.log('pososi');
        return [];
    }
}
    
function addNewWeightToLocalStorage(newWeight){
    try {
        newWeight.date = new Date().getTime();
        const weights = localStorage.getItem(keys.weights);
        const weightsArray = weights ? JSON.parse(weights) : [];
        weightsArray.push(newWeight);
        localStorage.setItem(keys.weights, JSON.stringify(weightsArray));
    } catch (error){
        console.error(`Failed to add object to localStorage: ${error}`);
    }
}