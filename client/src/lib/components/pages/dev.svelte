<script lang="ts">
    import CreateCalendar from "../common/createCalendar.svelte";
    import ExportLocalData from "../common/exportLocalData.svelte";
    import ImportLocalData from "../common/importLocalData.svelte";
    import Localizator from "../common/localizator.svelte";
    import ThemeChanger from "../common/themeChanger.svelte";
    import { devMode } from "../../helpers/routes";

    function clearHelloScreenStorage(){
        localStorage.removeItem("skipHelloScreen");
        window.location.reload();
    }

    function devModeToggle() {
        console.log($devMode);
        devMode.set(!$devMode);
    }

</script>

<button type="button" class="btn btn-primary dev-menu-toggle" data-bs-toggle="modal" data-bs-target="#exampleModal">Dev menu</button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <Localizator />
                <ThemeChanger />
                <ExportLocalData />
                <ImportLocalData />
                <CreateCalendar />
                <button type="button" class="btn btn-primary" on:click={clearHelloScreenStorage}>Clear hello screen storage</button>
                <button type="button" class="btn btn-primary" on:click={devModeToggle}>DEV MODE</button>
            </div>
        </div>
    </div>
</div>

<style>
    .dev-menu-toggle{
        position: fixed;
        bottom: 10%;
        right: 10px;
        z-index: 9999;
    }
</style>