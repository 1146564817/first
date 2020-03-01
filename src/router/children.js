
// 导入子路由
import user from '../views/index/user/user.vue'
import business from '../views/index/business/business.vue'
import subject from '../views/index/subject/subject.vue'
import chart from '../views/index/chart/chart.vue'
import question from '../views/index/question/question.vue'

export default [
    {
        path: 'user',
        component: user,
        meta: {
            title: '用户列表',
            rules: ['超级管理员', '管理员'],
            ioc:'el-icon-user',
        }
    },
    {
        path: 'business',
        component: business,
        meta: {
            title: '企业列表',
            rules: ['超级管理员', '管理员', '老师'],
            ioc:'el-icon-office-building',
        }
    },
    {
        path: 'subject',
        component: subject,
        meta: {
            title: '学科列表',
            rules: ['超级管理员', '管理员', '老师', '学生'],
            ioc:'el-icon-notebook-2',
        }
    },
    {
        path: 'chart',
        component: chart,
        meta: {
            title: '数据预览',
            rules: ['超级管理员', '管理员', '老师'],
            ioc:'el-icon-time',
        }
    },
    {
        path: 'question',
        component: question,
        meta: {
            title: '题库列表',
            rules: ['超级管理员', '管理员', '老师', '学生'],
            ioc:'el-icon-edit-outline',
        }
    },
]

