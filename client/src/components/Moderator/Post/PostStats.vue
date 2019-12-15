<template>
    <div>
        <div class="container">
            <div class="changestat">
                <table id="statstable">
                    <tr>
                        <td>
                            <button id="btnstats" class="btn btn-success" @click="addLiked(item.liked,data1.indexOf(item))" v-if="(item.liked)" style="background-color: green;color: white;"><i class="fas fa-thumbs-up"></i></button>
                            <button id="btnstats" class="btn btn-success" @click="addLiked(item.liked,data1.indexOf(item))" v-else style="background-color: white;color: green;"><i class="fas fa-thumbs-up"></i></button>                                                                     
                        </td>
                        <td>
                            <button id="btnstats"   class="btn btn-success" @click="(item.commentshow=!item.commentshow)" v-bind:value="item.commentshow" v-if="(item.commentshow)" style="background-color: green; color: white"><i  class="fas fa-comment-dots"></i></button>
                            <button id="btnstats" class="btn btn-success" @click="(item.commentshow=!item.commentshow)" v-bind:value="item.commentshow" v-else style="background-color: white; color: green"><i class="fas fa-comment-dots"></i></button>                                              
                        </td>                                                          
                    </tr>
                </table>
                <div  v-if ="(item.commentshow)">
                    <input type="text" style="width: 80%"  v-model="item.commenting"><button id="btn" class="btn btn-success" @click="addComment(item.commenting,data1.indexOf(item))" >Comment </button>
                    <div style="max-height:30%; overflow-y:scroll;">
                        <div v-for = "(comment,index) in item.comments " :key="index">
                            <table>
                                <tr>
                                    <td width=10px><img src="bullet.jpg" align="left" id="otherprofileicon"></td>
                                    <td>
                                        <div class="postcontent" >
                                            {{comment.comment_content}} 
                                        </div>
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
var date= new Date();
                var data={
                  username:'Prashant Dhoju',
                  commenting:'',
                  cart:[],
                  postdata:'',
                  commentshow:false,
                  data1 : [{
                    "id":0 ,
                    "name":"Prashant Dhoju",
                    "post":"I am grateful to all the people for showing their love and care towards me. I am pretty sure your blessing, wishes,love and support will remain through out the year and this will help me to get the best version of me ",
                    "date": "2015-12-2",
                    
                    "comments" : [
                      { "id":0 ,
                        "name":"Prashant Dhoju",
                        "comment_content":"I am grateful to all the people for showing their love and care towards me. I am pretty sure your blessing, wishes,love and support will remain through out the year and this will help me to get the best version of me ",
                        "date": "2015-12-5"},
                        ],
                        "liked":false
                },
                {   "id":1 ,
                    "name":"Shishir Gurung ",
                    "post":"I am grateful to all the people for showing their love and care towards me. I am pretty sure your blessing, wishes,love and support will remain through out the year and this will help me to get the best version of me ",
                    "date": "2015-12-2",
                    "comments":[
                    { "id":0 ,
                        "name":"Prashant Dhoju",
                        "comment_content":"I am grateful to all the people for showing their love and care towards me. I am pretty sure your blessing, wishes,love and support will remain through out the year and this will help me to get the best version of me ",
                        "date": "2015-12-5"}
                    ],
                    "liked":false
                },
                {    "id":2 ,
                    "name":"Bibek Gurung",
                    "post":"I am grateful to all the people for showing their love and care towards me. I am pretty sure your blessing, wishes,love and support will remain through out the year and this will help me to get the best version of me ",
                    "date": "2015-12-2",
                    "comments":[],
                    "liked":false
                }]
                
                }
export default {
 name:"PostStats",
 methods:{
                  addItem:function(product){
                    this.data1.push({ id:this.data1.length, name:this.username, post: product , date: date, comments:[], liked:false})
                   // alert("Posting Successful");
                  },
                  addComment:function(commenting,index){
                    
                    var ins = this.data1[index];
                    ins.comments.push({name:this.username, comment_content:commenting,date: date})
                  },
                  addLiked:function(liking,index){
                    var lik = this.data1[index];
                    lik.liked=!lik.liked;
                  }
                  
                }
}
/*
 var date= new Date();
                var data={
                  username:'Prashant Dhoju',
                  commenting:'',
                  cart:[],
                  postdata:'',
                  commentshow:false,
                  
                  data1 : [{}]

methods:{
                  addItem:function(product){
                    this.data1.push({ id:this.data1.length, name:this.username, post: product , date: date, comments:[], liked:false})
                   // alert("Posting Successful");
                  },
                  addComment:function(commenting,index){
                    
                    var ins = this.data1[index];
                    ins.comments.push({name:this.username, comment_content:commenting,date: date})
                  },
                  addLiked:function(liking,index){
                    var lik = this.data1[index];
                    lik.liked=!lik.liked;
                  }
                  
                }*/
</script>

<style scoped>
#posttable{
     
     width:40%;
     margin-left: 20px;
     margin-bottom: 20px;   
 }
 .postfeed{
    margin-top: 10px;
   
    width: 50%;
    color: black;
    background-color: white;
    border-radius: 20px;
    border-bottom: 4px solid gray;
   
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
    background-color: rgb(152, 255, 152);
    padding: 10px;
    border-radius: 20px;
    
}
.postarea{
    border-bottom: 2px solid grey;  
}
.toppost{
    border-bottom: 2px solid grey;
}
#btnstats{
    
     font-weight: 700; 
     
     width:150px;
}
.changestat{
    padding-top:10px;
   padding-bottom:10px;
}
#statstable td{
    padding-left:50px;
}
#btn{
    background-color: white;
     color: green;
     font-weight: 700; 
     border-radius: 20px;
     width:80px;
     
}
</style>
