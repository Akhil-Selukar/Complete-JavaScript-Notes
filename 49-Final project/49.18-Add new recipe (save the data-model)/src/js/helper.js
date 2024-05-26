import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const jsonResponse = await response.json();

    if (!response.ok) throw new Error(`${jsonResponse.message}`);
    return jsonResponse;
  } catch (e) {
    throw e;
  }
};

export const sendJSON = async function (url, dataToSend) {
  try {
    const request = fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    const response = await Promise.race([request, timeout(TIMEOUT_SEC)]);
    const jsonResponse = await response.json();
    if (!response.ok) throw new Error(`${jsonResponse.message}`);
    return jsonResponse;
  } catch (e) {
    throw e;
  }
};
