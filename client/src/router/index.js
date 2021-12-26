import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    }, {
        path: '/info',
        name: 'info',
        component: () =>
            import ('@/views/info')
            // hidden: true
    }, {
        path: '/node',
        name: 'node',
        component: () =>
            import ('@/views/node')
            // hidden: true
    }, , {
        path: '/group',
        name: 'group',
        component: () =>
            import ('@/views/group')
            // hidden: true
    }, ]
})