pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/utils/Address.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Enumerable.sol";

/** To simplify matters, we can just be using this one single ERC 721-compliant
    token for everything.
 */

contract Token is ERC721Enumerable {

  using Address for address;
  using SafeMath for uint256;

  // Mapping from token ID to token data
  // Stores arbitrary token data in a byte array (preferably compressed beforehand)
  mapping (uint256 => bytes) private _tokenData;

  /**
   * @dev Mints a new token without data to msg.sender
   * Reverts if the given token ID already exists
   * @param tokenId tokenId uint256 ID of the token to mint
   */
  function mint(uint256 tokenId) public {
    _mint(msg.sender, tokenId);
  }

  /**
   * @dev Mints a new token with data to msg.sender
   * Reverts if the given token ID already exists
   * @param tokenId uint256 ID of the token to mint
   * @param tokenData bytes array of data to associate with the token
   */
  function mint(uint256 tokenId, bytes memory tokenData) public {
    _mint(msg.sender, tokenId);
    _tokenData[tokenId] = tokenData;
  }

  /**
   * @dev Burns a token
   * Requires the msg.sender to be the owner, approved, or operator
   * @param tokenId uint256 ID of the token to burn
   */
  function burn(uint256 tokenId) public {
    require(_isApprovedOrOwner(msg.sender, tokenId));
    _burn(tokenId);
  }

  /**
   * @dev Gets data associated with a token
   * @param tokenId uint256 ID of the token to retrieve
   * @return bytes the stored data
   */
  function getData(uint tokenId) public view returns (bytes memory) {
    require(_exists(tokenId));
    return _tokenData[tokenId];
  }

  /**
   * @dev Sets the data in a minted token
   * Requires the msg.sender to be the owner, approved, or operator
   * @param tokenId uint256 ID of the token to mint
   * @param tokenData bytes array of data to associate with the token
   */
  function setData(uint tokenId, bytes memory tokenData) public {
    require(_isApprovedOrOwner(msg.sender, tokenId));
    _tokenData[tokenId] = tokenData;
  }

  /**
   * @dev Retrieve a list of owned token of msg.sender
   * @return uint256 array of token ids owned
   */
  function tokensOwned() public view returns (uint256[] memory) {
    return _tokensOfOwner(msg.sender);
  }

}
