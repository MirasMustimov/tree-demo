<template>
  <ul class="min-w-[250px]">
    <TreeBranch
      v-for="branch in tree"
      :key="branch.id"
      :branch="branch"
      :level="0"
      :show-nested-branches-initial="true"
    />
  </ul>
</template>

<script setup lang="ts">
  import { provide } from 'vue'
  import TreeBranch from './TreeBranch.vue'

  let props = defineProps({
    treeId: {
      type: String,
      required: true
    },
    tree: {
      type: Array,
      required: true
    }
  })

  provide('tree-id', props.treeId)
</script>
