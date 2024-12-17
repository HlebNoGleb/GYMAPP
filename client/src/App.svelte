<script lang="ts">
    import { onMount } from "svelte";
    import Dev from "./lib/components/pages/dev.svelte";
    import Start from "./lib/components/pages/start.svelte";
    import { ExerciseType } from "./lib/helpers/storage/Exercises/exercises";

    onMount(() => {
        // const fixedHistory = localStorage.getItem("fixedHistory");
        // if (!fixedHistory) {
            fixHistory();
        // }
    })

    function fixHistory() {
        //console.log({...localStorage});
        Object.keys(localStorage).forEach(item => {
            //console.log(item);
            if (item.startsWith("history")) {
                let historyString = localStorage.getItem(item);
                let historyArray = historyString ? JSON.parse(historyString) : null;
                // console.log(historyArray)
                if (history) {
                    historyArray.forEach(history => {
                        if (history.time != undefined && history.distance != undefined) {
                        history.type = ExerciseType.time_distance
                        } else if (history.time != undefined) {
                            history.type = ExerciseType.time
                        } else if (history.weight != undefined && history.count != undefined && history.sets != undefined) {
                            history.type = ExerciseType.repetition_weight
                        }
                    });

                    // console.log(historyArray)
                    localStorage.setItem(item, JSON.stringify(historyArray));
                }
            }
        })

        // localStorage.setItem("fixedHistory", "true");
    }
</script>
<Dev />
<Start />

