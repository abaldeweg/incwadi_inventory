<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('reservation') }}</h1>
    </b-container>

    <b-container size="m">
      <h2>{{ $t('newReservation') }}</h2>
      <reservation-create :cart="cart" @created="onCreated" />
    </b-container>

    <b-container size="m">
      <h2>{{ $t('reservedBooks') }}</h2>
      <b-spinner size="l" v-if="isLoading" />
      <reservation-list
        :reservations="reservations"
        @removed="getList"
        :me="me"
      />
    </b-container>

    <b-container size="m">
      <div v-html="$tc('reservationDesc')" />
    </b-container>
  </article>
</template>

<script>
import useReservationList from '../composables/useReservationList'
import useCart from '../composables/useCart'
import ReservationList from './../components/reservation/List'
import ReservationCreate from './../components/reservation/Create'
import useAuth from '@/composables/useAuth'
import { toRefs } from '@vue/composition-api'

export default {
  name: 'reservation-view',
  head: {
    title: 'Reservation',
  },
  components: {
    ReservationList,
    ReservationCreate,
  },
  setup() {
    const { getUser, state } = useAuth()
    getUser()
    const { me } = toRefs(state)

    const { reservations, isLoading, getList } = useReservationList()
    const { cart, cleanCart, listCart } = useCart()
    listCart()

    const onCreated = () => {
      getList()
      cleanCart()
      listCart()
    }

    return { reservations, isLoading, getList, onCreated, cart, me }
  },
}
</script>
