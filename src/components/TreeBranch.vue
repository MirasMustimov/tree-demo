<template>
  <li class="odd:bg-slate-200">
    <p class="pr-4">
      <button
        v-if="nestedBranches.length"
        type="button"
        class="flex w-full items-center"
        :style="{ paddingLeft }"
        @click="showNestedBranches = !showNestedBranches"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-4 h-4 transition-transform duration-300"
          :class="[ !showNestedBranches ? '-rotate-90' : '' ]"
        >
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
        <span>{{ branch.title }}</span>
      </button>

      <span v-else class="flex items-center" :style="{ paddingLeft }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
          <path d="M6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" />
        </svg>
        <span>{{ branch.title }}</span>
      </span>
    </p>
  </li>

  <template v-if="nestedBranches.length && showNestedBranches">
    <TreeBranch
      v-for="nestedBranch in nestedBranches"
      :key="nestedBranch.id"
      :branch="nestedBranch"
      :level="level + 1"
    />
  </template>
</template>

<script setup lang="ts">
  import { computed, inject } from 'vue'
  import { useStorage } from '@vueuse/core'

  import TreeBranch from './TreeBranch.vue'

  let props = defineProps({
    branch: {
      type: Object,
      required: true
    },
    showNestedBranchesInitial: {
      type: Boolean,
      default: false
    },
    level: {
      type: Number,
      required: true
    }
  })

  let treeId = inject('tree-id')

  let showNestedBranches = useStorage(
    `tree-${treeId}:branch-${props.branch.id}:show-nested`,
    props.showNestedBranchesInitial,
    sessionStorage
  )

  let nestedBranches = computed(() => {
    return props.branch.children ? props.branch.children : []
  })

  let paddingLeft = computed(() => {
    return `${props.level * 6}px`
  })
</script>
