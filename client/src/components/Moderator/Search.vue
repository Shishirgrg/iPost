<template>
    <div>
        <div id="topsearch">
                      
                      <nav class="navbar fixed-top navbar-expand navbar-light" style="font-weight:bold; background-color:white;">
                            <div >
                                <form id="searchbtn" class="form-inline my-2 my-lg-0">
                                <input class="form-control mr-sm-2" type="search"  placeholder="Search" aria-label="Search" @input="search"  v-model="searchContent">
                                <button id="sbtn" class="btn btn-success" @click="showNotification1(false)"><i class="fas fa-search" ></i></button>
                                    <div v-if="(searchContent!='')"  class="dpdownbody1" id="notificationid1" ref="notificationid1">
                                            <span style="font-size:30px; color:green;" >Search result</span>
                                            <ul style="text-align:left; border-top: 1px solid grey">
                                            <label style="margin-top:20px; margin-bottom:20px;" v-if="(user.length==0)" >Nothing to show</label>
                                            <div v-for="(item,index) in user" :key="index">
                                                <router-link :to="{name:'moderatorotherprofile', params: {name: item.name }}"  style="color: green;font-weight: bold;" ><li ><img src="../../../images/ProfilePic.jpg"  id="posticon"> <span style=" font-size:17px; ">
                                                {{item.name}}</span> </li> </router-link>
                                            </div>
                                            </ul>
                                                    
                                        </div>
                                <button v-on:click="logout()" style="margin-left:5px;" class="btn btn-success" type="button"><i class="fas fa-sign-out-alt" ></i></button>
                                </form>
                            
                          </div>
                        </nav> 
        </div>   
         
    </div>
                       
    
    
</template>

<script>
import axios from 'axios'
export default {
    name:"Search",
    data(){
        return{
            searchContent: '',
            user: []
        }
    },
    methods: {
        logout(){
        localStorage.removeItem('moderatorToken')
        this.$router.push("/");
      },
      showNotification1(value){
        var vm = this;
        if(value == true){
          
          vm.$refs.notificationid1.style.visibility = 'hidden';
          vm.$refs.notificationid1.style.height = '0px';
          vm.$refs.notificationid1.style.opacity = '0';
          
        }
          else
          {
            
            vm.$refs.notificationid1.style.visibility = 'visible'
            vm.$refs.notificationid1.style.opacity = '1';
            vm.$refs.notificationid1.style.height = 'auto';
          }
        
        
      },
      search(){
        axios.post(`http://localhost:5000/users/find/${this.searchContent}`)
          .then(res=>{
            if(res.data.found){
              
              if(res.data.docs != ''){
                  //yo user bhanne array ma sabai data haru cha
                  this.user = res.data.docs;
                  this.showNotification1(false);
              }else{
                  //alert('uers chahi payena')
                  this.user = [];
                  this.showNotification1(false);
              }
              
            }else{
             //alert("something is wrong")
            }
            
            
          })
          .catch(err=> {if(err){ 
                  this.user = [];
                  this.showNotification1(true);
          }
          });
          
      },
    }
}
</script>
 <style scoped>
 
 nav{
  height: 60px;
  border-bottom: 1px solid green;
}
 #topsearch{
     position: absolute;
     right:10px;
     text-align: right;
     
     width: 100%;
     
     
      }
      #searchbtn{
          position: absolute;
          top:10px;
          right: 10px;
          transition: 0.5s;
          
      }




#btnstats{
    background-color: white;
     color: green;
     font-weight: 700; 
     border-radius: 20px;
     width:150px;
}

#notificationid1{
 padding:10px;
  visibility: hidden;
  z-index: 1;
  position: absolute;
  top:60px;
  right: 50px;
  height:0px;
  width:300px;
  background-color: white;
  border: 1px solid green;
  opacity: 0;
  text-align:center;
  
}
.dpdownbody1 ul{
  list-style: none;
  margin: 0%;
  padding: 0%;
}
.dpdownbody1 li{
  border-bottom: 1px solid grey;
  padding: 10px;
}
#posticon{  
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 10px;
    vertical-align:middle ;
    border: 4px solid rgb(157, 255, 173);
  
}
a:hover{
  text-decoration: none;
}
@media only screen and (max-width: 1100px) {
    input[type=search]{
      width: 65%;
    }
}
</style>



