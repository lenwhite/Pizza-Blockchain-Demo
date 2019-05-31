const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const assert = chai.assert;

const Token = artifacts.require("./Token.sol");

const {
  hexToBytes,
  toHex,
  bytesToHex,
  BN
} = web3.utils;

contract('Token', accounts => {
  let tokenContract;

  before(async () => {
    tokenContract = await Token.new();
  })

  let token = {
    id: '0',
    data: 'asdf',
    // Compressed json data in some format
    newData: 'eNp9kU1PwzAMhu9I/Icq52VKu3UrOyHYaULsACcQh9CaNqiNqySdQNP+O276sSJNkyqlsR+/jl8fb2+CgNUGsyZ1bBOwJ3WAYPeyfw5y0GCkQ8NmHjqAsQo1QYt52IUMlCAtbKWDtjYS4ZKLFY/iVyE2/psLId56gQwqJMyZBrpATYpe8NheKaAyuoTRYhnP+oiWlZfeYaGDLQIbEnWBGuy5lkIFdmwiBCcRvoxX64GndIWfquyA9doDbSfW5U+DLlRSlQS9j3Xf2T38yKouYZ5iNRGcJNDkvdDHIJSRKfuvB2Vc0fYM7xLBRchFdMkb72WurAMD2dQj/yIwtIv09xG1k6mz09eN00+9khqmXp398sMnCY/jmIYPo38ELVM6WrAtVN2CtsbGAhuI0+xqz8Y6pa90HS2nrqNkb1l70P/pD5DgmBc=',

  };

  it("Mint a token without data", async () => {

    await tokenContract.mint(token.id);

    let balance = await tokenContract.balanceOf(accounts[0]);
    assert.equal(balance.toNumber(), 1, "Balance not incremented");

  });

  it("Burn the token", async () => {
    await tokenContract.burn(token.id);

    let balance = await tokenContract.balanceOf(accounts[0]);
    assert.equal(balance.toNumber(), 0, "Balance not decremented");
  })

  it("Enumerate owned tokens", async () => {
    await tokenContract.mint('1', { from: accounts[1] });
    await tokenContract.mint('2193817321', { from: accounts[1] });

    let response = await tokenContract.tokensOwned({ from: accounts[1] });

    assert.deepEqual(
      response.map(BN => BN.toNumber()), [1, 2193817321],
      "Minted tokens not enumerated correctly"
    );

    await tokenContract.burn('1', { from: accounts[1] });
    await tokenContract.burn('2193817321', { from: accounts[1] });

  })

  it("Mint a token with data", async () => {
    token.dataAsBytes = hexToBytes(toHex(token.data));

    await tokenContract.mint(token.id, token.dataAsBytes);

    let balance = await tokenContract.balanceOf(accounts[0]);
    assert.equal(balance.toNumber(), 1, "Balance not incremented");

    let response = await tokenContract.getData(token.id);
    assert.equal(response, toHex(token.data), "Data not retrieved correctly");
  });

  it("Sets data of a minted token", async () => {
    token.newDataAsBytes = hexToBytes(toHex(token.newData));

    await tokenContract.setData(token.id, token.newDataAsBytes);

    let response = await tokenContract.getData(token.id);
    assert.equal(response, toHex(token.newData), "Data not changed correctly");
  });

  it("Transfer the minted token", async () => {
    await tokenContract.transfer(accounts[2], token.id);

    let balance = await tokenContract.balanceOf(accounts[0]);
    assert.equal(balance.toNumber(), 0, "Balance not decremented");

    balance = await tokenContract.balanceOf(accounts[2]);
    assert.equal(balance.toNumber(), 1, "Balance not incremented");
  });

  it("Burn the token with data", async () => {
    await tokenContract.burn(token.id, { from: accounts[2] });

    let balance = await tokenContract.balanceOf(accounts[2]);
    assert.equal(balance.toNumber(), 0, "Balance not decremented");

    assert.isRejected(
      tokenContract.getData(token.id),
      "Can still retrieve data from burnt token"
    );
  })
});
