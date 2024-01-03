import moment from 'moment'

const RATING_ALL = 2

export default {
  data () {
    return {
      selectedType: RATING_ALL,
      showContent: false
    }
  },
  computed: {
    filterRatings () {
      const result = []

      this.ratings.forEach(rating => {
        if (this.showContent && !rating.text) return false
        if (
          this.selectedType === RATING_ALL ||
          this.selectedType === rating.rateType
        ) {
          result.push(rating)
        }
      })

      return result
    }
  },
  filters: {
    formateDate (time) {
      return moment(time).format('YYYY-MM-DD hh:mm')
    }
  },
  methods: {
    changeSelectedTypeFn (btnType) {
      this.selectedType = btnType
    },
    toggleShowContentFn (contentType) {
      this.showContent = contentType
    }
  }
}
