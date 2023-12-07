import axios from 'axios'

const backendPortNumber = '5001'
const serverUrl =
  "http://" + window.location.hostname + ":" + backendPortNumber + "/";

// const { S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET_NAME, S3_REGION } = process.env

// AWS.config.update({
//   region: process.env.S3_REGION,
//   accessKeyId: process.env.S3_ACCESS_KEY_ID,
//   secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
// })

// const s3 = new AWS.S3()

// const bucketName = process.env.S3_BUCKET_NAME

async function get(endpoint, params = '') {

  try {
    console.log(`%cGET 요청: ${serverUrl + endpoint + '/' + params}`, "color: #ba2941;")
  } catch (err) {
    console.log('GET 요청 실패\n', err)
  }
  return axios.get(serverUrl + endpoint + '/' + params,{
    withCredentials: true,
  })
}

//endpoint로만 get
async function get2(endpoint) {

  try {
    console.log(`%cGET 요청: ${serverUrl + endpoint}`, "color: #ba2941;")
  } catch (err) {
    console.log('GET 요청 실패\n', err)
  }
  return axios.get(serverUrl + endpoint, {
    withCredentials: true,
  })
}

async function post(endpoint, data) {
  const bodyData = JSON.stringify(data)
  try {
    console.log(`%cPOST 요청: ${serverUrl + endpoint}\n 요청 데이터: ${bodyData}`, "color: #ba2941;")
  } catch (err) {
    console.log('POST 요청 실패\n', err)
  }
  return axios.post(serverUrl + endpoint, bodyData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

async function postImg(url, data) {
  
  try{
    console.log(`%c이미지 POST 요청: ${serverUrl + endpoint}`, "color: #ba2941;");
    console.log(`%cPOST 요청 데이터: ${data}`, "color: #ba2941;");
  }
  catch (err) {
    console.log('POST 요청 실패\n', err);
  }

  return axios.put(url, data, {
    withCredentials: true,
    headers: {
      "Content-Type": 'image/*',
    },
  });
}

async function put(endpoint, data) {
  const bodyData = JSON.stringify(data)
  try {
    console.log(`%cPUT 요청: ${serverUrl + endpoint}\n 요청 데이터: ${bodyData}`, "color: #ba2941;")
  } catch (err) {
    console.log('PUT 요청 실패\n', err)
  }
  return axios.put(serverUrl + endpoint, bodyData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

async function del(endpoint, params = '') {
  try {
    console.log(`%cDELETE 요청: ${serverUrl + endpoint + '/' + params}`, "color: #ba2941;")
  } catch (err) {
    console.log('DELETE 요청 실패\n', err)
  }
  return axios.delete(serverUrl + endpoint + '/' + params, {
    withCredentials: true,
    headers: {
      // Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      // 보안 관련해서는 공부가 필요하다
    },
  })
}

async function delImg(endpoint, data) {
  try {
    console.log(`%cDELETE 요청: ${serverUrl + endpoint, JSON.stringify(data)}`, "color: #ba2941;")
  } catch (err) {
    console.log('DELETE 요청 실패\n', err)
  }
  return axios.delete(serverUrl + endpoint, data, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export { get, get2, post, postImg, put, del, delImg }