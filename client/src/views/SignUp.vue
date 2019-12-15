<template>
    <div class="signupmain"> 
       
        <SignUpBody/>
           </div>
</template>

<script>
import SignUpBody from '../components/Register/SignUpBody'
export default {
    name: "signup",
    components: {
        SignUpBody
    }

}
</script>

<style scoped>
.signupmain{
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, rgb(177, 255, 181), rgb(255, 255, 255));
}


</style>
