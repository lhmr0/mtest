<template>
<section class="hero is-dark is-large">
<div class="hero-body is-mobile nigru">
    <div class="container">
        <center><gmap-map
    :center="center"
    :zoom="15"
    style="width: 100%px; height: 500px"
  >
  <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
        {{infoContent}}
      </gmap-info-window>
  <gmap-polygon :paths="paths">
      </gmap-polygon>
    <gmap-marker
      :key="i"
      v-for="(m, i) in markers"
      :position="m.position"
      :clickable="true"
      @click="toggleInfoWindow(m,i)"
    ></gmap-marker>
  </gmap-map></center>  
   <button class="button is-primary" @click="ubicacion()">Ubicarme</button>
  <center>
      <h2 class="subtitle">
        Reporta tus incidentes</h2>
        <button class="button is-danger is-medium"
            @click="isModalActive = true">
            Reportar incidente
        </button>
         <form @submit.prevent="enviar">
        <b-modal :active.sync="isModalActive" :width="moda">
              <div class="modal-card">
                  <header class="modal-card-head">
                      <p class="modal-card-title">Reportar incidente</p>
                  </header>
                  <section class="modal-card-body">
                      <b-field label="Titulo">
                          <b-input
                              type="text"
                              v-model="incidente.titulo"
                              placeholder="Titulo del incidente"
                              required>
                          </b-input>
                      </b-field>

                  <b-field>
                  <b-radio-button v-model="radioButton"
                      native-value="Robo"
                      type="is-danger">
                      <span>Robo</span>
                  </b-radio-button>

                  <b-radio-button v-model="radioButton"
                      native-value="Secuestro"
                      type="is-danger">
                      <span>Secuestro</span>
                  </b-radio-button>

                  <b-radio-button v-model="radioButton"
                      native-value="Pelea"
                      type="is-danger">
                      Pelea
                  </b-radio-button>
                  <b-radio-button v-model="radioButton"
                      native-value="Asesinato"
                      type="is-danger">
                      Asesinato
                  </b-radio-button>
                  <p class="content nigru">
                    <b> Seleccion:</b>
                  {{ radioButton }}
                    </p>
                  </b-field>     
                 <b-field label="Descripcion">
                    <b-input
                        type="text"
                        v-model="incidente.descripcion"
                        placeholder="Descripcion del incidente"
                        required>
                    </b-input>
                </b-field>

                
            </section>
            <footer class="modal-card-foot">           
                <button class="button" type="button">Cerrar</button>
                <button class="button is-primary">Enviar</button>
            </footer>
        </div>
        </b-modal>
        </form>
  </center>    
    </div>
  </div>
  
</section>
</template>



 

<script>  
import Firebase from 'firebase';
  export default {
       data () {
          return {    
            isModalActive: false,
                isModalActive: false,
                radioButton: '',
                incidente: {
                  titulo: null,
                  descripcion: null,
                },
                titulo:'',
                descripcion:'',
                moda:'80%',    
            currentLocation: {lat: 0, lng: 0},
            center: {lat: -8.1285196, lng: -79.0278064},  
            infoContent: '5',
            infoWindowPos: {
              lat: 0,
              lng: 0
            },      
            infoWinOpen: false,
            currentMidx: null,
             infoOptions: {
            pixelOffset: {
              width: 0,
              height: -35
            }
          },
             paths: [
                        [ {lat: -8.125, lng: -79.0250}, {lat: -8.1235196, lng: -79.035}, {lat: -8.130, lng: -79.035}, {lat: -8.130, lng: -79.025} ],
                      ],
             
              markers: [{
            position: {
             lat: -8.1274836,
             lng: -79.0319926},
            infoText: 'Reporte de incidente #1 ' + '\n asd'
          }, {
            position: {
              lat: -8.1288996, 
              lng: -79.0312268},
            infoText: 'Reporte de incidente #2'
          }, {
            position: {
              lat: -8.1285196, 
              lng: -79.0278064},
            infoText: 'Reporte de incidente #3'
          }, {
            position: {
              lat: -79.0278064, 
              lng: -79.0278064},
            infoText: 'Reporte de incidente #3'
          }]          

           
          }
        },
        methods: {
          toggleInfoWindow: function(marker, idx) {
            this.infoWindowPos = marker.position;
            this.infoContent = marker.infoText;
            //check if its the same marker that was selected if yes toggle
            if (this.currentMidx == idx) {
              this.infoWinOpen = !this.infoWinOpen;
            }
            //if different marker set infowindow to open and reset current marker index
            else {
              this.infoWinOpen = true;
              this.currentMidx = idx;
            }
          },
          enviar() {
            var db = Firebase.database();
            db.ref(`incidentes/incidentes/Luis_`).push({
              titulo:this.incidente.titulo,
              descripcion:this.incidente.descripcion

            }).then(()=>this.incidente.titulo='')
         },
         ubicacion(){
           navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.currentLon = position.coords.longitude;
        this.currentLat = position.coords.latitude;
          window.document.title = this.currentLon +" "+ this.currentLat;  
        console.log(this.currentLon +" "+ this.currentLat);
      });
    
         }
        }

     
      }
</script>


<style scoped>
  .nigru {
   color:black;  
  }
   .modal-card {
        width: auto;
    }
</style>
