<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}

button {
  margin-left: 10px;
  padding: 6px 12px;
  /* 按钮内边距 */
  background-color: #007bff;
  /* 按钮背景颜色 */
  color: white;
  /* 按钮文字颜色 */
  border: none;
  /* 去掉边框 */
  border-radius: 5px;
  /* 圆角 */
  cursor: pointer;
  /* 鼠标悬停时显示手型 */
  transition: background-color 0.3s;
  /* 背景颜色过渡效果 */
}

button:hover {
  background-color: #0056b3;
  /* 鼠标悬停时的背景颜色 */
}

input {
  border: none;
  border-bottom: #007bff solid 1px;
}
</style>
