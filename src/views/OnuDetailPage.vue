<template>
  <div class="main">
    <v-container class="grey lighten-5">

      <notifications group="foo"/>

      <v-row class="mb-6" no-gutters>
        <v-col cols12 sm12>
          <v-card class="pa-2" outlined tile hover data-aos="zoom-in" data-aos-easing="ease">
            <v-row align="center" justify="space-between">

              <v-btn @click="BackToHome()" color="danger">
                <v-icon left>
                  mdi-arrow-collapse-left
                </v-icon>
                back
              </v-btn>


              <v-btn @click="RebootOnu()"
                     color="primary">
                <v-icon>
                  mdi-autorenew
                </v-icon>
                reload
              </v-btn>


              <v-dialog
                  transition="dialog-top-transition"
                  max-width="600"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="error" v-bind="attrs" v-on="on">
                    <v-icon>
                      mdi-delete
                    </v-icon>
                    delete
                  </v-btn>
                </template>
                <template v-slot:default="dialog">
                  <v-card>
                    <v-toolbar color="error" dark>
                      do you really want to delete onu?
                    </v-toolbar>
                    <v-card-actions class="justify-end">
                      <v-btn text
                             @click="DeleteOnu() ,dialog.value = false"
                      >
                        Delete
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn
                          text
                          @click="dialog.value = false"
                      >Close
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>


            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mb-6" no-gutters>
        <v-col cols12 sm12>
          <v-card class="pa-2" outlined tile hover data-aos="zoom-in" data-aos-easing="ease">
            <v-row align="center" justify="space-between" v-for="i in Info" :key="i._id">

              <v-chip class="ma-2" label color="blue-grey darken-4" text-color="white">
                <span>onu: {{ i.interface }}</span>
              </v-chip>
              <v-chip class="ma-2" label color="blue-grey darken-4" text-color="white">
                status: <span style="color:#00C853"> {{ i.status }}</span>
              </v-chip>
              <v-chip class="ma-2" label color="blue-grey darken-4" text-color="white">
                <span>model: {{ i.model }}</span>
              </v-chip>
              <v-chip class="ma-2" label color="blue-grey darken-4" text-color="white">
                <span>ver_software: {{ i.ver_software }}</span>
              </v-chip>
              <v-chip class="ma-2" label color="blue-grey darken-4" text-color="white">
                <span>ver_hardware: {{ i.ver_hardware }}</span>
              </v-chip>
              <v-chip class="ma-2" label color="blue-grey darken-4" text-color="white">
                <span>vendor: {{ i.vendor }}</span>
              </v-chip>

            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mb-6" no-gutters>

        <v-col cols12 sm6>
          <v-card class="pa-2" outlined tile hover data-aos="zoom-in" data-aos-easing="ease">
            <v-list>

              <v-list-item>
                <p class="title">Mac_Address</p>
              </v-list-item>
              <v-list-item>
                <p class="title">Vlan_Id</p>
              </v-list-item>

            </v-list>
          </v-card>
        </v-col>
        <v-col cols12 sm6>
          <v-card class="pa-2" outlined tile hover data-aos="zoom-in" data-aos-easing="ease">
            <v-list v-for="i in Fdb" :key="i._id">

              <v-list-item>
                <p class="subtitle-1 text-left" style="color:#696969">{{ i.mac_address }}</p>
              </v-list-item>
              <v-list-item>
                <p class="subtitle-1 text-left" style="color:#00C853">{{ i.vlan_id }}</p>
              </v-list-item>

            </v-list>
          </v-card>
        </v-col>


      </v-row>

      <v-row class="mb-6" no-gutters>

        <v-col cols12 sm6>
          <v-card class="pa-2" outlined tile hover data-aos="zoom-in" data-aos-easing="ease">
            <v-list>

              <v-list-item>
                <p class="title"> Distance
                </p>
              </v-list-item>

              <v-list-item>
                <p class="title"> Temp</p>
              </v-list-item>

              <v-list-item>
                <p class="title"> Votage</p>
              </v-list-item>
              <v-divider></v-divider>

              <v-list-item>
                <p class="title"> Rx</p>
              </v-list-item>

              <v-list-item>
                <p class="title"> Tx</p>
              </v-list-item>


            </v-list>
          </v-card>
        </v-col>
        <v-col cols12 sm6>
          <v-card class="pa-2" outlined tile hover data-aos="zoom-in" data-aos-easing="ease">
            <v-list v-for="i in Optical" :key="i._id">

              <v-list-item>
                <p class="subtitle-1 text-left">{{ i.distance }} m</p>
              </v-list-item>

              <v-list-item>
                <p class="subtitle-1 text-left">{{ i.temp }} c</p>
              </v-list-item>

              <v-list-item>
                <p class="subtitle-1 text-left">{{ i.voltage }} v</p>
              </v-list-item>
              <v-divider></v-divider>

              <v-list-item>
                <p class="subtitle-1 text-left">{{ i.rx }}</p>
              </v-list-item>

              <v-list-item>
                <p class="subtitle-1 text-left">{{ i.tx }}</p>
              </v-list-item>


            </v-list>
          </v-card>
        </v-col>


      </v-row>

      <v-row class="mb-6" no-gutters>

        <v-col cols12 sm6>
          <v-card class="pa-2" outlined tile hover data-aos="zoom-in" data-aos-easing="ease">
            <v-list>

              <v-list-item>
                <p class="title"> Description</p>
              </v-list-item>

            </v-list>
          </v-card>
        </v-col>
        <v-col cols12 sm6>
          <v-card class="pa-2" outlined tile hover data-aos="zoom-in" data-aos-easing="ease">
            <v-list>

              <v-list-item>
                <p class="title"> 1404</p>
              </v-list-item>

            </v-list>
          </v-card>
        </v-col>

      </v-row>

    </v-container>
  </div>
</template>

<script>
export default {
  name: 'OnuDetail',
  props: ['ip', 'onu'],
  data: () => ({
    Info: [],
    Optical: [],
    Fdb: [],
  }),
  created() {
    this.GeneralInfo()
    this.FdbInfo()
    this.OpticalInfo()
  },
  methods: {
    async GeneralInfo() {
      const response = await this.$api.auth.getAPI('/pon_onts_general_info?ip=' + this.ip + '&interface=' + this.onu)
      const Info = response.data.data
      this.Info = Info
    },
    async OpticalInfo() {
      const response = await this.$api.auth.getAPI('/pon_onts_optical?ip=' + this.ip + '&interface=' + this.onu)
      const Optical = response.data.data
      this.Optical = Optical
    },
    async FdbInfo() {
      const response = await this.$api.auth.getAPI('/pon_fdb?ip=' + this.ip + '&interface=' + this.onu)
      const Fdb = response.data.data
      this.Fdb = Fdb
      console.log(this.Fdb)
    },
    async RebootOnu() {
      const response = await this.$api.auth.getAPI('/pon_ont_reboot?ip=' + this.ip + '&interface=' + this.onu)
      const data = response.data
      if (data.statusCode === 200) {
        this.$notify({
          group: 'foo',
          title: 'Onu successfully reloaded',
          position: 'top left',
          type: 'success',
          duration: 5000
        })
      }
      console.log(data.statusCode)
    },
    async DeleteOnu() {
      const response = await this.$api.auth.getAPI('/pon_ont_delete?ip=' + this.ip + '&interface=' + this.onu)
      const Delete = response.data
      if (Delete.statusCode === 200) {
        this.$notify({
          group: 'foo',
          title: 'Onu successfully deleted',
          position: 'top left',
          type: 'error',
          duration: 5000
        })
      }
      console.log('delete onu')
    },
    BackToHome() {
      window.open('/?ip=' + this.ip, '_blank')
    }
  },


}
</script>



