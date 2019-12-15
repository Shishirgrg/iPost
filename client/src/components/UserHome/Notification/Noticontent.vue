<template>
    <div>
        <div class="noti_body">
            <div class ="noti_title">
                <div id="noti_title1">
                  <i class="fas fa-bell"></i>  Notifications
                </div>
            </div>
            <div class="noti_noti">
                <div id="noti_noti1">
                  <div style="margin-top:20px; margin-bottom:20px; width:100%; "  v-if="(notifications.length==0)" >
                    <div style=" width:100%; padding:10px; border-radius:10px;">
                      <label style=" ">Nothing to show</label>
                    </div>
                  </div>
                  <div v-for="(item,index) in notifications " :key="index">
                    
                        <table  id="tables3"  v-if="(checkname(item.sender))" >
                                <tr>
                                  <td rowspan="2" style="padding-left:10px; width:40px; height:50px;" ><img src="../../../../images/4ewS.gif" align="left" id="otherprofileicon"></td>
                                  <td style="width:100%; font-size: 15px; ">
                                    <div v-if="(checkname(item.sender) && (item.type==1 || item.type==2))">
                                      <router-link :to="{name:'postpage', params: {postID: item.postId }}"><b  style="color:green"><!--route profile-->{{item.sender}}</b><!--route post--> {{`${switching(item.type)}`}}</router-link>
                                      </div> 
                                    <div v-if="(checkname(item.sender) && (item.type==3 || item.type==4))">
                                      <router-link :to="{name:'otherprofile', params: {name: item.sender }}"><b style="color:green">{{item.sender}}</b> {{`${switching(item.type)}`}}</router-link>
                                      </div> 
                                    </td>  
                                </tr>
                                <tr>
                                  <td style="color:grey; font-size: 12px;">{{`${dateformat(item.date)}`}}</td>
                                </tr>
                        </table>
                  </div>
            </div>

            </div>
        </div>
    </div>

</template>

<script>
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import moment from 'moment'
export default {
    name:'noticontent',
    data(){
      const token = localStorage.usertoken
      const decode = jwtDecode(token)
      return{
        name: decode.name,
        notifications: []
      }
    },
    created(){
      axios.get(`http://localhost:5000/users/notifications/${this.name}`)
          .then(res=>{
            if(res.data.success){
              this.notifications = res.data.docs;
            }
          })
          .catch(err => alert(err));
    },
    methods:{
      checkname(value){
        if(value==this.name){
          return false;
        }
        else{
          return true;
        }
      },
      switching(value){
        switch(value){
         case "1":
            return("liked your post.");

          case "2":
             return("commented on your post.");
            
          case "3":
             return("has followed you.");
            
            case "4":
             return("has unfollowed you.");
            
        }
      },
      dateformat(value){
            if (value) {
                return moment(String(value)).format('YYYY/MM/DD hh:mm')
            }
        },
    }
}
</script>

<style scoped>
label{
  background-color: rgb(226, 226, 226);
  color:rgb(117, 117, 117);
  font-weight: 600;
  width:80% ;
  padding:20px; 
  border-radius:40px;  
   font-size:15px;
   text-align: center;
}
a{
  color: black;
}
a:hover{
  text-decoration: none;
}
.noti_body{
     background-color: white;
    width:80% ; 
    height: auto;
    padding: 10px; 
    position: absolute;
    left:10%;
    
    border-right: 1px solid green;
    border-left: 1px solid green;
    border-bottom: 1px solid green;
    
 }
 .noti_title
 {
    border-bottom: 1px solid lightgray;
 } 
 #noti_title1{
     margin-left: 2%;
     margin-bottom: 10px;
     text-align: left;
     font-size: 30px;
     font-weight: bold;
     color: green ;
 }
#otherprofileicon{
    
    border-radius: 50%;
   width: 40px;
   height: 40px;
   margin-right: 10px;
   
   vertical-align:middle  ;
   border: 3px solid rgb(146, 209, 150);
 
}
#tables3{
  margin-top:5px;
   background-color: rgb(234, 255, 234);
   border-radius: 20px;
  
}
#noti_noti1{
  margin-top:20px;
}
  
</style>