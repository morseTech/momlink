import axios from 'axios';

// 创建 Axios 实例
const apiClient = axios.create({
  baseURL: 'http://192.168.5.99:7001/momlink/api', // 后端 API 基础 URL
  meout: 10000, // 请求超时设置
});

const commonClient = axios.create({
  baseURL: 'http://192.168.5.99:7001', // 后端 API 基础 URL
  meout: 10000, // 请求超时设置
});

const api = {}
// 单个文件上传
api.upload = async (file) => {
  const files = [{filename: file.name, filesize: file.size}];
  const preupload = await commonClient.post('/get-upload-token',{files})
  if (preupload.data.code && preupload.data.code === 200){
  const formData = new FormData();
  formData.append('file', file);
  const response = await commonClient.post('/upload-transfer', formData, {
    headers: {
      'upload_token': preupload.data.data[0].token,
    }
  });
  return response.data;
  }
  return preupload.data;

},

// 查看分类
api.category = async (password) => {
  const response = await apiClient.get('/category');
  return response.data; // 返回响应数据
},
// 查找卡片
api.findCard = async (query) => {
  const response = await apiClient.post('/card/search', query);
  return response.data; // 返回响应数据
},

// 查看卡片
api.showCard = async (link) => {
  const response = await apiClient.post(`/card/id`, { link });
  return response.data; // 返回响应数据
},

// 创建卡片
api.createCard = async (card) => {
  const response = await apiClient.post('/card/create', { data: card });
  return response.data; // 返回响应数据
}

// 修改卡片
api.modifyCard = async (card) => {
  const response = await apiClient.post('/card/modify', { data: card });
  return response.data; // 返回响应数据
}

// 删除卡片
api.deleteCard = async (card) => {
  const response = await apiClient.post('/card/delete', { data: card });
  return response.data; // 返回响应数据
}

export default api;