<template>
  <ul>
    <li v-for="branch in tree" :key="branch.id">
      <TreeBranch :branch="branch" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'

  import TreeBranch from './TreeBranch.vue'

  let tree = [
    {
      id: 1,
      title: 'title 1',
      children: [
        {
          id: 2,
          title: 'title 2',
        },
        {
          id: 3,
          title: 'title 3',
        }
      ]
    },
    {
      id: 4,
      title: 'title 4',
      children: [
        {
          id: 5,
          title: 'title 5',
          children: [
            {
              id: 7,
              title: 'title 7',
            },
            {
              id: 8,
              title: 'title 8',
            }
          ]
        },
        {
          id: 6,
          title: 'title 6',
        }
      ]
    }
  ]

  onMounted(() => {
    console.log('rerendered')
  })
</script>
