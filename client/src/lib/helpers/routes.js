import { _ } from 'svelte-i18n';
import { writable } from 'svelte/store';
import ExercisesList from '../components/pages/Exercises/List.svelte';
import TrainignsGrid from '../components/pages/Trainings/Grid.svelte';
import TrainignsAdd from '../components/pages/Trainings/Add.svelte';
import TrainingHistory from '../components/pages/Trainings/History.svelte';
import ExercisesAddNew from '../components/pages/Exercises/Add.svelte';

const routes = {
    trainingsGrid:{
        name: "111",//_ => _('trainingsName'),
        component: TrainignsGrid,
        images: {
            icon: "src/assets/images/icons/navbarIcons/dumbbell.png",
        }
    },
    trainingsAdd:{
        name: "111",//_ => _('trainingsName'),
        component: TrainignsAdd,
        images: {
            icon: "src/assets/images/icons/navbarIcons/dumbbell.png",
        }
    },
    exercises:{
        name: "222",
        component: ExercisesList,
        images: {
            icon: "src/assets/images/icons/navbarIcons/dumbbell.png",
        }
    },
    trainingHistory:{
        name: "444",
        component: TrainingHistory,
        images: {
            icon: "src/assets/images/icons/navbarIcons/dumbbell.png",
        }
    },
    exercisesAddNew:{
        name: "444",
        component: ExercisesAddNew,
        images: {
            icon: "src/assets/images/icons/navbarIcons/dumbbell.png",
        }
    }
}

export default routes;

export let currentRoute = writable(routes.exercises);
export let currentRouteData = writable([111,222]);

export let previosRoutes = writable([]);


export function changeRoute(route, routeData, changeHistory = true) {
    if (changeHistory){
        setPreviosRoute();
    }

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