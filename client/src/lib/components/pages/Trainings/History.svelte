<script lang="ts">
    import { _ } from 'svelte-i18n';
    import routes, { currentRoute, currentRouteData, changeRoute } from "../../../helpers/routes";
    import ButtonBack from '../../common/buttonsBackForward.svelte';
    import TrainingHistory from '../../../testData/TrainingHistory.json'
    export let data;

    let trainingsHistory = {...TrainingHistory};
    console.log(trainingsHistory);
</script>

<h1>{data}</h1>
<ButtonBack/>