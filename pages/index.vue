<template>
  <v-main class="secondary">
    <v-sheet color="primary" width="100%" height="10" />
    <v-img src="/vi-sonic-2023.jpeg" width="100%" />
    <v-sheet color="primary" width="100%" class="pa-6 mb-0">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            x-large
            color="secondary"
            v-bind="attrs"
            rounded
            block
            v-on="on"
          >
            Confirmar presença
          </v-btn>
        </template>
        <v-form ref="presenceFormRef" @submit.prevent="handleSubmitForm()">
          <v-card class="secondary rounded-xl">
            <v-toolbar color="primary" height="80" elevation="0">
              <v-toolbar-title class="font-weight-bold">
                Confirme sua presença
              </v-toolbar-title>
              <v-spacer />
              <v-btn icon @click="dialog = false">
                <v-icon> mdi-close </v-icon>
              </v-btn>
            </v-toolbar>

            <v-card-text class="pt-6">
              <v-text-field
                placeholder="Informe o nome dos familiares"
                height="64"
                rounded
                solo-inverted
                v-model="form.family_name"
                :rules="rules.required"
              />
              <v-text-field
                placeholder="Quantidade adultos"
                type="number"
                :rules="rules.required"
                height="64"
                rounded
                solo-inverted
                min="0"
                v-model.number="form.adults"
                hint="Somente números"
              />
              <v-text-field
                placeholder="Quantidade Crianças"
                type="number"
                min="0"
                height="64"
                rounded
                solo-inverted
                v-model.number="form.children"
                hint="Somente números"
              />
              <v-text-field
                placeholder="Informe seu celular"
                height="64"
                rounded
                solo-inverted
                v-mask="['(##) ####-####', '(##) #####-####']"
                v-model="form.phone"
                :rules="rules.required"
                type="tel"
                hint="Somente números"
              />
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="pa-4">
              <v-spacer></v-spacer>
              <v-btn color="primary" rounded large type="submit" width="200">
                <v-icon left> mdi-check </v-icon>
                Confirmar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-sheet>
    <v-sheet
      color="transparent"
      width="100%"
      class="pa-6 subtitle-1 font-weight-bold"
    >
      Esperamos vocês no dia 27 de Agosto as 15:00 horas no salão de festa Terrazzo
      Vianna, confira o endereço abaixo
    </v-sheet>
    <v-sheet color="transparent" width="100%" class="pb-0">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.5662637576625!2d-46.82234128458851!3d-23.584016368315382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce55296d416ff5%3A0x47e966a68f2579ac!2sCondom%C3%ADnio%20Terrazzo%20Viana!5e0!3m2!1spt-BR!2sbr!4v1655072531203!5m2!1spt-BR!2sbr"
        width="100%"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </v-sheet>
  </v-main>
</template>

<script>
import background from '~/assets/background.jpeg'
import validateMixin from '~/mixins/validateMixin'

const presencePayload = {
  event_id: 4,
  family_name: null,
  adults: null,
  children: null,
  phone: null,
}

export default {
  data() {
    return {
      background,
      dialog: false,
      form: {
        ...presencePayload,
      },
      successSend: false,
    }
  },
  mixins: [validateMixin],
  methods: {
    async handleSubmitForm() {
      if (this.$refs.presenceFormRef.validate()) {
        this.$nuxt.$loading.start()
        await this.$axios
          .post('/api/presences', this.form)
          .then((response) => {
            if (response) {
              this.form = { ...presencePayload }
              this.dialog = false
              this.$refs.presenceFormRef.resetValidation()
              this.$toast.success('Presença confirmada com sucesso!')
            }
          })
          .catch(() => {
            this.$toast.error(
              'Ops, nao foi possivel confirmar sua presenca, por favor verifique os dados informados.'
            )
          })
        this.$nuxt.$loading.finish()
      }
    },
  },
}
</script>
