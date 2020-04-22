<template>
  <button class="icon-button" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button.icon-button {
  width: 30px;
  height: 26px;
  padding: 2px;
  border: none;
  cursor: pointer;
  background: transparent;

  &:focus {
    outline: none;
  }

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
