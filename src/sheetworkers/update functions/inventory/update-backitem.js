function UpdateBackItem(eventInfo) {
    let rowId = eventInfo.sourceAttribute.split("_")[2];
    let prefix = "repeating_backitem_" + rowId + "_";

    getAttrs([prefix + "backitem_size", prefix + "backitem_count"], function(values) {
        let size = values[prefix + "backitem_size"] || "0";
        let count = parseInt(values[prefix + "backitem_count"]) || 0;

        let attributes = {};
        attributes[prefix + "backItem_slots"] = CalculateSlots(size, count);
        setAttrs(attributes);
    });
}