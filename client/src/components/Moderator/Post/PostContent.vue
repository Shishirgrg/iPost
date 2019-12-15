<template>
    <div>
        <div class="container">
            
            <div class="toppost">
                <table id="posttable">
                        <tr><p> apple</p>
                        <td rowspan="2"><img src="../../../images/ProfilePic.jpg"  id="posticon"></td>     
                        <td style="font-size: 15px; color:forestgreen; font-weight:bold" >{{post.name}}</td>
                    </tr>
                    <tr>
                        
                        <td style="color: grey">{{post.date}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="container">
            <div class="postarea">       
                <div class="postcontent">
                    <b style="font-size: 13px"> {{ post.content }}</b>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PostContent",
    porps: ['post']
    
    
}
</script>

<style scoped>
#posttable{
     
     width:40%;
     margin-left: 20px;
     margin-bottom: 20px;   
 }
 .postfeed{
    margin-top: 10px;
   
    width: 50%;
    color: black;
    background-color: white;
    border-radius: 20px;
    border-bottom: 4px solid gray;
   
}
#posticon{  
    border-radius: 50%;
    width: 60px;
    height: 60px;
    margin-right: 10px;
    vertical-align:top  ;
    border: 7px solid rgb(157, 255, 173);
  
}
.postcontent{
    margin-top:10px;
    margin-bottom: 10px;
    word-wrap: break-word;
    text-align: left;
    font-size: 12px;
    color:black;
    background-color: rgb(152, 255, 152);
    padding: 10px;
    border-radius: 20px;
    
}
.postarea{
    border-bottom: 2px solid grey;  
}
.toppost{
    border-bottom: 2px solid grey;
}
#btnstats{
    
     font-weight: 700; 
     
     width:150px;
}
.changestat{
    padding-top:10px;
   padding-bottom:10px;
}
#statstable td{
    padding-left:50px;
}
#btn{
    background-color: white;
     color: green;
     font-weight: 700; 
     border-radius: 20px;
     width:80px;
     
}

</style>
