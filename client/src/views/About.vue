<template>
 <div class="pok" >
   <div class="mainbody">
   <div class="home-header">
    <NavBar/>
   </div>
   <div class="homebody">
      <div class="leftbody">
        <UserInfo/>
        <div class="hotposition">
          <HotTopics/>
        </div>
      </div>
      <div id="leftbtn">
        <button @click="openrlb" ><i class="fas fa-arrow-right" style="color:seagreen;"></i></button>
      </div>
      <div class="resleftbody" ref="rlb" id="rlb">
        <div id="rightbtn">
        <button @click="closerlb" style="float:right; "><i class="fas fa-arrow-right" style="font-size:20px;color:seagreen; transform: rotate(180deg);"></i></button>
      </div>
          <UserInfo/>
        <div class="hotposition">
          <HotTopics/>
        </div>
      </div>

     <div class="middlebody">
        <AddPost />
     </div>
     
     <div id="rightbtn"  style="width:5%; height:90%;">
        <button @click="openrrb" style="float:right; "><i class="fas fa-arrow-right" style="color:seagreen; transform: rotate(180deg);"></i></button>
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
      <!--<div ref="mobrightid" id="mobrightid" class="mobrightbody">
            <div  ref="mtrsidenav"  id="mtrsidenav" class="mobrightcontent">
            <button style="margin-left:90%" @click="closerightslide">+</button>
            <FollowRecom/>
            </div>
            
              <div @click="openrightslide" id="rightslider" ref="rightslider" class="rightnav">
              <div id="rightsliderarrow">
                <i  class="fas fa-arrow-right"></i>
              </div>
            </div>
                        
      </div>-->
    </div>
  </div>
 </div>  
</template>
<script>
import UserInfo from '../components/UserHome/UserInfo';
import NavBar from '../components/UserHome/NavBar';
import HotTopics from '../components/UserHome/HotTopics'
import AddPost from '../components/UserHome/AddPost';

import FollowRecom from '../components/UserHome/FollowRecom';
import jwtDecode from 'jwt-decode';


export default {
  
  data(){
     
    const token = localStorage.usertoken
    const decoded = jwtDecode(token)
    
    return {
      
      name: decoded.name,
      email: decoded.email,
      t: localStorage.usertoken
    }
  },
  created(){
    if(!this.t){
      this.$router.push("/");
    }
  },
  components: {
    UserInfo,
    NavBar,
    HotTopics,
    AddPost,
   
    FollowRecom
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
    /*openleftslide(){
      var vm = this;
      vm.$refs.mtlsidenav.style.display = 'block';
      vm.$refs.leftslider.style.marginLeft='100%';
      vm.$refs.leftslider.style.width='5%';  
      vm.$refs.mobleftid.style.width='95%';
      vm.$refs.mobleftid.style.zIndex='1';
    },
    closeleftslide(){
      var vm = this;
      vm.$refs.mtlsidenav.style.display = 'none';
      vm.$refs.leftslider.style.marginLeft='0%';
      vm.$refs.leftslider.style.width='100%';
      vm.$refs.mobleftid.style.width='5%';
      vm.$refs.mobleftid.style.zIndex='0';
    },
    openrightslide(){
      var vm = this;
      vm.$refs.mtrsidenav.style.display = 'block';
      vm.$refs.rightslider.style.marginRight='100%';
      vm.$refs.rightslider.style.width='5%';  
      vm.$refs.mobrightid.style.width='95%';
      vm.$refs.mobrightid.style.zIndex='1';
    },
    closerightslide(){
      var vm = this;
      vm.$refs.mtrsidenav.style.display = 'none';
      vm.$refs.rightslider.style.marginRight='0%';
      vm.$refs.rightslider.style.width='100%';
      vm.$refs.mobrightid.style.width='5%';
      vm.$refs.mobrightid.style.zIndex='0';
    }
    
  }*/
  }
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
    transition: 0.5s;
    
    
    
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
    left: 75%;
    height: 100%;
    width: 25%;
    transition: 0.5s;
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
.homebody{
  margin-top: 0%;
  background-color: white;
  height:90%;
  width:100%;
  position: absolute;
  left: 0%;
  border-radius: 20px;
}

#mobleftid{
  display: none;
}
#mobrightid{
  display: none;
}
.hotposition{
  margin-top:20%;
}

@media only screen and (max-width: 1100px) {
    
    .leftbody{
      opacity: 0;
    }
    .rightbody{
      opacity: 0;
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
