import express from 'express';

import { mint, burn } from '../services/Token.service';

const router = express.Router({ mergeParams: true });

router.put('/:tokenId', async (req, res, next) => {
  const { tokenId } = req.params;
  try {
    let response;
    if (Object.entries(req.body).length === 0) { // req.body is empty
      response = await mint(tokenId);
    } else {
      response = await mint(toString, req.body);
    }

    return res
      .status(201)
      .jsonp({
        success: true,
        message: `${tokenId} successesfully minted`,
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
        message: `${tokenId} successesfully burnt`,
        data: response,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).jsonp({ success: false, message: err.message, err: err });
  }
});

export default router;