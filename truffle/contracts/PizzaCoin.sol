pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/utils/Address.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

/** Standard ERC20 tokens used for payments.

 */

contract PizzaCoin is ERC20 {

  using Address for address;
  using SafeMath for uint256;

  /**
   * @dev Mints a number of coins to the msg.sender
   * @param value the number of coins to mint
   */
  function mint(uint256 value) public {
    _mint(msg.sender, value);
  }
}