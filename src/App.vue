<template>
  <div class="min-h-screen flex">
    <div>
      <Tree tree-id="tree-7" :tree="tree" :key="`tree-${treeKey}`" class="mb-10" />

      <button type="button" @click="treeKey++">
        rerender tree
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FlatToNested from 'flat-to-nested'

import axios from 'axios'
import Tree from './components/Tree.vue'

let treeKey = ref(1)

let tree = ref([])
let loadingTree = ref(false)

onMounted(() => {
  // todo: should fetch on created
  fetchTree()
})

let fetchTree = () => {
  loadingTree.value = true

  axios.get('https://64b4c8450efb99d862694609.mockapi.io/tree/items')
    .then((response) => {
      try {
        let flatToNested = new FlatToNested({
          parent: 'parent_id'
        })

        tree.value = flatToNested.convert(response.data).children
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
