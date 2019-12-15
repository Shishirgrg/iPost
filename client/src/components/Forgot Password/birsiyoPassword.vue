<template> 
    <div> 

        <div class="usermain" ref="userid" id="userid">
            <div class="top">
                Forgot your Password?
            </div>
            <div class="middle" >
                 <div class="formmain">
                    <form  autocomplete="off">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <label style="font-size:18px; font-weight:bold; color:green; padding:5px; ">Enter your username:</label>
                                <input type="text" class="form-control"  id="inputPassword3" v-model="username" required>
                            </li>
                             <li class="list-group-item" > 
                                    <p style="color:red; text-align:center; border: 1px solid pink; background-color:pink; padding:10px; border-radius:20px" v-if="(stat==true)">{{err}}</p><button style="margin-left:35%; margin-top:10px;" @click="onSubmit1(username)" type="submit" class="btn btn-success">Next</button> 
                                </li>
                        </ul>
                    </form>
                 </div>    

            </div>
        </div>


        <div class="middlemain" ref="middleid" id="middleid">
            <div class="top">
                Answer your security question
            </div>
            <div class="middle" >
                 <div class="formmain">
                    <form @submit="onSubmit2(ans1,ans2)" autocomplete="off">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                    <textarea ref="inputtext1" id="inputtext1" :readonly="true" v-model="ques1"></textarea>
                                    <input type="text" class="form-control"  id="inputPassword3" placeholder="Answer 1" v-model="ans1" required>
                                </li>

                                <li class="list-group-item">
                                     <textarea ref="inputtext1" id="inputtext1" :readonly="true" v-model="ques2"></textarea>
                                    <input type="text" class="form-control"  id="inputPassword3"  placeholder="Answer 2" v-model="ans2" required>
                                </li>
                                <li class="list-group-item" > 
                                    <p  style="color:red; text-align:center; border: 1px solid pink; background-color:pink; padding:10px; border-radius:20px" v-if="(status==true)">{{error}}</p> <button style="margin-left:35%; margin-top:20px;" type="submit" class="btn btn-success">Next</button>
                                </li>
                                
                        </ul>
                    </form>
                 </div>    

            </div>
        </div>

        <div class="nextmain" ref="nextid" id="nextid">
            <div class="top">
                Write your new password
            </div>
            <div class="middle">
                 <div class="formmain">
                    <form @submit="onSubmit3(newPass,confPass)" autocomplete="off">
                        <ul class="list-group list-group-flush">

                                <li class="list-group-item">
                                    <span style="font-size:18px; font-weight:bold; color:green; padding:10px;">New Password:</span>
                                    <input type="password" class="form-control"  id="inputPassword3" v-model="newPass" required>
                                </li>
                                <li class="list-group-item">
                                    <span style="font-size:18px; font-weight:bold; color:green; padding:10px;">Confirm Password:</span>
                                    <input type="password" class="form-control"  id="inputPassword3"  v-model="confPass" required>
                                </li>
                                <li class="list-group-item" > 
                                    <button style="margin-left:35%; margin-top:20px;" type="submit" class="btn btn-success">Confirm</button> 
                                </li>
                                <li class="list-group-item" > 
                                    <p  style="color:red; text-align:center; border: 1px solid pink; background-color:pink; padding:10px; border-radius:20px" v-if="(stat1==true)">{{err1}}</p>
                                    <p  style="color:green; text-align:center; border: 1px solid pink; background-color:lightgreen; padding:10px; border-radius:20px" v-if="(condition==true)">{{message}} <router-link to="/" style="color:green"><b>Login</b> </router-link></p> 
                                </li>
                        </ul>
                    </form>
                 </div>    

            </div>
        </div>
    </div>
</template>
<script> 
import axios  from 'axios'
export default {
    name: "birsiyoPassword",
    data(){
        return{
            ques1:'',
            ques2:'',
            username:'',
            ans1: '',
            ans2: '',
            newPass: '',
            confPass: '',
            data: [],
            message: '',
            error: '',
            err: '',
            err1: '',
            condition: false,
            status: false,
            stat: false,
            stat1: ''
        }
    },
    methods: {
        
        onSubmit1(uname){
            //username check in database 
            //alert("chalena kya ho")
            axios.post(`http://localhost:5000/users/forgotpassword/${uname}`)
                .then(res=>{
                    if(res.data.docs){
                        //alert("username found")
                        //question tane maile
                        this.data = res.data.docs;
                        this.ques1 = this.data.ques1;
                        this.ques2 = this.data.ques2;
                        var vm = this;          
        
                        vm.$refs.userid.style.opacity = '0';
                        vm.$refs.userid.style.left = '5%';
                        vm.$refs.middleid.style.visibility= 'visible';
                        vm.$refs.middleid.style.opacity = '100';
                    }
                    else{
                        this.stat = true;
                        this.err = "Users not found"
                    }
                })
                .catch(err=> alert(err));

            
              
        },
        onSubmit2(ansone,anstwo){
            // alert(this.ans1)
            // alert(this.ans2)
            //ckecking the answer
            axios.post(`http://localhost:5000/users/forgotpassword/answer/${this.username}`,{ansone: ansone, anstwo: anstwo})
                // alert(this.username)
                .then(res => {
                    if(res.data.success){
                        //alert('bhayo')
                        var vm = this;
                        
                        vm.$refs.middleid.style.opacity = '0';
                        vm.$refs.middleid.style.left = '5%';
                        vm.$refs.nextid.style.visibility= 'visible';
                        vm.$refs.nextid.style.opacity = '100'; 
                    }
                    else{
                        this.status = true;
                        this.error = "Your answer donot match"
                    }
                })
                .catch(err => alert(err));
            
  
        },
        onSubmit3(naya, confnaya){
            if(naya == confnaya){
                // this.message = "Your password is changed. Now click on the link to "
                axios.put(`http://localhost:5000/users/forgotpassword/updatePassword/${this.username}`,{newPassword: naya})
                    .then(res => {
                        if(res.data.success){
                            this.condition = true;
                            this.stat1 = false;
                            this.err1 = '';
                             this.message = "Your password is changed. Now click on the link to "
                             this.newPass = '';
                             this.confPass = ''
                        }
                        else{
                            alert('Something in wrong')
                        }
                    })

            }
            else{
                this.stat1 = true;
                this.err1 = "Your password donot match"
            }
        }
    }
}
</script>
<style scoped>
    .middlemain{
    position: absolute;
    top:10%;
    left:38%;
    width:auto;
    height:auto;
    
    margin-right:20px;
    border: 1px solid lightgreen;
    background-color: white;
    border-radius: 20px;
    padding: 10px;
    box-shadow: 5px 10px 5px rgb(131, 143, 131) ;  
    
        visibility: hidden;
    opacity:0;
    transition: 0.5s;
    }
    .nextmain{
    position: absolute;
    top:10%;
    left:38%;
    margin-right:20px;
    width:auto;
    height:auto;
    border: 1px solid lightgreen;
    background-color: white;
    border-radius: 20px;
    padding: 10px;
    box-shadow: 5px 10px 5px rgb(131, 143, 131) ;  
        
        visibility: hidden;
    opacity: 0;
    transition: 0.5s;
    }
    .usermain{
    position: absolute;
    
    margin-right:20px;
    top:10%;
    left:38%;
    width:auto;
    height:auto;
    border: 1px solid lightgreen;
    background-color: white;
    border-radius: 20px;
    padding: 10px;
    box-shadow: 5px 10px 5px rgb(131, 143, 131) ;  
    opacity: 100;
    transition: 0.5s;
    }
    .top{
        padding: 10px;
        font-size: 25px;
        color:green;
        text-align: center;
        font-weight: bold;
        border-bottom: 1px solid green;
        
    }
    .middle{
        margin-top:20px;
        padding: 10px;  
    }
    #inputtext,  #inputtext1, #inputtext3{
        color: black;
        width: 300px;
        overflow:auto;
        outline: none;
        resize: none;
        background: none;
        border: none;
        padding: 5px;
        border-radius: 10px;
        font-weight: bold;
        word-wrap: break-word;
    }
    @media only screen and (min-width : 0px) and (max-width: 800px) {
        .nextmain,.usermain,.middlemain{
            left: 15%;
        }

    }
</style>