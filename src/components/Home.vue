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
  </gmap-map>  
   <button class="button is-primary" @click="ubicacion()">Ubicarme</button>
   </center>
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
                  <b-radio-button v-model="incidente.radioButton"
                      native-value="Robo"
                      type="is-danger">
                      <span>Robo</span>
                  </b-radio-button>

                  <b-radio-button v-model="incidente.radioButton"
                      native-value="Secuestro"
                      type="is-danger">
                      <span>Secuestro</span>
                  </b-radio-button>

                  <b-radio-button v-model="incidente.radioButton"
                      native-value="Pelea"
                      type="is-danger">
                      Pelea
                  </b-radio-button>
                  <b-radio-button v-model="incidente.radioButton"
                      native-value="Asesinato"
                      type="is-danger">
                      Asesinato
                  </b-radio-button>
                  
                  <b-field label="Seleccion:" class="content nigru">
                  {{ incidente.radioButton }}
                  </b-field>
                   
                  </b-field>     
                 <b-field label="Descripcion">
                    <b-input
                        type="text"
                        v-model="incidente.descripcion"
                        placeholder="Descripcion del incidente"
                        required>
                    </b-input>
                </b-field>

                <div class="file has-name is-success">
                  <label class="file-label">
                    <input class="file-input" type="file" name="resume" accept=".jpg, .png, .gif">
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fa fa-upload"></i>
                      </span>
                      <span class="file-label">
                        Selecciona una imagen
                      </span>
                    </span>
                    <span class="file-name" v-if="imagen">
                      {{imagen.name}}
                    </span>
                  </label>
                </div>





                <label class="file-select">
    <!-- We can't use a normal button element here, as it would become the target of the label. -->
    <div class="select-button">
      <!-- Display the filename if a file has been selected. -->
      <span v-if="value">Selected File: {{value.name}}</span>
      <span v-else>Select File</span>
    </div>
    <!-- Now, the file input that we hide. -->
    <input type="file" @change="handleFileChange"/>
  </label>
 <button class="button" type="button" v-on:click="upload(value)">subir</button>

                
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
import * as axios from 'axios';
  export default {
       data () {
          return {    
            isModalActive: false,
                isModalActive: false,
                radioButton: '',
                incidente: {
                  titulo: null,
                  descripcion: null,
                  radioButton:null,
                },
                value: {
                  name: "",
                },
                titulo:'',
                descripcion:'',
                categoria:'',
                lati:'',
                longi:'',
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
              lat: -8.134,
             lng: -79.0319926},
            infoText: 'Reporte de incidente #3'
          }]          

           
          }
        },
created() {        
    var db = Firebase.database();
    db.ref(`incidentes/incidentes/Luis_`)
    .on('value',snapshot =>this.cargarMensajes(snapshot.val()));
       
    
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
              descripcion:this.incidente.descripcion,
              categoria:this.incidente.radioButton,
              lat: this.currentLat,
              lon: this.currentLon

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
          alert("Ubicacion encontrada! " + this.currentLon +" "+ this.currentLat)
        console.log(this.currentLon +" "+ this.currentLat);
      });
    
         },
         cargarMensajes(incidents){
      console.log(incidents)
      this.incidentes=[]
      for(let key in incidents){
        this.incidentes.push({
         titulo:incidents[key].titulo,
         descripcion:incidents[key].descripcion
         
        })
      } 
      console.log(this.titulo+this.descripcion+"asd");
    },
         handleFileChange(e) {
      // Whenever the file changes, emit the 'input' event with the file data.
      this.$emit('input', e.target.files[0])
    },
    upload(formData) {
    const url = `https://lhmr0.000webhostapp.com/upload.php`;
        axios.get(url, formData)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
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


