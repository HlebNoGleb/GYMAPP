import { addMessages, init } from 'svelte-i18n';

import en from './en.json';
import ru from './ru.json';

let currentLocale = localStorage.getItem("locale");

if (!currentLocale) {
    currentLocale = 'ru';
    localStorage.setItem("locale", currentLocale);
}

addMessages('en', en);
addMessages('ru', ru);

init({
    fallbackLocale: currentLocale,
    initialLocale: currentLocale
});