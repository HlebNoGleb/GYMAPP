<script>
    import { _, locale } from 'svelte-i18n';

    import storage from '../../../helpers/storage/storage';
    import ExerciseCard from '../Exercises/Card.svelte';
    import { getDayName } from '../../../helpers/dateTime';
    import routes, { changeRoute } from '../../../helpers/routes';
    import weights from '../../../helpers/storage/Weights/weights';
    import { ExerciseType } from '../../../helpers/storage/Exercises/exercises';
    import gaming from '../../../../assets/data/gaming.json';

    import test from '../../../../assets/data/test.json';


    let chartNode = undefined;


    const weightData = {
        lastWeight: undefined,
        startWeight: undefined
    }
    const weightPromise = storage.getWeight();

    const weightDataPromise = Promise.all([weightPromise])
    .then(data => {
        weightData.lastWeight = data[0].length > 0 ? data[0].slice(-1)[0].weight : undefined;
        weightData.startWeight = data[0].length > 0 ? data[0][0].weight : undefined;
    });

    // -------------------------------------------------

    const historyData = {
        weightsSum: 0,
        weightsCount: 0,
        weightsByMonth: [],
        gaming: {
            currentLevel: {
                weight: 0,
                subject: undefined
            },
            nextLevel: {
                weight: 0,
            },
            previousLevel: {
                weight: 0,
            }
        }
    }

    const historyPromise = storage.getHistoriesByXMonths(30).then(data => {
        data.forEach((montsHistories, index) => {
            //console.log()
            historyData.weightsByMonth.push({
                year: montsHistories.year,
                month: montsHistories.month,
                day: montsHistories.day,
                weightsSum: 0,
                weightsCount: 0
            });

            montsHistories.data.forEach(history => {
                history.data.forEach(historyItem => {
                    if (historyItem.type == ExerciseType.repetition_weight) {
                        historyData.weightsSum += historyItem.weight;
                        historyData.weightsCount += historyItem.count;

                        historyData.weightsByMonth[index].weightsSum += historyItem.weight;
                        historyData.weightsByMonth[index].weightsCount += historyItem.count;
                    }
                })


            })
        });


        //console.log(historyData.weightsSum);

        const filtered = gaming.filter(item => item.weight < historyData.weightsSum);
        //console.log(filtered)
        filtered.sort((a, b) => b.weight - a.weight);
        const previousLevel = filtered[1];

        historyData.gaming.previousLevel.weight = previousLevel?.weight ?? 0;

        const currentLevel = gaming.reduce((prev, curr) => {
            return (curr.weight < historyData.weightsSum && curr.weight > prev.weight) ? curr : prev;
        }, {weight: -Infinity});



        const nextLevel = gaming.reduce((prev, curr) => {
            return (curr.weight > historyData.weightsSum && curr.weight < prev.weight) ? curr : prev;
        }, {weight: Infinity});


        historyData.gaming.currentLevel.weight = JSON.parse(JSON.stringify(currentLevel.weight));
        historyData.gaming.currentLevel.subject = currentLevel.subjects[Math.floor(Math.random() * currentLevel.subjects.length)];

        historyData.gaming.nextLevel.weight = nextLevel.weight;

        // console.log(historyData)
        // historyData.weightsByMonth = test;

        let columns = [
            ["x" ].concat(historyData.weightsByMonth.map(item => new Date(item.year, item.month, item.day))),
        ];

        columns.push(["Повторения"].concat(historyData.weightsByMonth.map(item => item.weightsCount)));
        columns.push(["Вес"].concat(historyData.weightsByMonth.map(item => item.weightsSum)));

        //console.log(columns);

        //console.log(chartNode);

        let currentZoom = [new Date(new Date().setDate(new Date().getDate() - 10)), new Date()];

        var chart = c3.generate({
                bindto: '#chart1',
                zoom: {
                    enabled: true,
                    // rescale: true,
                    // disableDefaultBehavior: true,
                },
                data: {
                    x: 'x',
                    columns: columns,
                    colors: {
                        "Вес": 'var(--main-color)'
                    },
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        localtime: false,
                        tick: {
                            format: function (x) {
                                // return `${new Date(x).getMonth() + 1}.${new Date(x).getFullYear()}`;
                                 return new Date(x).toLocaleDateString();
                            }
                        }
                    }
                }
            });

        var startDate = new Date();
        startDate.setDate(startDate.getDate() - 10);
        chart.zoom([startDate, new Date()]);
        // console.log([new Date(new Date().setDate(new Date().getDate() - 10)), new Date()])
    });




</script>

<h1>
    {getDayName(new Date())}, {$_('main_page_h1')}
</h1>
<button type="button" class="btn btn-primary my-3" on:click={() => changeRoute(routes.trainingsGrid)}>Начать новую тренировку</button>


{#await weightDataPromise}
    <p>loading...</p>
{:then}
    {#if weightData.startWeight}
        <p>Ваш стартовый вес: {weightData.startWeight} {$_('consts.kg_small')}</p>
    {/if}
    {#if weightData.lastWeight}
        <p>Ваш последний вес: {weightData.lastWeight} {$_('consts.kg_small')}</p>
    {/if}
{/await}

{#await historyPromise}
    <p>loading...</p>
{:then}
    <p>Вы подняли за все время: {Math.round(historyData.weightsSum)} {$_('consts.kg_small')}</p>


    <!-- or because no jokes at all. after jokes delete or and ? :  -->
    <!-- {#if historyData.gaming.currentLevel.subject.subject[$locale] || historyData.gaming.currentLevel.subject.joke[$locale]}
        <p>
            {historyData.gaming.currentLevel.subject.joke[$locale] ? historyData.gaming.currentLevel.subject.joke[$locale] : `Вы подняли  ${historyData.gaming.currentLevel.subject.subject[$locale]}`}
        </p>
    {/if} -->

    {#if historyData.gaming.nextLevel.weight == Infinity}
        <p>Новые уровни скоро появятся</p>
    {/if}

    {#if historyData.gaming.nextLevel.weight > 0 && historyData.gaming.nextLevel.weight < Infinity}
        <div class="progress" style="height: 30px;">
            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="{historyData.weightsSum}" aria-valuemin="{Math.round(historyData.gaming.previousLevel.weight)}" aria-valuemax="{Math.round(historyData.gaming.nextLevel.weight)}" style="width: {Math.round(historyData.weightsSum / historyData.gaming.nextLevel.weight * 100)}%">{historyData.weightsSum} {$_('consts.kg_small')} / {historyData.gaming.nextLevel.weight} {$_('consts.kg_small')}</div>
        </div>
        <p>До перехода на следующий уровень: {Math.round(historyData.gaming.nextLevel.weight - historyData.weightsSum)} {$_('consts.kg_small')}</p>
    {/if}
    <!-- {#each historyData.weightsByMonth as month}
        <p>Вы подняли за {new Date(month.year, month.month).toLocaleString($locale, { month: 'long', year: 'numeric' })} : {Math.round(month.weightsSum)} {$_('consts.kg_small')}</p>
    {/each} -->
{/await}

<div id="chart1" bind:this={chartNode}></div>
