<script lang="ts">
    import { _ } from 'svelte-i18n';
    import ButtonBack from '../../../common/buttonsBackForward.svelte';
    import routes, { currentRouteData, changeRoute } from "../../../../helpers/routes";
    import Chart from 'svelte-frappe-charts';
    import { onMount } from 'svelte';
    import { ExerciseType } from '../../../../helpers/storage/Exercises/exercises';

    let exerciseData = $currentRouteData;

    //console.log(exerciseData)

    let labels = exerciseData.history.reduce((acc, cur) => {
        cur.data.forEach(() => {
            const date = new Date(cur.date);
            acc.push(date);
        });
        return acc;
    }, []);

    const weights = exerciseData.history.reduce((acc, cur) => {
        cur.data.forEach(history => {
            acc.push(history.weight);
        });
        return acc;
    }, []);

    const counts = exerciseData.history.reduce((acc, cur) => {
        cur.data.forEach(history => {
            acc.push(history.count);
        });
        return acc;
    }, []);

    const time = exerciseData.history.reduce((acc, cur) => {
        cur.data.forEach(history => {
            acc.push(history.time);
        });
        return acc;
    }, []);

    const distance = exerciseData.history.reduce((acc, cur) => {
        cur.data.forEach(history => {
            acc.push(history.distance);
        });
        return acc;
    }, []);

  let columns = [
      ["x" ].concat(labels),
  ];

  if (exerciseData.exercise.type == ExerciseType.repetition_weight) {
    columns.push(["Подходы"].concat(counts));
    columns.push(["Вес"].concat(weights));
  }

  if (exerciseData.exercise.type == ExerciseType.time_distance) {
    columns.push(["Время"].concat(time));
    columns.push(["Дистанция"].concat(distance));
  }

  if (exerciseData.exercise.type == ExerciseType.time) {
    columns.push(["Время"].concat(time));
  }

  //console.log(columns);

  onMount(() => {
        var chart = c3.generate({
        bindto: '#chart',
        zoom: {
            enabled: true
        },
        data: {
            x: 'x',
            columns: columns
        },
        axis: {
            x: {
                type: 'timeseries',
                localtime: false,
                tick: {
                    format: function (x) {
                        return x.toLocaleDateString();
                    }
                }
            }
        }
    });
  })
</script>

<h1>Прогресс</h1>


<div id="chart"></div>


<ButtonBack/>