export const randomKey = (len) => {
  const str = Date.now().toString()
  let hash = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  
  // 使用输入字符串的每个字符作为种子
  let seed = 0;
  for (let i = 0; i < str.length; i++) {
    seed += str.charCodeAt(i);
  }

  // 生成200位的哈希码
  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor((Math.random() * seed) % charactersLength);
    hash += characters.charAt(randomIndex);
    // 更新种子以增加随机性
    seed = (seed * 31 + randomIndex) >>> 0;
  }

  return hash;
}

export const resp = (res) => {
  if (res.code && res.code ===200){
    return res.data;
  } else if (res.code) {
    return null;
  }
}