import Vue from 'vue';
import Router from 'vue-router';
import Map from '../components/map.vue';
import HelloWorld from '../components/HelloWorld.vue';
import Hell from '../components/hell.vue';
import DatePicker from '../components/calendar/components/es-date-picker.vue';
import TableColl from '../components/tableDemo.vue';
import Notifocation from '../components/notification/components/notification.vue';

import RouterDemo from '../components/demo/routerDemo.vue';

Vue.use(Router);

const routes = [{
    path: '/routerDemo',
    component: RouterDemo,
    children: [
        { path: 'foo', component: Map },
    ],
},
{ path: '/HelloWorld', component: HelloWorld },
{ path: '/hell', component: Hell },
{ path: '/datePicker', component: DatePicker },
{ path: '/tableColl', component: TableColl },
{ path: '/notifocation', component: Notifocation },

];

const router = new Router({
    routes,
});

export default router;
