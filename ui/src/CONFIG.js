const CONFIG = {
  pizza: {
    address: '0x8bce8a46135cac9f70fe327a266f39d623c96860',
  },

  flour: {
    address: '0xf0e83d2b690604123a487b44439a934d498e51ad',
  },

  cheese: {
    address: '0x168153cae7ac4ea9b3b211dcfc97c3ced2f9115b',
  },
  API: {
    port: process.env.API_PORT || 3001, // defaults to dev port
    MINT_TOKEN: (tokenId) => (`/Token/${tokenId}`),
    LIST_TOKENS: () => (`/Token/`),
    BURN_TOKEN: (tokenId) => (`/Token/${tokenId}`),
    TRANSFER_TOKEN: (tokenId) => (`/Token/${tokenId}/transfer`),
  },
};

export default CONFIG;
