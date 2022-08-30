import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  scenarios: {
    normal: {
      executor: 'constant-vus',
      vus: 200,
      duration: '10s',
      exec: "normal",
      gracefulStop: '0s',
    },
  }
};

const host = "http://127.0.0.1:3000";

export function normal() {
  http.get(host + "/users/4/balance", {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJyb2xlIjoidXNlciIsImlhdCI6MTY2MDA2OTQ5NCwiZXhwIjoxNjYwNjc0Mjk0fQ.Q8DrVV8j7aY2_TWZHtVUarO8m5MFqIIpQZkzwE3wwOI'
    },
  });

  http.post(host + "/users/4/transactions/deposit", JSON.stringify({
    "cardId": 23,
    "amount": 100
  }), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJyb2xlIjoidXNlciIsImlhdCI6MTY2MDA2OTQ5NCwiZXhwIjoxNjYwNjc0Mjk0fQ.Q8DrVV8j7aY2_TWZHtVUarO8m5MFqIIpQZkzwE3wwOI'
    },
  });

  http.post(host + "/users/4/transactions/transfer", JSON.stringify({
    "creditUserId": 12,
    "amount": 100
  }), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJyb2xlIjoidXNlciIsImlhdCI6MTY2MDA2OTQ5NCwiZXhwIjoxNjYwNjc0Mjk0fQ.Q8DrVV8j7aY2_TWZHtVUarO8m5MFqIIpQZkzwE3wwOI'
    },
  });
  sleep(0.5);
}
