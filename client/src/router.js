import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import signup from './views/SignUp.vue';
import Moderator from "./views/Moderator.vue";
import UserProfile from "./views/UserProfile.vue"
import Notification from './views/Notification.vue';
import otherprofile from './views/OtherProfile.vue'
import account from './views/Account.vue';
import messages from './views/Message.vue'
import postpage from './views/Postpage.vue';
import forgotpassword from './views/ForgotPassword.vue'
import moderatorotherprofile from './views/Moderatorotherprofile.vue'
Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        }, {
            path: '/forgotpassword',
            name: 'forgotpassword',
            component: forgotpassword
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/signup',
            name: 'signup',
            component: signup
        }, {
            path: '/moderator',
            name: 'Moderator',
            component: Moderator

        },
        {
            path: '/profile',
            name: 'UserProfile',
            component: UserProfile
        }, {
            path: '/notification',
            name: 'Notification',
            component: Notification
        }, {
            path: '/profile/:name',
            name: 'otherprofile',
            component: otherprofile
        }, {
            path: '/account',
            name: 'account',
            component: account
        },
        {
            path: '/messages',
            name: 'messages',
            component: messages
        },
        {
            path: '/postpage/:postID',
            name: 'postpage',
            component: postpage
        },
        {
            path: '/moderator/profile/:name',
            name: 'moderatorotherprofile',
            component: moderatorotherprofile
        }
    ]
})