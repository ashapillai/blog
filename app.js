Vue.prototype.$authorized = false;
var routes =
[
	{ 
		path: '/allblog', 
		component: Vue.component('allblog')
    },
    {
    	path: '/login',
    	component: Vue.component('login')
    }
	
];


 var router = new VueRouter({
	routes: routes
});
 
 var app = new Vue({
 	e1: '#app',
    data: function(){
    	return{
    		loggedIn : false
    	};
        
      
    },
    methods:
    {
    	
    },
    created: function()
    {
    	this.loggedIn = this.$authorized;
    	if (!this.loggedIn)
    		router.push('login');

    },
    router: router,
    template:
    `<div>
     <router-view></router-view>
     </div>`,
     
 })

