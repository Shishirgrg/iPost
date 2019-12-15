<template>
    <div>
        <div class="mainbody">
            <div class="topright" style="border-bottom: 1px solid lightgrey">
                    <Search/>
                   </div>
                <div class="m_leftside" >
                    <UserInfo/>
                </div>
                <div class="m_rightside">
                   
                   <div class="bottomright">
                       <div class="firsthalf">
                        <Posts/>
                       </div>
                       <div id="rightbtn"  style="width:5%; height:90%;">
                                <button @click="openrrb" style="float:right; "><i class="fas fa-arrow-right" style="color:seagreen; transform: rotate(180deg);"></i></button>
                            </div>
                            <div class="resrightbody" ref="rrb" id="rrb">
                                <div id="leftbtn" style="height:100% ; width:6%;" >
                                <button @click="closerrb" ><i class="fas fa-arrow-right" style="color:seagreen; font-size:20px"></i></button>
                            </div>
                            <div class="userlist" style="height:600px; overflow:auto;">
                                <UsersList style=" transform:scale(0.9);"/>
                            </div>
                            </div>
                        <div class="secondhalf">
                            <UsersList/>
                        </div>
                   </div>
                
            </div>
        </div>
    </div>
</template>

<script>    
import Posts from "../components/Moderator/Posts"
import Search from '../components/Moderator/Search'
import UserInfo from '../components/Moderator/UserInfo'
import UsersList from '../components/Moderator/UsersList'
export default {
    name: "Moderator",
    components: {
        UserInfo,
        Search,
        Posts,
        UsersList
    },
    data(){
      return{
           t: localStorage.moderatorToken
      }
  },
    created(){
        if(!this.t){
        this.$router.push("/");
        }
    },
    methods:{
        openrrb(){
      var vm=this;
     vm.$refs.rrb.style.marginRight = '0%';
    },
    closerrb(){
      var vm=this;
      vm.$refs.rrb.style.marginRight = '-100%';
    }
    }
}
</script>

<style scoped>
    .m_rightside{
    
        position: absolute;
       right: 0%;
        width: 80%;
        height: 100%;
        background-color: white;
        transition: 0.5s;
}
    .m_leftside{
        position: absolute;
        left: 0%;
        background-color: white;    
        width: 20%;
        height: 100%;
        border-right: 1px solid lightgrey;
        transition: 0.5s;
    
}
.topright{
    position: absolute;
    top:0%;
    height:9%;
    width: 100%;
    
}
.bottomright{
    
    position: absolute;
    top:60px;

    width: 100%;
    background-color: rgb(235, 235, 235);   
}
.firsthalf{
    position:absolute;
    left: 0px;
    width:70%;
    height:auto;
    border: 1px solid lightgrey;
    
    
}
.secondhalf{
    position: absolute;
    right: 0px;
    width:30%;
    height: auto;
    border:1px solid lightgray;
    
}
#leftbtn{
  visibility: hidden;
    opacity: 0;
    position: fixed; 
    transition: 0.2s;
    width: 5%;
    height: 90%;
    transition:0.5s;
    font-size: 3vw;
    z-index: 8;
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

.resrightbody{
  
  background-color: white;
  border: 2px solid green;
  position: fixed;
    right: -80px;
    
    height: 98.5%;
    width:450px;
    transition: 1s;
    z-index: 6;
    transform: scale(0.9);
    transform-origin: 0 0;
    
    margin-right: -100%;
    
    
}
.userlist{
    position:absolute;
    width: 98.5%;
    top:-40px;
    right: 0px;
    height: 450px;
}
.userlist::-webkit-scrollbar { 
                display: none; 
            }
@media only screen and (max-width: 1200px) {
    .m_leftside{
        opacity: 0;
        visibility: hidden;
    }
    .m_rightside{
        width: 100%;
    }
    .firsthalf{
        width: 100%;
    }
    .secondhalf{
        visibility: hidden;
        opacity:0;
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
