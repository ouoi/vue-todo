<template>
  <div class="to-do-list">
    <h1>To Do List</h1>

    <ToDoCard class="add-card">
      <IconButton class="add-button" @click="addToDo">
        <font-awesome-icon icon="plus" />
      </IconButton>
      <input type="text" placeholder="할 일 추가하기" v-model="addTitle" @keydown="keydownTitle"/>
    </ToDoCard>

    <Draggable v-model="items">
      <transition-group>
        <ToDoCard v-for="item in progressItems" :key="item.id" class="to-do-item">
          <ToDoItem :item="item" @click="showToDoModal" @remove="removeToDo" />
        </ToDoCard>
      </transition-group>
    </Draggable>

    <div class="completed-title">
      <h2>완료된 할 일</h2>
    </div>

  <Draggable v-model="items">
    <transition-group>
      <ToDoCard v-for="item in completedItems" :key="item.id" class="to-do-item">
        <ToDoItem :item="item" @click="showToDoModal" @remove="removeToDo" />
      </ToDoCard>
    </transition-group>
  </Draggable>

    <ToDoModal :show.sync="showModal">
      <div v-if="selectedItem" class="to-do-detail">
        <ToDoItem :item="selectedItem" hidden-extra-data @remove="removeToDo">
          <template #title>
            <input v-model="selectedItem.title" />
          </template>
        </ToDoItem>
        <textarea type="text" v-model="selectedItem.contents" placeholder="내용 추가" class="to-do-contents" />
        <div class="to-do-due-date">
          <font-awesome-icon icon="calendar-alt" />
          <input type="date" v-model="selectedItem.dueDate" />
        </div>
      </div>
    </ToDoModal>
  </div>
</template>

<script>
import { dateDiff } from '@/utils'
import { setLocalStorage, getLocalStorage } from '@/utils/localStorage'

import ToDoCard from './ToDoCard'
import ToDoItem from './ToDoItem'
import ToDoModal from './ToDoModal'
import IconButton from './IconButton'
import Draggable from 'vuedraggable'

const LOCAL_STORAGE_KEY = 'to-do-list'

function generateKey () {
  return Math.random().toString(16).substr(2, 8)
}

export default {
  name: 'ToDoList',
  components: {
    ToDoCard,
    ToDoItem,
    ToDoModal,
    IconButton,
    Draggable
  },
  data () {
    return {
      items: [],
      addTitle: '',
      showModal: false,
      selectedItem: null
    }
  },
  computed: {
    progressItems () {
      return this.items.filter(({ completed }) => !completed)
    },
    completedItems () {
      return this.items.filter(({ completed }) => completed)
    }
  },
  watch: {
    items: {
      deep: true,
      handler (v) {
        if (v) {
          setLocalStorage(LOCAL_STORAGE_KEY, v)
        }
      }
    }
  },
  created () {
    this.items = getLocalStorage(LOCAL_STORAGE_KEY) || []
    setTimeout(this.alertDueDate, 1000)
  },
  methods: {
    addToDo () {
      if (!this.addTitle) {
        alert('제목을 입력해주세요.')
        return
      } else if (this.items.find(({ title }) => title === this.addTitle)) {
        alert('동일한 제목이 존재합니다.')
        return
      }

      this.items.unshift({
        id: generateKey(),
        title: this.addTitle,
        contents: '',
        completed: false,
        dueDate: null
      })

      this.addTitle = ''
    },
    keydownTitle (e) {
      if (e.keyCode === 13) {
        this.addToDo()
      }
    },
    removeToDo (item) {
      console.log(item)
      const itemIndex = this.findItemIndex(item)
      if (itemIndex < 0) {
        return
      }

      this.items.splice(itemIndex, 1)
      this.showModal = false
    },
    showToDoModal (item) {
      this.selectedItem = item
      this.showModal = true
    },
    findItemIndex (item) {
      const itemIndex = item ? this.items.findIndex(({ id }) => id === item.id) : -1
      if (itemIndex < 0) {
        alert('해당 아이템이 없습니다.')
      }
      return itemIndex
    },
    alertDueDate () {
      let count = 0
      this.items.forEach(({ completed, dueDate }) => {
        if (!completed && dueDate && dateDiff(new Date(), dueDate) < 0) {
          count++
        }
      })
      if (count > 0) {
        alert(`마감 기한이 지난 할 일이 ${count}개 있습니다.`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.to-do-list {
  max-width: 720px;
  padding: 20px;
  margin: 0 auto;

  h1 {
    text-align: center;
    color: #fff;
  }
}

.add-card {
  display: flex;
  align-items: center;

  .add-button {
    margin-right: 10px;
    svg {
      color: #2f7dfa;
    }
  }
}

input {
  font-size: inherit;
  width: 100%;
  border: none;
  border-bottom: 1px solid #aaa;
  padding-bottom: 1px;
  &:focus {
    outline: none;
  }
}

.to-do-detail {
  .to-do-contents {
    width: 100%;
    min-height: 100px;
    border: 1px solid #aaa;
    border-radius: 4px;
    margin-top: 16px;
    font-size: 14px;
  }
  .to-do-due-date {
    margin-top: 10px;
    display: flex;
    svg {
      color: #aaa;
      margin-right: 10px;
    }
  }
}

.completed-title {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  text-align: center;
  margin-top: 60px;

  &::before,
  &::after {
    content: '';
    border-top: 1px solid #fff;
    flex: 1;
  }
  h2 {
    margin: 0 20px;
  }
}
</style>
