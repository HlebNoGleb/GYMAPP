<script>
    import {locale, locales} from 'svelte-i18n';
    let currentLocale = $locale;
    function changeLocale(){
      //console.log(currentLocale);
      localStorage.setItem("locale", currentLocale);
      $locale = currentLocale;
    }
</script>
<select bind:value={currentLocale} on:change={changeLocale}>
    {#each $locales as locale}
      <option value={locale}>{locale}</option>
    {/each}
</select>