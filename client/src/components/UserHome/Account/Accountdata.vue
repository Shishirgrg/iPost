<template>
    <div>
        <div class="shomebody">
            <div class="mainbody">
                <div class="topmain">
                    <h3 style="color: green"><i class="fas fa-user-cog" style="margin-right: 10px;"></i>Account Settings</h3>
                </div>
                <ul>
                <li ref="generalli" id="generalli" >
                    <div class="middlemain">
                    <h5 @click="showgeneral() ;textareaResize(); " > <i class="fas fa-cog" style="margin-right: 10px;"></i>General Info</h5>
                    <div class="accountinfo" ref="generalid" id="generalid">
                    <table style="border-top:1px solid gray;" >
                        <tr>
                            <td style="width: 20%;  ">
                                <div class="option1">
                                    <span class="title1">Full Name</span>
                                    
                                </div>
                            </td>
                            <td>
                                <div class="showname">
                                        <span class="title2">
                                        <input type="text" ref="inputtext" id="inputtext" :readonly="shouldDisable1" v-model="changeName"></span>
                                </div>
                            </td>
                            <td  style="width: 20% ;text-align: center;">
                                 <a  class="edit" @click="editable('1')" href="#">Edit</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 20%;  ">
                                <div class="option1">
                                    <span class="title1">Address</span>
                                    
                                </div>
                            </td>
                            <td>
                                <div class="showname">
                                        <span class="title2">
                                        <input type="text" ref="inputtext3" id="inputtext3" :readonly="shouldDisable4" v-model="changeAddress"></span>
                                </div>
                            </td>
                            <td  style="width: 20% ;text-align: center;">
                                 <a  class="edit" @click="editable('4')" href="#">Edit</a>
                            </td>
                        </tr>
                        <tr>
                             <td>
                                <div class="option2">
                                    <span class="title1">Contact Info</span>
                                </div>
                            </td>
                            <td>
                                <div class="showemail">
                                        <span class="title2">
                                        <input type="text" ref="inputtext1" id="inputtext1" :readonly="shouldDisable2" v-model="changeContact">
                                        </span>
                                </div>
                            </td>
                            <td style="text-align: center;">
                                <a class="edit" @click="editable('2')"  href="#">Edit</a>
                            </td>
                        </tr>
                        <tr>
                            <td valign="top" >
                                <div class="option3">
                                    <span class="title1">User Bio</span>
                                </div>
                            </td>
                            <td>
                                    <div class="showemail">
                                            <span class="title2">
                                            <textarea @input="textareaResize"  :readonly="shouldDisable3" ref="textarea1" id="textarea1"  v-model="changeUserbio"> </textarea>
                                            </span>
                                        </div>
                            </td>
                            <td style="text-align: center;" valign="top">
                                <a class="edit" @click="editable('3')" href="#">Edit</a>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td style="text-align: right;"><button @click="confirmBio(changeName,changeContact,changeUserbio,changeAddress)" class="btn btn-success">Save Changes</button></td>
                        </tr>
                      
                    </table>
                    </div>
                </div></li>
                <li ref="passwordli" id="passwordli">
                 <div class="changep" >
                        <h5 @click="showpassword()" ><i class="fas fa-cog" style="margin-right: 10px;"></i>Change Password</h5>   
                        <div class="changepassword" ref="passwordid" id="passwordid">
                        
                        <form @submit.prevent="handleSubmit">
                        <table style="border-top:1px solid black;">
                         <tr>
                            <td style="width: 20% ; font-weight: 600" >Previous Password:</td>
                            <td > <input type="password" v-model="prevPass" class="form-control" :class="{'is-invalid': submitted && $v.prevPass.$error}" >
                                <div v-if="submitted && !$v.prevPass.required" class="invalid-feedback" style="z-index:2">
                                <span v-if="!$v.prevPass.required">Password is required</span>
                                <span v-if="!$v.prevPass.minLength">Password must be at least 6 characters</span>
                            </div>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: 600">New Password:</td>
                            <td><input type="password" class="form-control" v-model="newPass" :class="{ 'is-invalid': submitted && $v.newPass.$error }">
                                <div v-if="submitted && !$v.newPass.required" class="invalid-feedback">
                                <span v-if="!$v.newPass.required">Password is required</span>
                                <span v-if="!$v.newPass.minLength">Password must be at least 6 characters</span>
                            </div>
                            </td>
                            
                        </tr>
                         <tr>
                            <td style="font-weight: 600">Confirm Password:</td>
                            <td><input type="password" class="form-control" v-model="confirmPass" :class="{ 'is-invalid': submitted && $v.confirmPass.$error } "  >
                                <div v-if="submitted && $v.confirmPass.$error" class="invalid-feedback">
                                    <span v-if="!$v.confirmPass.required">Confirm Password is required</span>
                                    <span v-else-if="!$v.confirmPass.sameAsPassword">Passwords must match</span>
                                </div>
                            </td>
                            
                         </tr>
                         <tr>
                             <td></td>
                             
                             <td style="text-align: right;"><button @click="changePassword(prevPass,newPass,confirmPass)" class="btn btn-success"> Change Password</button></td>
                         </tr>
                    </table>
                </form>
                        </div>
                 </div>
                </li>
                <li ref="deactivateli" id="deactivateli">
                 <div class="deactivate">
                        <h5 @click="showdeactivate()" ><i class="fas fa-cog" style="margin-right: 10px;"></i>Deactivate Account</h5>   
                        <div class="deactivateaccount" ref="deactivateid" id="deactivateid">
                            <form>
                                <table style="border-top:1px solid black;">
                                    <tr>
                                        <td colspan="2"><span style="color:grey">Deactivating your account will disable your profile and remove your name from most things you have shared . Some information may still be visible to others, such as your name in their followers list and messages you sent. If you still want to continue confirm your password.</span>
                                        </td>
                                    </tr>
                                <tr>
                                    <td style="width: 20% ; font-weight: 600" >Confirm Your Password:</td>
                                    <td > <input type="password" class="form-control" v-model="password"></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td style="text-align: right;"><button :disabled='isDisabled' @click="deactivate(password)" class="btn btn-success">Deactivate</button></td>
                                </tr>
                            </table>
                        </form>
                        </div>
                 
                 </div>
                </li>
                
                <li ref="editprofileli" id="editprofileli">
                 <div class="editprofile">
                        <h5 @click="showeditprofile()" ><i class="fas fa-cog" style="margin-right: 10px;"></i>Edit Profile Picture</h5>   
                        <div class="editprofile" ref="editprofileid" id="editprofileid">
                            <form enctype="multipart/form-data">
                                
                                <input name="myImage" type="file" @change="onFileSelected" >
                                <button class="btn btn-success" @click="onUpload">Upload</button>
                            </form>
                        </div>
                 
                 </div>
                </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import { required, minLength, sameAs } from "vuelidate/lib/validators";

export default {
    name: "Accountdata",
    data(){
        const token = localStorage.usertoken
        const decode = jwtDecode(token)
    return {
        username:decode.name,
        commenting:'',
        shouldDisable1:true,
        shouldDisable2:true,
        shouldDisable3:true,
        shouldDisable4:true,
        prevPass:'',
        newPass: '',
        confirmPass: '',
        password: '',
        userData: [],
        changeName: '',
        changeContact:'',
        changeUserbio:'',
        changeAddress:'',
        submitted: false,
        selectedFile: ''
    }
    
  },
  validations:{
        prevPass: {required},
        newPass: {required, minLength: minLength(6)},
        confirmPass: {required, sameAsPassword: sameAs('newPass')}
    },
    computed:{
        isDisabled(){
        return this.password === ''
      }
    },
  
  created(){
      //getting the user bio from the database
      axios.get(`http://localhost:5000/users/info/${this.username}`)
        .then(res =>{
            if(res.data.success){
                
                this.userData = res.data.docs;
                this.changeName = this.userData[0].fullName;
                this.changeContact = this.userData[0].contact;
                this.changeUserbio = this.userData[0].bio;
                this.changeAddress = this.userData[0].address;
                /*
                dhoju yaha user data ma chai yo component created hune bitikai k k 
                database ma cha user ko aaucah ani timile cahi 
                suru ma yo account page suru hune bitikai db ma bhako inf dekhau hai 
                 
                 */
                
            }
        })
        .catch(err=> alert(err));
        
  },
  methods:{
     
      

      confirmBio(Name,Contact,Userbio,Address){
        axios.put(`http://localhost:5000/users/info/${this.username}`,{fullname: Name, contact: Contact, bio: Userbio, add: Address})
            .then(res=> {
                if(res.data.success){

                    alert("Changes saved to the database");
                    //yo bhayo bhane pheri get garne sabai data
                }
            })
            .catch(err=> alert(err));
      },
      changePassword(prevPass,newPass, confirmPass){
          if(confirmPass !== newPass){  
              //yo validation CCr and dhoju styling le garcha ramrari 
            //alert(" duita Password Milena or the password are incorrect ")

          }
          else{
              axios.put(`http://localhost:5000/users/changepassword/${this.username}`,{password: prevPass , newPassword: newPass})
                .then(res=> {
                    if(res.data.success){
                        this.prevPass = ''
                        this.newPass = ''
                        this.confirmPass = ''
                        alert("Password is now changed, please logout and login again");
                        //token faleko 
                        localStorage.removeItem('usertoken')
                        this.$router.push("/");
                    }
                })
                .catch(err=> alert(err));
          }
          
      },
      deactivate(password) {
        //deactivate garesi remove all the information of the user
        axios.delete(`http://localhost:5000/users/delete/${this.username}`,{data: { pass : password }})
            .then(res=>{
                if(res.data.docs != ''){
                    alert("Your account have been deleted permanently from the iPost")
                    localStorage.removeItem('usertoken')
                    this.$router.push("/");
                }
                else if(res.data.docs == ''){
                    alert("password is incorrect")
                }
            })
            .catch(err=> alert(err));
      },
      editable(value){
                    this.$refs.textarea1.style.height=this.$refs.textarea1.scrollHeight+'px';
                    switch(value){
                        case "1":
                            if(this.shouldDisable1){
                                this.shouldDisable1=!this.shouldDisable1;
                                this.$refs.inputtext.style.backgroundColor='white';
                                this.$refs.inputtext.style.color='black';
                                this.$refs.inputtext.style.padding='8px';
                                this.$refs.inputtext.style.border='1px solid darkgray';
                            }else{
                                this.shouldDisable1=!this.shouldDisable1;
                                this.$refs.inputtext.style.background='none';
                                this.$refs.inputtext.style.color='grey';
                                this.$refs.inputtext.style.padding='5px';
                                this.$refs.inputtext.style.border='none';
                                alert('Changes Saved');
                                
                            }
                            return;

                        case "2":
                            if(this.shouldDisable2){
                                this.shouldDisable2=!this.shouldDisable2;
                                this.$refs.inputtext1.style.backgroundColor='white';
                                this.$refs.inputtext1.style.color='black';
                                this.$refs.inputtext1.style.padding='8px';
                                this.$refs.inputtext1.style.border='1px solid darkgray';
                                
                            }else{
                                this.shouldDisable2=!this.shouldDisable2;
                                this.$refs.inputtext1.style.background='none';
                                this.$refs.inputtext1.style.color='grey';
                                this.$refs.inputtext1.style.padding='5px';
                                this.$refs.inputtext1.style.border='none';
                                
                                alert('Changes Saved');
                            }
                            return;
                            
                        case "3":
                        
                        if(this.shouldDisable3){
                                this.shouldDisable3=!this.shouldDisable3;
                                this.$refs.textarea1.style.backgroundColor='white';
                                this.$refs.textarea1.style.color='black';
                                this.$refs.textarea1.style.border='1px solid darkgray';
                                

                                
                            }else{
                                this.shouldDisable3=!this.shouldDisable3;
                                this.$refs.textarea1.style.background='none';
                                this.$refs.textarea1.style.color='grey';
                                this.$refs.textarea1.style.border='none';
                                
                                alert('Changes Saved')
                            }
                            return;
                            
                        case "4":

                        if(this.shouldDisable4){
                                this.shouldDisable4=!this.shouldDisable4;
                                this.$refs.inputtext3.style.backgroundColor='white';
                                this.$refs.inputtext3.style.color='black';
                                this.$refs.inputtext3.style.border='1px solid darkgray';
                                this.$refs.inputtex3.style.padding='8px';
                                

                                
                            }else{
                                this.shouldDisable4=!this.shouldDisable4;
                                this.$refs.inputtext3.style.background='none';
                                this.$refs.inputtext3.style.color='grey';
                                this.$refs.inputtext3.style.border='none';
                                this.$refs.inputtext3.style.padding='5px';
                                alert('Changes Saved');
                            }
                            return;
                    }
                },
             
              showgeneral:function(){
                  var vm = this;
                 
                  if(vm.$refs.generalid.style.display == "block"){
                    vm.$refs.generalid.style.display = 'none'
                    vm.$refs.generalli.style.backgroundColor = 'white';
                  }
                  else{
                    vm.$refs.generalid.style.display = 'block';
                    vm.$refs.generalli.style.backgroundColor = 'rgb(223, 255, 225)';
                  }
              },
              showpassword:function(){
                  var vm = this;
                  if(vm.$refs.passwordid.style.display == 'block'){
                   vm.$refs.passwordid.style.display = 'none'
                    vm.$refs.passwordli.style.backgroundColor = 'white';
                  }
                  else{
                     vm.$refs.passwordid.style.display = 'block';
                    vm.$refs.passwordli.style.backgroundColor = 'rgb(223, 255, 225)';
                  }
              },
              showdeactivate:function(){
                  var vm = this;
                  if(vm.$refs.deactivateid.style.display == 'block'){
                   vm.$refs.deactivateid.style.display = 'none'
                    vm.$refs.deactivateli.style.backgroundColor = 'white';
                  }
                  else{
                     vm.$refs.deactivateid.style.display = 'block';
                    vm.$refs.deactivateli.style.backgroundColor = 'rgb(223, 255, 225)';
                  }
              },
              showeditprofile:function(){
                  var vm = this;
                  if(vm.$refs.editprofileid.style.display == 'block'){
                   vm.$refs.editprofileid.style.display = 'none'
                    vm.$refs.editprofileli.style.backgroundColor = 'white';
                  }
                  else{
                    vm.$refs.editprofileid.style.display = 'block';
                    vm.$refs.editprofileli.style.backgroundColor = 'rgb(223, 255, 225)';
                  }
              },
              textareaResize:function() {
                  this.$refs.textarea1.style.height=this.$refs.textarea1.scrollHeight+'px';
                },
                 handleSubmit() {
                this.submitted = true;

                // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
        },
        onFileSelected(event){
            
            const files = event.target.files[0];
            this.selectedFile = files;
            //alert(files.type)

            
            
        },
        onUpload(){
            const fd = new FormData();
            fd.append('file', this.selectedFile);

            alert(this.selectedFile.type)
          
                    //server ma clsole log cha file ko array ma hune details hera tya hai
                    axios.put(`http://localhost:5000/users/upload/${this.username}`, fd)
                        .then(res=>{
                            if(res.data.success){
                                alert("uploded")
                                
                            }
                            else{
                                alert("not uploaded")
                            }
                        })
                        .catch(err=> alert(err));
                
        }
        
                
              
  }
    
}
</script>

<style scoped>
table{
        width: 100%;
    }
    .shomebody{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgb(203, 255, 207);
        
        
    }
    .mainbody{
        border-left: 1px solid green;
        border-right: 1px solid green;
        position: absolute;
        padding: 20px;
        left: 10%;
        width: 80%;
        height: 100%;
        background-color: white;
        overflow: auto;
    }
    .mainbody::-webkit-scrollbar {
        width: 0px;  
        background: transparent; 
}

    .mainbody::-webkit-scrollbar-thumb {
    background: #FF0000;
    }
    table td{
        padding: 5px;
        padding-top: 10px;
        
    }
    .middlemain{
        padding-top: 5px;
    }
    
    
    .title1{
        width:300px;
        
    }
    .title2{
        width:500px;
    }
    #textarea1{
        outline: none;
        background: none;
        width: 500px;
        border: none;
        resize: none;
        height: auto;
        color: grey;
        padding-bottom: 8px;
        padding-left: 8px;
        padding-right: 8px;
        border-radius: 10px;
        overflow: hidden;
    }
    #generalid td{
        border-bottom: 1px solid rgb(162, 194, 165);
    }
    
    #passwordid{
        display: none;
        margin-left: 20px;
        
    }
    #passwordid input[type="text"]{
        width: 400px;
        border-radius: 20px;
        border: 1px solid gray;
        outline: none;
        padding: 5px;
        font-size: 13px;
    }
    #deactivateid{
        display: none;
        margin-left: 20px;
        
    }
    #editprofileid{
        display: none;
        margin-left: 20px;
        
    }
    #deactivateid input[type="text"]{
        width: 400px;
        border-radius: 20px;
        border: 1px solid gray;
        outline: none;
        padding: 5px;
        font-size: 13px;
    }
    #generalid{

        display: none;
        margin-left: 20px;
        padding: 5px;
        
    }
    
    #inputtext,  #inputtext1, #inputtext3{
        color: gray;
        width: 400px;
        outline: none;
        background: none;
        border: none;
        padding: 5px;
        border-radius: 10px;
    }
    
        
    .topmain{
        padding-left: 10px;
    }
    .title1{
        font-weight: 600;
    }
    .title2{
        font-size: 14px;
    }
    h5{
        padding-left: 20px;
        padding-top: 5px;
        padding-bottom: 5px;
        color: green;
    }
    h5:hover{
        background-color: rgb(179, 224, 174);
        cursor: pointer;
    }
    ul{
        list-style-type: none;
        margin: 0;
        padding: 0;
        border-top:1px solid gray;
        border-bottom:1px solid gray;
        
    }
    .edit{
        color: green;
        font-weight: 600;
        font-size: 12px;
    }
    .edit:hover{
        text-decoration: none;
    }
    button{
        border-radius: 20px;
        font-weight: 600;
        color: green;
        background-color: white;
        margin: 10px;
    }

</style>
