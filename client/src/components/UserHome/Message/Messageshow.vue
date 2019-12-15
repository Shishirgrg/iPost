<template>
    <div>
        <div id="leftbtn">
        <button @click="openrlb" ><i class="fas fa-arrow-right" style="color:seagreen;"></i></button>
      </div>
      <div class="resleftbody" ref="rlb" id="rlb">
        <div id="rightbtn">
        <button @click="closerlb" style="float:right; "><i class="fas fa-arrow-right" style="color:seagreen; transform: rotate(180deg);"></i></button>
      </div>
            <div class="leftbodyi">
                    <div class="topleft">
                        <label id="compose">Compose Message</label>     
                    </div>
                    <div class="bottomleft" style="padding-right:10px;" >
                        <div  id="fromsearch">
                                <span style="margin-left:10px ;color:gray; font-size:20px;"><b>To</b></span>  <input class="form-control" id="inputtext" type="text" v-model="receivingUser" aria-label="Search" >
                        </div>
                        <div id="fromsearch">
                            <span style="margin-left:10px; color:gray; font-size:20px;"><b>Message Content</b></span>
                            <form @submit="sendMessage(replyMessage)"  id="formmessage">
                                    <textarea class="form-control"  id="sendm"  placeholder="Send the reply message" v-model="replyMessage"></textarea>
                                    <button :disabled='isDisabled' style="float:right;" type="submit" id="mbtn" class="btn btn-success" >Send</button>
                            </form>
                        </div>
                        
                        
                    </div>
            </div>

      </div>
        <div class="leftbody">
            <div class="topleft">
                <label id="compose">Compose Message</label>     
            </div>
            <div class="bottomleft" >
                <div  id="fromsearch">
                        <span style="margin-left:10px ;color:gray; font-size:20px;"><b>To</b></span>  <input class="form-control" id="inputtext" type="text" v-model="receivingUser" aria-label="Search" >
                </div>
                <div id="fromsearch">
                    <span style="margin-left:10px; color:gray; font-size:20px;"><b>Message Content</b></span>
                    <form @submit="sendMessage(replyMessage)"  id="formmessage">
                            <textarea class="form-control"  id="sendm"  placeholder="Send the reply message" v-model="replyMessage"></textarea>
                            <button :disabled='isDisabled' style="float:right;" type="submit" id="mbtn" class="btn btn-success" >Send</button>
                    </form>
                </div>
                
                
            </div>
    </div>
    <!-- -------  -->
    <div class="rightbody">
        <div class="topright">
                        <!-- <div  @click="sendData(item.sender)" class="messagingpeople" v-for="(item,index) in userData " :key="index"   style="width:100%">
                    <img src="../../../../images/ProfilePic.jpg"><span style="font-size: 20px"><b>
                        {{item.sender}}
                    </b></span>
                </div> -->
                <table id="tableinbox" class="table table-hover">
                    <thead>
                        <tr>
                        <th style="width:15%" scope="col">Sent by</th>
                        <th style="width:15%" scope="col"> Received by</th>
                        <th style="width:50%" scope="col">Content</th>
                        <th style="width:20%" scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- <tr v-for="item in item"> -->
                        <tr v-for="item in allMessages" :key="item">
                            
                            <td ><b style="color:green;" >{{item.sender}}</b> </td>
                            <td ><b style="color:green;">{{item.receiver}}</b></td>
                            <td style="word-wrap:break-word;">{{item.message}}</td>
                            <td ><b style="color:gray;  font-size:12px;">{{`${dateformat(item.date)}`}}</b> </td>
                        </tr>
                       
                    </tbody>
                    
                </table>
            </div>

            </div>
        </div>
            

</template>
<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import moment from 'moment' 
export default {
    name: "Messageshow",
    data(){
        const token = localStorage.usertoken
        const decode = jwtDecode(token)
    return {
        name: decode.name,
        replyMessage: '',
        receivingUser: '',
        allMessages: []
                
    }
  },
  computed:{
      isDisabled(){
        return this.replyMessage === '' || this.receivingUser === ''
        

      }
  },
  created(){
      //getting the messages when im  the receiver
      axios.get(`http://localhost:5000/users/messagereceived/${this.name}`)
        .then(res=>{
            if(res.data.success){
                //alert('message get gareko')
                this.allMessages = res.data.docs;
                //  this.allMessages.sort(function(a,b){
                //                 return new Date(b.date) - new Date(a.date);
                //             });
                // getting the messages when im the sender
            axios.get(`http://localhost:5000/users/messagesent/${this.name}`)
                .then(res=>{
                    if(res.data.success){
                       this.allMessages = this.allMessages.concat(res.data.docs);
                       this.allMessages.sort(function(a,b){
                                return new Date(b.date) - new Date(a.date);
                        });
                    }
                })
                .catch(err => alert(err));
            }
        })
        .catch(err=> alert(err));
        
    

  },
  methods: {
      openrlb(){
      var vm=this;
      vm.$refs.rlb.style.marginLeft = '0%';
    },
    closerlb(){
      var vm=this;
     
      vm.$refs.rlb.style.marginLeft = '-100%';
    },
    sendMessage(message){
        axios.post(`http://localhost:5000/users/sendmessage/${this.receivingUser}`, {sname: this.name, content: message})
            .then(res=>{
                if(res.data.success){
                    //alert("message sent")
                    this.receivingUser = '';
                    this.replyMessage = '';
                      //getting the messages when im  the receiver
                        axios.get(`http://localhost:5000/users/messagereceived/${this.name}`)
                            .then(res=>{
                                if(res.data.success){
                                    //alert('message get gareko')
                                    this.allMessages = res.data.docs;
                                    // getting the messages when im the sender
                                axios.get(`http://localhost:5000/users/messagesent/${this.name}`)
                                    .then(res=>{
                                        if(res.data.success){
                                            this.allMessages = this.allMessages.concat(res.data.docs);
                                            this.allMessages.sort(function(a,b){
                                                return new Date(b.date) - new Date(a.date);
                                            });

                                        }

                                    })
                                    .catch(err => alert(err));
                                }
                            })
                            .catch(err=> alert(err));
        
                    
                }
            })
            .catch(err=> alert(err));
            
    },
    dateformat(value){
            if (value) {
                return moment(String(value)).format('YYYY/MM/DD hh:mm')
            }
        }
  }

    
}
</script>
<style scoped>
    .bottomleft img{
            border-radius: 50%;
            width: 50px;
            height: 50px;
            margin-right: 10px;
        }
        .topleft{
            position: relative;
            
            width: 100%;
            height:auto;
            

            
        }
        #fromsearch{      
            margin-top:15px;
            margin-left: 5%;
            width: 90%;
        }
        .bottomleft{
            position: relative;
            bottom:0px;
            height:auto;
            width:100%;
            padding: 5px;
           
        }
        .messagingpeople{
            width: 100%;
            background-color: rgb(192, 247, 175);
            margin-top: 5px;  
            border-radius: 10px;
            padding: 5px;
            color: rgb(29, 63, 32);
        }
        
        .messagingpeople:hover{
            background-color: rgb(170, 211, 156);
            cursor: pointer;
        }
        .messagingpeople:active{
            background-color: rgb(74, 129, 57);
            cursor: pointer;
        }
        .topright{
        position: absolute;
        top:0px;
        width: 100%;
        height:100%;
        background-color: white;
        overflow:auto;
        padding: 10px;
    }
    .topright::-webkit-scrollbar {
        width: 10px;
    }
    .topright::-webkit-scrollbar-thumb:hover {
        background: green; 
    }
    .topright::-webkit-scrollbar-thumb {
        background: rgb(59, 163, 59); 
        border-radius: 10px;
    }
    .bottomright{
        border-top:1px solid green;
        position: absolute;
        top:88%;
        width: 100%;
        height: 12%;
        
        background-color: rgb(119, 218, 119);
    }
    .topright img{
            border-radius: 50%;
            width: 50px;
            height: 50px;
            border: 5px solid rgb(161, 230, 161);
        }
    #mbtn{
        
        border-radius: 20px;
        font-size: 18px;     
        margin-top:10px;
        padding:5px;
        padding-left: 20px;
        padding-right: 20px;
        
    }
    #sendm{
        width: 100%;
    }
    
    .status{
        background-color: lightgreen;
        padding: 10px;
        border-radius: 10px ;
        word-wrap:break-word;
        width: auto;
    }
    td{
        padding: 5px;
        word-wrap:break-word;
        word-break: break-all;
    }
    button{
        padding: 5px;
    }
    #sbtn{
        margin-left:-50px;
        background:none;
        border:none;
        
    }
    textarea{
        font-size: 15px;
        resize: none;
        border-radius: 10px;
        padding: 5px;
        overflow: hidden;
        border:2px solid lightgray;
        height: 400px;
    }
    .leftbodyi{
    position: absolute;
    left: 0px;
    top: 0px;
    height: 100%;
    width:100%;
    background-color: white;
    border-right: 1px solid green;
    transition: 0.5s;
}
    .leftbody{
    position: absolute;
    left: 0px;
    top: 0px;
    height: 100%;
    width:30%;
    background-color: white;
    border-right: 1px solid green;
    transition: 0.5s;
}
.rightbody{
    position: absolute;
    right: 0px;
    top: 0px;
    height: 100%;
    width:70%;
    transition: 0.5s;
}
#inputtext{
    outline: none;
    border: 2px solid lightgray;
    border-radius: 10px;
    width:100%;
    
}
#compose{
    font-size:38px;
     height:100%;
     color:rgb(1, 143, 48);
    text-align:center;
    font-weight:600;
    width: 100%;
   background-color:rgb(198, 250, 198);
   border-bottom: 2px solid green;
}
#tableinbox{
    width:100%;
    background-color: rgb(245, 255, 245);
}
#tableinbox td{
    
    padding: 10px;
}
#leftbtn{
    opacity: 0;
    position: fixed; 
    transition: 0.2s;
    width: 5.3%;
    height: 90%;
    transition:0.5s;
    font-size: 3vw;
    left: 0%;
    visibility: hidden;
}
#leftbtn button{
  width: 100%;
  height: 100%;
  background-color: rgb(245, 255, 245);
  border: none;
  border-right:1px solid green;
}
#rightbtn{
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

.resleftbody{
  
  background-color: rgb(222, 253, 222);
  border: 2px solid green;
  position: fixed;
  
    left: 0%;
    top: 70px;
    height: 98.5%;
    width: 400px;
    transition: 1s;
    z-index: 8;
    transform: scale(0.9);
    transform-origin: 0 0;
    margin-left: -100%;
    
}



@media only screen and  (min-width : 200px) and (max-width: 1000px) {
    .topleft{
        top:0;
    }
    #leftbtn{
    opacity: 100;
    visibility: visible;
    }
    #rightbtn{
      opacity: 100;
    }
    
    .leftbody{
        opacity: 0;
    }
    .rightbody{
        width: 100%;
    }
}
@media only screen and (min-height : 650px) and (max-height: 750px) {
    textarea{
        height: 300px;
    }
}
@media only screen and (min-height : 550px) and (max-height: 650px) {
    textarea{
        height: 200px;
    }
}
@media only screen and (min-height : 450px) and (max-height: 550px) {
    textarea{
        height: 100px;
    }
}
@media only screen and (min-height : 400px) and (max-height: 450px) {
    #compose{
        display: none;
    }
    
    textarea{
        height: 200px;
    }
}
@media only screen and (min-height : 0px) and (max-height: 400px) {
    #compose{
        display: none;
    }
    
    textarea{
        height: 100px;
    }
}

</style>