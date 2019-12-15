<template>
    <div>
      <div class="userinfo">
            <table >
                <tr>
                    <td style="width:100px;"><b>Name:</b></td>
                    <td>{{userData[0].fullName}}</td>
                </tr>
                <tr>    
                    <td><b>Address:</b></td>
                    <td>{{userData[0].address}}</td>
                </tr>
                <tr>
                    <td><b>Contact:</b></td>
                    <td>{{userData[0].contact}}</td>
                </tr>
                <tr>
                    <td><b>About me:</b></td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="2">{{userData[0].bio}}</td>
                </tr>
            </table>
        </div>


    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: "OPBio",
    props: ['msg'],
    data(){
        return{
            username: this.msg,
            userData: []
        }
    },
    created(){
         axios.get(`http://localhost:5000/users/info/${this.username}`)
            .then(res =>{
                if(res.data.success){
                    
                    this.userData = res.data.docs;
                /*
                    dhoju yaha user data ma chai yo component created hune bitikai k k 
                    database ma cha user ko aaucah ani timile cahi 
                    suru ma yo account page suru hune bitikai db ma bhako inf dekhau hai 
                    
                    */
                    
                }
            })
            .catch(err=> alert(err));
    }
}
</script>
<style scoped>
.userinfo{
    padding:20px;
    color: grey;
    width: 100%;
    
    
}
td{
    word-wrap:break-all;    
    padding: 5px;
}
    
</style>