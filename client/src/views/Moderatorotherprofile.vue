<template>
    <div>
        <div class="UPmainpage">
            <div class="UPtop">
                <Search/>
            </div>
                <div class="UPmainbody">  
                            <div class="UPleft">
                                <div class="UPltop">
                                    <ModeratorInfo :msg="name" :msgid ="id" :key="name"/>
                                </div>
                                <div class="UPlbottom">
                                    <OPBio :msg="name" :key="name"/>
                                </div>
                            </div>
                            <div class="UPright">
                                <ModeratorTimeline :msg="name" :key="name"/>
                            </div>
                        </div>
                   </div>
    </div>
           
</template>

<script>    
import Search from '../components/Moderator/Search'
import OPBio from '../components/UserHome/OtherProfile/OP_Bio';
import ModeratorInfo from '../components/Moderator/ModeratorInfo';
import ModeratorTimeline from  '../components/Moderator/ModeratorTimeline';

export default {
    name: "moderatorotherprofile",
    components: {
        
        Search,
        OPBio,
        ModeratorInfo,
        ModeratorTimeline
    },
    data(){
      return{
          name: '',
          id:'',
          t: localStorage.moderatorToken
      }
  },
  created(){
      if(!this.t){
          this.$router.push("/");
      }
      this.name = this.$route.params.name;
        this.id=this.$route.params.id;
  },
  watch: {
        '$route' () {
        this.name = this.$route.params.name;
        this.id=this.$route.params.id;
        }
    },
}
</script>

<style scoped>
    .m_rightside{
    
        position: absolute;
        left: 20%;
        width: 80%;
        height: 100%;
        background-color: white;
}
    .m_leftside{
        position: absolute;
        left: 0%;
        background-color: white;    
        width: 20%;
        height: 100%;
        border-right: 1px solid lightgrey;
    
}
.topright{
    position: absolute;
    top:0%;
    height:11%;
    width: 100%;
}
.bottomright{
    position: absolute;
    top:11%;
    width: 100%;
    background-color: rgb(235, 235, 235);   
}
.UPmainbody{
    position: absolute;
    left: 0%;
    top:9%;
    width: 100%;
    height: 91%;
    background-color: greenyellow;
}

.UPmainpage{
  position: absolute;
  height: 100%;
  width: 100%;
  
}


.UPtop{
    position: absolute;
    
    height:9%;
    width: 100%;
    border-bottom: 2px solid lightgray;
}
.UPltop{
    margin-top: 20px;
    padding-left: 10px;
    border-bottom: 1px solid lightgray;
    height: 30%;
    
}
.UPlbottom{
    position: absolute;
    top:40%;
    width: 80%;
    height: 55%;
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

}
.UPright{
    position: absolute;
    left: 30%;
    width: 70%;
    height: 100%;
    background-color: white;
}

</style>
