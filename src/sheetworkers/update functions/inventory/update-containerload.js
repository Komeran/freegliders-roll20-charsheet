function UpdateBackContainerLoad(eventInfo) {
    getSectionIDs("backItem", function(ids) {
        let load = 0;
        setAttrs({
            containerBack_load: load
        });

        for(var i = 0; i < ids.length; i++) {
            let prefix = "repeating_backitem_" + ids[i] + "_";

            getAttrs([prefix + "backItem_slots"], function(values) {
                load += parseInt(values[prefix + "backItem_slots"]) || 0;

                setAttrs({
                    containerBack_load: load
                });
            });
        }
    });
}