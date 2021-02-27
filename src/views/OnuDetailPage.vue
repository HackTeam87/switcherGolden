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
            <v-row align="center" justify="space-between" v-for="(i,index) in Info" :key="index">

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


      <v-tabs v-model="tab" centered icons-and-text outlined>
        <v-tabs-slider color="error"></v-tabs-slider>

        <v-tab href="#tab-1">
          Info
          <v-icon>mdi-information-variant</v-icon>
        </v-tab>

        <v-tab href="#tab-2">
          Logs
          <v-icon>mdi-border-color</v-icon>
        </v-tab>
      </v-tabs>


      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1">

          <v-row class="mb-6" no-gutters v-for="i in Fdb" :key="i._id">

            <v-col cols12 sm6>
              <v-card class="pa-2" outlined tile hover data-aos="zoom-in" data-aos-easing="ease">
                <v-list>

                  <v-list-item>
                    <p class="Heading 4 font-weight-bold">Mac_Address</p>
                  </v-list-item>
                  <v-list-item>
                    <p class="Heading 4 font-weight-bold">Vlan_Id</p>
                  </v-list-item>

                </v-list>
              </v-card>
            </v-col>
            <v-col cols12 sm6>
              <v-card class="pa-2" outlined tile hover data-aos="zoom-in" data-aos-easing="ease">
                <v-list>

                  <v-list-item>
                    <p class="subtitle-1 text-left" style="color:#696969">{{ i.mac_address }}</p>
                  </v-list-item>
                  <v-list-item>
                    <p class="subtitle-1 text-left" style="color:#1976d2">{{ i.vlan_id }}</p>
                  </v-list-item>

                </v-list>
              </v-card>
            </v-col>


          </v-row>

          <v-row class="mb-6" no-gutters v-for="(i,index) in Optical" :key="index">

            <v-col cols12 sm6>
              <v-card class="pa-2" outlined tile hover data-aos="zoom-in" data-aos-easing="ease">
                <v-list>

                  <v-list-item>
                    <p class="Heading 4 font-weight-bold"> Distance
                    </p>
                  </v-list-item>

                  <v-list-item>
                    <p class="Heading 4 font-weight-bold"> Temp</p>
                  </v-list-item>

                  <v-list-item>
                    <p class="Heading 4 font-weight-bold"> Votage</p>
                  </v-list-item>
                  <v-divider></v-divider>

                  <v-list-item>
                    <p class="Heading 4 font-weight-bold"> Rx</p>
                  </v-list-item>

                  <v-list-item>
                    <p class="Heading 4 font-weight-bold"> Tx</p>
                  </v-list-item>


                </v-list>
              </v-card>
            </v-col>
            <v-col cols12 sm6>
              <v-card class="pa-2" outlined tile hover data-aos="zoom-in" data-aos-easing="ease">
                <v-list>

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
        </v-tab-item>

        <v-tab-item value="tab-2">
          <v-row class="mb-6" no-gutters v-for="(i,index) in Interface" :key="index">
            <v-col cols12 sm12>
              <v-card class="pa-2" outlined tile hover data-aos="zoom-in" data-aos-easing="ease">
                <v-toolbar dense>


                  <v-btn-toggle>
                    <v-icon aria-label="Account" :color="getColor(i.status)">
                      mdi-ethernet mdi-48px
                    </v-icon>
                  </v-btn-toggle>
                  <v-divider vertical></v-divider>
                  
                  <v-btn-toggle>
                    {{ i.vlan_id }}
                  </v-btn-toggle>
                  <v-divider vertical></v-divider>

                  <v-btn-toggle>
                    {{ i.vlan_mode }}
                  </v-btn-toggle>
                  <v-divider vertical></v-divider>

<!--                  <v-btn-toggle>-->
<!--                     <v-divider vertical></v-divider>-->
<!--                    {{i.stat_in_octets}}-->
<!--                     <v-divider vertical></v-divider>-->
<!--                    {{i.stat_out_octets}}-->
<!--                     <v-divider vertical></v-divider>-->
<!--                    {{i.stat_out_octets}}-->
<!--                     <v-divider vertical></v-divider>-->
<!--                    {{i.stat_in_crc_pkts}}-->
<!--                    <v-divider vertical></v-divider>-->
<!--                    {{i.stat_out_crc_pkts}}-->
<!--                  </v-btn-toggle>-->
<!--                  <v-divider vertical></v-divider>-->


                </v-toolbar>
              </v-card>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'OnuDetail',
  props: ['ip', 'onu'],
  data: () => ({
    tab: null,
    Info: [],
    Fdb: [],
    Optical: [],
    Interface: [],

  }),
  created() {
    this.GeneralInfo()
    this.FdbInfo()
    this.OpticalInfo()
    this.InterfaceInfo()
  },
  methods: {
    async GeneralInfo() {
      const response = await this.$api.auth.getAPI('/pon_onts_general_info?ip=' + this.ip + '&interface=' + this.onu)
      const Info = response.data.data
      this.Info = Info
    },
    async FdbInfo() {
      const response = await this.$api.auth.getAPI('/pon_fdb?ip=' + this.ip + '&interface=' + this.onu)
      const Fdb = response.data.data
      this.Fdb = Fdb
    },
    async OpticalInfo() {
      const response = await this.$api.auth.getAPI('/pon_onts_optical?ip=' + this.ip + '&interface=' + this.onu)
      const Optical = response.data.data
      this.Optical = Optical
    },
    async InterfaceInfo() {
      const response = await this.$api.auth.getAPI('/pon_interface_info?ip=' + this.ip + '&interface=' + this.onu)
      const Interface = response.data.data
      this.Interface = Interface
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
    },
    BackToHome() {
      window.open('/?ip=' + this.ip, '_top')
    },
    getColor(status) {
      if (status === 'Up') return 'green'
      else if (status === 'Down') return 'error'
      else return 'black'
    }
  },


}
</script>



