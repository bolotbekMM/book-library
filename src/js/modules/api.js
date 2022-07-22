const token = JSON.parse(localStorage.getItem("token"));

export function apiRequest(url, method, body) {
  const mainURL = `http://localhost:1717/${url}`;
  const headers = {
    "Content-type": "application/json",
    "X-Auth": token,
  };

  return fetch(mainURL, {
    method: method,
    body: JSON.stringify(body),
    headers: headers,
  }).then((response) => {
    // if (!response.ok) {
    // console.log(response);
    // }
    return response.json();
  });
}
