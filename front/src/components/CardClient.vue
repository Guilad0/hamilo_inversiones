<script setup>
import { useClientStore } from '../stores/clientStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    client: Object,
    required: true
})

const clientStore = useClientStore();
clientStore.resetClient();
const showClient = (client) => {

  clientStore.setClient(client)
  router.push({
    name: 'client',
    params:{ name: `${client.nombre}-${client.apellido}`},
  });
};


</script>
<template>
    <div class="col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
        <div class="card m-2 rounded-3 position-relative  ">
                <img src="https://slicetokenfrontendassets.s3.amazonaws.com/players/img_white/61.webp" 
                class="card-img-top  rounded-3">
                <div class="custom-absolute">
                <img
                  :src="`http://localhost:3000/categories/image/${props.client.categoria_persona_id}`"
                  width="25"
                  class=" rounded-circle"
                  alt="">
                </div>
                
                <div class="card-body">
                <h5 class="card-title fs-6 text-center ">{{ props.client.nombre }}</h5>
                <small class="card-text token ">Token price: ${{ (props.client.monto_inversion==null)? '00.00':props.client.monto_inversion }}</small>
                <div class="row px-2 my-2">
                    <button  class="btn btn-gray " @click="showClient(props.client)">Buy my Token</button>
                </div>
            </div>

        </div>
    </div>
</template>
<style scoped>
.token{
    color:var(--gray-color) !important
}
.custom-absolute{
    position: absolute;
    bottom: 30%;
    right: 5px;
}

.card{
  border: 1px solid var(--gray-color); 
}

</style>