<script lang="ts">
    import { _ } from 'svelte-i18n';
    import ButtonBack from '../../../common/buttonBack.svelte';
    import routes, { currentRouteData, changeRoute } from "../../../../helpers/routes";
    import Chart from 'svelte-frappe-charts';

    let exerciseHistory = $currentRouteData;

    console.log(exerciseHistory);

    let labels = exerciseHistory.reduce((acc, cur) => {
        let label = new Date(cur.date * 1000).toLocaleDateString();
        acc.push(label);
        return acc;
    }, []);

    const weights = exerciseHistory.reduce((acc, cur) => {
        acc.push(cur.weight);
        return acc;
    }, []);

    const counts = exerciseHistory.reduce((acc, cur) => {
        acc.push(cur.count);
        return acc;
    }, []);

    let data = {
        labels: labels,
        datasets: [
            {
                name: "kg",
                values: weights,
            },
            {
                name: "count",
                values: counts,
            }
        ]
  };
  let chartRef;
  const onExport = () => chartRef.exportChart();
</script>

<h1>Прогресс</h1>

<Chart data={data} type="line" bind:this={chartRef} />
<button class="btn btn-primary" on:click={onExport}>
    Export
</button>

<ButtonBack/>