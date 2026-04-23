function UpdateLoad(eventInfo) {
    getAttrs(["containerBack_load", "containerBack_size", "containerBack_equip",
        "essence_fire", "essence_water", "essence_earth", "essence_air",
        "bolts", "plates", "wires", "cogs", "rods", "lenses", "gunpowder"
    ], function(values) {
        let backContainerIsEquipped = values.containerBack_equip == "on";
        
        // Essence Load
        let fireEssence = parseInt(values.essence_fire) || 0;
        let waterEssence = parseInt(values.essence_water) || 0;
        let earthEssence = parseInt(values.essence_earth) || 0;
        let airEssence = parseInt(values.essence_air) || 0;

        let essenceCount = fireEssence + waterEssence + earthEssence + airEssence;
        let essenceLoad = CalculateSlots("1/10", essenceCount);

        var load = essenceLoad;

        // Parts Load
        let bolts = parseInt(values.bolts) || 0;
        let plates = parseInt(values.plates) || 0;
        let wires = parseInt(values.wires) || 0;
        let cogs = parseInt(values.cogs) || 0;
        let rods = parseInt(values.rods) || 0;
        let lenses = parseInt(values.lenses) || 0;
        let gunpowder = parseInt(values.gunpowder) || 0;

        let partsLoad = CalculateSlots("1/20", bolts)
            + CalculateSlots("1/10", plates)
            + CalculateSlots("1/10", wires)
            + CalculateSlots("1/50", cogs)
            + CalculateSlots("1/10", rods)
            + CalculateSlots("1/50", lenses)
            + CalculateSlots("1/10", gunpowder);

        load += partsLoad;

        // Back Container Load
        if(backContainerIsEquipped) {
            let backContainerLoad = parseInt(values.containerBack_load) || 0;
            let backContainerSize = values.containerBack_size || "0";

            let backContainerSizeValue = 0;
            let backContainerSizeParts = backContainerSize.split("/");
            backContainerSize = parseInt(backContainerSizeParts[0]) || 0;

            load += backContainerSize + backContainerLoad;
        }

        setAttrs({
            inventory_load: "" + load + " Slots"
        });
        
        // Equipment Load
        getSectionIDs("equipment", function(ids) {
            for(var i = 0; i < ids.length; i++) {
                let prefix = "repeating_equipment_" + ids[i] + "_";

                getAttrs([prefix + "equipment_slots", prefix + "equipment_equip"], function(values) {
                    let isEquipped = values[prefix + "equipment_equip"] == 'on';

                    // Only count if the equipment is equipped
                    if(!isEquipped)
                        return;
                        
                    let slots = parseInt(values[prefix + "equipment_slots"]) || 0;
                    load += slots;

                    setAttrs({
                        inventory_load: "" + load + " Slots"
                    });
                });
            }
        });
    });
}