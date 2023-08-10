<template>
  <ul>
    <li v-for="(branch, index) in tree" :key="branch.id">
      <TreeBranch :branch="branch" :index="index" :show-nested-branches-initial="true" />
    </li>
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
