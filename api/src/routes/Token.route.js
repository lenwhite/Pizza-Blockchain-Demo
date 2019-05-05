import express from 'express';

import { mint, burn } from '../services/Token.service';

const router = express.Router({ mergeParams: true });

router.put('/:tokenId', async (req, res, next) => {
  const { tokenId } = req.params;
  try {
    let response = await mint(tokenId);
    return res
      .status(201)
      .jsonp({
        success: true,
        message: `${tokenId} successfully minted`,
        data: response,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).jsonp({ success: false, message: err.message, err: err });
  }
});

router.delete('/:tokenId', async (req, res, next) => {
  const { tokenId } = req.params;
  try {
    let response = await burn(tokenId);
    return res
      .status(200)
      .jsonp({
        success: true,
        message: `${tokenId} successfully burnt`,
        data: response,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).jsonp({ success: false, message: err.message, err: err });
  }
});

export default router;
