import { addMessages, init} from 'svelte-i18n';

import en from './en.json';
import ru from './ru.json';

const currentLocale = localStorage.getItem("locale");

if (!currentLocale) {
    const defaultLocale = 'en';
    localStorage.setItem("locale", defaultLocale);
}

addMessages('en', en);
addMessages('ru', ru);

init({
    fallbackLocale: currentLocale,
    initialLocale: currentLocale
});