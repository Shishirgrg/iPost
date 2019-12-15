<template>
<div class="homemain">
  <div class="home">
    <div  class="Rightside">
      <div ref="rightside" id="rightside">
        <LoginRightside/>
      </div>
    <div class="leftside">
    <LoginForm />
    <SignUp />
    </div>
    <div class="footer">
                    <div id="bcont">
                        <p>Develop by: Prashant Dhoju, Shishir Kumar Gurung and Sudesh Gurung</p>
                    </div>
                </div>

  </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import LoginRightside from '../components/Login/LoginRightside'
import LoginForm from '../components/Login/LoginForm'
import SignUp from '../components/Login/SignUp'

export default {
  name: 'home',
  components: {
    
    LoginRightside,
    LoginForm,
    SignUp,
   
  }
}
</script>

<style scoped>
.homemain{
  position: absolute;
  width: 100%;
  height: 100%;
   background-image: linear-gradient(to bottom, rgb(177, 255, 181), rgb(255, 255, 255));
 
}
.home{
  position: absolute;
  top: 5%;
  left: 10%;
  width: 80%;
  height: 90%;
  border-radius: 20px;
  
   
}
.Rightside{
   background-image: url("../../images/back.jpg");
    background-position:left;
    background-size: cover; 
    width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 20px;
  box-shadow: 5px 5px 3px gray;
  
   
}
.leftside{
  position: absolute;
    background-color: white;
    width: 50%;
    height: 100%;
    right: 0%;
    border-radius: 0px 20px 20px 0px;
    transition: 0.5s;
}
.footer{
    position: absolute;
     bottom: 0px;
    background: white;
    height: 3%;
   margin-left:25%; 
    width: 50%;
    border: 1px  solid rgb(79, 182, 79); 
    border-radius: 10px 10px 0px 0px;
}
#bcont{
  font-size: 10px;
    font-weight: bold;
    text-align: center;
    width: 100%;
}
@media only screen and (max-width: 1000px) {
  #rightside{
    display: none;
  }
  .footer{
    display: none;
  }
  .leftside{
    position: absolute;
    background-color: white;
    width: 100%;
    height: 100%;
    right: 0%;
    border-radius: 20px 20px 20px 20px;
}
}
</style>
