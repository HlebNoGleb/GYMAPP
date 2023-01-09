import { _ } from 'svelte-i18n';
import Trainings_component from '../components/pages/trainings.svelte';
import Exercises_component from '../components/pages/exercises.svelte';


let routes = {
    training:{
        name: _ => _('trainingsName'),
        component: Trainings_component,
        images: {
            icon: "src/assets/images/icons/navbarIcons/dumbbell.png",
        }
    },
    exercises:{
        name: _ => _('exercisesName'),
        component: Exercises_component,
        images: {
            icon: "src/assets/images/icons/navbarIcons/dumbbell.png",
        }
    }
}

export default routes;