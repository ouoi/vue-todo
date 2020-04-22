<template>
  <div>
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
    <div v-if="!hiddenExtraData && item.dueDate" class="extra-data">
      <span :class="['due-date', dueDateType]">{{ item.dueDate }}</span>
    </div>
  </div>
</template>

<script>
import { dateDiff } from '@/utils'
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
    },
    hiddenExtraData: Boolean
  },
  computed: {
    dueDateType () {
      if (this.item.dueDate) {
        const diff = dateDiff(new Date(), this.item.dueDate)
        if (diff < 0) {
          return 'error'
        } else if (dateDiff <= 1) {
          return 'warning'
        }
      }
      return null
    }
  },
  methods: {
    toggleComplete () {
      this.item.completed = !this.item.completed
    },
    remove () {
      if (confirm(`'${this.item.title}'을(를) 삭제하시겠습니까?`)) {
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

  .extra-data {
    margin-left: 36px;
    margin-top: 4px;
    font-size: 12px;
    .due-date {
      background-color: #f5f7f7;
      border-radius: 3px;
      padding: 1px 4px;
      color: #606262;
      &.warning {
        background-color: #fff7ee;
        color: #ff9117;
      }
      &.error {
        background-color: #fff1f1;
        color: #fa403c;
      }
    }
  }
}
</style>
