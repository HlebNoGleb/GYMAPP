<script>
// @ts-nocheck

    import { onMount } from "svelte";
    import storage from "../../../helpers/storage/storage";
    import ButtonBack from "../../common/buttonBack.svelte";
    import DatePicker from "../../common/datePicker.svelte";
    import Grid2 from "../Exercises/Grid2.svelte";

    let exercisesIds = [];
    let exercisesPromise = exercisesIds.length > 0 ? storage.getExercises(exercisesIds, true) : Promise.resolve([])

    onMount(() => {
        updateExercises();
    })

    async function getExercisesIds(date) {
        let calendar = await storage.getCalendar();
        let dateString = date.split("T")[0];
        console.log(dateString);
        let currentDay = calendar.find(x=>x.date == dateString);
        let currentDayExercises = currentDay?.exercises ?? [];
        return currentDayExercises;
    }

    const updateExercises = async (event) => {
        let date = event?.detail ?? new Date().toJSON().split('T')[0];
        console.log(date);
        exercisesIds = await getExercisesIds(date);
        exercisesPromise = exercisesIds.length > 0 ? storage.getExercises(exercisesIds, false, date) : Promise.resolve([])
    }

</script>

<h1>Calendar</h1>
<ButtonBack />

<DatePicker on:setDate={updateExercises}/>
<Grid2 exercisesPromise={exercisesPromise} showAddButton={false}/>