<script lang="ts">
    import { _ } from 'svelte-i18n';
    import ButtonBack from '../../../common/buttonBack.svelte';
    import routes, { currentRouteData, changeRoute } from "../../../../helpers/routes";
    import Chart from 'svelte-frappe-charts';

    let exerciseHistory = $currentRouteData;

    console.log(exerciseHistory);

    let labels = exerciseHistory.reduce((acc, cur) => {
        cur.data.forEach(() => {
            const date = new Date(cur.date).toLocaleDateString();
            acc.push(date);
        });
        return acc;
    }, []);

    const weights = exerciseHistory.reduce((acc, cur) => {
        cur.data.forEach(history => {
            acc.push(history.weight);
        });
        return acc;
    }, []);

    const counts = exerciseHistory.reduce((acc, cur) => {
        cur.data.forEach(history => {
            acc.push(history.count);
        });
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

  console.log(data);
  let chartRef;
  const onExport = () => {
    chartRef.isNavigable = true
    chartRef.exportChart();
  }
</script>

<h1>Прогресс</h1>

<Chart data={data} type="bar" bind:this={chartRef} />
<button class="btn btn-primary" on:click={onExport}>
    Export
</button>

<ButtonBack/>