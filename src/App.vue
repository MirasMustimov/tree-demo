<template>
  <div class="min-h-screen flex justify-center items-center">
    <div>
      <Tree tree-id="tree-1" :key="`tree-${treeKey}`" />

      <button type="button" @click="treeKey++">
        rerender tree
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Tree from './components/Tree.vue'

let treeKey = ref(1)
</script>
