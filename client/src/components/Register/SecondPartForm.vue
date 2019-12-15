<template>
    <div>
       <div class="secondmain"  >
            <form @submit="onSubmit" autocomplete="off">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" > 
                    <input type="text" class="form-control"  placeholder="First Name" required>
                    </li>
                    <li class="list-group-item">
                    <input type="text" class="form-control"  placeholder="Last Name" required>
                    </li>
                    <li class="list-group-item">
                        Write something about you
                    <input type="textarea" class="form-control"  placeholder="Confirm Password" required>
                    </li> 
                 <li class="list-group-item" > 
                <button type="submit" class="btn btn-success" >Sign Up</button> 
                </li>
                </ul>
            </form>
    </div>
</template>
<script>
export default {
    name: "secondform"
}
</script>
<style scoped>
    
</style>