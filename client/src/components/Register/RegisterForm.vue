<template>
    <div>
        <div class="formmain"  >
            <!-- <div >
            applwe
            <img :src="require('../../../../server/public/'+images.name)" height="100"> 
            {{images.name}}[{{images.path}}]

            
            </div> -->
            <form @submit.prevent="onSubmit" autocomplete="off" enctype="multipart/form-data">
                <ul class="list-group list-group-flush">
                    
                    <li class="list-group-item" > 
                    <input type="text" class="form-control"  v-model="username" id="inputEmail3" placeholder="Username" :class="{ 'is-invalid': submitted && $v.username.$error }">
                    <div v-if="submitted && !$v.username.required" class="invalid-feedback">Name is required</div>
                    </li>


                    <!-- <li class="list-group-item" > 
                    <img :src="selectedFile" style="width:50px; height:50px"> 
                    </li> -->

                
                    <li class="list-group-item">
                    <input type="email" class="form-control" v-model="email" id="inputEmail3" placeholder="Email" :class="{ 'is-invalid': submitted && $v.email.$error }">
                    <div v-if="submitted && $v.email.$error" class="invalid-feedback">
                                    <span v-if="!$v.email.required">Email is required</span>
                                    <span v-if="!$v.email.email">Email is invalid</span>
                                </div>
                    </li>
                    
                

                
                    <li class="list-group-item">
                        <input type="password" class="form-control" v-model="password" id="inputPassword3" placeholder="Password" :class="{ 'is-invalid': submitted && $v.password.$error }">
                         <div v-if="submitted && $v.password.$error" class="invalid-feedback">
                                    <span v-if="!$v.password.required">Password is required</span>
                                    <span v-if="!$v.password.minLength">Password must be at least 6 characters</span>
                            </div>

                
                    <li class="list-group-item">
                    <input type="password" class="form-control" v-model="confpass" id="inputPassword3" placeholder="Confirm Password" :class="{ 'is-invalid': submitted && $v.confpass.$error }">
                      <div v-if="submitted && $v.confpass.$error" class="invalid-feedback">
                                    <span v-if="!$v.confpass.required">Confirm Password is required</span>
                                    <span v-else-if="!$v.confpass.sameAsPassword">Passwords must match</span>
                         </div>
                    </li> 
                    <!--  Yo chai error aaune registration aauda -->
                   
                    
               
                    <li class="list-group-item">
                        <select  class="custom-select" @change="onChange1($event)" v-model="key1" style="color:darkgray; border:none; border-bottom:1px solid lightgray;">
                        <option  value="" disabled selected >Choose your Security Question</option>
                            <option  value="What was your favorite place to visit as a child?">What was your favorite place to visit as a child?</option>
                            <option  value="Who is your favorite actor, musician, or artist?">Who is your favorite actor, musician, or artist?</option>
                            <option  value="What is the name of your favorite pet?">What is the name of your favorite pet?</option>
                            <option  value="What is the name of your first school?">What is the name of your first school?</option>
                            <option  value="What is your favorite color?">What is your favorite color?</option>
                        </select>
                    </li>
                    <li class="list-group-item">
                        <input type="text" class="form-control"  id="inputPassword3" placeholder="Answer 1" v-model= "ans1" :class="{ 'is-invalid': submitted && $v.ans1.$error }" >
                        <div v-if="submitted && !$v.ans1.required" class="invalid-feedback">Answer is required</div>
                    </li>

                    <li class="list-group-item">
                        <select class="custom-select" @change="onChange2($event)" v-model="key2" style="color:darkgray; border:none; border-bottom:1px solid lightgray;">
                        <option value="" disabled selected style="color:lightgray">Choose your next Security Question</option>
                            <option value="What is the name of your favorite childhood friend? ">What is the name of your favorite childhood friend? </option>
                            <option value="What school did you attend for sixth grade?">What school did you attend for sixth grade?</option>
                            <option value="What is your youngest brother’s birthday month and year? ">What is your youngest brother’s birthday month and year? </option>
                            <option value="What street did you live on in third grade?">What street did you live on in third grade?</option>
                            <option value="What is the first name of the boy or girl that you first kissed?">What is the first name of the boy or girl that you first kissed?</option>
                        </select>
                    </li>
                       
                    <li class="list-group-item">
                        <input type="text" class="form-control"  id="inputPassword3"  placeholder="Answer 2" v-model= "ans2" :class="{ 'is-invalid': submitted && $v.ans2.$error }">
                        <div v-if="submitted && !$v.ans2.required" class="invalid-feedback">Answer is required</div>
                    </li>    
                    <div v-if="(error==cerror1)" class="alert  alert-warning  fade show" role="alert">
                        <strong>{{error}}</strong> 
                    </div>
                   
                    
                 <li class="list-group-item" > 
                <button  type="submit" class="btn btn-success">Sign Up</button> 
                </li>
                <div v-if="(error==cerror2)" class="alert  alert-success  fade show" role="alert" >
                        <strong style="margin-right:10px;">Register Sucessful</strong> Click the link below 
                    </div>
                <li class="list-group-item"> 
                    <router-link style="color:green ; font-weight:none; font-size: 14px; " to="/">You have an account?</router-link>
                </li>
                 
                    
                   
                </ul>
                

        
            </form>
            
             
                    
<!-- yo tag ma bhako image dekhau hai -->

            
                    
           
        </div>
        
       
    </div>
</template>

<script>
import axios from 'axios'
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
    name: "RegisterForm",

    data(){
        return{
            username: '',
            email: '',
            password: '',
            confpass: '',
            error: '',
            msg: [],
            errmsg: [],
            key1:'',
            key2:'',
            ques1: '',
            ques2: '',
            ans1: '',
            ans2: '',
            submitted: false,
            cerror1:'User already exists',
            cerror2:' registered',
            selectedFile:'null',
            pic:'',
            message: '',
            path:'',
            aayo: false,
            filename: '',
            images: []

        }

    },
    validations: {
                username: { required },
                email: { required, email },
                password: { required, minLength: minLength(6) },
                confpass: { required, sameAsPassword: sameAs('password') },
                ans1: { required },
                ans2: { required },
    },
    methods: {
        onChange1(event) {
            //alert(event.target.value);
            this.ques1 = event.target.value;
            //alert(this.ques1);


        },
        onChange2(event) {
            //alert(event.target.value);
            this.ques2 = event.target.value;
        },   
        getpic(){
            // /Users/sudeshgurung/Desktop/iPost-app/server/uploads/2df4ca4b253d6ddfbad3667940867007
            //yesto huncah path tara milechaina k ??

            //server/uploads/0e1ce6ff1cc9fa74c5a488b4068f6124
            alert("pasyo yaha")
            this.aayo = true;
            return "../../../../server/public/"+this.path;
        },  
        onSubmit(){
             this.submitted = true;

                // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }


             

                 //server ma clsole log cha file ko array ma hune details hera tya hai
                    axios.post('http://localhost:5000/users/register',{ username: this.username, email: this.email, password: this.password, quesone:this.ques1, ansone: this.ans1, questwo: this.ques2, anstwo: this.ans2})
                        .then(res => {
                            
                                if (res.data.success) {
                                    this.error = res.data.msg;
                                    //this.filename = '../../../../server/public/'+res.data.name;
                                    //alert(this.filename)
                                    alert("Uploaded");
                                    
                                    
                                } else {
                                    // Login Failed
                                    this.error = res.data.msg;
                                    alert("file not uploaded")
                                }
                            }
                        )
                        .catch(err => this.error = err);             
               
            
            
        },
            // if(allowedTypes.includes(this.selectedFile.type)){
            //     this.messsage = "Only images are required!!";
            // }
            
            
                
            
            
            
        
        
    }
}
</script>

<style scoped>
.formmain{
    position: absolute;
    margin-left: 15%;
    width: 100%;
    transform: scale(0.7, 0.7);
    transform-origin: 0 0;
    height: auto;
    
}

.secondmain{
    background-color: white;
    position: fixed;
    top: 0%;
    right: 0%;
    width: 0%;
    
    height:100%;   
 
}
a{
    text-decoration: none;
    color:white;
    font-weight: bold;
}
#errorshow{
    
   z-index: +1;
   position: absolute;
   border: 1px solid rgb(255, 111, 111);
   left:200px;
   bottom: 0px;
   background-color: white;
   padding: 5px;
   border-radius: 5px;
}
.btnform{
    width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
label{
    border: 1px solid green;
    background-color: lightgreen;
    color:red ;
    font-weight:none; 
    font-size: 30px; 
    left:45%;
    bottom:10%;
    z-index: +1; 
    position: absolute;
}
@media only screen and (max-width: 800px) {
    
    
}
</style>
