<script>
    // @ts-nocheck

        import { onMount } from "svelte";
        import Button from "./Button.svelte";
        import { createEventDispatcher } from 'svelte';
        const dispatch = createEventDispatcher();

        export let pageCount = 0;
        export let currentPage = 1;
        let pages = [];
        let pagination

        onMount(() => {
            pages = [];
            logic(1,2,1);
            pages = pages;
        })

        function changePage(page) {
            currentPage = page;
            pages = [];
            logic(1,2,1);
            pages = pages;
            dispatch("changePage", currentPage)
        }

        function appendBtn(i, ellipsis) {
            const activeBtn = currentPage === i;

            let page = {}

            if (ellipsis === true) {
                page.num = 0;
                pages.push(page)
                return false;
            }

            page.cur = activeBtn
            page.num = i
            pages.push(page)
        }

        function logic(leftCount, centerSideCount, rightCount) {
            let centerLeft, centerRight;

            range(1, leftCount).forEach(appendBtn);

            centerLeft = Math.max(leftCount + 1, currentPage - centerSideCount);
            centerRight = Math.min(pageCount - rightCount, centerLeft + centerSideCount * 2);
            centerLeft = Math.max(leftCount + 1, centerRight - centerSideCount * 2);

            if (pageCount > 2) {

                if (centerLeft > leftCount + 1) {
                    appendBtn(currentPage, true);
                }

                range(centerLeft, centerRight).forEach(appendBtn);

                if (centerRight < pageCount - rightCount) {
                    appendBtn(currentPage, true);
                }

            }

            range(pageCount - rightCount + 1, pageCount).forEach(appendBtn);
        }

        function range(start, stop) {
            if (start === undefined || stop === undefined) return [];

            const length = Math.abs(stop - start) + 1;

            return Array.from({length}, (_, i) => i * Math.sign(stop - start) + start);
        }


    </script>

    {#if pageCount > 1}
    <div id="pagination" bind:this={pagination}>
        {#if currentPage > 1}
            <Button class="btn btn-primary" onClick={() => changePage(currentPage -= 1)}>Back</Button>
        {/if}
        {#each pages as page}
            {#if page.num == 0}
                <span>...</span>
            {:else}
                <Button class="btn btn-primary" disabled={page.num == 0 || page.num == currentPage} onClick={() => changePage(page.num)}>{page.num}</Button>
            {/if}
        {/each}
        {#if currentPage < pageCount}
            <Button class="btn btn-primary" onClick={() => changePage(currentPage += 1)} >Forward</Button>
        {/if}
    </div>
    {/if}