function UpdateEquippedShield() {
    let shields = {
        "buckler": {
            av: "1",
            type: "Light"
        },
        "round shield": {
            av: "2",
            type: "Light"
        },
        "kite shield": {
            av: "2 (3)",
            type: "Heavy"
        },
        "tower shield": {
            av: "2 (4)",
            type: "Heavy"
        }
    };

    getAttrs(["shieldName"], function(values) {
        let shieldName = values.shieldName || "";

        let listShield = shields[shieldName.toLowerCase()];
        
        if(listShield !== undefined) {
            setAttrs({
                shieldAV: listShield.av,
                shieldType: listShield.type
            });
        }
    });
}