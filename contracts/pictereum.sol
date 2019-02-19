pragma solidity ^0.5.0;

contract pictereum {
	struct ownner{
		address ownner;
		bool isExist;
	}

	mapping (string => ownner) ownnership;

	function storeOwnnership(address _address, string memory ipfsHash) public{
		require(
			!ownnership[ ipfsHash ].isExist, 
			"This picture is ownned by someone else.");
			ownnership[ipfsHash].ownner = _address;
			ownnership[ipfsHash].isExist = true;
	}

	function checkOwnnership (string memory ipfsHash) public view returns( address ) {
		return ownnership[ ipfsHash ].ownner;
	}
}