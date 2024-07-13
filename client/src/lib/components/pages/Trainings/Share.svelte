<script>
    import ButtonBack from '../../common/buttonBack.svelte';
    import { currentRouteData } from "../../../helpers/routes";

    let trainingData = $currentRouteData;
    console.log(trainingData);

    let downloadData = null;

    function exportDataFromLocalStorage() {
        downloadData = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({...trainingData}));
    }

</script>

<h1>Поделиться тренировкой - {trainingData.name}</h1>

<ButtonBack/>
<a class="btn btn-primary" href={downloadData} download="{trainingData.name}.json" on:click={exportDataFromLocalStorage}>Скачать данные</a>