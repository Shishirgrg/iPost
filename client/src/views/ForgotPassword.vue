<template>
    <div> 
        <div class="main">
           
                <birsiyoPassword/>
           
        </div>
    </div>
</template>
<script> 
import birsiyoPassword from '../components/Forgot Password/birsiyoPassword'
export default {
    name: "forgotpassword",
    components: {
        birsiyoPassword
    }
}
</script>
<style scoped>
.main{
    position:absolute;
    height: 100%;
    width: 100%;
    background-color: rgb(215, 255, 215);
} 

</style>