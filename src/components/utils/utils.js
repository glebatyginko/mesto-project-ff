import { apiConfig } from "../api";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function request(endpoint, method, body) {
  return fetch(`${apiConfig.baseUrl}${endpoint}`, {
    method: method,
    headers: apiConfig.headers,
    body: JSON.stringify(body),
  }).then(checkResponse);
}

export { checkResponse, request };
