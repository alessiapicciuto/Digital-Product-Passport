// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductPassport {
    
    struct RawMaterial {
        string area;
        string method;
        string certifications;
        string details;
        bool exists;
    }

    struct FactoryData {
        string aggregatedInfo; // Contiene la stringa "Località: ... | Acqua: ..."
        bool exists;
    }

    struct FinalProduct {
        string brandName;
        string rawMaterialID;
        string materials;
        string brandDetails;
        string certificationNote;
        bool isCertified;
        bool exists;
    }

    // Mapping per memorizzare i dati con i loro ID
    mapping(string => RawMaterial) private rawMaterials;
    mapping(string => FactoryData) private factoryUpdates;
    mapping(string => FinalProduct) private products;

    // --- LOGICA PRODUCER ---
    function registerRawMaterial(
        string memory _id,
        string memory _area,
        string memory _method,
        string memory _certs,
        string memory _details
    ) public {
        rawMaterials[_id] = RawMaterial(_area, _method, _certs, _details, true);
    }

    // --- LOGICA FACTORY ---
    // Utilizza l'ID definito dal produttore per aggiungere dati di trasformazione
    function updateProductData(string memory _id, string memory _data) public {
        factoryUpdates[_id] = FactoryData(_data, true);
    }

    // --- LOGICA BRAND ---
    // Registra il prodotto finale collegandolo all'ID della materia prima
    function registerBrandProduct(
        string memory _brandName,
        string memory _productId,
        string memory _rawId,
        string memory _materials,
        string memory _details
    ) public {
        products[_productId] = FinalProduct({
            brandName: _brandName,
            rawMaterialID: _rawId,
            materials: _materials,
            brandDetails: _details,
            certificationNote: "",
            isCertified: false,
            exists: true
        });
    }

    // --- LOGICA CERTIFIER ---
    function certifyProduct(string memory _productId, string memory _note) public {
        require(products[_productId].exists, "Prodotto non esistente");
        products[_productId].certificationNote = _note;
        products[_productId].isCertified = true;
    }

    // --- LOGICA CONSUMER (VIEW) ---
    // Restituisce tutti i dati aggregati per il passaporto digitale
    function getProductPassport(string memory _productId) public view returns (
        string memory brandName,
        string memory composition,
        string memory rawId,
        string memory factoryId,
        string memory rawArea,
        string memory rawMethod,
        string memory rawCerts,
        string memory factoryLocation,
        string memory factoryWater,
        string memory factoryEnergy,
        string memory certificationNote
    ) {
        FinalProduct memory p = products[_productId];
        require(p.exists, "Prodotto non trovato");

        RawMaterial memory r = rawMaterials[p.rawMaterialID];
        FactoryData memory f = factoryUpdates[p.rawMaterialID];

        return (
            p.brandName,
            p.materials,
            p.rawMaterialID,
            p.rawMaterialID, // In questo schema l'ID factory coincide con quello raw
            r.area,
            r.method,
            r.certifications,
            f.aggregatedInfo, // La factory logic passerà la stringa intera
            "", // I campi singoli sono estratti dalla stringa nella logica JS se necessario
            "",
            p.certificationNote
        );
    }
}