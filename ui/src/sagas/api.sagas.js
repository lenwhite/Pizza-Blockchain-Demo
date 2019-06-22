import CONFIG from '../CONFIG';

export const mintToken = async (id, data, auth) => {
  return postJson(
    CONFIG.API.MINT_TOKEN.bind(null, id),
    JSON.stringify(data),
    auth,
    { method: 'PUT' }
  );
};

export const listTokens = async (auth) => {
  return fetchApi(CONFIG.API.LIST_TOKENS, { method: 'GET' }, auth);
};

export const burnToken = async (id, auth) => {
  return fetchApi(
    CONFIG.API.BURN_TOKEN.bind(null, id),
    { method: 'DELETE' },
    auth
  );
};

export const sendToken = async (id, toAddress, auth) => {
  return postJson(
    CONFIG.API.TRANSFER_TOKEN.bind(null, id),
    JSON.stringify({ address: toAddress }),
    auth
  );
};

async function postJson(path, body, auth, fetchOptions = {}) {
  return fetchApi(
    path,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: body,
      ...fetchOptions
    },
    auth,
  );
}

async function fetchApi(path, fetchOptions, auth) {
  if (auth) {
    if (!fetchOptions.headers) fetchOptions.headers = {};

    fetchOptions.headers['Authorization'] = 'Basic ' + Buffer.from(auth + ":").toString('base64');
  }

  let url = new URL(path(), window.location.href);
  url.port = CONFIG.API.port;

  try {
    let response = await fetch(url, fetchOptions);

    if (response.status >= 200 && response.status < 300) {
      const data = await response.json();
      return data;
    }
    else {
      throw response;
    }
  } catch (error) {
    console.log(`FETCH_FAILED to URL: ${url}`);
    console.log(url);
    console.log(error);
    throw error;
  }

}


