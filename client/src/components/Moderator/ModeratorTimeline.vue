<template>
    <div>
        <div id ="postmain">
            
                <div class="postfeed" v-for="(item,index) in posts " :key="index">
                
                    
                    <!-- Yo chai post ko content-->
                    
                        
                        <div class="toppost">
                            <table id="posttable" style="width:96%;">
                                <tr>
                                    <td rowspan="2" style="width:40px"><img src="../../../images/ProfilePic.jpg"  id="posticon"></td>     
                                    <td style="font-size: 20px; color:forestgreen; font-weight:bold" >{{item.name}}</td>
                                    <td style="width:20px"><button @click="deletepost(item._id)" class="btn btn-success" style="float:right; color:green; background-color:white; border:none;"><i class="fas fa-trash-alt"></i></button></td>
                                </tr>
                                <tr>
                                    <td style="font-size:12px; color: grey;">Posted at {{`${dateformat(item.date)}`}}</td>
                                </tr>
                            </table>
                        </div>
                    
                    
                        <div class="postarea">       
                            <div class="postcontent">
                                <b style="font-size: 13px">{{item.content}}</b>
                            </div>
                        </div>
                        <div class="changestat">
                            <table id="statstable">
                                <tr>
                                
                                    <td>
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
                                                <td width=1px><img src="../../../images/ProfilePic.jpg" align="left" id="otherprofileicon"></td>
                                                <td>
                                                    <span class="postcontent" >
                                                        <b style="color:darkgreen; font-size:15px;">{{comment.name}}</b>
                                                        {{comment.comment}}
                                                    </span>
                                                    <span style="color:grey; font-size:10px; margin-left:10px;">{{`${commentdateformat(comment.date)}`}}</span>
                                                    <button @click="deleteComment(comment._id)" class="btn btn-success" style="float:right; color:green; background-color:white; border:none;"><i class="fas fa-trash-alt"></i></button>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                    </div>
                                    
                            </div>
                            
                        </div>
                    </div>
                </div>
        </div>
    
        
</template>
<script>
import axios from 'axios';
import moment from 'moment';
export default {
    name: "ModeratorTimeline",
    props: ['msg'],
    data(){
        return{
            
            posts :[],
            followers: [],
            following: [],
            name: this.msg,
            //id: decode._id,
            
            commentContent: '',
            comments: [],
            commentdisplay: false,
            likes: [],
            num: ' ',
            allComment: [],
            notification: ''
        }
    },
    created(){
        const uname = this.name;
        
        axios.get(`http://localhost:5000/users/profile/post/${uname}`)
        
        .then(res=>{
          if(res.data.msg){

            this.posts = res.data.docs;axios.get("http://localhost:5000/users/post/likes")
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
        
        //followers ko lagi
        axios.get(`http://localhost:5000/users/follower/${uname}`)
        .then(res =>{
            if(res.data.msg){
                this.followers = res.data.docs;
            }
        })
        .catch(err=> alert(err))


        //following ko lagi 
        axios.get(`http://localhost:5000/users/follow/${uname}`)
            .then(res =>{
                if(res.data.msg){
                this.following = res.data.docs;
            }
            })
    },
    methods: {
        deletepost(id){
            // post delete afule
            axios.delete(`http://localhost:5000/users/post/${id}`)
                .then(res => {
                    if(res.data.deleted){
                        alert('post is deleted')
                         const uname = this.name;
                        axios.get(`http://localhost:5000/users/profile/post/${uname}`)
        
                            .then(res=>{
                            if(res.data.msg){

                                this.posts = res.data.docs;
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
                    }
                })
                .catch(err => alert(err));
        },
        //delete comment 
        deleteComment(id){
            axios.delete(`http://localhost:5000/users/post/deletecomment/${id}`)
                .then(res=>{
                    if(res.data.msg){
                        alert('comment deleted');
                        const uname = this.name;
        
        axios.get(`http://localhost:5000/users/profile/post/${uname}`)
        
        .then(res=>{
          if(res.data.msg){

            this.posts = res.data.docs;axios.get("http://localhost:5000/users/post/likes")
                .then(res=>{
                    if(res.data.msg){
                        this.likes = res.data.docs;
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
                .catch(err => alert(err));
          }
        })
        .catch(err =>alert(err)); 
                    }
                })
                .catch(err => alert(err));
        },
        gotoProfile(){
            alert("Click garyo");
        },
         
        
       count(postkoId){
            var likecount=this.likes.filter(function(post) {return post.postId == postkoId;});
            return likecount.length;
       },
       countcmd(postkoId){
            var commentcount=this.allComment.filter(function(post) {return post.postId == postkoId;});
            return commentcount.length;
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
        
        dateformat(value){
            if (value) {
                return moment(String(value)).format('hh:mm MM/DD')
            }
        },
        commentdateformat(value){
            if (value) {
                return moment(String(value)).format('hh:mm')
            }
   
    }
   

}}
</script>
<style scoped>
    #tabs a{
        margin-top: 5%;
    color: green;
    font-size: 15px;
    font-weight: bold;
}


.followerinfo{
    background-color: white;
    width: 100%;
  
    border-radius: 20px;
    
}
#tables3{
    
    width: 100%;
    color: black;
    border-collapse: collapse;
    
    
}
#tables3 tr:nth-child(2) {
    border-bottom: thin solid;
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
    border-bottom: 1px solid grey;
    padding-left: 10px;
    padding-right: 10px;
    width:100%;
}

#commentstats{
    
     font-weight: 700; 
     width:150px;
     background-color: white; 
     color: green;
}
#likestats{
    
     font-weight: 700; 
     width:150px;
     background-color: white; 
     color: green;
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
    padding-top: 1px;
    background-color: lightgray;
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
@media only screen and (min-width:0px) and (max-width: 900px){
    #commentstats{
        width: 50px;

    }
    #statstable td{
    padding-left:20px;
}
} 
</style>