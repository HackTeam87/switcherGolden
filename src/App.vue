<template>
    <v-app>
        <v-main>
            <keep-alive exclude="OnuDetail">
                <router-view></router-view>
            </keep-alive>
        </v-main>
    </v-app>
</template>

<script>


    export default {
        name: 'App',
        data: () => ({}),
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        /*margin-top: 30px;*/
    }

    .v-progress-circular {
        margin: 1rem;
    }
</style>
