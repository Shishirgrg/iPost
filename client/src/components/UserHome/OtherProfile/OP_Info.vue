<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-auto">
                    <img :src="require('../../../../../server/public/'+info[0].imagePath)" >
                </div>
                <div class="col-md-auto">
                    <h3>{{msg}}</h3>
                        <p class="text-left" style="color: gray; font-size: 12px" >
                            
                            {{ufollowersNum}} followers<br>
                            {{ufollowingNum}} following<br>
                            
                        </p>
                        <button @click="follow(name,id, myinfo[0].imagePath,uname, unameId,info[0].imagePath )" class="btn btn-success" id="followbtn" v-if="(utafollow(uname))">Follow</button>
                        <button @click ="unFollow(name,uname)" class="btn btn-success" id="followingbtn" v-else ><span>Following</span></button>
                          
                </div>
            </div> 
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'
export default {
    name: "OPInfo",
    props: ['msg','msgid'],
    data(){
        const token = localStorage.usertoken
        const decode = jwtDecode(token)
        return{
            name: decode.name,
            id: decode._id,
            uname: this.msg,
            unameId:this.msgid,
           following:[],
           followers:[],
           ufollowing:[],
           ufollowers:[],
            ufollowersNum: '',
            ufollowingNum: '',
            date: '',
            myinfo:[],
            info:[]
        }
    },
    created(){
         //profile pic ko lagi
            axios.get(`http://localhost:5000/users/user/${this.uname}`)
                .then(res=>{
                    if(res.data.success){
                        this.info = res.data.docs;  
                    }
                })
                .catch(err => alert(err));
            axios.get(`http://localhost:5000/users/user/${this.name}`)
                .then(res=>{
                    if(res.data.success){
                        this.myinfo = res.data.docs;  
                    }
                })
                .catch(err => alert(err));
        //followers ko lagi 
       axios.get(`http://localhost:5000/users/follower/${this.uname}`)
        .then(res =>{
            if(res.data.msg){
                 this.ufollowers = res.data.docs;
                this.ufollowersNum = this.ufollowers.length;
            }
            
        })
        .catch(err=> alert(err));
        //following ko lagi 
        axios.get(`http://localhost:5000/users/follow/${this.uname}`)
            .then(res =>{
                if(res.data.msg){
                     this.ufollowing = res.data.docs;
                    this.ufollowingNum = this.ufollowing.length;
                }
            })
            .catch(err=> alert(err));
            //mero followings
             axios.get(`http://localhost:5000/users/follow/${this.name}`)
            .then(res =>{
                if(res.data.msg){
                     this.following = res.data.docs;
                }
            })
            .catch(err=> alert(err));

             axios.get(`http://localhost:5000/users/follower/${this.uname}`)
                .then(res =>{
                    if(res.data.msg){
                        this.followers = res.data.docs;
                    }
                })
                .catch(err=> alert(err))

                    
    },
    methods: {
        utafollow(value){
            for(var i=0; i < this.following.length; i++){
                
                if( this.following[i].username == value){
                return false;
                }
            }
            return true;
            
        },
        follow(name,id,mphoto, followerName, followerId, fphoto){
            //alert(followerName)
            axios.post("http://localhost:5000/users/follow", {name:name, userID: id,userPic:mphoto, followName:followerName, followId:followerId, fPic:fphoto})
            .then(res =>{
              if(res.data.docs){
                

                //send follow notification
                const notificationType = '3';
                axios.post("http://localhost:5000/users/notifications", {name, followName:followerName ,notificationType })
                  .then(res=>{
                    if(res.data.success){
                      //alert(" Followed and Follow notification sent")
                      //getting the followers
                       axios.get(`http://localhost:5000/users/follower/${this.name}`)
                            .then(res =>{
                                if(res.data.msg){
                                    this.followers = res.data.docs;
                                }
                                
                            })
                            .catch(err=> alert(err))
                        //updating the following 
                        axios.get(`http://localhost:5000/users/follow/${this.name}`)
                                    .then(res =>{
                                        if(res.data.msg){
                                        this.following = res.data.docs;
                                        }
                                    })
                                    .catch(err=> alert(err));
                     
                    }
                  })
                  .catch(err=>alert(err));

                
              }
            })
            .catch(err=> alert(err));
       
         
        },
        
        unFollow(name,fname){
            //alert(fname)
            axios.delete("http://localhost:5000/users/follow", {data: { name,theName:fname }})
    
                .then(res =>{
                    if(res.data.msg){
                        

                        //send follow notification
                        const notificationType = '4';
                        axios.post("http://localhost:5000/users/notifications", {name, followName:fname ,notificationType })
                        .then(res=>{
                            if(res.data.success){
                                //alert("Unfollow notification sent")
                                axios.get(`http://localhost:5000/users/follow/${this.name}`)
                                    .then(res =>{
                                        if(res.data.msg){
                                        this.following = res.data.docs;
                                        }
                                    })
                                    .catch(err=> alert(err));
                            
                            }
                        })
                        .catch(err=>alert(err));

                        
                    }
                    })
                .catch(err=> alert(err));
        

        }
    }
}
</script>
<style scoped>
    #btn{
    background-color: white;
     color: green;
     font-weight: 700; 
     border-radius: 20px;
     width:150px;
     
}
img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 10px solid rgb(158, 221, 158);

}
#btn:active{
    background-color: green;
    color: white;
}
#followbtn{
    background-color: white;
    color: green;
    border-radius: 20px;
    font-weight: bold;
    border: 2px solid green;
    
    width: 150px;
}

#followingbtn{
    background-color: green;
    color: white;
    border-radius: 20px;
    font-weight: bold;
    border: 2px  solid green;
    
    width: 150px;
}
#followingbtn:hover span {display:none}
#followingbtn:hover:before {
    content:"Unfollow"
    }
#followingbtn:hover{
    background-color: white;
    color:green;
}
#followingbtn:active{
    background-color: green;
    color: white;
}
#followbtn:active{
    background-color: green;
    color: white;
}

</style>