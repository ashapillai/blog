Vue.prototype.$authorized = false;
var routes =
[
	{ 
		path: '/allblog', 
		component: Vue.component('AllBlogView'), 
		beforeEnter: signIn
    },
    {
    	path: '/login',
    	component: Vue.component('Sign-In')
    }
	
];

function signIn (to, from, next) {
  if (!this.$authorized) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}
 var router = new VueRouter({
	routes: routes
});