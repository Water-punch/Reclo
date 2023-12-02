<<<<<<< HEAD
import axios from "axios";

const backendPortNumber = "5176";
const serverUrl =
  "http://" + window.location.hostname + ":" + backendPortNumber + "/";

async function get(endpoint, params = "") {
  try {
    console.log(
      `%cGET 요청: ${serverUrl + endpoint + "/" + params}`,
      "color: #ba2941;"
    );
  } catch (err) {
    console.log("GET 요청 실패\n", err);
  }
  return axios.get(serverUrl + endpoint + "/" + params);
}

async function post(endpoint, data) {
  const bodyData = JSON.stringify(data);
  try {
    console.log(
      `%cPOST 요청: ${serverUrl + endpoint}\n 요청 데이터: ${bodyData}`,
      "color: #ba2941;"
    );
  } catch (err) {
    console.log("POST 요청 실패\n", err);
  }
  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function postImg(endpoint, data) {
  try {
    console.log(
      `%c이미지 POST 요청: ${serverUrl + endpoint}`,
      "color: #ba2941;"
    );
    console.log(`%cPOST 요청 데이터: ${data}`, "color: #ba2941;");
  } catch (err) {
    console.log("POST 요청 실패\n", err);
  }

  return axios.post(serverUrl + endpoint, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

async function put(endpoint, data) {
  const bodyData = JSON.stringify(data);
  try {
    console.log(
      `%cPUT 요청: ${serverUrl + endpoint}\n 요청 데이터: ${bodyData}`,
      "color: #ba2941;"
    );
  } catch (err) {
    console.log("PUT 요청 실패\n", err);
  }
  return axios.put(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function del(endpoint, params = "") {
  try {
    console.log(
      `%cDELETE 요청: ${serverUrl + endpoint + "/" + params}`,
      "color: #ba2941;"
    );
  } catch (err) {
    console.log("DELETE 요청 실패\n", err);
  }
  return axios.delete(serverUrl + endpoint + "/" + params, {
    headers: {
      // Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      // 보안 관련해서는 공부가 필요하다
    },
  });
}

async function delImg(endpoint, data) {
  try {
    console.log(
      `%cDELETE 요청: ${(serverUrl + endpoint, JSON.stringify(data))}`,
      "color: #ba2941;"
    );
  } catch (err) {
    console.log("DELETE 요청 실패\n", err);
  }
  return axios.delete(serverUrl + endpoint, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export { get, post, postImg, put, del, delImg };
=======
import axios from 'axios'

const backendPortNumber = ''
const serverUrl =
  "http://" + window.location.hostname + ":" + backendPortNumber + "/";

async function get(endpoint, params = '') {

  try {
    console.log(`%cGET 요청: ${serverUrl + endpoint + '/' + params}`, "color: #ba2941;")
  } catch (err) {
    console.log('GET 요청 실패\n', err)
  }
  return axios.get(serverUrl + endpoint + '/' + params)
}

async function post(endpoint, data) {
  const bodyData = JSON.stringify(data)
  try {
    console.log(`%cPOST 요청: ${serverUrl + endpoint}\n 요청 데이터: ${bodyData}`, "color: #ba2941;")
  } catch (err) {
    console.log('POST 요청 실패\n', err)
  }
  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

async function postImg(endpoint, data) {
  try{
    console.log(`%c이미지 POST 요청: ${serverUrl + endpoint}`, "color: #ba2941;");
    console.log(`%cPOST 요청 데이터: ${data}`, "color: #ba2941;");
  }
  catch (err) {
    console.log('POST 요청 실패\n', err);
  }

  return axios.post(serverUrl + endpoint, data, {
    headers: {
      "Content-Type": 'multipart/form-data',
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
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export { get, post, postImg, put, del, delImg }
>>>>>>> 37719496cc82025c6efba6dad4d3633f670797c1
