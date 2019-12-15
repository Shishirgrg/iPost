<template>
     
       
        
<div id="Signin">
    <form @submit="login">
        <ul style="font-size:13px">
        <li><input type="text" @input="error=''" v-model="username" id="username" placeholder="Username" required></li>
        <li><input type="password" @input="error=''" v-model="password" id="password" placeholder="Password" required></li>
        
        <!--<input type="submit" name="submit" value="Sign Up!">-->
        <li><button type="submit" class="btn btn-success">Login</button></li>
        </ul>
        <span class="error" style="position:absolute;font-size:12px; border-radius:10px; left:10%; bottom:-8%;  font-weight:bold; z-index:2; color:red; padding:5px; " v-if="error">{{error}}</span>

    </form>      
    <span  ><router-link style="font-size:12px; float:right; margin-right:90px; margin-top:-10px; color:green; font-weight:600;" to="/forgotpassword"> forgot password?</router-link></span>       
    
</div>
               
        
        
        
        
        
        
  
</template>

<script>
import axios from 'axios'
export default {
    name: "LoginForm",
    data(){
        return{
            username: '',
            password: '',
            error: ''
        }
    },
    methods: {
        login(){
            axios.post('http://localhost:5000/users/login', { username: this.username,password: this.password})
            .then(res => {
                        //alert(`Username: ${this.username}, Password: ${this.password}`)
                        if (res.data.success) {
                            // var storage = window.localStorage;
                            // var token = res.data.token;
                            // storage.setItem('usertoken', token)
                            
                            localStorage.setItem('usertoken', res.data.token)
                            this.username = '',
                            this.password = '',
                            this.$router.push('/about')
                            //storage.setItem('username', username)
                           
                            //window.location.href = "http://localhost:3000/auth/home";
                            // $.get("http://localhost:5000/auth/home");
                            // Login successful 
                        } else {
                            // Login Failed
                            this.error = res.data.msg;
                        }
                        if(res.data.moderator){

                            localStorage.setItem('moderatorToken', res.data.token)
                            this.username = '',
                            this.password = '',
                            this.$router.push('/moderator')
                        }
                        else{
                            this.error = res.data.msg;
                            

                        }

                
            })
            .catch(err => this.err = err);
                
        }
    },
}

</script>

<style scoped>

#Signin{
     position: absolute;
    padding-top: 50px;
    right:20px;  
}
input[type=text], input[type=password]{
    width: 40%;
  padding: 8px 20px;
  margin-right: 5px;
  
  display: inline-block;
  border: 1px solid lightgray;
  border-radius: 20px;
  box-sizing: border-box;
}
li{
    display: inline;
}

button[type="submit"] {
    position: absolute;
    font-size: 14px;
    font-weight: 400;
    width: 15%;
    

    border-radius: 20px;
    
    border: 1px solid green;
    
   
}
#login_text{
color:white;
text-decoration:none;
}
input:focus{
    outline: none;
}
.error{
    -webkit-animation: cssAnimation 2s forwards; 
    animation: cssAnimation 2s forwards;
}
@keyframes cssAnimation {
    0%   {opacity: 1;}
    90%  {opacity: 1;}
    100% {opacity: 0;}
}
@-webkit-keyframes cssAnimation {
    0%   {opacity: 1;}
    90%  {opacity: 1;}
    100% {opacity: 0;}
}

</style>
