<template>
  <div class="to-do-list">
    <h1>To Do List</h1>

    <ToDoCard class="add-card">
      <IconButton class="add-button" @click="addToDo">
        <font-awesome-icon icon="plus" />
      </IconButton>
      <input type="text" placeholder="할 일 추가하기" v-model="addTitle" @keydown="keydownTitle"/>
    </ToDoCard>
    <ToDoCard v-for="(item, key) in items" :key="key" class="to-do-item">
      <ToDoItem :id="key" :item="item" @click="showToDoModal" @remove="removeToDo" />
    </ToDoCard>

    <ToDoModal :show.sync="showModal">
      <div v-if="selectedKey && selectedItem" class="to-do-detail">
        <ToDoItem :id="selectedKey" :item="selectedItem" hidden-extra-data @remove="removeToDo">
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
        alert('제목을 입력해주세요.')
        return
      } else if (Object.keys(this.items).find(key => this.items[key].title === this.addTitle)) {
        alert('동일한 제목이 존재합니다.')
        return
      }

      this.$set(this.items, generateKey(), {
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
  .to-do-due-date {
    margin-top: 10px;
    display: flex;
    svg {
      color: #aaa;
      margin-right: 10px;
    }
  }
}
</style>
