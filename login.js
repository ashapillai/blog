var logincomp = Vue.component('login',
{
	data: function ()
	{
		return {
			loggedIn : false,
			email: ''
		};
	},
	
	template:
	`<div>
     <button v-on:click="signin">Sign in using Github account</button>
     </div>`,
 methods:
    {
    	signin: function()
    	{
    		var vm = this;
    		if (firebase.auth().currentUser)
    		{
    			this.loggedIn = true;
    			this.email = firebase.auth().currentUser.email;
    			router.push('allblog');
    		}
    		if (!firebase.auth().currentUser) 
    		{
		        var provider = new firebase.auth.GithubAuthProvider();
		        provider.addScope('repo');
		        firebase.auth().signInWithPopup(provider).then(function(result) 
		        {
					console.log(result);
					var user = result.user;
					this.email = user.email;
					if (user != null)
					{
						vm.loggedIn = true;
						vm.$authorized = true;
					}
				}).catch(function(error) 
				{
					console.log(error);
				});
		    } 
    	}

    },
     created: function()
    {
		var config = 
    	{
			    apiKey: "AIzaSyCWlwXAxxuBBYknH2w_wYhbDh7Cwfh9nnQ",
			    authDomain: "blog-ee3de.firebaseapp.com",
			    databaseURL: "https://blog-ee3de.firebaseio.com",
			    projectId: "blog-ee3de",
			    storageBucket: "blog-ee3de.appspot.com",
			    messagingSenderId: "349896722541"
		};
		firebase.initializeApp(config);
		
    },
    
    template:
    /*`<div>

     
     <div class="flex xs12 sm8 md4"><button v-on:click="signin" v-show="!loggedIn">Sign in using Github account</button></div>
     </div>`*/
     `<div class="content--wrap">
     	<div class="container fluid fill-height">
     		<div class="layout align-center justify-center">
     			<div class="flex xs12 sm8 md4">
     				<div class="elevation-12 card" style="height: auto;">
     					<nav class="toolbar theme--dark primary" data-booted="true" style="margin-top: 0px; padding-right: 0px; padding-left: 0px; transform: translateY(0px);">
     						<div class="toolbar__content" style="height: 56px;"><div class="toolbar__title">Login Form</div><div class="spacer"></div>
     						<span class="tooltip tooltip--bottom"></span>
     						</div></nav>
     						<div class="card__text"><form novalidate="novalidate">
     						<div class="input-group input-group--prepend-icon input-group--text-field primary--text">
     						<div class="input-group__input"><i aria-hidden="true" class="icon material-icons input-group__prepend-icon">person</i>
     						<button v-on:click="signin" v-show="!loggedIn">Sign in using Github account</button></div>
     						
     						</div></form></div></div></div></div></div>`
	
});