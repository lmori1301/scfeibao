<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const RichTextEditor = defineAsyncComponent(() => import('./RichTextEditor.vue'))

defineProps<{
  modelValue: string
  placeholder?: string
  height?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <RichTextEditor
    :model-value="modelValue"
    :placeholder="placeholder"
    :height="height"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
