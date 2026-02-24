<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const props = defineProps<{
  modelValue: string
  placeholder?: string
  height?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const editorRef = shallowRef()
const valueHtml = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  if (val !== valueHtml.value) {
    valueHtml.value = val
  }
})

const toolbarConfig = {}
const editorConfig = {
  placeholder: props.placeholder || '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      server: '/api/upload/image',
      fieldName: 'file'
    },
    uploadVideo: {
      server: '/api/upload/video',
      fieldName: 'file'
    }
  }
}

const handleCreated = (editor: any) => {
  editorRef.value = editor
}

const handleChange = (editor: any) => {
  valueHtml.value = editor.getHtml()
  emit('update:modelValue', valueHtml.value)
}

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor) editor.destroy()
})
</script>

<template>
  <div class="rich-text-editor" :style="{ border: '1px solid #ccc' }">
    <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="'default'" style="border-bottom: 1px solid #ccc" />
    <Editor v-model="valueHtml" :defaultConfig="editorConfig" :mode="'default'" :style="{ height: height || '400px', 'overflow-y': 'hidden' }" @onCreated="handleCreated" @onChange="handleChange" />
  </div>
</template>

<style scoped lang="scss">
.rich-text-editor { :deep(.w-e-text-placeholder) { top: 10px; } }
</style>
