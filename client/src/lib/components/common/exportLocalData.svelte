<script>

    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    let data = null;

    function exportDataFromLocalStorage() {
        data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({...localStorage}));
    }

</script>

<a class="btn btn-info" href={data} download="test.json" on:click={exportDataFromLocalStorage}>Скачать данные</a>