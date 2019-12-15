<template>
    <div>
        
                    <div class="m_topl">
                            <div class="row">
                                    <div  class="col-md-auto">
                                      <img src="../../../images/ProfilePic.jpg">
                                            <br/>
                                            <h3 style="text-align:center;">{{Username}}</h3>

                                            <div id="m_lcontent">
                                            <i class="fas fa-user-check"></i>
                                            Verified  <br>                                              
                                               <br>
                                           
                                        </div>
                                    </div>
                            </div>    
                    </div>
                    
                        
                    
                    </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
export default {
    name:"UserInfo",
    data(){
        const token = localStorage.moderatorToken
        const decode = jwtDecode(token)
        return{
            Username : decode.name
        }
    }
}
</script>

<style scoped>
.m_topl{
    margin-left: 15%;
    margin-top: 60%; 
}
.m_topl img{
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 10px solid rgb(158, 221, 158);
    display: block;
    margin-left: auto;
    margin-right: auto;

}

#m_lcontent{
   color: rgb(14, 92, 14);
    text-align: center;
}
#btn{
    background-color: white;
     color: green;
     font-weight: 700; 
     border-radius: 20px;
     width:150px;
}
#btn:active{
    background-color: green;
    color: white;
}
</style>
