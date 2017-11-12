<template>
 <div>   
   <HeaderM></HeaderM>
<div  class="bod">
	<Home></Home>
</div>
<div  class="foot">
  <FooterM></FooterM>
</div>
 </div>
</template>

<script>
import HeaderM from './components/Header.vue'
import FooterM from './components/Footer.vue'
import Home from './components/Home.vue'

 export default {
   components:{HeaderM,FooterM, Home}

 }
</script>


<style>




</style>