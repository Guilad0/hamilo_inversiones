<style scoped>
  
img{
    width: auto;
    height: 23vh;
}
.card{
    height: 95%;
    font-size: 0.9rem;
}

@media (width < 500px) {
    .col-custom{
        width: 40%;
    }
}
@media (width < 418px) {
    .col-custom{
        width: 45%;
    }
}
@media (width < 380px) {
    .col-custom{
        width: 50%;
    }
}
.custom-link:hover {
  text-decoration: underline;
}

.custom-link {
  text-decoration: none;
  color: var(--smoky-dark-color);
  font-size: 0.9rem;
}
</style>
<template >
    <div class="d-block d-md-none ">
        <p class="m-0 pb-3 ms-4">
            <RouterLink to="/marketplace" class="custom-link">Marketplace</RouterLink> | <label>{{ selectedClient.rol
              }}</label>
          </p>
    <div class="card  shadow " >
    <div class="row  justify-content-center">
        <img src="https://slicetokenfrontendassets.s3.amazonaws.com/players/img_white/61.webp"
                    class="  rounded-3" >
    </div>
  <div class="card-body">
    <h3 class="card-title">{{ selectedClient.nombre }}</h3>
    <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                      <li class="mx-1">{{ selectedClient.pais_residencia }} | </li>
                      <li class="mx-1">{{ selectedClient.edad }} | </li>
                      <li class="mx-1">{{ selectedClient.categoria }} </li>
                    </ol>
                  </nav>
                  <label>Bio:</label>
                  <p class="descripcion">{{ selectedClient.descripcion == null ?
                    `Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha
                    sido el texto de relleno n`
                    :selectedClient.descripcion }}
                  </p>
                  <div class="row justify-content-between align-items-center mb-3">
                    <div class="col-4 col-sm-8 col-custom">
                      <p class="token m-0">Precio por token USD $ {{ selectedClient.monto_inversion == null ? '00.00' :
                        selectedClient.monto_inversion }} </p>
                    </div>
                    <div class="col-4 col-sm-4 col-custom">
                      <button class="border-custom btn-sm available rounded-3">0 Disponibles</button>
                    </div>
                  </div>
                  <div class="accordion accordion-flush " id="accordionFlushExample">
                    <div class="accordion-item">
                      <h2 class="accordion-header">
                        <button class="accordion-button collapsed bg-light rounded-2 p-2" type="button" data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                          Detalles Token
                        </button>
                      </h2>
                      <div id="flush-collapseOne" class="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body ">Detalles.</div>
                      </div>
                    </div>
                  </div>
                  <div class="row px-3 mt-4">
                    <button class="btn btn-gray">
                      Fondear mi billetera
                    </button>
                  </div>
  </div>
  </div>
</div>
  </template>
  
  <script setup>
    const props = defineProps({
      selectedClient: {
        type: Object,
        required: true
      }
    });
  </script>

  