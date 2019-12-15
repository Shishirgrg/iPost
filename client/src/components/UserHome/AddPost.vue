<template>
<div>
                
    <div class="writepost" >
         <div id="writepost1">
                                
            <form @submit="addPost" id="form1" class="form-inline" >
                        <img v-if="(info[0].imagePath =='')" src="../../../images/ProfilePic.jpg" id="profileicon" >
                        <img  v-else :src="require('../../../../server/public/'+info[0].imagePath)" id="profileicon" /> 
                           
                        <textarea style="font-size:15px; vertical-align:middle; "  rows="3" v-model="postdata" placeholder="Please enter the post" required></textarea>
                        <button :disabled ='isDisabled' type="submit" style="margin-top:10px; width:50px" id="btn"> Post</button>
                 
                 
            </form>
         </div>
    </div>
         


            <!-- yaha chai get posts aaune thau -->
            
       <div id ="postmain" >
           
            <div class="postfeed" v-for="(item,index) in posts " :key="index"  >
               
                
                <!-- Yo chai post ko content-->
                
                    
                    <div class="toppost">
                        <table id="posttable">
                                <tr> 
                                <td rowspan="2" style="width:80px"><img :src="require('../../../../server/public/'+item.imagePath)"  id="posticon"></td>     
                                <td  >

                                    <!-- yo chai username ma click garyo bhaye jane thau--> 
                                    <router-link v-if="(item.name!=name)" :to="{ name: 'otherprofile' ,params:{name: item.name}}" style="font-size: 20px; color:forestgreen; font-weight:bold" >{{item.name}} </router-link>
                                    <!-- yedi username bhayo bhane userprofile ma janu paryo -->
                                    <router-link v-else :to="{ name: 'UserProfile'}"  style="font-size: 20px; color:forestgreen; font-weight:bold">{{item.name}} </router-link> 

                                </td>
                            </tr>
                            <tr>
                                
                                <td style="font-size:12px; color: grey;">Posted at {{`${dateformat(item.date)}`}}</td>
                            </tr>
                        </table>
                    </div>
                
                
                    <div class="postarea">       
                        <div class="postcontent">
                            <b style="font-size: 15px">{{item.content}}</b>
                        </div>
                    </div>
                
            <!-- Like and comment section  -->
            <div class="changestat">
                <table id="statstable">
                    <tr>
                       
                        <td>
                            <button id="likestats" ref="likestats" style="background-color:green; color:white;" class="btn btn-success" v-if="(likeswitch(item._id))" @click="unclicklike(item._id,item.name)"><i  class="fas fa-thumbs-up"></i></button>
                            <button id="likestats" ref="likestats" class="btn btn-success"  v-else @click="clicklike(item._id, item.name)" ><i  class="fas fa-thumbs-up"></i></button>
                            <button v-if="(item.commentdisplay)" id="commentstats" ref="commentstats" style="margin-left:50px; background-color:green; color:white;" class="btn btn-success" @click="getComment(item._id); item.commentdisplay = !item.commentdisplay"><i  class="fas fa-comment-dots"></i></button>
                            <button v-else id="commentstats" ref="commentstats" style="margin-left:50px;" class="btn btn-success" @click="getComment(item._id); item.commentdisplay = !item.commentdisplay"><i  class="fas fa-comment-dots"></i></button>
                            
                            <span class="statscount">{{`${count(item._id)}`}} <span style="font-size:12px">likes</span></span>
                            <span class="statscount" @click="getComment(item._id);  item.commentdisplay = !item.commentdisplay">{{`${countcmd(item._id)}`}} <span style="font-size:12px">Comments</span></span>                                            
                        </td>    
                                                                              
                    </tr>
                </table>
                
                <!--comment section  -->
                <div style="border-top:1px solid lightgray;">
                    
                        
                        <div v-for="(comment,commentSequence) in comments" :key="commentSequence" >
                            <table v-if="(comment.postId == item._id && item.commentdisplay== true )" id="tables3"  >
                                <tr>
                                    <td width=1px><img :src="require('../../../../server/public/'+comment.imagePath)" align="left" id="otherprofileicon"></td>
                                    <td>
                                        <span class="postcontent" >
                                            <b style="color:darkgreen; font-size:15px;">{{comment.name}}</b>
                                            {{comment.comment}}
                                        </span>
                                        <span style="color:grey; font-size:10px; margin-left:10px;">{{`${commentdateformat(comment.date)}`}}</span>
                                    </td>
                                </tr>
                            </table>
                            
                        </div>
                        <form @submit=" addComment(name,item._id, item.commentContent,item.name,info[0].imagePath); item.commentContent='' ; " style="margin:10px;" v-if="(item.commentdisplay)">
                        <input type="text" style="width: 80%; padding:5px; border:1px solid grey; border-radius:10px;"  v-model="item.commentContent" required>
                        <button  :disabled ='isDisabledComment' id="btn" type="submit" >Comment </button> 
                    </form>
                </div>
                
            </div>
        </div>
    </div>
</div>
                                
                                
      
     
        
    
</template>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>


import jwtDecode from 'jwt-decode'
import axios from 'axios'
import moment from 'moment'


export default {
    
    name: "AddPost",
    data(){
        const token = localStorage.usertoken
        const decode = jwtDecode(token)
        return{
            postdata: '',
            name : decode.name,
            posts:[],
            error: '',
            formatedate:'',
            commentContent: '',
            comments: [],
            commentdisplay: false,
            likes: [],
            num: ' ',
            allComment: [],
            notification: '',
            hot:[],
            info:''
        }
    },
    computed:{
      isDisabled(){
        return this.postdata === ''
      }
    //   isDisabledComment(){
    //       return this.commentContent === ''
    // }
  },
  
    created(){
        //profile pic ko lagi
        axios.get(`http://localhost:5000/users/user/${this.name}`)
            .then(res=>{
                if(res.data.success){
                    this.info = res.data.docs;
                
                    //this.path= '../../../../server/public/'+this.info[0].imagePath;
                }
            })
            .catch(err => alert(err));
        

        axios.get(`http://localhost:5000/users/postOfN/${this.name}`)
        
        .then(res=>{
          if(res.data.msg){
            //alert("post request pathayo")
            this.posts = res.data.myPost;
            //likes taneko
            axios.get("http://localhost:5000/users/post/likes")
                .then(res=>{
                    if(res.data.msg){
                        this.likes = res.data.docs;
                    }
                })
                .catch(err => alert(err));

            //getting all the comments
            axios.get("http://localhost:5000/users/post/comment")
                .then(res=>{
                    if(res.data.msg){
                        this.allComment = res.data.docs;
                    }
                })
                .catch(err => alert(err));

            
          }
        })
        .catch(err =>alert(err));  
          
    },
    
    methods: {
        //this doesnot work 
        clicklike(postkoId,postOwner){
            
            this.notification = "1";
            axios.post(`http://localhost:5000/users/post/likes/${postkoId}`,{name: this.name})
                .then(res=>{
                    
                    if(res.data.msg){
                        //sending the liked notification 
                        axios.post(`http://localhost:5000/users/notifications/${postkoId}`,{name: this.name, notify: this.notification, receiver: postOwner})
                            
                            .then(res=>{
                                if(res.data.success){
                                    //alert(' Like Notification sent')
                                    //getting all the likes again 
                                    axios.get("http://localhost:5000/users/post/likes")
                                        .then(res=>{
                                            if(res.data.msg){
                                                this.likes = res.data.docs;
                                            }
                                        })
                                        .catch(err => alert(err));
                                }
                            })
                            .catch(err => alert(err))
                        
                    }
                })
                .catch(err=> alert(err));
        
        },
        unclicklike(postkoId,postOwner){
            
            axios.delete(`http://localhost:5000/users/post/likes/${postkoId}`,{data:{ name: this.name }})
                .then(res=>{
                    if(res.data.delete){
                        
                        axios.delete(`http://localhost:5000/users/notifications/${postkoId}`,{data:{name: this.name, notify: this.notification, receiver: postOwner}})
                            .then(res=>{
                                if(res.data.success){
                                    //likes taneko including deleted like
                                    axios.get("http://localhost:5000/users/post/likes")
                                        .then(res=>{
                                            if(res.data.msg){
                                                this.likes = res.data.docs;
                                            }
                                        })
                                     .catch(err => alert(err));
                                }
                            })
                            .catch(err=> alert(err));
                        
                    }
                })
                .catch(err => alert(err));

        },
        likeswitch(postkoId){
             var likecount=this.likes.filter(function(post) {return post.postId == postkoId;});
             for(var i=0;i<likecount.length;i++)
             {  
                 
                 if(likecount[i].LikedBy==this.name)
                 {
                     return true;
                 }
             }
             return false;
        },
       count(postkoId){
            var likecount=this.likes.filter(function(post) {return post.postId == postkoId;});
            var count= likecount.length;
            
            
            return count;

       },
       countcmd(postkoId){
            var commentcount=this.allComment.filter(function(post) {return post.postId == postkoId;});
            var count= commentcount.length;
            
            
            return count;
       },
        getComment(postKoId){
            const pId = postKoId;   
             axios.get(`http://localhost:5000/users/post/comment/${pId}`)
                .then(res=>{
                    if(res.data.msg){
                        
                        this.comments = res.data.docs;
                        this.num = this.comments.length;
                    }
                    
                })
                .catch(err=> alert(err))
                
            
        },
        addComment(uname, postID, data, postOwner, comHanneKoPic){
            this.notification = "2";
            axios.post(`http://localhost:5000/users/post/comment/${postID}`,{name: uname, content: data, img: comHanneKoPic})
            
                .then(res=>{
                    if(res.data.msg){
                        
                        //alert("posted")
                        //sending notification
                        axios.post(`http://localhost:5000/users/notifications/${postID}`,{name: uname, notify: this.notification, receiver: postOwner})
                            .then(res=>{
                                
                                if(res.data.success){
                                    const pid = postID;  
                                    //alert("Notification sent") 
                                    //alert(pId)
                                    axios.get(`http://localhost:5000/users/post/comment/${pid}`)
                                        .then(res=>{
                                            if(res.data.msg){
                                                
                                                this.comments = res.data.docs;
                                                // comment count huni huna paryo
                                                //this.num = this.comments.length;
                                            }
                                            
                                        })
                                        .catch(err=> alert(err));
                                        
                                }
                            })
                            .catch( err=>alert(err));
                        
                        
                        //commentContent = " ";
                    }
                })
                .catch(err=> alert(err))
            

        },
        dateformat(value){
            if (value) {
                return moment(String(value)).format('hh:mm MM/DD')
            }
        },
        commentdateformat(value){
            if (value) {
                return moment(String(value)).format('hh:mm')
            }
        },
        addPost(){
            axios.post('http://localhost:5000/users/post',{post: this.postdata,username: this.name, img: this.info[0].imagePath})
                
                .then(res=>{
                    if(res.data.msg){
                        //alert("Posted")
                        this.postdata = ''
                        
                    //gettin all the post including the new one
                        axios.get(`http://localhost:5000/users/postOfN/${this.name}`)
                    
                            .then(res=>{
                                if(res.data.msg){
                                    
                                    this.posts = res.data.myPost;
                                    
                                }
                            })
                            .catch(err =>alert(err));  
                    }
                })
                .catch(err => alert(err));
            this.postdata= " ";

        },
        
        
        
    }
    
}
</script>

<style scoped>
textarea{
    resize: none;
    margin:10px;
    width:75%;
    transition: 0.5s;
}

a:hover{
  text-decoration: none;
}
.writepost{
    padding-top: 10px;
    padding-left: 20px;
    width: 100%;
    background-color: white;
    border-bottom: 1px solid green;
    
}
#writepost1{
    padding: 4px;
}


#profileicon{
    
     border-radius: 50%;
    width: 50px;
    height: 50px;
    
    vertical-align:middle;
    border: 5px solid rgb(146, 209, 150);
   
   
}
 
   

.followerinfo{
    background-color: white;
    width: 100%;
  
    border-radius: 20px;
    
}
#tables3{
    margin-top: 5px;
    width: 100%;
    color: black;
    border-collapse: collapse;
    
    
}


  #tables3 th,#tables3 td {
    padding: 5px;
   
    font-size: 15px;
   
  }
  #otherprofileicon{
    
    border-radius: 50%;
   width: 40px;
   height: 40px;
   margin-right: 10px;
   vertical-align:top  ;
   border: 3px solid darkgrey;
 
}

#tables3 input[type=text]{
    width: 70%;
    padding: 5px;
    margin: 1%;
    }
 #commentsection{
    padding: 10px;
    background-color: lightgrey;
    border-radius: 20px;
    width: 70%;
}
#posttable{
     
     width:40%;
     margin-left: 20px;
    
 }
 .postfeed{
    margin-top:3px;
    padding-top:5px;
   
    width: 100%;
    color: black;
    background-color: white;
    border: 1px solid lightgray;
    
   
   
}
#posticon{  
    border-radius: 50%;
    width: 60px;
    height: 60px;
    margin-right: 10px;
    vertical-align:top  ;
    border: 7px solid rgb(157, 255, 173);
  
}
.postcontent{
    
    margin-top:10px;
    margin-bottom: 10px;
    word-wrap: break-word;
    text-align: left;
    font-size: 12px;
    color:black;
    background-color: rgb(218, 255, 218);
    padding: 10px;
    border-radius: 20px;
    
}
.postarea{
    border-bottom: 1px solid lightgrey;
    padding-left: 10px;
    padding-right: 10px;
}

#commentstats{
    
     font-weight: 700; 
     width:150px;
     background-color: white; 
     color: green;
     transition: 0.5s;
}
#likestats{
    
     font-weight: 700; 
     width:150px;
     background-color: white; 
     color: green;
     transition: 0.5s;
}

.changestat{
    padding-top:10px;
   padding-bottom:10px;
  
}
#statstable{
     margin-left: 10px;
     margin-bottom: 10px;
}
#statstable td{
    padding-left:50px;
}

#postmain{
    padding-left:3px;
    padding-right:3px; 
    padding-bottom: 4px;
    }
#btn{
    width: 90px;
    border-radius:10px;
    color: white;
    background-color:green;
    padding: 5px;
    border: none;
    margin-left: 5px;
    border: 1px solid green;
}
#btn:active{
    font-weight: 700;
    background-color: white;
    color: green;
    border: 1px solid green;
}
.statscount{
    margin-left: 20px;
    color: gray;
    font-size: 15px;
}
.statscount:hover{
    color: rgb(75, 75, 75);
    cursor: pointer;
}
@media only screen and (max-width: 800px) {
    .writepost{
        padding-left:10px;
    }
    
    #likestats, #commentstats{
        width: 70px;

    }
    #statstable td{
    padding-left:20px;
}
@media only screen and (max-width: 1200px) {
    textarea{
        width: 60%;
        margin-left:5px;
    }
}

}




    
</style>
