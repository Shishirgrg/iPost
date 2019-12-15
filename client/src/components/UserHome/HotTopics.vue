<template>
    <div> 
         <div class="hottopic">
           
            <div id="hotcontent">
               <ul class="list-group list-group-flush">
                 
                  <li class="list-group-item"> <h4><b> Hot topics </b></h4></li>
                
                  <li class="list-group-item "  v-for="(item,index) in hot.slice(0,3)" :key="index">
                    
                    <router-link  :to="{name:'postpage', params: {postID: item.id }}" >
                    <div style="font-size:15px; margin-left:10px;  text-align:left; color:green; font-weight:bold">  {{item.name}}
                    </div>
                    <div id="hotkura"  style="text-align:left;  font-weight:600;  " >  {{item.content}}
                    </div>
                    </router-link>
                    <!-- esko satta ma content hunxa--></li>
                 
            </ul>
                        </div>
                        </div>
                        
                
               
    </div>
</template>

<script>
import axios from 'axios'
// import jwtDecode from 'jwt-decode'
export default {
    name: "HotTopics",
    data(){
      // const token = localStorage.usertoken
      // const decode = jwtDecode(token)
      return{
        name: this.name,
        total: [],
        posts: [],
        likes:[],
        hot:[]
      }
    },
    created(){

       
        
      //This is still construction
  //---------------------------------------------------------------------

      // All posts liyo
      axios.get("http://localhost:5000/users/post")
        .then(res=>{
          if(res.data.docs){
            this.posts = res.data.docs;
            //get likes for post id
          
            for(var i=0; i<this.posts.length; i++){
              
              axios.get(`http://localhost:5000/users/post/likes/${this.posts[i]._id}`)
                .then(res=>{
                  if(res.data.docs != ''){
                    this.total[i] = res.data.docs;
                    this.hotting()
                  }else{
                    //err
                  }
                })
                .catch(err => alert(err));
            }
          }
        })
        .catch(err=> alert(err));
        axios.get("http://localhost:5000/users/post/likes")
                .then(res=>{
                    if(res.data.msg){
                        this.likes = res.data.docs;   
                    }
                })
                .catch(err => alert(err));

       //----------------------------------------------------------------------
       
    },
    updated(){
     //this.hotting();  
     
    },
    methods:{
      hotting(){
        
            this.hot=[];
            var pok=this.posts;
            var likecount;
            for (var i = 0; i<pok.length;i++){
                likecount=this.likes.filter(function(post) {return post.postId == pok[i]._id;});
                this.hot.push({ id:pok[i]._id,content:pok[i].content,likes:likecount.length,name:pok[i].name});
                
            }
            
            this.hot.sort(function(a,b){
                return b.likes - a.likes;
            });
            
        }
    },
    
}
</script>

<style scoped>

  .hottopic{
    border: 1px solid lightgrey;
      margin: 20px;
    
      width: 80%;
    background-color: rgb(245, 253, 236);
       
      
    
  }
  ul{
    border-radius: 10px;
  }
  li{
    background-color: rgb(245, 253, 236);
    border-radius: 10px;
  }
  #hotcontent{
      font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    font-size:15px;
    padding:2%;
  
   color: black;
    
  }
  #hotkura{
    word-wrap: break-word;
    max-height: 110px;
    text-align: left;
    font-size: 13px;
    color:rgb(83, 83, 83);
    overflow: hidden;
    background-color: rgb(233, 233, 233);
    padding: 10px;
    border-radius: 20px;
  }
 a:hover{
   text-decoration: none;
 }
</style>
