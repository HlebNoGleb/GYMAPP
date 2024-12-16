import './css/app.css'
import App from './App.svelte'
import "./assets/localization/i18n"

const app = new App({
  target: document.getElementById("app"),
})

export default app