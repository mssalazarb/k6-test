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
    notFound: {
      executor: 'constant-vus',
      vus: 200,
      duration: '10s',
      exec: "notFound",
      gracefulStop: '0s',
      startTime: '10s'
    },
    error: {
      executor: 'constant-vus',
      vus: 200,
      duration: '10s',
      exec: "error",
      gracefulStop: '0s',
      startTime: '20s'
    },
    slow: {
      executor: 'constant-vus',
      vus: 200,
      duration: '10s',
      exec: "slow",
      gracefulStop: '10s',
      startTime: '30s'
    },
    verySlow: {
      executor: 'constant-vus',
      vus: 200,
      duration: '10s',
      exec: "verySlow",
      gracefulStop: '30s',
      startTime: '50s'
    }
  }
};

const host = "http://127.0.0.1:3000";

export function normal() {
  http.get(host + "/users/4/balance");
  sleep(0.5);
}

export function slow() {
  http.post(host + "/users/4/transactions/deposit", JSON.stringify({
    "cardId": 23,
    "amount": 100
  }));
  sleep(0.5);
}

export function verySlow() {
  http.get(host + "/users/4/transactions/transfer", JSON.stringify({
    "creditUserId": 12,
    "amount": 100
  }));
  sleep(0.5);
}

export function notFound() {
  http.get(host + "/users/4/transactions?order=ASC&page=1&take=10");
  sleep(0.5);
}
