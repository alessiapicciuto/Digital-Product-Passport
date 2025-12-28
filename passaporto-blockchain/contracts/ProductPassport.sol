// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28; 

contract ProductPassport {
    struct Passport {
        address brand;        // Il Brand che crea l'ID finale
        address factory;      
        address certifier;
        string brandDetails;  // Dichiarazioni del Brand (Nome, Certificazioni dichiarate)
        string factoryHash;   // Dati della fabbrica (Indirizzo, Consumo)
        string certifierNote; // Validazione ufficiale dell'Ente
        uint timestamp;
    }

    mapping(string => Passport) public passports;

    // 1. Il BRAND registra l'ID finale e le sue dichiarazioni
    function registerBrandProduct(string memory _productID, string memory _details) public {
        require(passports[_productID].timestamp == 0, "ID gia esistente. Usa un ID univoco.");
        
        passports[_productID] = Passport({
            brand: msg.sender,
            factory: address(0),
            certifier: address(0),
            brandDetails: _details,
            factoryHash: "",
            certifierNote: "",
            timestamp: block.timestamp
        });
    }

    // 2. La FABBRICA aggiunge i dati tecnici di produzione
    function updateFactory(string memory _productID, string memory _factoryData) public {
        require(passports[_productID].timestamp != 0, "Prodotto non registrato dal Brand.");
        // Rimosso il vincolo "factory == address(0)" per permettere correzioni se necessario
        
        passports[_productID].factory = msg.sender;
        passports[_productID].factoryHash = _factoryData;
    }
    
    // 3. L'ENTE CERTIFICATORE convalida ufficialmente le dichiarazioni
    function certifyProduct(string memory _productID, string memory _note) public {
        require(passports[_productID].timestamp != 0, "Prodotto non trovato.");
        
        passports[_productID].certifier = msg.sender;
        passports[_productID].certifierNote = _note;
    }

    // Funzione di lettura per il Consumatore
    function getPassport(string memory _productID) public view returns (Passport memory) {
        require(passports[_productID].timestamp != 0, "Passaporto non trovato.");
        return passports[_productID];
    }
}