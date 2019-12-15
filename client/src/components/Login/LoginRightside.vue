<template>
                <div id="content">
                    
                    <br>
                    <div id="blah">
                    <i class="fas fa-search"></i>Search the controversial subject<br><br>
                    <i class="fas fa-file-powerpoint"></i> Present your opinion<br><br>
                    <i class="fas fa-user-plus"></i> Follow People<br><br>
                    </div>
   
    </div>
</template>

<script>
export default {
    name: "LoginRightside"
}
</script>

<style scoped>

#content{
    color: white;
    position: absolute;
    height: 100%;
    width: 50%;
    top:0%;
    padding-left: 5%;
    font-size: 20px;
    font-weight: bold;
    background-image: url("../../../images/back.jpg");
    background-position:left;
    background-size: cover; 
    border-radius:20px 0px 0px 20px;
}
img{
    margin-top:10%;
    margin-left:5%;
    margin-bottom: 5%;
    border-radius: 50%;
    height:30%;
    width:30%;
    transition: 0.5s;
    
}
#blah{
    padding-top:60%;
    transform: scale(1);
    transform-origin: 0 0;
    transition: 0.5s;
}
i{
    margin-right: 10px;
}
@media only screen and (max-width: 1000px) {
    img{
        margin-left:0%;
    }
}
@media only screen and (min-height: 450px) and (max-height: 600px) {
    img{
        margin-top:2%;
    }
    #blah{
        transform: scale(0.9);
    }

}
@media only screen and (min-height:0px) and (max-height: 450px) {
    img{
        margin-top:2%;
    }
    #blah{
        transform: scale(0.9);
        opacity: 0;
    }

}
</style>
