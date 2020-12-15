const doFetch = async ({
  method = 'GET',
  path = '/',
  body = {},
} = {}) => {
  if (method === 'GET' || method === 'HEAD') {
    return fetch(path, {
      method: method,
    });
  } else {
    let headers = {
      'Content-Type': 'application/json; charset=utf-8',
    };
    let bodyToSend = JSON.stringify(body);

    return fetch(path, {
      method: method,
      body: bodyToSend,
      headers: headers,
    });
  }
}

export default doFetch;