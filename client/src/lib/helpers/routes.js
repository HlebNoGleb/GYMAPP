import { tick } from 'svelte';
import { _ } from 'svelte-i18n';
import { writable } from 'svelte/store';
import Exercises from '../components/pages/exercises.svelte';
import ExercisesTest from '../components/pages/exercisesTest.svelte';
import TrainignsGrid from '../components/pages/trainignsGrid.svelte';
import TrainingHistory from '../components/pages/trainingHistory.svelte';

let routes = {
    trainingsGrid:{
        name: _ => _('trainingsName'),
        component: TrainignsGrid,
        images: {
            icon: "src/assets/images/icons/navbarIcons/dumbbell.png",
        }
    },
    exercises:{
        name: _ => _('exercisesName'),
        component: Exercises,
        images: {
            icon: "src/assets/images/icons/navbarIcons/dumbbell.png",
        }
    },
    exercisesTest:{
        name: _ => _('exercisesName111'),
        component: ExercisesTest,
        images: {
            icon: "src/assets/images/icons/navbarIcons/dumbbell.png",
        }
    },
    trainingHistory:{
        name: _ => _('trainingsHistory'),
        component: TrainingHistory,
        images: {
            icon: "src/assets/images/icons/navbarIcons/dumbbell.png",
        }
    }
}


export let currentRoute = writable(routes.trainingsGrid);
export let currentRouteData = writable(null);

export let previosRoute = writable(routes.trainingsGrid);

export async function changeRoute(route, routeData) {
    setPreviosRoute();
    if (routeData) {
        currentRouteData.set(routeData);
    }
    currentRoute.set(route);
    console.log(route.name)
}

function setPreviosRoute(){
    let prev = null;
    currentRoute.subscribe(val => {
        prev = val
    })
    previosRoute.set(prev);
}

export default routes;