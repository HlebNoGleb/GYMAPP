<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { createEventDispatcher } from 'svelte';
    import { Swiper, SwiperSlide } from "swiper/svelte";
    // Import Swiper styles
    import "swiper/css";
    import "swiper/css/pagination";
    // import required modules
    import { Pagination } from "swiper";

    const dispatch = createEventDispatcher();
    let swiper;

    function startUsingApp() {
        updateState(
            {"skipHelloScreen": true}
        )
    }

    function updateState(data) {
        dispatch('updateState', data)
    }
</script>

<Swiper pagination={true} modules={[Pagination]} on:swiper={e => swiper = e.detail[0]}>
    <SwiperSlide>
        <div class="col">
            <h1>{$_('main_page_h1')}</h1>
            <button type="button" class="btn btn-primary" on:click={() => swiper.slideNext()}>{$_('continue')}</button>
        </div>
    </SwiperSlide>
    <SwiperSlide>
        <div class="col">
            <h1>{$_('main_page_slide_1')}</h1>
            <button type="button" class="btn btn-primary" on:click={() => swiper.slideNext()}>{$_('continue')}</button>
        </div>
    </SwiperSlide>
    <SwiperSlide>
        <div class="col">
            <h1>{$_('main_page_slide_2')}</h1>
            <button type="button" class="btn btn-primary" on:click={() => swiper.slideNext()}>{$_('continue')}</button>
        </div>
    </SwiperSlide>
    <SwiperSlide>
        <div class="col">
            <h1>{$_('main_page_slide_3')}</h1>
            <button type="button" class="btn btn-primary" on:click={startUsingApp}>{$_('continue')}</button>
        </div>
    </SwiperSlide>
</Swiper>