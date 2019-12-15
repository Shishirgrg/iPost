<template>
    <div> 
      
                <div class="profileinfo">
                    
                    <div class="profilename">
                        <div id="profilename1">
                        <img v-if="(info[0].imagePath =='')" src="../../../images/ProfilePic.jpg" id="profileicon" >
                        <img  v-else :src="require('../../../../server/public/'+info[0].imagePath)" id="profileicon" /> 
                        <router-link to="/profile" id="uname">{{name}}</router-link>
                    </div>
                    </div>              
                    </div>
    </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import axios from 'axios'
export default {
    name : "UserInfo",
    data(){
        const token = localStorage.usertoken
        const decode = jwtDecode(token)
        return{
            name : decode.name,
            info: [],
            path: ''
        }
    },
    created(){
        axios.get(`http://localhost:5000/users/user/${this.name}`)
            .then(res=>{
                if(res.data.success){
                    this.info = res.data.docs;
                
                    this.path= '../../../../server/public/'+this.info[0].imagePath;
                    //alert(this.path);
                }
            })
            .catch(err => alert(err));
    }
}
</script>

<style scoped>
#uname{
    text-decoration: none;
    font-family: Arial, Helvetica, sans-serif;
    margin-left: 10px;
    font-size: 25px;
    font-weight: 600;
    color: rgb(8, 66, 13);
}

#profilename1{
    font-family: Arial, Helvetica, sans-serif;
    margin-top:20px;
   margin-left:30px;
    font-size: 35px;
    font-weight: 600;
    color: rgb(8, 66, 13);
    
    
    
    
}
#profileicon{
    
     border-radius: 50%;
    width: 60px;
    height: 60px;
    vertical-align:middle;
    border: 5px solid rgb(176, 224, 179);
   
   
}


</style>
