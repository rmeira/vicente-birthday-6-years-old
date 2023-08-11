<template>
  <v-main class="secondary">
    <v-toolbar height="80" color="primary">
      <v-toolbar-title>
        Presenças - Adultos: {{ adults }} - Crianças: {{ children }}
      </v-toolbar-title>
    </v-toolbar>
    <v-container grid-list-md>
      <v-card class="rounded-xl" color="acc">
        <v-list three-line light color="grey lighten-4">
          <template
            v-for="(
              { id, family_name, phone, adults, children }, index
            ) in presences"
          >
            <v-divider v-if="index" :key="index"></v-divider>
            <v-list-item :key="id">
              <v-list-item-content>
                <v-list-item-title>
                  {{ family_name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  Tel: {{ phone }} - Adultos: {{ adults }} - Crianças:
                  {{ children }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      presences: [],
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadingPresences()
    })
  },
  methods: {
    async loadingPresences() {
      this.$nuxt.$loading.start()
      await this.$axios
        .get('/api/presences')
        .then((response) => {
          this.presences = response.data.filter(
            (presence) => presence.event_id === 4
          )
        })
        .catch(() => {
          this.$toast.error(
            'Ops, nao foi possivel confirmar sua presenca, por favor verifique os dados informados.'
          )
        })
      this.$nuxt.$loading.finish()
    },
  },
  computed: {
    adults() {
      return this.presences.reduce((acc, item) => {
        return acc + item?.adults
      }, 0)
    },
    children() {
      return this.presences.reduce((acc, item) => {
        return acc + item?.children
      }, 0)
    },
  },
}
</script>

<style></style>
