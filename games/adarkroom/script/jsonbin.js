const initiateJBin = (API_KEY) =>
  axios.create({
    baseURL: "https://api.jsonbin.io/v3",
    headers: {
      // "X-Master-Key": API_KEY,
      "X-Access-Key": API_KEY,
    },
  });

const jsonBinWrapper = (API_KEY) => {
  const JSONBin = initiateJBin(API_KEY);
  compressToBase64 = function(input) {
    const dataToCompress = input;
    const compressionOptions = {
        level: 9, // 设置压缩级别为最高级别 9
    };

    // 压缩数据
    const compressedData = pako.deflate(dataToCompress, compressionOptions);

    // 将压缩后的数据转换为 Base64 编码
    const base64CompressedData = btoa(String.fromCharCode.apply(null, compressedData));
    return base64CompressedData;
},

// 封装解压缩函数，接受 Base64 编码作为输入，返回解压缩后的字符串
decompressFromBase64 = function(input) {
    const base64CompressedData = input;

    // 将 Base64 编码转换为 Uint8Array
    const compressedData = new Uint8Array(atob(base64CompressedData).split('').map(char => char.charCodeAt(0)));

    // 解压缩数据
    const decompressionOptions = { to: 'string' };
    const decompressedData = pako.inflate(compressedData, decompressionOptions);
    return decompressedData;
}

  var wrapper = {
    get: (binId) => {
      return JSONBin.get(`/b/${binId}`)
        .then((response) => ({
          status: response.status,
          binId: response.data.metadata.id,
          record: response.data.record,
        }))
        .catch((error) => ({
          status: error.response.status,
          message: error.response.data.message,
        }));
    },

    getSpecific: (binId, binVersion) => {
      return JSONBin.get(`/b/${binId}/${binVersion}`)
        .then((response) => ({
          status: response.status,
          binId: response.data.metadata.id,
          record: response.data.record,
        }))
        .catch((error) => ({
          status: error.response.status,
          message: error.response.data.message,
        }));
    },

    getLatest: (binId) => {
      return JSONBin.get(`/b/${binId}/latest`)
        .then((response) => ({
          status: response.status,
          binId: response.data.metadata.id,
          record: response.data.record,
        }))
        .catch((error) => ({
          status: error.response.status,
          message: error.response.data.message,
        }));
    },

    post: (data = {}, binName) => {
      return JSONBin.post(`/b`, data, {
        headers: {
          "Content-Type": "application/json",
          "X-Bin-Name": binName
        },
      })
        .then((response) => ({
          status: response.status,
          binId: response.data.metadata.id,
          record: response.data.record,
        }))
        .catch((error) => ({
          status: error.response.status,
          message: error.response.data.message,
        }));
    },

    put: (binId, data = {}) => {
      return JSONBin.put(`/b/${binId}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => ({
          status: response.status,
          parentId: response.data.metadata.parentId,
          record: response.data.record,
        }))
        .catch((error) => ({
          status: error.response.status,
          message: error.response.data.message,
        }));
    },

    delete: (binId) => {
      return JSONBin.delete(`/b/${binId}`)
        .then((response) => ({
          status: response.status,
          binId: response.data.metadata.id,
          message: response.data.message,
        }))
        .catch((error) => ({
          status: error.response.status,
          message: error.response.data.message,
        }));
    },

    getStoreName: (userName) => {
        return  "uocat-adarkroom-" + userName;
    },

  save: async (userName, binId, data) => {
    compressData = {
        "data": compressToBase64(JSON.stringify(data))
    }

    putResponse = await wrapper.put(binId, compressData)
    if (putResponse.status == 200) {
        return putResponse.binId;
    } else {
        postResponse = await wrapper.post(compressData, wrapper.getStoreName(userName));
        if (postResponse.status == 200) {
            return postResponse.binId;
        }
    }

    return null;
  },

  load: async (binId) => {
    getLatestResponse = await wrapper.getLatest(binId)
    if (getLatestResponse.status == 200) {
        // console.log(JSON.stringify(getLatestResponse.record.data));
        decompressData = JSON.parse(decompressFromBase64(getLatestResponse.record.data))
        return decompressData;
    }

    return null;
  },

  };
  return wrapper;
};