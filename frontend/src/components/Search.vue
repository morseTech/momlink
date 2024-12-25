import axios from 'axios';

methods: {
  async search() {
    try {
      const response = await axios.post('http://localhost:7001/api/search', {
        category: this.selectedCategory,
        keyword: this.keyword,
      });
      this.result = response.data; // 处理返回结果
    } catch (error) {
      console.error('查询失败', error);
    }
  },
},