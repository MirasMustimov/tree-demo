<template>
  <div class="ml-3 p-1">
    <!-- is this valid html h6>button ? -->
    <h6>
      <button type="button" @click="showNestedBranches = !showNestedBranches">
        <span>{{ nestedBranches.length ? '+' : '-' }}</span>
        <span>{{ branch.title }}</span>
      </button>
    </h6>

    <ul v-if="nestedBranches.length && showNestedBranches">
      <li v-for="nestedBranch in nestedBranches" :key="nestedBranch.id">
        <TreeBranch :branch="nestedBranch" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useStorage } from '@vueuse/core'

  import TreeBranch from './TreeBranch.vue'

  let props = defineProps({
    branch: {
      type: Object,
      required: true
    }
  })

  let showNestedBranches = useStorage(
    `tree-view:branch-${props.branch.id}:show-nested`,
    false,
    sessionStorage
  )

  let nestedBranches = computed(() => {
    return props.branch.children ? props.branch.children : []
  })
</script>
