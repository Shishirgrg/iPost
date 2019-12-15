<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-auto">
                    <img src="../../../images/ProfilePic.jpg" >
                </div>
                <div class="col-md-auto">
                    <h3>{{msg}}</h3>
                        <p class="text-left" style="color: gray; font-size: 12px" >
                            
                            {{ufollowersNum}} followers<br>
                            {{ufollowingNum}} following<br>
                        </p>
                         <button @click="deleteuser(msg)" id="btn" class="btn btn-success" >Delete</button>
                </div>
            </div> 
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: "Moderatorinfo",
    props: ['msg','msgid'],
    data(){
        return{
           
            uname: this.msg,
            unameId:this.msgid,
           following:[],
           followers:[],
           ufollowing:[],
           ufollowers:[],
            ufollowersNum: '',
            ufollowingNum: '',
            date: ''
        }
    },
    created(){
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
            //  axios.get(`http://localhost:5000/users/follow/${this.name}`)
            // .then(res =>{
            //     if(res.data.msg){
            //          this.following = res.data.docs;
            //     }
            // })
            // .catch(err=> alert(err));

            //  axios.get(`http://localhost:5000/users/follower/${this.uname}`)
            //     .then(res =>{
            //         if(res.data.msg){
            //             this.followers = res.data.docs;
                        
            //         }
            //     })
            //     .catch(err=> alert(err))

                    
    },
    methods:{
        deleteuser(username){
            axios.delete(`http://localhost:5000/moderator/deletebymoderator/${username}`)
                .then(res => {
                    if(res.data.success){
                        alert("successfully deleted");
                        this.$router.push('/moderator')

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

</style>