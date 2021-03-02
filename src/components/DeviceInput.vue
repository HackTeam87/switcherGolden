<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>
          <v-img
              src="@/assets/img/olt/4PON-GEPON-OLT-FD1204SN.webp"
              max-height="200"
              max-width="310"
          ></v-img>
          <v-spacer></v-spacer>
          <h2 style="color:#0275d8">OLT</h2>
          <v-spacer></v-spacer>
          <v-text-field
              v-model="search"
              label="Search"
              placeholder="10.15.1.2"
              hide-details
          >
          </v-text-field>
          <v-btn @click="sendIP()">show</v-btn>
        </v-card-title>
      </v-card>

    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
    }
  },
  methods: {
    sendIP() {
      if (this.search !== ''){
        this.$emit('setIp', this.search)
      }
    }
  },

}
</script>
