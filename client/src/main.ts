import './sass/app.css'
import './sass/styles.css'
import App from './App.svelte'
import "./assets/localization/i18n"

const app = new App({
  target: document.getElementById("app"),
});

window.yanka = 69;

export default app