<template>
  <div class="to-do-list">
    <h1>To Do List</h1>

    <ToDoCard class="add-card">
      <IconButton class="add-button" @click="addToDo">
        <font-awesome-icon icon="plus" />
      </IconButton>
      <input type="text" placeholder="add To Do" v-model="addTitle" @keydown.enter="addToDo"/>
    </ToDoCard>
    <ToDoCard v-for="(item, key) in items" :key="key" class="to-do-item">
      <ToDoItem :id="key" :item="item" @click="showToDoModal" @remove="removeToDo" />
    </ToDoCard>

    <ToDoModal :show.sync="showModal">
      <div v-if="selectedKey && selectedItem" class="to-do-detail">
        <ToDoItem :id="selectedKey" :item="selectedItem" @remove="removeToDo">
          <template #title>
            <input v-model="selectedItem.title" />
          </template>
        </ToDoItem>
        <textarea type="text" v-model="selectedItem.contents" placeholder="내용 추가" class="to-do-contents" />
      </div>
    </ToDoModal>
  </div>
</template>

<script>
import ToDoCard from './ToDoCard'
import ToDoItem from './ToDoItem'
import ToDoModal from './ToDoModal'
import IconButton from './IconButton'

function generateKey () {
  return Math.random().toString(16).substr(2, 8)
}

export default {
  name: 'ToDoList',
  components: {
    ToDoCard,
    ToDoItem,
    ToDoModal,
    IconButton
  },
  data () {
    return {
      items: {},
      addTitle: '',
      showModal: false,
      selectedKey: null,
      selectedItem: null
    }
  },
  methods: {
    addToDo () {
      if (!this.addTitle) {
        return
      }
      this.$set(this.items, generateKey(), {
        title: this.addTitle,
        contents: '',
        completed: false,
        dueDate: new Date()
      })
      this.addTitle = ''
    },
    removeToDo (key) {
      this.showModal = false
      const cloneItems = { ...this.items }
      delete cloneItems[key]
      this.items = cloneItems
    },
    showToDoModal (key) {
      if (this.checkExistItem(key)) {
        this.selectedKey = key
        this.selectedItem = this.items[key]
        this.showModal = true
      } else {
        this.selectedKey = null
        this.selectedItem = null
      }
    },
    checkExistItem (key) {
      if (this.items[key]) {
        return true
      } else {
        alert('해당 아이템이 없습니다.')
        return false
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
}
</style>
