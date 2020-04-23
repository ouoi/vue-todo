<template>
  <div v-if="show" class="dim" @click="close">
    <div class="to-do-modal" @click.stop>
      <slot />
      <div class="button-container">
        <button @click="close">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean
  },
  methods: {
    close () {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.dim {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
}

.to-do-modal {
  position: relative;
  top: 100px;
  display: block;
  width: 100%;
  max-width: 420px;
  min-height: 100px;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  overflow: hidden;
  margin: 0 auto;
  z-index: 1001;

  .close-button {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 20px;
    height: 20px;
    padding: 0;
    border: none;
    cursor: pointer;
    &:focus {
      outline: none;
    }
    svg {
      width: 100%;
      height: 100%;
    }
  }

  .button-container {
    text-align: right;
    margin-top: 10px;
    button {
      width: 60px;
      height: 30px;
      background: none;
      border: 1px solid #aaa;
      cursor: pointer;
      font-size: 14px;
    }
  }
}
</style>
