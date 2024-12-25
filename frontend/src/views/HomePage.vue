<template>
  <div class="container">
    <div class="function-bar">
      <h1>妈妈链 ⛓momlink</h1>
      <button @click="addIdentifierChain">备忘</button>
    </div>
    <div class="content">
      <div class="sidebar">
        <p>妈妈链，防失联</p>
        <p>妈妈链是不记名备忘，只提供公开信息。为IP制作人、社牛、作者提供一个公开的备忘录。</p>
        <p>备忘方法，在备忘线索（码链）上用卡片记录信息。</p>
      </div>
      <div class="main-content">
        <!-- 功能行 -->
        <div class="search-container">
          <select v-model="selectedCategory">
            <option v-for="category in store.category" :key="category" :value="category">{{ category }}</option>
          </select>
          <input v-model="keyword" @keyup.enter="search" placeholder="输入关键字" />
          <button @click="search">🔍</button>
        </div>
        <div class="results">
          <div v-if="result" class="result-item">
            <div v-for="card in result" :key="card">
              <h3>{{ card.name }}</h3>
              <img :src="card.qrcode" />
            </div>
          </div>
          <div v-else>
            <p>没有找到结果。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../services/store";
import { resp } from '../services/util';
import api from "../services/api";

export default {
  name: 'HomePage',
  setup() {

    const fetchcategories = async () => {
      try {
        const data = resp(await api.category()).map(e => e.category);
        store.category = data;
      } catch (error) {
        console.error('An error occurred while fetching the categories:', error);
      }
    };

    fetchcategories();

    return { store };
  },

  data() {
    return {
      selectedCategory: '',
      keyword: '',
      result: null,
      // categories: ['类别1', '类别2', '类别3'], // 示例类别
    };
  },
  methods: {
    async search() {
      if (this.keyword.trim() === '') {
        alert('请输入关键字');
        return;
      }
      if (this.selectedCategory.trim() === '') {
        alert('请选择平台');
        return;
      }
      try {
        const response = await api.findCard({
          category: this.selectedCategory,
          name: this.keyword,
        });
        this.result = resp(response); // 处理返回结果
      } catch (error) {
        console.error('查询失败', error);
      }
    },
    async addIdentifierChain() {
      this.$router.push({ name: 'ChainPage' }); // 导航到 ChainPage.vue 页面并传递密码
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.function-bar {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.content {
  width: 100%;
  display: flex;
  flex-direction: row;
}

/* Desktop layout */
@media screen and (min-width: 768px) {
  .content {
    padding: 20px;
  }

  .function-bar h1 {
    padding: 8px 20px;
  }

  .sidebar {
    width: 30%;
    padding: 20px;
  }

  .main-content {
    width: 70%;
  }
}

/* Mobile layout */
@media screen and (max-width: 767px) {
  .content {
    padding: 10px;
  }

  .function-bar h1 {
    padding: 2px 20px;
  }

  .sidebar {
    display: none;
  }

  .main-content {
    width: 100%;
  }

}

/* Common styles */

.function-bar button {
  padding: 8px 16px;
  border-radius: 4px;
}

.search-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.search-container select,
.search-container input,
.search-container button {
  margin-right: 10px;
}

.results {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.result-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>