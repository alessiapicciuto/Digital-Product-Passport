// File: contracts/ProductPassport.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28; 

contract ProductPassport {
    struct Passport {
        address producer; 
        address factory;  
        address certifier;
        string originHash;
        string factoryHash;
        string certifierHash;
        uint timestamp;
    }

    mapping(string => Passport) public passports;

    function registerOrigin(string memory _productID, string memory _originHash) public {
        require(passports[_productID].timestamp == 0, "Prodotto gia' registrato.");
        passports[_productID] = Passport(
            msg.sender, address(0), address(0), _originHash, "", "", block.timestamp
        );
    }

    function updateFactory(string memory _productID, string memory _factoryHash) public {
        require(passports[_productID].timestamp != 0, "Prodotto non registrato.");
        require(passports[_productID].factory == address(0), "Fase produzione gia' registrata.");
        passports[_productID].factory = msg.sender;
        passports[_productID].factoryHash = _factoryHash;
    }
    
    function certifyProduct(string memory _productID, string memory _certifierHash) public {
        require(passports[_productID].factory != address(0), "Produzione non completata.");
        require(passports[_productID].certifier == address(0), "Certificazione gia' applicata.");
        passports[_productID].certifier = msg.sender;
        passports[_productID].certifierHash = _certifierHash;
    }

    function getPassport(string memory _productID) public view returns (Passport memory) {
        require(passports[_productID].timestamp != 0, "Prodotto non trovato.");
        return passports[_productID];
    }
}