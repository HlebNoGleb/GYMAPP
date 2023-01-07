<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { Swiper, SwiperSlide } from "swiper/svelte";
    // Import Swiper styles
    import "swiper/css";
    import "swiper/css/pagination";
    // import required modules
    import { Pagination } from "swiper";

    let skipHelloScreen = localStorage.getItem("skipHelloScreen") ?? false;

    if (!skipHelloScreen){

    }

    function startUsingApp() {
        skipHelloScreen = true;
        localStorage.setItem("skipHelloScreen", skipHelloScreen);
    }
</script>

{#if skipHelloScreen}
    <h1>{$_('StartScreenText')}</h1>
{:else}
<Swiper pagination={true} modules={[Pagination]}>
    <SwiperSlide><h1>{$_('main_page_h1')}</h1></SwiperSlide>
    <SwiperSlide><h1>{$_('main_page_slide_1')}</h1></SwiperSlide>
    <SwiperSlide><h1>{$_('main_page_slide_2')}</h1></SwiperSlide>
    <SwiperSlide>
        <div class="col">
            <h1>{$_('main_page_slide_3')}</h1>
            <button type="button" class="btn btn-primary" on:click={startUsingApp}>{$_('continue')}</button>
        </div>
    </SwiperSlide>
</Swiper>
{/if}

<style>

</style>