import { _ } from 'svelte-i18n';
import { writable } from 'svelte/store';
import ExercisesList from '../components/pages/Exercises/List.svelte';
import TrainignsGrid from '../components/pages/Trainings/Grid.svelte';
import TrainignsAdd from '../components/pages/Trainings/Add.svelte';
import TrainingHistory from '../components/pages/Trainings/History.svelte';
import ExercisesAddNew from '../components/pages/Exercises/Add.svelte';
import ExercisesHistory from '../components/pages/Exercises/History/Grid.svelte';
import ExerciseHistoryAddNew from '../components/pages/Exercises/History/Add.svelte';
import ExerciseHistoryChange from '../components/pages/Exercises/History/Change.svelte';
import ExerciseHistoryProgress from '../components/pages/Exercises/History/Progress.svelte';
import iconTest from '/images/icons/navbarIcons/dumbbell.png'
import oneExerciseHistory from "../testData/oneExerciseHistory.json"

const routes = {
    trainingsGrid:{
        name: "111",//_ => _('trainingsName'),
        component: TrainignsGrid,
        images: {
            icon: iconTest,
        }
    },
    trainingsAdd:{
        name: "111",//_ => _('trainingsName'),
        component: TrainignsAdd,
        images: {
            icon: iconTest,
        }
    },
    exercises:{
        name: "222",
        component: ExercisesList,
        images: {
            icon: iconTest,
        }
    },
    trainingHistory:{
        name: "444",
        component: TrainingHistory,
        images: {
            icon: iconTest,
        }
    },
    exercisesAddNew:{
        name: "444",
        component: ExercisesAddNew,
        images: {
            icon: iconTest,
        }
    },
    exerciseHistory:{
        name: "444",
        component: ExercisesHistory,
        images: {
            icon: iconTest,
        }
    },
    exerciseHistoryAddNew:{
        name: "444",
        component: ExerciseHistoryAddNew,
        images: {
            icon: iconTest,
        }
    },
    exerciseHistoryChange:{
        name: "444",
        component: ExerciseHistoryChange,
        images: {
            icon: iconTest,
        }
    },
    exerciseHistoryProgress:{
        name: "444",
        component: ExerciseHistoryProgress,
        images: {
            icon: iconTest,
        }
    }
}

export default routes;

export let currentRoute = writable(routes.trainingsGrid);
export let currentRouteData = writable(null);

export let previosRoutes = writable([]);


export function changeRoute(route, routeData, changeHistory = true) {
    if (changeHistory){
        setPreviosRoute();
    }

    console.log(route);

    currentRoute.set(route);

    if (routeData) {
        currentRouteData.set(routeData);
    } else {
        currentRouteData.set(null);
    }
}

export function goBack(){
    let prev = getPreviousRoutes();
    let lastRoute = prev[prev.length - 1];

    if (lastRoute){
        changeRoute(lastRoute.route, lastRoute.data, false);

        prev.pop();
        console.log(prev);
        previosRoutes.set(prev);
    } else {
        changeRoute(routes.trainingsGrid, null, false);
    }


}

function setPreviosRoute(){
    let cur = getCurrentRoute();
    let curData = getCurrentRouteData();
    let prev = getPreviousRoutes();

    let newPrev = {
        route: cur,
        data: curData
    }

    prev.push(newPrev);
    console.log(prev);
    previosRoutes.set(prev);
}

function getPreviousRoutes(){
    let prev = [];

    previosRoutes.subscribe(val => {
        prev = val;
    });

    return prev;
}

function getCurrentRoute(){
    let cur = {};

    currentRoute.subscribe(val => {
        cur = val;
    });

    return cur;
}

function getCurrentRouteData(){
    let curData = null;

    currentRouteData.subscribe(val => {
        curData = val;
    });

    return curData;
}