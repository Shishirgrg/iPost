<template>
    <div> 
        
                    <div class="followtext">
                        <div id="followtext1">
                           <h4><b>Whom to follow?</b></h4> 
                           <ul class="list-group list-group-flush" v-for="(item,index) in users.slice(0, maxshowfollow) " :key="index">
                  
                            <li class="list-group-item" style="padding-left:20%; text-align:left;"><img :src="require('../../../../server/public/'+item.imagePath)" id="otherprofileicon" >
                              <!-- yo chai username ma click garyo bhaye jane thau--> 
                                    <router-link :to="{ name: 'otherprofile' ,params:{name: item.name}}" style="font-size: 15px; color:forestgreen; font-weight:bold" >{{item.name}} </router-link>
                                    <!-- yedi username bhayo bhane userprofile ma janu paryo -->
                                    <!-- <router-link :to="{ name: 'UserProfile'}" >{{item.name}} </router-link> -->

                              
                            <br>
                            <form @submit="follow(name,id,info[0].imagePath, item.name, item._id, item.imagePath)"><button type="submit" class="btn btn-success" id="followbtn">Follow</button></form></li>
                            
                            </ul>
                            <label v-if="users.length==0" >No more suggestions</label>
                            <div v-if="maxshowfollow<users.length" @click="showmore()" class="showmore">
                            Show more
                            </div>
                    </div>
                </div>
        

     
    </div>
   
</template>

<script>
import jwtDecode from 'jwt-decode'
import axios from 'axios';
export default {
    name: "FollowRecom",
    data(){
      const token = localStorage.usertoken
      const decode = jwtDecode(token)
      return{
        maxshowfollow: 3,
        users: [],
        name: decode.name,
        id: decode._id,
        
        
      }
    },
    created(){
      //profile pic
       axios.get(`http://localhost:5000/users/user/${this.name}`)
            .then(res=>{
                if(res.data.success){
                    this.info = res.data.docs;
                
                    //this.path= '../../../../server/public/'+this.info[0].imagePath;
                }
            })
            .catch(err => alert(err));
        
      axios.get(`http://localhost:5000/users/followrecommendation/${this.name}`)
      
        .then(res =>{
          const array = res.data.users;
          this.users = array.filter(user => user.name !== this.name)
        })
        .catch(err=> alert(err))
    },
    methods: {
      showmore(){
        this.maxshowfollow =this.maxshowfollow + 3 ;
        //console.log(this.maxshowfollow);
      },
      follow(name, userID,userPic ,followName, followId , fPic){ 
        //alert(userPic+"["+fPic+"]");
          axios.post("http://localhost:5000/users/follow", {name, userID, userPic, followName, followId, fPic})
            .then(res =>{
              if(res.data.docs){
                

                //send follow notification
                const notificationType = '3';
                axios.post("http://localhost:5000/users/notifications", {name, followName ,notificationType })
                  .then(res=>{
                    if(res.data.success){
                      //alert("Follow notification sent")

                      // followed garpepachi hatnu paryo ni recommended bata 
                      axios.get(`http://localhost:5000/users/followrecommendation/${this.name}`)
            
                          .then(res =>{
                            const array = res.data.users;
                            this.users = array.filter(user => user.name !== this.name)
                          })
                          .catch(err=> alert(err))
                    }
                  })
                  .catch(err=>alert(err));

                
              }
            })
            .catch(err=> alert(err));
       
         
      }
    }

    
    
}
</script>

<style scoped>
 label{
  color:rgb(117, 117, 117);
  font-weight: 600;
  width:80% ;
  padding-top:20px; 
  border-radius:40px;  
   font-size:17px;
   text-align: center;
}
a:hover{
  text-decoration: none;
}
#followbtn{
   
   
    border-radius: 20px;
    font-weight: bold;
   
    
    width: 150px;
}
.followtext{
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
    text-align: center;
    
  }
  
  #followtext1{
      font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    font-size:15px;
    padding:5%;
  
   color: black;
    
  }
 
#otherprofileicon{
    
    border-radius: 50%;
   width: 40px;
   height: 40px;
   margin-right: 10px;
   
   vertical-align:middle  ;
   border: 3px solid rgb(146, 209, 150);
 
}
button{
  border-radius: 20px;
  width:70%;
  margin-top:5px;
}
.showmore{
  margin-top: 10px;
  padding: 5px;
  color: green;
  font-size: 18px;
  font-weight: 600;
  
  padding-right: 50px;
}
.showmore:hover{
  cursor: pointer;  
}

</style>
