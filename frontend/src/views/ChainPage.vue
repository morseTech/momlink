<template>
  <div class="identifier-chain-page">
    <!-- 头部区域 -->
    <header class="header">
      <div class="icon">🖇链码: </div>
      <div class="search-container">
        <input v-model="uniqueId" placeholder="🚨链码用来管理卡片，请复制妥善保管🚨" />
        <button @click="resetPassword">新链</button>
        <button @click="showCard">🔍</button>
      </div>
    </header>

    <!-- 中间区域 -->
    <div class="content">
      <button class="add-card-button" @click="showAddCardModal">添加名片</button>
      <!-- 列表卡区域 -->
      <div class="card-list">
        <div v-for="card in cards" :key="card.id" class="card-item">
          <div class="card-category">{{ card.category }}</div>
          <div class="card-name">{{ card.name }}</div>
          <!-- <p v-if="card.platformId">ID: {{ card.platformId }}</p> -->
          <div class="card-public">{{ card.isPublic ? '公开' : '未公开' }}</div>
        </div>
      </div>
    </div>

    <!-- 弹窗 -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>🔗新建卡片</h3>
        <form @submit.prevent="addCard">
          <div class="form-group">
            <label for="category">所在平台</label>
            <select id="category" v-model="newCard.category">
              <option v-for="category in store.category" :key="category" :value="category">{{ category }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="name">你的名称</label>
            <input id="name" v-model="newCard.name" required />
          </div>
          <div class="form-group">
            <label for="platformId">你的平台ID</label>
            <input id="platformId" v-model="newCard.platformId" />
          </div>
          <div class="form-group">
            <label for="qrcode">扫码入口</label>
            <input id="qrcode" type="file" accept="image/png" @change="handleFileUpload" />
            <img :src="newCard.qrcode" />
          </div>
          <div class="form-group">
            <label for="isPublic">公开可查</label>
            <div>
              <input type="checkbox" id="checkbox" v-model="newCard.isPublic" />
            </div>
          </div>
          <div class="modal-buttons">
            <button type="submit">提交</button>
            <button type="button" @click="cancelAdd">取消</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../services/store";
import { randomKey, resp } from '../services/util';
import api from "../services/api";

export default {
  name: 'ChainPage',
  setup(){
    if(!store.category){
      const fetchcategories = async () => {
        try {
          const data = resp(await api.category()).map( e => e.category);
          store.category = data;
        } catch (error) {
          console.error('An error occurred while fetching the categories:', error);
        }
      };
  
      fetchcategories();
    }
    return { store };
  },
  data() {
    return {
      cards: [], // 存储标识卡的数组
      uniqueId: '',
      showModal: false, // 控制弹窗显示
      newCard: { // 新标识卡内容
        name: '',
        category: '',
        password: '',
        platformId: '',
        qrcode: '',
        isPublic: true,
      },
    };
  },
  methods: {
    resetPassword() {
      this.cards = [];
      this.uniqueId = randomKey(30);
    },
    async showCard() {
      this.cards = [];
      const cards = resp(await api.showCard(this.uniqueId));
      (cards !== null ) && (this.cards = cards);
    },
    showAddCardModal() {
      if( this.uniqueId.length < 30) {
        this.uniqueId = randomKey(30);
      }
      this.newCard.password = this.uniqueId;
      this.showModal = true; // 显示弹窗
    },
    async handleFileUpload(e){
      this.newCard.qrcode = e.target.files[0].name;
      const file = e.target.files[0]
      const qr = await api.upload(file)
      if (qr.code === 200){
        this.newCard.qrcode = qr.data[0];
      }

    },
    async addCard() {
      if (this.newCard.name.trim() === '') {
        alert('请输入你在平台的名称');
        return;
      }
      if (this.newCard.category.trim() === '') {
        alert('请选择所在平台');
        return;
      }
      const res = await api.createCard(this.newCard);
      this.newCard = { name: '', category: '', password: '', platformId: '', qrcode: '' }; // 清空输入框
      this.showModal = false; // 关闭弹窗
      this.showCard();
    },
    cancelAdd() {
      this.showModal = false; // 关闭弹窗
      this.newCard = { name: '', category: '', password: '', platformId: '', qrcode: '' }; // 清空输入框
    },
    async deleteCard() {
      const {cardId} = e.target.dataset
      console.log(e)
      this.showCard();
    },
  },
};
</script>

<style scoped>
.identifier-chain-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.icon {
  font-size: 24px;
  margin-right: 10px;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.card-list {
  flex: 1;
  margin-bottom: 20px;
}

.add-card-button {
  width: 100%;
  height: 40px;
  font-size: 20px;
  margin: 10px 0;
}

.card-item {
  position: relative;
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.card-item .card-category{
  position: absolute;
  left: 0;
  top: 0;
  width: 40px;
  height: 40px;
  border-radius: 15%;
  border: #ccc solid 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: lightskyblue;
  color: white;
  font-size: 12px;
}
.card-item .card-name{
  position: absolute;
  left: 50px;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: bold;
  max-width: 250px;
  height: 40px;
  overflow: hidden; /* 确保溢出的内容被隐藏 */
  white-space: nowrap; /* 防止文本换行 */
  text-overflow: ellipsis; /* 使用省略号表示文本被截断 */
}
.card-item .card-qrcode{
  position: absolute;
  left: 250px;
  width: 40px;
}
.card-item .card-qrcode img{
  width: 30px;
  height: 30px;
}
.card-item .card-public{
  position: absolute;
  right: 2px;
}
.card-item .card-public input{
  width: 20px;
}

.card-item img{
  width: 60px;
  height: 60px;
}

/* 弹窗样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px; /* 弹窗宽度 */
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.form-group {
  display: flex;
  flex-direction: row;
  margin-bottom: 15px; /* 增加行距 */
}

.modal label {
  width: 30%;
  margin-right: 5px; /* label 和输入框之间的间距 */
  font-weight: bold; /* 加粗 label */
}

.modal input, select {
  width: 70%; /* 输入框和选择框宽度 */
  padding: 8px; /* 输入框内边距 */
  border-radius: 4px; /* 圆角 */
}
</style>