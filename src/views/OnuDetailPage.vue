<template>
  <div class="main">

    <v-container class="grey lighten-5">

      <div class="preloader" v-if="loading && error === '' ">
        <preloader></preloader>
      </div>

      <v-row class="mb-6" no-gutters>

        <v-col cols12 sm12>

          <v-card class="pa-2" outlined tile hover data-aos="zoom-in" data-aos-easing="ease">
            <notifications group="foo" position="top center" width="100%" style="position: absolute; top: 52%;">
              <template slot="body">
                <div class="my-notification">
                  <v-alert :type="Alert.type" dense outlined>
                    <p class="title">
                      {{ Alert.title }}
                    </p>
                  </v-alert>
                </div>
              </template>
            </notifications>
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
          <v-row class="mb-6" no-gutters>
            <v-col cols12 sm12>

              <v-data-table
                  mobile-breakpoint="0"
                  :headers="headers"
                  :items="Detailed"
                  :hide-default-footer="true"
                  dark
                  class="elevation-1 blue-grey darken-4">

                <template v-slot:body="{ items }">

                  <tbody>
                  <tr v-for="item in items" :key="item._id">
                    <td class="text-left">
                      <v-icon aria-label="Account" :color="getColor(item.status)">
                        mdi-ethernet mdi-48px
                      </v-icon>
                    </td>
                    <td class="text-left">{{ item.vlan_mode }}</td>
                    <td class="text-left">{{ item.uptime }}</td>
                    <td class="text-left">{{ item.lastReload }}</td>
                    <td class="text-left">{{ item.counters }}</td>
                    <td class="text-left">{{ item.errors }}</td>
                  </tr>
                  </tbody>

                </template>


              </v-data-table>

            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>

    </v-container>
  </div>
</template>

<script>
import Preloader from '../components/Preloader'

export default {
  name: 'OnuDetail',
  props: ['ip', 'onu'],
  data: () => ({
    loading: '',
    error: '',
    tab: null,
    Alert: [],
    Info: [],
    Fdb: [],
    Optical: [],
    Detailed: [],
    headers: [
      {text: 'Status_Eth'},
      {text: 'VlanMode'},
      {text: 'Uptime'},
      {text: 'LastReload'},
      {text: 'Counters(IN/OUT)'},
      {text: 'CRC(IN/OUT)'},
    ],

  }),
  components: {
    Preloader
  },
  created() {
    this.GeneralInfo()
    this.FdbInfo()
    this.OpticalInfo()
    this.DetailedInfo()
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
    async DetailedInfo() {
      this.loading = true
      const response = await this.$api.auth.getAPI('/pon_onts_status_detailed?ip=' +
          this.ip + '&interface=' + this.onu).catch(() => {
      this.error = 'ERROR'
    })
      const response2 = await this.$api.auth.getAPI('/pon_interface_info?ip=' +
          this.ip + '&interface=' + this.onu).catch(() => {
      this.error = 'ERROR'
    })
      const Detailed = response.data.data
      const Interface = response2.data.data
      let lastReload = (new Date(Detailed[0]['last_reg'] * 1000) + '').slice(0, 16)
      let counters = this.convertSize(Interface[0]['stat_in_octets']) + "/"
          + this.convertSize(Interface[0]['stat_out_octets'])
      let errors = Interface[0]['stat_in_crc_pkts'] + "/" + Interface[0]['stat_out_crc_pkts']

      this.Detailed = [{
        'status': Interface[0]['status'], 'vlan_mode': Interface[0]['vlan_mode'],
        'uptime': Detailed[0]['last_reg_since'], 'lastReload': lastReload, 'counters': counters, 'errors': errors
      }]

      this.loading = false
    },

    async RebootOnu() {
      const response = await this.$api.auth.getAPI('/pon_ont_reboot?ip=' + this.ip + '&interface=' + this.onu)
      const data = response.data
      if (data.statusCode === 200) {
        this.$notify({
          group: 'foo',
          duration: 5000
        })
        this.Alert = {title: 'Onu successfully reloaded', type: 'success'}
      }
      console.log(data.statusCode)
    },
    async DeleteOnu() {
      const response = await this.$api.auth.getAPI('/pon_ont_delete?ip=' + this.ip + '&interface=' + this.onu)
      const Delete = response.data
      if (Delete.statusCode === 200) {
        this.$notify({
          group: 'foo',
          duration: 5000
        })
        this.Alert = {title: 'Onu successfully deleted', type: 'error'}
      }
    },
    BackToHome() {
      window.open('/?ip=' + this.ip, '_top')
    },
    getColor(status) {
      if (status === 'Up') return 'green'
      else if (status === 'Down') return 'error'
      else return 'yellow'
    },
    convertSize: function (el) {
      let out = '';
      if (el < 1024) out = el + "B";
      if (el === 0) out = el;
      if (el > 1024) out = (el / 1024).toFixed(2) + "K";
      if (el > 1048576) out = (el / 1048576).toFixed(2) + "M";
      if (el > 1073741824) out = (el / 1073741824).toFixed(2) + "G";
      if (el > 1099511627776) out = (el / 1099511627776).toFixed(2) + "T";
      return out;
    },
  },


}
</script>


