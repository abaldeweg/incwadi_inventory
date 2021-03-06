<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('branch') }}</h1>
    </b-container>

    <b-container size="m" v-show="isStatsLoading">
      <b-spinner size="l" />
    </b-container>

    <b-container size="m" v-if="stats">
      <branch-stats :stats="stats" />
    </b-container>

    <b-divider />

    <b-container size="m" v-if="branch">
      <h2>{{ $t('settings') }}</h2>
      <branch-edit :branch="branch" :me="me" />
    </b-container>

    <b-divider />

    <b-container size="m">
      <h2>{{ $t('clean_up') }}</h2>
      <p>{{ $t('clean_up_desc') }}</p>
      <branch-clean-books :me="me" />
    </b-container>

    <b-divider />

    <b-container size="m">
      <h2>{{ $t('conditions') }}</h2>
      <p>{{ $t('conditions_desc') }}</p>
      <condition-list
        v-for="condition in conditions"
        :key="condition.id"
        :condition="condition"
      />
      <condition-new />
    </b-container>

    <b-divider />

    <b-container size="m">
      <b-button
        :style="{ float: 'right' }"
        design="outline"
        @click.prevent="createInventory"
        v-if="!inventoryState.hasActiveInventory"
      >
        {{ $t('createInventory') }}
      </b-button>
      <h3>{{ $t('inventory') }}</h3>
      <p>{{ $t('inventoryDesc') }}</p>
    </b-container>

    <b-container size="m">
      <inventory-list
        :inventories="inventoryState.inventories"
        @end="endInventory"
      />
    </b-container>
  </article>
</template>

<script>
import BranchCleanBooks from '../components/branch/CleanBooks'
import ConditionList from '../components/condition/List'
import ConditionNew from '../components/condition/New'
import BranchEdit from '../components/branch/Edit'
import BranchStats from '../components/branch/Stats'
import { mapState } from 'vuex'
import useAuth from '@/composables/useAuth'
import { toRefs } from '@vue/composition-api'
import useInventory from '@/composables/useInventory'
import InventoryList from '@/components/inventory/List'

export default {
  name: 'branch-view',
  head: {
    title: 'Branch',
  },
  components: {
    BranchCleanBooks,
    ConditionList,
    ConditionNew,
    BranchEdit,
    BranchStats,
    InventoryList,
  },
  setup() {
    const { getUser, state } = useAuth()
    getUser()
    const { me } = toRefs(state)

    const {
      state: inventoryState,
      createInventory,
      endInventory,
    } = useInventory()

    return { me, inventoryState, createInventory, endInventory }
  },
  computed: {
    ...mapState('branch', ['branch']),
    ...mapState('condition', ['conditions']),
    ...mapState('book', ['stats', 'isStatsLoading']),
  },
  created: function () {
    this.$store.dispatch('branch/branch')
    this.$store.dispatch('condition/list')
    this.$store.dispatch('stats/stats')
    this.$store.dispatch('book/stats')
  },
}
</script>
