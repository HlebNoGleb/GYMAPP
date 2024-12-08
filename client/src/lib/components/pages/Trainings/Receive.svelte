<script>
    import routes, { changeRoute, goBack } from "../../../helpers/routes";
    import exercises from "../../../helpers/storage/Exercises/exercises";
    import trainings from "../../../helpers/storage/Trainings/trainings";
    import storage from "../../../helpers/storage/storage";
    import ButtonBack from "../../common/buttonBack.svelte";
    import TrainingCard from './Card.svelte';

    let newTraining = null;

    function onChange(event) {
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(event.target.files[0]);
    }

    function onReaderLoad(event){
        console.log(event.target.result);
        var obj = JSON.parse(event.target.result);
        importDataToLocalStorage(obj);
    }

    async function importDataToLocalStorage(data) {
        if (!data) {
            return null;
        }

        let uploadExercises = [];
        for (const exercise of data.exerciseData) {
            let uploadedExercise = await storage.uploadExercise(exercise);
            uploadExercises.push(uploadedExercise);
        }

        console.log(uploadExercises);

        let newTraining = {...data};
        delete newTraining.exerciseData;
        newTraining.exercises = [];

        console.log(newTraining);

        uploadExercises.forEach(exercise => {
            newTraining.exercises.push(exercise.id);
        });

        storage.uploadTraining(newTraining);
        changeRoute(routes.trainingsGrid);
    }

</script>
<h1>Загрузить тренировку</h1>
<input id="file" type="file" on:change={onChange} class="btn btn-primary"/>
<ButtonBack/>