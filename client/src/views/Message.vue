<template>
    <div style="background-color: rgb(215, 255, 215)">
        <div class="fullbody">
            <div class="home-header"> 
                <NavBar/>
            </div>
            <div class="mainbody">
                <Messageshow/>
                    <!--eta chai search ani v-for garera name haru dekhauni-->
                    <!--<Searchchat v-on:sendData="pushData($event)"/>-->
                
                
                    <!--eta chai sending ra comment dekhauni tyo chai v-for hanni ho-->
                    <!--<Readchat :value="inConversationWith"/>-->
                
            </div>
        </div>
    </div>
</template>
<script>
import NavBar from '../components/UserHome/NavBar';
import Messageshow from '../components/UserHome/Message/Messageshow';

export default {
    name: "message",
    components: {
        NavBar,
        Messageshow
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
    }
  
}
</script>
<style scoped>
.home-header{
  border-bottom: 1px solid green;
}
.fullbody{
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgb(242, 255, 242);
}
.mainbody{
    position:absolute;
    left: 5%;
    width: 90%;
    height: 91%;
    border-right: 2px solid green;  
    border-left: 2px solid green;
    border-bottom: 2px solid green;
}
.leftbody{
    position: absolute;
    left: 0px;
    top: 0px;
    height: 100%;
    width:30%;
    background-color: white;
    border-right: 1px solid green;
}
.rightbody{
    position: absolute;
    right: 0px;
    top: 0px;
    height: 100%;
    width:70%;
}
    
</style>