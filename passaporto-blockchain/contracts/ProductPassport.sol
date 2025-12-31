// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract ProductPassport {
    struct Passport {
        address creator;
        string brandName;           
        string brandDetails;
        string materialComposition;
        string waterConsumption;    
        string energyConsumption;   
        string chemicalUsage;       
        string originLocation;      
        string certifierNote;
        string linkedRawMaterialID;
        string linkedFactoryID; 
        uint timestamp;
        address certifier; // <--- AGGIUNGI QUESTO CAMPO (Risolve image_c85688)
    }

    mapping(string => Passport) public passports;

    function registerBrandProduct(string memory _productID, string memory _brandName, string memory _details, string memory _materials, string memory _rawID, string memory _factoryID) public {
        require(passports[_productID].timestamp == 0, "ID gia registrato");
        Passport storage p = passports[_productID];
        p.creator = msg.sender;
        p.brandName = _brandName;    
        p.brandDetails = _details;
        p.materialComposition = _materials;
        p.linkedRawMaterialID = _rawID;
        p.linkedFactoryID = _factoryID;
        p.timestamp = block.timestamp;
    }

    function registerFactoryProfile(string memory _factoryID, string memory _name, string memory _location, string memory _water, string memory _energy, string memory _chemicals) public {
        require(passports[_factoryID].timestamp == 0, "ID Fabbrica esistente");
        Passport storage p = passports[_factoryID];
        p.brandName = _name;
        p.originLocation = _location;
        p.waterConsumption = _water;
        p.energyConsumption = _energy;
        p.chemicalUsage = _chemicals;
        p.timestamp = block.timestamp;
    }

    function registerRawMaterial(string memory _productID, string memory _originArea, string memory _harvestMethod, string memory _rawCertifications, string memory _details) public {
        require(passports[_productID].timestamp == 0, "ID Materia Prima esistente");
        Passport storage p = passports[_productID];
        p.originLocation = _originArea; 
        p.waterConsumption = _harvestMethod; 
        p.energyConsumption = _rawCertifications;
        p.brandDetails = _details;
        p.timestamp = block.timestamp;
    }

    function certifyProduct(string memory _productID, string memory _note) public {
        require(passports[_productID].timestamp != 0, "ID inesistente");
        passports[_productID].certifier = msg.sender; // Ora questo campo esiste
        passports[_productID].certifierNote = _note;
    }

    function getPassport(string memory _productID) public view returns (Passport memory) {
        require(passports[_productID].timestamp != 0, "Non trovato");
        return passports[_productID];
    }
}