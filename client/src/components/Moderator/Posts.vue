<template>
    <div>
        <div  id ="postmain">
           
            <div class="postfeed" v-for="(item,index) in posts " :key="index">
               
                
                <!-- Yo chai post ko content-->
                
                    
                    <div class="toppost">
                        <table id="posttable" style="width:90%">
                                <tr>
                                <td rowspan="2"  style="width:80px"><img src="../../../images/ProfilePic.jpg" id="posticon"></td>     
                                <td style="font-size: 20px; color:forestgreen; font-weight:bold" >
                                    <router-link :to="{ name: 'moderatorotherprofile' ,params:{name: item.name}}" style="color: green;font-weight: bold;"> {{item.name}} </router-link>
                                </td>
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
                
             <!-- Yo chai like, comment aaune thau-->

                    <div class="changestat">
                        <table id="statstable">
                            <tr>
                               
                                 <td>
                                    <button v-if="(item.commentdisplay)" id="commentstats" ref="commentstats" style=" background-color:green; color:white;" class="btn btn-success" @click="getComment(item._id); item.commentdisplay = !item.commentdisplay"><i  class="fas fa-comment-dots"></i></button>
                                    <button v-else id="commentstats" ref="commentstats"  class="btn btn-success" @click="getComment(item._id); item.commentdisplay = !item.commentdisplay"><i  class="fas fa-comment-dots"></i></button>
                                    
                                    <span class="statscount">{{`${count(item._id)}`}} <span style="font-size:12px">likes</span></span>
                                    <span class="statscount" @click="getComment(item._id);  item.commentdisplay = !item.commentdisplay">{{`${countcmd(item._id)}`}} <span style="font-size:12px">Comments</span></span>                                            
                                </td> 
                                 <td>
                                <button id="dbtn" class="btn btn-success"  @click="deletePost(item._id)">Delete</button>
                                </td>
                            </tr>

                        </table>
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
                                            </td>
                                            <td>
                                                <button @click ="deleteComment(comment._id)" class="btn btn-success" style="float:right;"><i class="fas fa-trash-alt"></i> delete</button>
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



import axios from 'axios'
import moment from 'moment'
export default {
    name: "Posts",
    data(){
        return{
            posts: [],
            formatedate:'',
            commentContent: '',
            comments: [],
            commentdisplay: false,
            likes: [],
            num: ' ',
            allComment: [],
        }
    },
    created(){
        
        axios.get("http://localhost:5000/moderator/post")
            .then(res=>{
                if(res.data.msg){
                    this.posts = res.data.docs;
                }
            })
            .catch(err => alert(err))
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
    },
    methods: {
        deletePost(ID){
            axios.delete(`http://localhost:5000/moderator/post/${ID}`)
                .then(res =>{
                    if(res.data.deleted){
                        //deleted
                        alert("deleted")
                        axios.get("http://localhost:5000/moderator/post")
                            .then(res=>{
                                if(res.data.msg){
                                    this.posts = res.data.docs;
                                }
                            })
                            .catch(err => alert(err));
                                        
                    }
                })

                .catch(err => alert(err));            
        },
        count(postkoId){
            var likecount=this.likes.filter(function(post) {return post.postId == postkoId;});
            var count= likecount.length;
            
            
            return count;

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
        },
        //delete comment 
        deleteComment(id){
            axios.delete(`http://localhost:5000/users/post/deletecomment/${id}`)
                .then(res=>{
                    if(res.data.msg){
                        alert('comment deleted');
                        axios.get("http://localhost:5000/moderator/post")
                            .then(res=>{
                                if(res.data.msg){
                                    this.posts = res.data.docs;
                                }
                            })
                            .catch(err => alert(err))
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
                                .catch(err => alert(err));
        }
    }
}
</script>
<style scoped>
#postmain{
    padding-left:3px;
    padding-right:3px; 
    padding-bottom: 4px;
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
    border: 5px solid rgb(136, 223, 150);
  
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


#btnstats{
    
     font-weight: 700; 
     
     width:150px;
}
.changestat{
    padding-top:10px;
   padding-bottom:10px;
  
}
#statstable{
     margin-bottom: 10px;
     width: 95%;
}
#statstable td{
    padding-left:10px;
}
#btn{
    background-color: white;
     color: green;
     font-weight: 700; 
     border-radius: 20px;
     width:80px;
     
}
#dbtn{
    background-color: white;
     color: green;
     font-weight: 700; 
     border-radius: 20px;
     width:150px;
     float:right;
}
#dbtn:active{
    background-color: green;
    color: white;
}
#commentstats{
    
     font-weight: 700; 
     width:150px;
     background-color: white; 
     color: green;
     transition:0.5s;
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
a:hover{
    text-decoration: none;
}
@media only screen and (min-width:0px) and (max-width: 900px){
    #commentstats{
        width: 50px;

    }
    #statstable td{
    padding-left:20px;
    }
    #dbtn{
        width:100px;
    }
} 
</style>

