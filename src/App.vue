<template>
  <div class="min-h-screen flex">
    <div>
      <Tree
        tree-id="tree-7"
        :tree="tree"
        :key="`tree-${treeKey}`"
        class="mb-10"
      />

      <button type="button" class="px-2 border rounded-lg" @click="treeKey++">
        rerender tree
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { TreeBranchNested } from './types/TreeTypes.ts'

import axios from 'axios'
import Tree from './components/Tree.vue'
import FlatToNested from 'flat-to-nested'

let treeKey = ref(1)

let tree = ref<TreeBranchNested[]>([])
let loadingTree = ref(false)

onMounted(() => {
  fetchTree()
})

let fetchTree = () => {
  loadingTree.value = true

  axios.get<TreeBranchNested[]>('https://64b4c8450efb99d862694609.mockapi.io/tree/items')
    .then((response) => {
      try {
        let flatToNested = new FlatToNested({
          parent: 'parent_id'
        })

        tree.value = flatToNested.convert(response.data).children as TreeBranchNested[]
      } catch (e) {
        alert('failed to process fetched tree')
      }
    })
    .catch(() => {
      alert('failed to fetch tree')
    })
    .finally(() => {
      loadingTree.value = false
    })
}
</script>
