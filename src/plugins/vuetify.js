import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css'; // Подключаем иконки

export default createVuetify({
    components,
    directives,
    icons: {
        iconfont: 'mdi', // используем Material Design Icons
    },
});
