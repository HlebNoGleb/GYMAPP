import { _ } from 'svelte-i18n';
import { get, writable } from 'svelte/store';

import trainingsIcon from '/images/icons/navbarIcons/checklist.png';
import calendarIcon from '/images/icons/navbarIcons/calendar.png';
import exercisesIcon from '/images/icons/navbarIcons/kettlebell.png';
import weightIcon from '/images/icons/navbarIcons/weight-scale.png';
import socialIcon from '/images/icons/navbarIcons/network.png';
import ShareIcon from '/images/icons/share.png';

import { checkAndTryUpdateTokens, CheckTokenState, tokenStore, userStore } from '../services/userStore';
import { searchToJSON } from './string';

// component: async () => (await import('../components/pages/MainPage/mainPage.svelte')).default,
// this is for lazy (component import only when needed by route and after import faster then first render) component loading
// and this is fix for hot reload in development because if we import component as default
// import Component from 'path';
// routes = {... {... component: Component}}
// then it will not work with error Cannot be accessed before initialization

let routes = {
    mainPage: {
        name: "MainPage", //_ => _('trainingsName'),
        component: async () => (await import('../components/pages/MainPage/mainPage.svelte')).default,
        images: {
            icon: trainingsIcon,
        }
    },
    trainingsGrid: {
        name: "TrainignsGrid", //_ => _('trainingsName'),
        component: async () => (await import('../components/pages/Trainings/Grid.svelte')).default,
        images: {
            icon: trainingsIcon,
        }
    },
    trainingsAdd: {
        name: "TrainignsAdd", //_ => _('trainingsName'),
        component: async () => (await import('../components/pages/Trainings/Add.svelte')).default,
        images: {
            icon: trainingsIcon,
        }
    },
    calendar: {
        name: "Calendar", //_ => _('trainingsName'),
        component: async () => (await import('../components/pages/Calendar/Calendar.svelte')).default,
        images: {
            icon: calendarIcon,
        }
    },
    exercises: {
        name: "ExercisesGrid",
        component: async () => (await import('../components/pages/Exercises/Grid.svelte')).default,
        images: {
            icon: exercisesIcon,
        }
    },
    trainingHistory: {
        name: "TrainingHistory",
        component: async () => (await import('../components/pages/Trainings/History.svelte')).default,
        images: {
            icon: trainingsIcon,
        }
    },
    trainingChange: {
        name: "TrainingChange",
        component: async () => (await import('../components/pages/Trainings/Change.svelte')).default,
        images: {
            icon: trainingsIcon,
        }
    },
    trainingShare: {
        name: "Share",
        component: async () => (await import('../components/pages/Trainings/Share.svelte')).default,
        images: {
            icon: ShareIcon,
        }
    },
    trainingReceive: {
        name: "Receive",
        component: async () => (await import('../components/pages/Trainings/Receive.svelte')).default,
        images: {
            icon: ShareIcon,
        }
    },
    exercisesAddNew: {
        name: "ExercisesAddNew",
        component: async () => (await import('../components/pages/Exercises/Add.svelte')).default,
        images: {
            icon: trainingsIcon,
        }
    },
    exercisesChange: {
        name: "ExercisesChange",
        component: async () => (await import('../components/pages/Exercises/Change.svelte')).default,
        images: {
            icon: trainingsIcon,
        }
    },
    exerciseHistory: {
        name: "ExercisesHistory",
        component: async () => (await import('../components/pages/Exercises/History/Grid.svelte')).default,
        images: {
            icon: trainingsIcon,
        }
    },
    exerciseHistoryAddNew: {
        name: "ExerciseHistoryAddNew",
        component: async () => (await import('../components/pages/Exercises/History/Add.svelte')).default,
        images: {
            icon: trainingsIcon,
        }
    },
    exerciseHistoryChange: {
        name: "ExerciseHistoryChange",
        component: async () => (await import('../components/pages/Exercises/History/Change.svelte')).default,
        images: {
            icon: trainingsIcon,
        }
    },
    exerciseHistoryProgress: {
        name: "ExerciseHistoryProgress",
        component: async () => (await import('../components/pages/Exercises/History/Progress.svelte')).default,
        images: {
            icon: trainingsIcon,
        }
    },
    weightList: {
        name: "WeightList",
        component: async () => (await import('../components/pages/Weight/Grid.svelte')).default,
        images: {
            icon: weightIcon,
        }
    },
    weightAdd: {
        name: "WeightAdd",
        component: async () => (await import('../components/pages/Weight/Add.svelte')).default,
        images: {
            icon: weightIcon,
        }
    },
    weightChange: {
        name: "WeightChange",
        component: async () => (await import('../components/pages/Weight/Change.svelte')).default,
        images: {
            icon: weightIcon,
        }
    },
    socialMain: {
        name: "SocialMain",
        component: async () => (await import('../components/pages/Social/Main.svelte')).default,
        images: {
            icon: socialIcon,
        }
    },
    register: {
        name: "Register",
        component: async () => (await import('../components/pages/Social/User/Auth/register.svelte')).default,
        images: {
            icon: socialIcon,
        },
        withoutAuth: true
    },
    confirmEmail: {
        name: "EmailConfirm",
        component: async () => (await import('../components/pages/Social/User/Confirmations/EmailConfirm.svelte')).default,
        images: {
            icon: socialIcon,
        },
        withoutAuth: true
    },
    login: {
        name: "Login",
        component: async () => (await import('../components/pages/Social/User/Auth/login.svelte')).default,
        images: {
            icon: socialIcon,
        },
        withoutAuth: true
    },
    forgotPassword: {
        name: "ForgotPassword",
        component: async () => (await import('../components/pages/Social/User/Auth/ForgotPassword.svelte')).default,
        images: {
            icon: socialIcon,
        },
        withoutAuth: true
    },
    resetPassword: {
        name: "ResetPassword",
        component: async () => (await import('../components/pages/Social/User/Auth/ResetPassword.svelte')).default,
        images: {
            icon: socialIcon,
        },
        withoutAuth: true
    },
    profile: {
        name: "Profile",
        component: async () => (await import('../components/pages/Social/User/Profile/Profile.svelte')).default,
        images: {
            icon: socialIcon,
        },
        withoutAuth: false
    },
    usersGrid: {
        name: "UsersGrid",
        component: async () => (await import('../components/pages/Social/User/Users/UsersGrid.svelte')).default,
        images: {
            icon: socialIcon,
        }
    },
};

export default routes;
// set first route as default
export let currentRoute = writable(undefined);
export let currentRouteData = writable(undefined);

// window.history.replaceState(undefined, "", `#${routes.login.name}`);

function initRoute(){
    if (window.location.pathname !== "/") {
        const routeByPathname = routes[window.location.pathname.slice(1)];

        if (routeByPathname && routeByPathname.withoutAuth) {
            currentRoute.set(routeByPathname);

            const searchToRouteData = searchToJSON(window.location.search);

            if (searchToRouteData) {
                currentRouteData.set(searchToRouteData);
            }

            return;
        }
    }

    if (window.location.pathname === "/") {
        currentRoute.set(routes.profile);
        currentRouteData.set(undefined);
        window.history.replaceState(undefined, "", `#${routes.profile.name}`);

        return;
    }

    currentRoute.set(routes.profile);
    currentRouteData.set(undefined);
    window.location.replace(window.location.origin);
    window.history.replaceState(undefined, "", `#${routes.profile.name}`);
}

initRoute();

export let previosRoutes = writable([]);

export let devMode = writable(false);

export const useStateRouter = true;

let routeIndex = writable(0); // remove this and dependency


export async function changeRoute(newRoute, newRouteData, changeHistory = true) {

    currentRoute.set(newRoute);

    const tokenState = await checkAndTryUpdateTokens();

    if (tokenState == CheckTokenState.Invalid){
        currentRoute.set(routes.login);
        currentRouteData.set(undefined);
        window.history.replaceState(undefined, "", `#${routes?.login?.name}`);
        return;
    }



    if (newRouteData) {
        currentRouteData.set(newRouteData);
    } else {
        currentRouteData.set(undefined);
    }

    if (useStateRouter){
        if (changeHistory) {
            window.history.pushState(newRouteData, "", `#${newRoute.name}`);
        } else {
            window.history.replaceState(newRouteData, "", `#${newRoute.name}`);
        }
    }

    // console.log(window.history);


    //console.log(getPreviousRoutes());
}

export function changeState(routeName, data = undefined) {
    let newRoute = undefined;

    Object.entries(routes).find(route => {
        if (route[1].name === routeName) {
            newRoute = route[1];
            return true;
        }
    });

    console.log(newRoute);
    changeRoute(newRoute, data, false);
}

// export function changeState() {

//     // debugger
//     if (!useStateRouter) {
//         return;
//     }

//     const routeGuid = window.location.hash.substring(1);
//     const previosRoutes = getPreviousRoutes();


//     // debugger
//     if (previosRoutes.length == 0) {
//         const length = window.history.length;
//         window.history.go(-length);
//         window.location.replace("/");
//         return;
//     }

//     let route = previosRoutes.find(x => x.guid == routeGuid);

//     if (route) {
//         changeRoute(route.route, route.data, false);
//     }
// }

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