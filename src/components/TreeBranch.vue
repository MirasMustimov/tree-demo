<template>
  <div class="pl-3 px-1">
    <!-- is this valid html h6>button ? -->
    <h6>
      <!-- do not make this into button when it should not be clickable -->
      <button
        type="button"
        class="flex items-center"
        :class="[ index % 2 === 0 ? 'bg-stone-300' : 'bg-stone-100' ]"
        @click="showNestedBranches = !showNestedBranches"
      >
        <span v-if="nestedBranches.length">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-4 h-4 transition-transform duration-300"
            :class="[ !showNestedBranches ? '-rotate-90' : '' ]"
          >
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
          </svg>
        </span>
        <span v-else>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
            <path d="M6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" />
          </svg>
        </span>
        <span>{{ branch.title }}</span>
      </button>
    </h6>

    <ul v-if="nestedBranches.length && showNestedBranches">
      <li v-for="(nestedBranch, nestedIndex) in nestedBranches" :key="nestedBranch.id">
        <TreeBranch :branch="nestedBranch" :index="index + nestedIndex + 1" />
      </li>
    </ul>
  </div>
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
    // use better name
    index: {
      type: Number,
      required: true
    }
  })

  let treeId = inject('tree-id')

  // maybe use more specific rather than tree
  let showNestedBranches = useStorage(
    `tree-${treeId}:branch-${props.branch.id}:show-nested`,
    false,
    sessionStorage
  )

  let nestedBranches = computed(() => {
    return props.branch.children ? props.branch.children : []
  })
</script>
