<template>
  <div class="to-do-card">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.to-do-card {
  background-color: #fff;
  padding: 10px 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  margin: 10px 0;
  font-size: 20px;
}
</style>
