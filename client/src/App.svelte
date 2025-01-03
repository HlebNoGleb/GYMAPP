<script lang="ts">
    import { onMount } from "svelte";
    import Dev from "./lib/components/pages/dev.svelte";
    import Start from "./lib/components/pages/start.svelte";
    import { ExerciseType } from "./lib/helpers/storage/Exercises/exercises";
    import Notification from "./lib/components/common/notification.svelte";
    import { NotificationType } from "./lib/helpers/Enums/notification";

    window.onerror = function (message, file, line, col, error) {
        console.log("onerror")
    return false;
  };

  window.addEventListener("error", function (e) {
    console.log("errorEventListener")
    return false;
  });

  window.addEventListener('unhandledrejection', function (e) {
    const notification = new Notification({
        target: document.querySelector("#toast-container"),
        props: {
            type: NotificationType.Error,
            message: e.reason.message,
        }
    });

    // setTimeout(() => {
    //   notification.$destroy();
    // }, 1000);
    // return false;
  })
</script>

<svelte:window on:error={(e) => {console.log(e)}}/>
<Dev />
<Start />

<div id="toast-container"></div>