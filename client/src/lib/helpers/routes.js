import { _ } from 'svelte-i18n';
import { get, writable } from 'svelte/store';
import AuthorizationSignUp from '../components/auth/signUp.svelte';
import AuthorizationSignIn from '../components/auth/signIn.svelte';
import ExercisesGrid from '../components/pages/Exercises/Grid.svelte';
import TrainignsGrid from '../components/pages/Trainings/Grid.svelte';
import TrainignsAdd from '../components/pages/Trainings/Add.svelte';
import TrainingHistory from '../components/pages/Trainings/History.svelte';
import TrainingChange from '../components/pages/Trainings/Change.svelte';
import Calendar from '../components/pages/Calendar/Calendar.svelte';
import ExercisesAddNew from '../components/pages/Exercises/Add.svelte';
import ExercisesChange from '../components/pages/Exercises/Change.svelte';
import ExercisesHistory from '../components/pages/Exercises/History/Grid.svelte';
import ExerciseHistoryAddNew from '../components/pages/Exercises/History/Add.svelte';
import ExerciseHistoryChange from '../components/pages/Exercises/History/Change.svelte';
import ExerciseHistoryProgress from '../components/pages/Exercises/History/Progress.svelte';
import WeightList from '../components/pages/Weight/Grid.svelte';
import WeightAdd from '../components/pages/Weight/Add.svelte';
import WeightChange from '../components/pages/Weight/Change.svelte';
import SocialMain from '../components/pages/Social/Main.svelte';
import trainingsIcon from '/images/icons/navbarIcons/checklist.png';
import calendarIcon from '/images/icons/navbarIcons/calendar.png';
import exercisesIcon from '/images/icons/navbarIcons/kettlebell.png';
import weightIcon from '/images/icons/navbarIcons/weight-scale.png';
import socialIcon from '/images/icons/navbarIcons/network.png';
import MainPage from '../components/pages/MainPage/mainPage.svelte';
import Share from '../components/pages/Trainings/Share.svelte';
import ShareIcon from '/images/icons/share.png';
import Receive from '../components/pages/Trainings/Receive.svelte';
import { newGuid } from './random';

const routes = {
    mainPage:{
        name: "MainPage",//_ => _('trainingsName'),
        component: MainPage,
        images: {
            icon: trainingsIcon,
        }
    },
    trainingsGrid:{
        name: "TrainignsGrid",//_ => _('trainingsName'),
        component: TrainignsGrid,
        images: {
            icon: trainingsIcon,
        }
    },
    trainingsAdd:{
        name: "TrainignsAdd",//_ => _('trainingsName'),
        component: TrainignsAdd,
        images: {
            icon: trainingsIcon,
        }
    },
    calendar:{
        name: "Calendar",//_ => _('trainingsName'),
        component: Calendar,
        images: {
            icon: calendarIcon,
        }
    },
    exercises:{
        name: "ExercisesGrid",
        component: ExercisesGrid,
        images: {
            icon: exercisesIcon,
        }
    },
    trainingHistory:{
        name: "TrainingHistory",
        component: TrainingHistory,
        images: {
            icon: trainingsIcon,
        }
    },
    trainingChange:{
        name: "TrainingChange",
        component: TrainingChange,
        images: {
            icon: trainingsIcon,
        }
    },
    trainingShare:{
        name: "Share",
        component: Share,
        images: {
            icon: ShareIcon,
        }
    },
    trainingReceive:{
        name: "Receive",
        component: Receive,
        images: {
            icon: ShareIcon,
        }
    },
    exercisesAddNew:{
        name: "ExercisesAddNew",
        component: ExercisesAddNew,
        images: {
            icon: trainingsIcon,
        }
    },
    exercisesChange:{
        name: "ExercisesChange",
        component: ExercisesChange,
        images: {
            icon: trainingsIcon,
        }
    },
    exerciseHistory:{
        name: "ExercisesHistory",
        component: ExercisesHistory,
        images: {
            icon: trainingsIcon,
        }
    },
    exerciseHistoryAddNew:{
        name: "ExerciseHistoryAddNew",
        component: ExerciseHistoryAddNew,
        images: {
            icon: trainingsIcon,
        }
    },
    exerciseHistoryChange:{
        name: "ExerciseHistoryChange",
        component: ExerciseHistoryChange,
        images: {
            icon: trainingsIcon,
        }
    },
    exerciseHistoryProgress:{
        name: "ExerciseHistoryProgress",
        component: ExerciseHistoryProgress,
        images: {
            icon: trainingsIcon,
        }
    },
    weightList:{
        name: "WeightList",
        component: WeightList,
        images: {
            icon: weightIcon,
        }
    },
    weightAdd:{
        name: "WeightAdd",
        component: WeightAdd,
        images: {
            icon: weightIcon,
        }
    },
    weightChange:{
        name: "WeightChange",
        component: WeightChange,
        images: {
            icon: weightIcon,
        }
    },
    socialMain:{
        name: "SocialMain",
        component: SocialMain,
        images: {
            icon: socialIcon,
        }
    },
    authSignIn:{
        name: "AuthorizationSignIn",
        component: AuthorizationSignIn,
        images: {
            icon: socialIcon,
        }
    },
    authSignUp:{
        name: "AuthorizationSignUp",
        component: AuthorizationSignUp,
        images: {
            icon: socialIcon,
        }
    }
}

export default routes;

export let currentRoute = writable(routes.mainPage);
export let currentRouteData = writable(undefined);

export let previosRoutes = writable([]);

export let userStore = writable(null);

export let devMode = writable(false);

export const useStateRouter = true;

let routeIndex = writable(0);


export function changeRoute(newRoute, newRouteData, changeHistory = true) {
    // debugger;
    if (changeHistory){
        setPreviosRoute(newRoute, newRouteData);
    }

    currentRoute.set(newRoute);

    if (newRouteData) {
        currentRouteData.set(newRouteData);
    } else {
        currentRouteData.set(undefined);
    }

    console.log(getPreviousRoutes());
}

export function changeState() {

    // debugger
    if (!useStateRouter) {
        return;
    }

    const routeGuid = window.location.hash.substring(1);
    const previosRoutes = getPreviousRoutes();


    // debugger
    if (previosRoutes.length == 0) {
        const length = window.history.length;
        window.history.go(-length);
        window.location.replace("/");
        return;
    }

    let route = previosRoutes.find(x => x.guid == routeGuid);

    if (route) {
        changeRoute(route.route, route.data, false);
    }
}

function setPreviosRoute(newRoute, newRouteData){
    let curRoute = getCurrentRoute(); // current route before change
    let curRouteData = getCurrentRouteData();
    let prev = getPreviousRoutes(); // prev prev routes

    if (curRoute.name === newRoute.name) {
        if (JSON.stringify(curRouteData) === JSON.stringify(newRouteData)) {
            return;
        }
    }

    // debugger;

    let newPrev = {
        route: curRoute,
        data: curRouteData,
    }

    if (useStateRouter) {
        newPrev.guid = get(routeIndex);
        routeIndex.update(n => n + 1);
        window.history.pushState(null, null, `#${get(routeIndex)}`);
    }

    if (prev.length > 20) {
        prev.shift();
    }

    prev.push(newPrev);
    previosRoutes.set(prev);
}

export function goForward(){
    if (useStateRouter) {
        window.history.forward();
        return;
    }
}

export function goBack(){
    if (useStateRouter) {
        window.history.back();
        return;
    }

    let prev = getPreviousRoutes();
    let lastRoute = prev[prev.length - 1];

    if (lastRoute){
        changeRoute(lastRoute.route, lastRoute.data, false);

        prev.pop();
        previosRoutes.set(prev);
    } else {
        changeRoute(routes.mainPage, undefined, false);
    }
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
    let curData = undefined;

    currentRouteData.subscribe(val => {
        curData = val;
    });

    return curData;
}