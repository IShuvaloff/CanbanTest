# Canban (test version)

## Структура проекта

### Состав

1. Проект построен на шаблоне Vue (vue-3, typescript, vue-router, vuex, babel, eslint, axios, normalize.css, svg-спрайты, sass-loader);
2. Добавлены компоненты:
    1. Базовые, регистрируются глобально при запуске приложения: BaseContainer, BaseButton, BaseButtonOut, BaseSpinner (работает через плагин `epic-spinners`);
    2. Компонент svg-иконки из сгенерированного при запуске приложения спрайта: SvgIcon;
    3. Карточка продукта, по дабл-клику открывается диалог редактирования: ProductCard;
    4. Модальное окно с формой для редактирования продукта: ProductDialog;
3. API-скрипт `scripts/api.ts` для первичной выгрузки списка продуктов с сайта <https://fakestoreapi.com/products>;
4. Скрипт с интерфейсами `scripts/interfaces.ts` для объекта продукта и рейтинга;
5. Скрипт хранилища `store/index.ts` с данными по продуктам и процедурами для добавления/обновления/удаления продукта;
6. Файл главной страницы `views/HomeView.vue`.

### Особенности

1. Первичная выгрузка данных производится при открытии главной страницы и только при условии, если хранилище пусто. В дальнейшем работа ведется только с хранилищем данных;
2. Drag-n-drop vue-компонентов выполнен впервые, возможно, не столь изящно, как может быть;
3. Не хватает кэширования изображений для устранения повторной загрузки по URL-ссылке при изменении группы (при установленном Disable Cache в DevTools). Теоретически нужно как-то сохранять в кэше загруженные изображения, чтобы после перемещений не нагружать сеть повторно;
4. Не стал делать сервер, т.к. либо это был бы либо простейший js-скрипт и json-файл, либо полноценный сервер на Express.js, на конфигурирование которого ушло бы больше времени, да и смысла в этом нет ради такой задачи. PHP-сервер когда-то запускал, но это было давно и уже неправда;
5. В мобильной версии сайта стоило бы сделать аккордеон для групп.

### Установка

1. Установить все зависимости:

    ```js
    npm install
    ```

2. Запуск проекта в режиме разработки:

    ```js
    npm run serve
    ```

3. Сборки и минификация проекта для деплоя:

    ```js
    npm run build
    ```

4. Исправление ошибок линтера:

    ```js
    npm run lint
    ```
