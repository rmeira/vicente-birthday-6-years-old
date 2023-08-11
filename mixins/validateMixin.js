export default {
  data() {
    return {
      rules: {
        required: [(v) => !!v || 'O campo é obrigatório'],
        url: [
          (v) =>
            /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gim.test(
              v
            ) || 'URL incorreta',
        ],
      },
    }
  },
  methods: {
    ruleMinCount(value = 8) {
      return [
        (v) =>
          String(v)?.length >= value ||
          `O campo deve ser maior ou igual há ${value} caracteres`,
      ]
    },
    ruleMaxCount(value = 250) {
      return [
        (v) =>
          String(v)?.length <= value ||
          `O campo deve ser menor ou igual há ${value} caracteres`,
      ]
    },
    ruleValidCharacters(validCharacters = []) {
      const regexValidCharacters = new RegExp(
        `[^(\\w+|${validCharacters.join('|')})]`,
        'g'
      )
      return [
        (v) =>
          !regexValidCharacters.test(v) ||
          `Carácter inválido: ${[
            ...new Set(v.match(regexValidCharacters)),
          ].join(', ')}`,
      ]
    },
  },
}
