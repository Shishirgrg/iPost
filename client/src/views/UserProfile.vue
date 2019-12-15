<template>
    <div>
        <div class="UPmainpage">
            <div class="UPtop">
                <NavBar/>
            </div>
            <div class="UPmainbody">
                <div id="leftbtn">
                    <button @click="openrlb" ><i class="fas fa-arrow-right" style="color:seagreen;"></i></button>
                </div>
                <div class="resleftbody" ref="rlb" id="rlb">
                    <div id="rightbtn">
                    <button @click="closerlb" style="float:right; "><i class="fas fa-arrow-right" style="color:seagreen; transform: rotate(180deg);"></i></button>
                    </div>
                    <div class="UPlefti">
                        <div class="UPltop">
                            <UPInfo/>
                        </div>
                        <div class="UPlbottom">
                            <UPBio/>
                        </div>
                    </div>
                </div>  
                <div class="UPleft">
                    <div class="UPltop">
                        <UPInfo/>
                    </div>
                    <div class="UPlbottom">
                        <UPBio/>
                    </div>
                </div>
                <div class="UPright">
                    <UPTimeline/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import NavBar from '../components/UserHome/NavBar';
import UPBio from '../components/UserHome/UserProfile/UP_Bio';
import UPInfo from '../components/UserHome/UserProfile/UP_Info';
import UPTimeline from  '../components/UserHome/UserProfile/UP_Timeline';
export default {
    name: "userprofile",
    components: {
    UPBio,
    NavBar,
    UPInfo,
    UPTimeline
  },
  data(){
      return{
           t: localStorage.usertoken
      }
  },
    created(){
        if(!this.t){
        this.$router.push("/");
        }
    },
    methods:{
        openrlb(){
      var vm=this;
      
      vm.$refs.rlb.style.marginLeft = '0%';
    },
    closerlb(){
      var vm=this;
     
      vm.$refs.rlb.style.marginLeft = '-100%';
    },
    }
}

</script>
<style scoped>

.UPmainpage{
  position: absolute;
  height: 100%;
  width: 100%;
  
}
.UPmainbody{
      position: absolute;
    left: 0%;
    margin-top:0%;
    width: 100%;
    height: 91%;
    background-color: white;
}

.UPtop{
  border-bottom: 2px solid green;
}
.UPltop{
    margin-top: 20px;
    padding-left: 10px;
    height: auto;
    padding-bottom: 20px;
    
    border-bottom: 1px solid lightgray;   
}
.UPlbottom{
    position: absolute;
    margin-top:10%;
    width: 80%;
    margin-left: 10%;
    background-color:rgb(228, 253, 228);
    border: 1px solid rgb(189, 218, 189);
    border-radius: 10px;
}
.UPleft{
    position: absolute;
    left: 0%;
    background-color: white;    
    width: 30%;
    height: 100%;
    border-right: 1px solid lightgrey;
    transition: 0.5s;

}
.UPlefti{
    position: absolute;
    left: 0%;
    background-color: white;    
    width: 100%;
    height: 100%;
    border-right: 1px solid lightgrey;
    transition: 0.5s;

}
.UPright{
    position: absolute;
    right: 0%;
    width: 70%;
    height: 100%;
    background-color: white;
    transition: 0.5s;
}
#leftbtn{
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
  z-index: 6;
  border-right:1px solid green;
}
#rightbtn{
    
    position: fixed; 
    transition: 0.5s;
    width: 6%;
    height: 100%;
    right: 0px;
    font-size: 20px;
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
    margin-left: -200%;
    
}
@media only screen and (min-width : 0px) and (max-width: 900px) {
    .UPleft{
        opacity: 0;
        z-index: 0;
        visibility: hidden;
    }
    .UPright{
        width: 95%;
    }
    #leftbtn{
        opacity: 100;
    }
    #rightbtn{
      opacity: 100;
    }
}
</style>