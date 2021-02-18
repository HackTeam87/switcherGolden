<template>
  <div>
    <v-container>
      <DeviceInput @setIp="setDeviceIp"></DeviceInput>
      <v-row no-gutters style="flex-wrap: nowrap;">
        <v-col
            cols="1"
            style="min-width: 100px; max-width: 100%;"
            class="flex-grow-1 flex-shrink-0"
        >
          <v-list-group value="true">
            <v-list-item>
              <v-data-table
                  v-if="showTable === true"
                  :headers="headers"
                  :items="dataTableStatus"
                  :items-per-page="15"
                  item-key="_id"
                  sort-by="status"
                  class="elevation-1">

                <template v-slot:body="{ items}">

                  <tbody>
                  <tr v-for="item in items" :key="item._id">

                    <td class="text-left">{{ item.last_reg_since }}</td>
                    <td class="text-left">{{ item.interface }}</td>
                    <td class="text-left">
                      <v-chip
                          @click="showOnuDetail(item.interface)"
                          :color="getColor(item.status)"
                          dark
                      >
                        {{ item.status }}
                      </v-chip>
                    </td>
                    <td class="text-left">

                      <v-chip
                          @click="showOnuDetail(item.interface)"
                          :color="getColor(item.admin_status)"
                          dark
                      >
                        {{ item.admin_status }}
                      </v-chip>

                    </td>
                  </tr>
                  </tbody>
                </template>
              </v-data-table>
            </v-list-item>
          </v-list-group>
        </v-col>
      </v-row>
      <p v-for=" i in dataTableInterface" :key="i._id">
        {{ i.vlan_mode }}
        {{ i.stat_in_octets }}
      </p>
    </v-container>
  </div>
</template>

<script>
import DeviceInput from '../components/DeviceInput'

export default {
  name: 'OltMain',
  data: () => ({
    deviceIp: "",
    showTable: 0,
    dataTableStatus: [],
    dataTableInterface: [],
    headers: [
      {text: 'Last_Reg_Since', value: 'Last_Reg_Since'},
      {text: 'ONU', value: 'ONU'},
      {text: 'Status', value: 'Status'},
      {text: 'Admin_Status', value: 'Admin_Status'},
    ],
  }),
  components: {
    DeviceInput,
  },
  computed: {},
  created() {
    this.deviceIp = this.getIpFromQuery()
    if (this.deviceIp !== "") {
      this.setDeviceIp(this.deviceIp);
    }

  },
  methods: {
    async getOnuStatus() {
      this.showTable = !this.showTable
      const response = await this.$api.auth.getAPI('/pon_onts_status_detailed?ip=' + this.deviceIp)
      const data = response.data.data
      this.dataTableStatus = data
    },
    async getOnuInterface() {
      const response = await this.$api.auth.getAPI('/pon_interface_info?ip=' + this.deviceIp)
      const data = response.data.data
      this.dataTableInterface = data
    },
    getColor(status) {
      if (status === 'Online') return 'green'
      else if (status === 'Enabled') return 'primary'
      else return 'red'
    },
    showOnuDetail(onu) {
      this.$router.push({name: 'OnuDetail', params: {ip: this.deviceIp, onu: onu,}})
    },

    setDeviceIp: function (ip) {
      console.log("New deviceIP setted: " + ip);
      this.deviceIp = ip;
    },

    getIpFromQuery() {
      console.log(this.$route);
      if (typeof this.$route.query.ip !== 'undefined') {
        return this.$route.query.ip;
      }
      return "";
    },
  },
  watch: {
    deviceIp: function () {
      let route = this.$route.name;
      if (route === 'home') {
        route = 'home';
        this.getOnuStatus()
        this.getOnuInterface()
      }

      console.log(route)
    },
  },
}

</script>
