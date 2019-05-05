import express from 'express';
import web3 from 'web3';

import { mint, burn, getData, setData, transfer } from '../services/Token.service';

const router = express.Router({ mergeParams: true });

router.put('/:tokenId', async (req, res, next) => {
  const { tokenId } = req.params;
  try {
    let response;
    if (Object.entries(req.body).length === 0) { // req.body is empty
      response = await mint(tokenId);
    } else {
      response = await mint(tokenId, req.body);
    }

    return res
      .status(201)
      .jsonp({
        success: true,
        message: `${tokenId} minted`,
        data: response,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).jsonp({ success: false, message: err.message });
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
        message: `${tokenId} burnt`,
        data: response,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).jsonp({ success: false, message: err.message });
  }
});

router.get('/:tokenId', async (req, res, next) => {
  const { tokenId } = req.params;
  try {
    let response = await getData(tokenId);
    return res
      .status(200)
      .jsonp({
        success: true,
        message: `${tokenId} retrieved`,
        data: response,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).jsonp({ success: false, message: err.message });
  }
});

router.post('/:tokenId', async (req, res, next) => {
  const { tokenId } = req.params;
  try {
    let response = await setData(tokenId, req.body);
    return res
      .status(200)
      .jsonp({
        success: true,
        message: `${tokenId} updated`,
        data: response,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).jsonp({ success: false, message: err.message });
  }
});

/**
 * Expects to address { address: to } in req.body
 */
router.post('/transfer/:tokenId', async (req, res, next) => {
  const { tokenId } = req.params;

  const { address } = req.body;

  if (!address || !web3.utils.isAddress(address)) {
    return res.status(400).jsonp({
      success: false,
      message: 'invalid transfer to address',
    })
  }

  try {
    let response = await transfer(tokenId, address);
    return res
      .status(200)
      .jsonp({
        success: true,
        message: `${tokenId} updated`,
        data: response,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).jsonp({ success: false, message: err.message });
  }
});

export default router;
