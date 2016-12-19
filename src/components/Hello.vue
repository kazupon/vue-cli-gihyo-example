<template>
  <p class="message">メッセージ: {{ msg }}</p>
</template>

<style>
.message { color: #42b983; }
</style>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: 'こんにちは！'
    }
  }
}
</script>
