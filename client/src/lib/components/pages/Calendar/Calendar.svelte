<script>
// @ts-nocheck

    import { onMount } from "svelte";
    import storage from "../../../helpers/storage/storage";
    import ButtonBack from "../../common/buttonsBackForward.svelte";
    import DatePicker from "../../common/datePicker.svelte";
    import Grid2 from "../Exercises/Grid2.svelte";

    let date = new Date();
    date = new Date(date.setDate(date.getDate() - 2)).setHours(0, 0, 0, 0);
    let exercisesPromise = storage.getExercises([], false, date, true);

    // onMount(() => {
    //     updateExercises();
    // })

    const updateExercises = async (event) => {
        let date = event?.detail ?? new Date().setHours(0, 0, 0, 0);
        exercisesPromise = storage.getExercises([], false, date, true);
    }

    async function getDots(dateFrom, dateTo) {
        let dots = await storage.getDots(dateFrom, dateTo);
        console.log(dots);
        return dots;
    }

</script>

<h1>Calendar</h1>
<ButtonBack />

<DatePicker on:setDate={updateExercises} dotsEvent={getDots}/>
<Grid2 exercisesPromise={exercisesPromise} showAddButton={false}/>