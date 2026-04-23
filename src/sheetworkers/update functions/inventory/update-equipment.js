function UpdateEquipment(eventInfo) {
    let rowId = eventInfo.sourceAttribute.split("_")[2];
    let prefix = "repeating_equipment_" + rowId + "_";

    getAttrs([prefix + "equipment_size", prefix + "equipment_count"], function(values) {
        let size = values[prefix + "equipment_size"] || "0";
        let count = parseInt(values[prefix + "equipment_count"]) || 0;

        let attributes = {};
        attributes[prefix + "equipment_slots"] = CalculateSlots(size, count);
        setAttrs(attributes);
    });
}