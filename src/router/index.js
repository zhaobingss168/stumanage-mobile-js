import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/', redirect: '/writeApplyInfo',
        },
        // 填写报名信息
        {
            path: '/writeApplyInfo',
            meta: { title: "填写报名信息" },
            component: resolve => require(['../page/apply/WriteApplyInfo'], resolve)
        },
    ]
})
