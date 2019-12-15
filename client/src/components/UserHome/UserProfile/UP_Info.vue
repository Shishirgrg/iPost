<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-auto">
                    <img :src="require('../../../../../server/public/'+info[0].imagePath)" /> 
                </div>
                <div class="col-md-auto">
                    <h3>{{name}}</h3>
                        <p class="text-left" style="color: gray; font-size: 12px" > 
                            Made at {{`${dateformat(data[0].date)}`}}
                            <br>
                            <!-- Yaha 99 bhako thau ma chai aauna paryo -->
                            {{followersNum}} followers<br>
                            {{followingNum}} following<br>
                            
                        </p>
                        <button id="btn"  @click='gotoAccount' class="btn btn-success" >Edit Profile</button>
                </div>
            </div> 
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import moment from 'moment';
import jwtDecode from 'jwt-decode'
export default {
    name: "UPInfo",
     data(){
         
        const token = localStorage.usertoken
        const decode = jwtDecode(token)
        return{
            name : decode.name,
            followersNum: '',
            followingNum: '',
            data: [],
            madeat: '',
            info: []
        }
    },
    created(){

    

            //followers ko lagi 
        axios.get(`http://localhost:5000/users/follower/${this.name}`)
            .then(res =>{
                if(res.data.msg){
                    const followers = res.data.docs;
                    this.followersNum = followers.length;

                        // yaha chai followers ra follow haru aaune gar hai 


                    //following ko lagi 
                    axios.get(`http://localhost:5000/users/follow/${this.name}`)
                        .then(res =>{
                            if(res.data.msg){
                                const following = res.data.docs;
                                this.followingNum = following.length;

                                    //date laune 
                                axios.get(`http://localhost:5000/users/user/${this.name}`)
                                    .then(res =>{
                                        if(res.data.docs){
                                            this.data = res.data.docs;
                                            
                                        }
                                    })
                                    .catch(err => alert(err))

                            }
                        })
                        .catch(err=> alert(err));

                }
                
            })
            .catch(err=> alert(err));
            //profile pic ko lagi
            axios.get(`http://localhost:5000/users/user/${this.name}`)
                .then(res=>{
                    if(res.data.success){
                        this.info = res.data.docs;  
                    }
                })
                .catch(err => alert(err));

       


       

    },
    methods: {
        gotoAccount(){
            this.$router.push("/account");
        },
        dateformat(value){
            if (value) {
                return moment(String(value)).format('YYYY/MM/DD')
            }
        },
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