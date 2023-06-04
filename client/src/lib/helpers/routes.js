import { _ } from 'svelte-i18n';
import { writable } from 'svelte/store';
import AuthorizationSignUp from '../components/auth/signUp.svelte';
import AuthorizationSignIn from '../components/auth/signIn.svelte';
import ExercisesList from '../components/pages/Exercises/List.svelte';
import TrainignsGrid from '../components/pages/Trainings/Grid.svelte';
import TrainignsAdd from '../components/pages/Trainings/Add.svelte';
import TrainingHistory from '../components/pages/Trainings/History.svelte';
import TrainingChange from '../components/pages/Trainings/Change.svelte';
import ExercisesAddNew from '../components/pages/Exercises/Add.svelte';
import ExercisesChange from '../components/pages/Exercises/Change.svelte';
import ExercisesHistory from '../components/pages/Exercises/History/Grid.svelte';
import ExerciseHistoryAddNew from '../components/pages/Exercises/History/Add.svelte';
import ExerciseHistoryChange from '../components/pages/Exercises/History/Change.svelte';
import ExerciseHistoryProgress from '../components/pages/Exercises/History/Progress.svelte';
import WeightList from '../components/pages/Weight/List.svelte';
import WeightAdd from '../components/pages/Weight/Add.svelte';
import WeightChange from '../components/pages/Weight/Change.svelte';
import SocialMain from '../components/pages/Social/Main.svelte';
import trainingsIcon from '/images/icons/navbarIcons/dumbbell.png';
import exercisesIcon from '/images/icons/navbarIcons/kettlebell.png';
import weightIcon from '/images/icons/navbarIcons/weight-scale.png';
import socialIcon from '/images/icons/navbarIcons/network.png';

const routes = {
    trainingsGrid:{
        name: "111",//_ => _('trainingsName'),
        component: TrainignsGrid,
        images: {
            icon: trainingsIcon,
        }
    },
    trainingsAdd:{
        name: "111",//_ => _('trainingsName'),
        component: TrainignsAdd,
        images: {
            icon: trainingsIcon,
        }
    },
    exercises:{
        name: "222",
        component: ExercisesList,
        images: {
            icon: exercisesIcon,
        }
    },
    trainingHistory:{
        name: "444",
        component: TrainingHistory,
        images: {
            icon: trainingsIcon,
        }
    },
    trainingChange:{
        name: "444",
        component: TrainingChange,
        images: {
            icon: trainingsIcon,
        }
    },
    exercisesAddNew:{
        name: "444",
        component: ExercisesAddNew,
        images: {
            icon: trainingsIcon,
        }
    },
    exercisesChange:{
        name: "444",
        component: ExercisesChange,
        images: {
            icon: trainingsIcon,
        }
    },
    exerciseHistory:{
        name: "444",
        component: ExercisesHistory,
        images: {
            icon: trainingsIcon,
        }
    },
    exerciseHistoryAddNew:{
        name: "444",
        component: ExerciseHistoryAddNew,
        images: {
            icon: trainingsIcon,
        }
    },
    exerciseHistoryChange:{
        name: "444",
        component: ExerciseHistoryChange,
        images: {
            icon: trainingsIcon,
        }
    },
    exerciseHistoryProgress:{
        name: "444",
        component: ExerciseHistoryProgress,
        images: {
            icon: trainingsIcon,
        }
    },
    weightList:{
        name: "444",
        component: WeightList,
        images: {
            icon: weightIcon,
        }
    },
    weightAdd:{
        name: "444",
        component: WeightAdd,
        images: {
            icon: weightIcon,
        }
    },
    weightChange:{
        name: "444",
        component: WeightChange,
        images: {
            icon: weightIcon,
        }
    },
    socialMain:{
        name: "444",
        component: SocialMain,
        images: {
            icon: socialIcon,
        }
    },
    authSignIn:{
        name: "444",
        component: AuthorizationSignIn,
        images: {
            icon: socialIcon,
        }
    },
    authSignUp:{
        name: "444",
        component: AuthorizationSignUp,
        images: {
            icon: socialIcon,
        }
    }
}

export default routes;

export let currentRoute = writable(routes.trainingsGrid);
export let currentRouteData = writable(null);

export let previosRoutes = writable([]);

export let userStore = writable(null);


export function changeRoute(route, routeData, changeHistory = true) {
    if (changeHistory){
        setPreviosRoute();
    }

    // console.log(route);

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
        // console.log(prev);
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
    // console.log(prev);
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