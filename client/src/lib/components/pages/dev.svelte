<script lang="ts">
    import Localizator from "../common/localizator.svelte";
    import ThemeChanger from "../common/themeChanger.svelte";


    function clearHelloScreenStorage(){
        localStorage.removeItem("skipHelloScreen");
    }

</script>

<button type="button" class="btn btn-primary dev-menu-toggle" data-bs-toggle="modal" data-bs-target="#exampleModal">Dev menu</button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <Localizator />
                <ThemeChanger />
                <button type="button" class="btn btn-primary" on:click={clearHelloScreenStorage}>Clear hello screen storage</button>
            </div>
        </div>
    </div>
</div>

<style>
    .dev-menu-toggle{
        position: fixed;
        bottom: 50%;
        right: 10px;
        z-index: 9999;
    }
</style>