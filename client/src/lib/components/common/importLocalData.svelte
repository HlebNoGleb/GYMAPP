<script>

    function onChange(event) {
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(event.target.files[0]);
    }

    function onReaderLoad(event){
        //console.log(event.target.result);
        var obj = JSON.parse(event.target.result);
        importDataToLocalStorage(obj);
    }

    function importDataToLocalStorage(data) {
        if (!data) {
            return null;
        }

        Object.entries(data).forEach(item => {
            const key = item[0];
            const value = item[1];
            localStorage.setItem(key, value);
            location.reload();
        });
    }

</script>

<input id="file" type="file" on:change={onChange} class="btn btn-info"/>
