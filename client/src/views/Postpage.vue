<template>
 <div class="pok" >
   <div class="mainbody">
   <div class="home-header">
    <NavBar/>
   </div>
   <div class="homebody">
     <div id="leftbtn">
        <button @click="openrlb" ><i class="fas fa-arrow-right" style="color:seagreen;"></i></button>
      </div>
      <div class="resleftbody" ref="rlb" id="rlb">
        <div id="rightbtn">
        <button @click="closerlb" style="float:right; "><i class="fas fa-arrow-right" style="color:seagreen; transform: rotate(180deg); font-size:20px"></i></button>
      </div>
          <UserInfo/>
        <div class="hotposition">
          <HotTopics/>
        </div>
      </div>

      <div class="leftbody">
        <UserInfo/>
        <div class="hotposition">
          <HotTopics/>
        </div>
      </div>
      <!--<div ref="mobleftid" id="mobleftid" class="mobleftbody">
            <div  ref="mtlsidenav"  id="mtlsidenav" class="mobleftcontent">
            <button style="margin-left:90%" @click="closeleftslide">+</button>
            <div class="animationslideleft">
            <UserInfo/>
            <HotTopics/>
            </div>
            </div>
            
              <div @click="openleftslide" id="leftslider" ref="leftslider" class="leftnav">
              <div id="leftsliderarrow">
                <i class="fas fa-arrow-right"></i>
              </div>
            </div>
                        
      </div>-->
     <div class="middlebody">
       
        <Singlepost :id="pID" :key="pID"/>
     </div>
     <div id="rightbtn"  style="width:5%; height:90%;">
        <button @click="openrrb" style="float:right; "><i class="fas fa-arrow-right" style=" color:seagreen; transform: rotate(180deg);"></i></button>
      </div>
      <div class="resrightbody" ref="rrb" id="rrb">
        <div id="leftbtn" style="height:100% ; width:6%;" >
        <button @click="closerrb" ><i class="fas fa-arrow-right" style="color:seagreen; font-size:20px"></i></button>
      </div>
      <div style="height:600px; overflow:scroll;">
        <FollowRecom style="transform:scale(0.9);"/>
      </div>
      </div>
      <div class="rightbody">
        <FollowRecom/>
      </div>
      
    </div>
  </div>
 </div>  
</template>
<script>
import UserInfo from '../components/UserHome/UserInfo';
import NavBar from '../components/UserHome/NavBar';
import HotTopics from '../components/UserHome/HotTopics';
import Singlepost from '../components/UserHome/Singlepost';

import FollowRecom from '../components/UserHome/FollowRecom';
import jwtDecode from 'jwt-decode';


export default {
  name: "postpage",
  data(){
     
    const token = localStorage.usertoken
    const decoded = jwtDecode(token)
    
    return {
      
      name: decoded.name,
      email: decoded.email,
      pID:''
     
    }
  },
  components: {
    UserInfo,
    NavBar,
    HotTopics,
    Singlepost,
   
    FollowRecom
  },
  
  created(){
    this.pID = this.$route.params.postID;
    
  },
  methods:{
    openrlb(){
      var vm=this;
      vm.$refs.rrb.style.marginRight = '-100%';
      vm.$refs.rlb.style.marginLeft = '0%';
    },
    closerlb(){
      var vm=this;
     
      vm.$refs.rlb.style.marginLeft = '-100%';
    },
    openrrb(){
      var vm=this;
     vm.$refs.rrb.style.marginRight = '0%';
     vm.$refs.rlb.style.marginLeft = '-100%';
    },
    closerrb(){
      var vm=this;
      vm.$refs.rrb.style.marginRight = '-100%';
    }
  },
  watch: {
        '$route' () {
        this.pID = this.$route.params.postID;
        }
    },
}
</script>
<style scoped>
#leftbtn{
  visibility: hidden;
    opacity: 0;
    position: fixed; 
    transition: 0.2s;
    width: 5%;
    height: 90%;
    transition:0.5s;
    font-size: 3vw;
}
#leftbtn button{
  width: 100%;
  height: 100%;
  background-color: rgb(245, 255, 245);
  border: none;
  border-right:1px solid green;
}
#rightbtn{
  visibility: hidden;
    opacity:0;
    position: fixed; 
    transition: 0.5s;
    width: 6%;
    height: 100%;
    right: 0px;
    font-size: 3vw;
    z-index: 5;
}
#rightbtn button{
  width: 100%;
  height: 100%;
  background-color: rgb(245, 255, 245);
  border: none;
  border-left:1px solid green;

}

.resleftbody{
  
  background-color: rgb(222, 253, 222);
  border: 2px solid green;
  position: fixed;
    left: 0%;
    top: 70px;
    height: 98.5%;
    width: 400px;
    transition: 1s;
    z-index: 6;
    transform: scale(0.9);
    transform-origin: 0 0;
    margin-left: -100%;
    
}
.resrightbody{
  
  background-color: rgb(222, 253, 222);
  border: 2px solid green;
  position: fixed;
    right: -80px;
    top: 70px;
    height: 98.5%;
    width:450px;
    transition: 1s;
    z-index: 6;
    transform: scale(0.9);
    transform-origin: 0 0;
    margin-right: -100%;
    
}
.mainbody{
  position: absolute;
  height: 100%;
  width: 100%;
  }
  .leftbody{
    position: absolute;
    left: 0%;
    height: 100%;
    width: 25%;
    transition: 0.2s;
    
    
}
.home-header{
  border-bottom: 1px solid green;
}
.postclass{
  background-color: lightgray;
  
    padding-left: 3px;
    padding-right: 3px;
}
.middlebody{
    position: absolute;
    left: 25%; 
    background-color: rgb(235, 235, 235);
    width: 50%;
    border-bottom: 1px solid green;  
    border-right: 1px solid green;
     border-left: 1px solid green;
     transition: 0.5s;
     z-index: 1;
}
.middlebody::-webkit-scrollbar {
    width: 10px;
}
.middlebody::-webkit-scrollbar-thumb:hover {
  background: green; 
}
.middlebody::-webkit-scrollbar-thumb {
  background: rgb(59, 163, 59); 
  border-radius: 10px;
}
.rightbody{
    position: absolute;
    right: 0%;
    height: 100%;
    width: 25%;
    transition: 0.2s;
}
.homebody{
  margin-top: 0%;
  background-color: white;
  height:90%;
  width:100%;
  position: absolute;
  left: 0%;
  border-radius: 20px;
}


.hotposition{
  margin-top:20%;
}
@media only screen and (max-width: 1100px) {
    
    .leftbody{
      opacity: 0;
      visibility: hidden;
    }
    .rightbody{
      opacity: 0;
      visibility: hidden;
    }
    .middlebody{
      position: absolute;
      left:5%;
      width: 90%;
    }
    .homebody{
      
      width: 100%;
    }
    #leftbtn{
    opacity: 100;
    visibility: visible;
    }
    #rightbtn{
      opacity: 100;
      visibility: visible;
    }
    
  
}
</style>
