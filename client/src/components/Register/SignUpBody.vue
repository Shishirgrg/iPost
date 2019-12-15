<template>
    
        <div class="cropmain"> 
            <div class="rightsidei">
                <div id ="contenti">
                    
                    <i class="fa fa-home" style="font-size:60px; position: relative; top:10% "></i>
                     <h1> Get Started </h1>
                     <h2> With Ipost</h2>
                     <br>
                     <br>
                     

                     
                </div>
            </div>
            <div class="leftside">
                <div id="leftcontent">
                <i class="fa fa-hand-point-down" style="font-size:60px;"></i>
                <br>
                <h2>Sign Up</h2>
                <div class="regsform">    
                    <RegisterForm/>
                </div>
                </div>
            </div>
        </div>
    
</template>

<script>
import RegisterForm from '../Register/RegisterForm';
export default {
    name: "SignUpBody",
    components: {
        RegisterForm
    }
}
</script>

 <style scoped>
 #contenti{
     position: relative;
     text-align: center;
     top:50%;
     color: white;
 }
.cropmain{
    position: absolute;
    top:5%;
    left:15%;
    width:70%;
    height:90%;
    border-radius: 20px;
    box-shadow: 5px 10px 5px rgb(131, 143, 131) ;  
    background-image: url("../../../images/back.jpg");
    background-position:left;
    background-size: cover; 
}
.rightsidei{
    position: absolute;
    left: 0%;
     width: 50%;
     height: 100%;
    background-image: url("../../../images/back.jpg");
    background-position:right;
    background-size: cover; 
    border-radius: 20px 0px 0px 20px;
     
}
.leftside{
    position: absolute;
    right:0px;
    width: 50%;
    height: 100%;
    background-color: white;
    border-radius: 0px 20px 20px 0px;
    transition: 0.5s;
    
    
}
#leftcontent{
    position: absolute;
    color: rgb(115, 206, 115);
    text-align: center;
    margin-top: 5%;
    height: 100%;
    width: 100%;
   
}
.regsform{
    position: absolute;
    width: 100%;
    height: 75%;
    overflow: auto;
    
}
.regsform::-webkit-scrollbar { 
                display: none; 
            }
@media only screen and (max-width: 800px) {
    .rightsidei{
        display: none;
    }
    .leftside{
        width: 100%;
        border-radius: 20px 20px 20px 20px;
       
    }
}
@media only screen and (min-height: 575px) and (max-height: 650px){
    .regsform{
    height: 70%;
    
}
}
@media only screen and (min-height: 475px) and (max-height: 575px){
    .regsform{
    height: 70%;
    
}
}
@media only screen and (min-height: 350px) and (max-height: 475px){
    .regsform{
    height: 60%;
    
}
}
@media only screen and (min-height: 50px) and (max-height: 350px){
    .regsform{
    height: 50%;
    
}
}
</style>
