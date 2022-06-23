const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fethCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}
export async function fetchInfo(coinId: string | undefined) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}
export async function fetchPrice(coinId: string | undefined) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}
export async function fetchCoinHistoy(coinId: string | undefined) {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  ).then((response) => response.json());
}
