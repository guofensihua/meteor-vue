<template>
  <div class="app">
    <header>
      <div className="app-bar">
        <div className="app-header">
          <h1>
            📝️ To Do List<span v-if="incompleteCount > 0"
              >({{ incompleteCount }})</span
            >
          </h1>
        </div>
      </div>
    </header>
    <div class="main">
      <template v-if="currentUser">
        <TaskForm />
        <div class="filter">
          <button
            v-bind:hideCompleted="hideCompleted"
            @click="toggleHideCompleted"
          >
            <span v-if="hideCompleted">Show All</span>
            <span v-else>Hide Completed Tasks</span>
          </button>
        </div>
        <ul class="tasks">
          <Task
            class="task"
            v-for="task in tasks"
            v-bind:key="task._id"
            v-bind:task="task"
          />
        </ul>
      </template>
      <template v-else>
        <LoginForm />
      </template>
    </div>
  </div>
</template>

<script>
import Task from "./components/Task.vue";
import TaskForm from "./components/TaskForm.vue";
import LoginForm from "./components/LoginForm.vue";
import { TasksCollection } from "/imports/api/collections/TasksCollection";

export default {
  components: {
    Task,
    TaskForm,
    LoginForm
  },
  data() {
    return {
      hideCompleted: false,
    };
  },
  methods: {
    toggleHideCompleted() {
      this.hideCompleted = !this.hideCompleted;
    },
  },
  meteor: {
    tasks() {
      let filteredTasks = TasksCollection.find(
        {},
        { sort: { createdAt: -1 } }
      ).fetch();

      if (this.hideCompleted) {
        filteredTasks = filteredTasks.filter((task) => !task.checked);
      }

      return filteredTasks;
    },
    incompleteCount() {
      return TasksCollection.find({ checked: { $ne: true } }).count();
    },
    currentUser() {
      return Meteor.user();
    },
  },
};
</script>

<style>
body {
  font-family: sans-serif;
  padding: 10px;
}
</style>
