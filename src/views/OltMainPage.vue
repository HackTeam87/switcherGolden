<template>
  <div>
    <v-container>
      <DeviceInput @setIp="setDeviceIp"></DeviceInput>
      <div class="preloader" v-if="loading && error === '' ">
        <preloader></preloader>
      </div>
      <v-row no-gutters style="flex-wrap: nowrap;" v-if="showTable === true">
        <v-col
            cols="1"
            style="min-width: 100px; max-width: 100%;"
            class="flex-grow-1 flex-shrink-0"
        >

          <v-card-title>
            Filter (onu,mac,status,vlan)
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
              mobile-breakpoint="0"
              :headers="headers"
              :items="filteredItems"
              :items-per-page="5"
              item-key="_id"
              sort-by="status"
              class="elevation-1">

            <template v-slot:body="{ items }">

              <tbody>
              <tr v-for="item in items" :key="item._id">
                <td class="text-left">{{ item.interface }}</td>
                <td class="text-left" style="color:#696969">{{ item.mac_address }}</td>
                <td class="text-left">
                  <v-chip
                      :color="getColor(item.status)"
                      :disabled="item.status === 'Offline'"
                      @click="showOnuDetail(item.interface)"
                      dark
                  >
                    {{ item.status }}
                  </v-chip>
                </td>
                <td class="text-left">

                  <v-chip
                      :color="getColor(item.admin_status)"
                      :disabled="item.status === 'Offline'"
                      @click="showOnuDetail(item.interface)"
                      dark
                  >
                    {{ item.admin_status }}
                  </v-chip>

                </td>
                <td class="text-left" style="color:#1976d2">{{ item.vlan_id }}</td>
              </tr>
              </tbody>

            </template>


          </v-data-table>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DeviceInput from '../components/DeviceInput'
import Preloader from '../components/Preloader'
export default {
  name: 'OltMain',
  data: () => ({
    loading: '',
    error: '',
    search: '',
    deviceIp: '',
    showTable: 0,
    OnuStatus: [],
    headers: [
      {text: 'ONU', value: 'ONU'},
      {text: 'Mac_Address', value: 'Mac_Address'},
      {text: 'Status', value: 'Status'},
      {text: 'Admin_Status', value: 'Admin_Status'},
      {text: 'Vlan_Id', value: 'Vlan_Id'},
    ],
  }),
  components: {
    DeviceInput,
    Preloader
  },
  computed: {
    filteredItems() {
      return this.OnuStatus.filter((i) => {
        return !this.search || (i.mac_address + '||' + i.interface +
            '||' + i.status + '||' + i.vlan_id).toUpperCase().indexOf(this.search.toUpperCase()) !== -1
      })
    }
  },
  created() {
    this.deviceIp = this.getIpFromQuery()
    if (this.deviceIp !== "") {
      this.setDeviceIp(this.deviceIp);
    }
  },
  methods: {
    async getOnuStatus() {
      this.loading = true
      this.showTable = !this.showTable
      let result = {}
      const response = await this.$api.auth.getAPI('/pon_onts_status_detailed?ip=' + this.deviceIp).catch(() => {
            this.error = 'ERROR'
          })
      const response2 = await this.$api.auth.getAPI('/pon_fdb?ip=' + this.deviceIp).catch(() => {
            this.error = 'ERROR'
          })
      response.data.data.forEach(el => {
        result[el._id] = {}
        result[el._id].interface = el.interface
        result[el._id].status = el.status
        result[el._id].admin_status = el.admin_status
      })
      response2.data.data.forEach(el => {
        if (typeof result[el._id] === 'undefined') {
          result[el._id] = {}
        }
        result[el._id].mac_address = el.mac_address
        result[el._id].vlan_id = el.vlan_id
      })
      for (let i in result) {
        this.OnuStatus.push(result[i])
      }
      this.loading = false
    },

    getColor(status) {
      if (status === 'Online') return 'green'
      else if (status === 'Enabled') return 'primary'
      else return 'red'
    }
    ,
    showOnuDetail(onu) {
      this.$router.push({name: 'OnuDetail', params: {ip: this.deviceIp, onu: onu,}})
    }
    ,

    setDeviceIp: function (ip) {
      console.log("New deviceIP setted: " + ip);
      this.deviceIp = ip;
    }
    ,

    getIpFromQuery() {
      console.log(this.$route);
      if (typeof this.$route.query.ip !== 'undefined') {
        return this.$route.query.ip;
      }
      return "";
    }
    ,
  },
  watch: {
    deviceIp: function () {
      let route = this.$route.name;
      if (route === 'home') {
        route = 'home';
        this.getOnuStatus()
      }

      console.log(route)
    },
  },
}

</script>
