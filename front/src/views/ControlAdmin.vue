<template>
    <main class=" ">
        <div class="d-flex">
            <div class="col-2 shadow-custom-1 z-3">
                <ul class="mt-5">
                    <li class="py-3 ps-2 rounded  nav-link  my-3 " 
                    :class="{'border-custom': view == 'wallRequests'}" 
                     @click="showView('wallRequests')"> 
                       <img src="../assets/svg/wallet.svg" width="25" class="me-2"> Solicitudes Retiro</li>
                    <li class="py-3 ps-2 rounded  nav-link  my-3" 
                    :class="{'border-custom': view == 'users'}"   
                    @click="showView('users')">
                        <img src="../assets/svg/users.svg" width="25" class="me-2">Usuarios</li>
                    <li class="py-3 ps-2 rounded nav-link my-3 " @click="showView('posts')"
                    :class="{'border-custom': view === 'posts'}" 
                    >
                        
                        <img src="../assets/svg/post.svg" width="25" class="me-2">Posteos</li>
                </ul>
            </div>
            <div class="col-10">
                <Solicitudes v-if="view == 'wallRequests'"/>
                <Users v-if="view == 'users'"/>
                <Posts v-if="view == 'posts'"/>
            </div>
        </div>
    </main>
</template>

<script setup>
import {ref} from 'vue';
import Solicitudes from '../components/WalletRequests.vue'
import Users from '../components/Users.vue';
import Posts from '../components/Posts.vue'
const view = ref('users');


const showView  = ( typeView )=>{
    view.value = typeView;
}
</script>
<style scoped>
    .d-flex{
        height: 100%;
    }
   main{
    background-color: var(--white-anti-flash-color);
    height: 95vh;
    width: 100%;
   }
   li{
    cursor: pointer;
    color: var(--smoky-dark-color)
   }
   li:hover{
        font-weight: 600;
        background-color: rgba(196, 196, 196, 0.315);
   }

   .border-custom{
        font-weight: 600;
        background-color: rgba(196, 196, 196, 0.315);
   }
 
</style>