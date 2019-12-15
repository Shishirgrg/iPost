<template>
     
                <div class="down">
                        <div id="downside">
                            <div id="blah">
                                    <h1>Want to share<br>
                                     your views</h1>
                                    <h2>to the world?</h2>   
                                    <h5>Join iPost Now.</h5>
                            </div>
                            <br>
                                    <button @click="gotoRegistration"  class="btn btn-success" id="submit1">Sign Up</button><br><br>                                      
                            
                        </div>
                </div>
</template>

<script>

export default {
    name: "SignUp",
    methods: {
        gotoRegistration(e){
            e.preventDefault();

            //yo command le chai signUp component ma puraucha using Router
            this.$router.push("/signup");
        }   
    }
   
}
</script>

 <style scoped>



.down{
    position: absolute;
    left:20%;
    bottom: 10%;
    
}
#downside{
    color: rgb(31, 73, 31);
    text-align: left;
    
}
button {
    
    padding: 5px;
    padding-right: 10px;
    padding-left: 10px;
    font-size: 15px;
    font-weight: bold;
    width: 15%;
    background-color: white;
    color: green;

    border-radius: 20px;
    
    border: 1px solid green;
}
#routsubmit{
     color:white;
     font-size: 15px;
    font-weight: bold;
    text-decoration: none;
}
#submit1{
    width: 300px;
}
#blah{
    opacity: 100;
    transition: 0.5s;
}
@media only screen and (max-height: 500px) {
    img{
        margin-top:2%;
    }
    #blah{
        opacity: 0;
        

    }
}
</style>
