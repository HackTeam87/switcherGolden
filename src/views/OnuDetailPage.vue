<template>
  <div class="main">
    <h2 style="color:orange;">OnuDetail</h2>
    <v-container>
      <v-row no-gutters>


        <v-col cols="12" sm="6" offset-sm="3">
          <v-card v-for="i in Onu" :key="i._id" hover data-aos="zoom-in" data-aos-easing="ease">
            <v-card-title class="align-center">
              <v-row
                  align="center"
                  justify="space-between"
              >
                <v-chip
                    class="ma-2"
                    label
                    color="success"
                    text-color="white"
                >
                  <v-icon left>
                    mdi-arrow-expand-all
                  </v-icon>
                  Onu {{ i.interface }}
                </v-chip>
                <v-btn color="primary" @click="RebootOnu()">
                  <v-icon>
                    mdi-autorenew
                  </v-icon>
                </v-btn>
                <v-btn color="error">
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </v-row>
            </v-card-title>
            <v-divider></v-divider>
            <v-img class="white--text align-center" height="70px"
                   src="@/assets/img/onu/picotel-e710.webp"
            ></v-img>
            <v-list>

              <v-list-item>
                <v-list-item-action>
                  <v-chip class="ma-2" label text-color="white">
                    <v-icon>mdi-label</v-icon>
                    Описание: <a href="http://service.golden.net.ua/abonents/detail?agreement=1404">1404</a>
                  </v-chip>
                </v-list-item-action>
              </v-list-item>

              <v-list-item>
                <v-list-item-action>
                  <v-chip class="ma-2 light-blue accent-3" label text-color="white">
                    <v-icon>mdi-label</v-icon>
                    rx: {{ i.rx }}
                  </v-chip>
                </v-list-item-action>
                <v-list-item-action>
                  <v-chip class="ma-2 light-blue accent-3" label text-color="white">
                    <v-icon>mdi-label</v-icon>
                    rx: {{ i.tx }}
                  </v-chip>
                </v-list-item-action>
              </v-list-item>

              <v-list-item>
                <v-list-item-action>
                  <v-chip class="ma-2 light-blue accent-3" label text-color="white">
                    <v-icon>mdi-label</v-icon>
                    Растояние: {{ i.distance }}
                  </v-chip>
                </v-list-item-action>
              </v-list-item>

              <v-list-item>

                <v-list-item-action>
                  <v-chip class="ma-2 light-blue accent-3" label text-color="white">
                    <v-icon>mdi-label</v-icon>
                    voltage : {{ i.voltage }}
                  </v-chip>
                </v-list-item-action>

              </v-list-item>

              <v-list-item>
                <v-list-item-action>
                  <v-chip class="ma-2 light-blue accent-3" label text-color="white">
                    <v-icon>mdi-label</v-icon>
                    Температура : {{ i.temp }}
                  </v-chip>
                </v-list-item-action>
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
    Onu: []
  }),
  created() {
    this.DetailOnu()
  },
  methods: {
    async DetailOnu() {
      const response = await this.$api.auth.getAPI('/pon_onts_optical?ip=' + this.ip + '&interface=' + this.onu)
      const data = response.data.data
      this.Onu = data
      console.log(this.Onu)
    },
    async RebootOnu() {
      const response = await this.$api.auth.getAPI('/pon_ont_reboot?ip=' + this.ip + '&interface=' + this.onu)
      const data = response.data
      console.log(data.statusCode)
    },
  }

}
</script>

<style scope>

.main, a {
  font-family: 'Roboto', sans-serif;
  text-align: center;
  text-decoration: none;
}
</style>

