<template>
  <article>
    <b-container size="m">
      <b-notification type="warning">
        {{ $t('deprecated') }}
      </b-notification>
    </b-container>

    <b-container size="m">
      <h1>{{ $t('stats') }}</h1>
    </b-container>

    <b-container size="m" v-show="isLoading">
      <b-spinner size="l" />
    </b-container>

    <b-container size="m" v-if="stats">
      <stats :stats="stats" />
    </b-container>
  </article>
</template>

<script>
import Stats from './../components/stats/Stats'
import { mapState } from 'vuex'

export default {
  name: 'stats-view',
  head: {
    title: 'Stats',
  },
  components: {
    Stats,
  },
  computed: {
    ...mapState('stats', ['stats', 'isLoading']),
  },
  created: function () {
    this.$store.dispatch('stats/stats')
  },
}
</script>
