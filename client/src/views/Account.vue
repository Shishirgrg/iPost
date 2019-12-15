<template>
    <div>
        <div class="fullbody">
            <div class="home-header"> 
                <NavBar/>
            </div>
            <div class="mainbody">
                <Accountdata/>
            </div>
        </div>
    </div>
</template>
<script>
import NavBar from '../components/UserHome/NavBar';
import Accountdata from '../components/UserHome/Account/Accountdata'
export default {
    name: "account",
    components: {
    Accountdata,
    NavBar,
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
}
.mainbody{
    position:absolute;
    width: 100%;
    height: 91%;
    
}
    
</style>