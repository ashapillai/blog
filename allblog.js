Vue.component('allblog',
{
	data: function ()
	{
		return {
			userObj:'',
			posts: [],
			firstName:'',
			lastName:''
		};
	},
	
	template:
	`<div id="allblog">
  <v-app light>
    <v-content>
      <v-container>
        <v-layout row wrap align-center>
          <v-flex xs12 md4>
            <div class="text-xs-center">
              <v-avatar size="125px">
               
              </v-avatar>
              <div class="headline">{{firstName}} <span style="font-weight:bold">{{lastName}}</span></div>
              <div class="subheading text-xs-center grey--text pt-1 pb-3">Lorem ipsum dolor sit amet</div>
              <v-layout justify-center>
                <a href="javascript:;" class="margintitles">My Blog</a>
                <a href="javascript:;" class="margintitles">Other</a>
                
              </v-layout>
            </div>
          </v-flex>
          <v-flex xs12 md5 offset-md2>
            <div v-for="post in posts" :key="post.title">
              <v-card class="my-3" hover>
                <v-card-media
                  class="white--text"
                  height="170px"
                  :src="post.imgUrl">
                  <v-container fill-height fluid>
                    <v-layout>
                      <v-flex xs12 align-end d-flex>
                        <span class="headline">{{ post.title }}</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-media>
                <v-card-text>
                  {{ post.content }}
                </v-card-text>
                <v-card-actions>
    
                  <v-spacer></v-spacer>
                  <v-btn flat class="blue--text">Read More</v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer class="secondary" app>
      <v-layout row wrap align-center>
        <v-flex xs12>
          <div class="white--text ml-3">
            Made with
            <v-icon class="red--text">favorite</v-icon>
            by <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>
            and <a class="white--text" href="https://github.com/vwxyzjn" target="_blank">Costa Huang</a>
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
 </div>`,
 	methods:
	{
		findUserEmail: function(data)
		{
			var userData = data.val();
		  	var keys = Object.keys(userData);

		  	for (var i = 0; i < keys.length; i++) 
		  	{
		    	var key = keys[i];
		    	var user = userData[key];
		    	if (user.email == firebase.auth().currentUser.email)
		    	{
		    		this.userObj = user;
		    		this.firstName = user.FirstName;
		    		this.lastName = user.LastName;
		    		break;
		    	}
		  	}
		},
		getBlogs: function(data)
		{
			var blogData = data.val();
		  	var keys = Object.keys(blogData);

		  	for (var i = 0; i < keys.length; i++) 
		  	{
		    	var key = keys[i];
		    	var blog = blogData[key];
		    	this.populateBlog(blog);
		  	}
		},
		populateBlog: function(blog)
		{   var post = {};
		    post.title = blog.title;
		    post.content = blog.contents;
		    post.imgUrl = blog.imageURL;
			this.posts.push(post);

		},
		errData: function(error)
		{

		}
	},

	mounted:function()
	{
		var database = firebase.database();
		var userRef = database.ref('user');
		userRef.on("value", this.findUserEmail, this.errData);
		var blogRef = database.ref('blog');
		blogRef.on("value", this.getBlogs, this.errData);
	}

	
});