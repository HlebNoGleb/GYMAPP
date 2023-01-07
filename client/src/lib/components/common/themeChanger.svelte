<script>
  let themes = [
    "dark-theme",
    "light-theme"
  ]

  let currentTheme = localStorage.getItem("theme");

  if (!currentTheme){
    currentTheme = themes[0]
    localStorage.setItem("theme", currentTheme);
  }

  function changeTheme(){
    localStorage.setItem("theme", currentTheme);
    document.body.classList.remove(themes[0])
    document.body.classList.remove(themes[1])
    document.body.classList.add(currentTheme)
  }

  changeTheme();
</script>
<select bind:value={currentTheme} on:change={changeTheme}>
    {#each themes as theme}
      <option value={theme}>{theme}</option>
    {/each}
</select>