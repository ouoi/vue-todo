<template>
  <div :class="['to-do-item', { completed: item.completed}]">
    <IconButton class="check-button" @click="toggleComplete">
      <font-awesome-icon v-if="item.completed" icon="check-circle" />
      <font-awesome-icon v-else icon="circle" />
    </IconButton>
    <div class="title" @click="$emit('click', id)">
      <slot name="title">
        {{ item.title }}
      </slot>
    </div>
    <IconButton class="remove-button" @click="remove()">
      <font-awesome-icon icon="minus" :style="{ color: '#fa403c' }" />
    </IconButton>
  </div>
</template>

<script>
import IconButton from './IconButton'

export default {
  components: {
    IconButton
  },
  props: {
    id: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    toggleComplete () {
      this.item.completed = !this.item.completed
    },
    remove () {
      if (confirm('삭제하시겠습니까?')) {
        this.$emit('remove', this.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.to-do-item {
  display: flex;
  align-items: center;
  transition: color 0.6s;
  cursor: pointer;

  &.completed {
    text-decoration: line-through;
    color: #aaa;
  }

  .title {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 10px;
  }

  .check-button {
    margin-right: 10px;
    svg {
      color: #27bcae;
    }
  }
}
</style>
