function UpdateNegativeQuality(eventInfo) {
    let oldQuality = eventInfo.previousValue;

    if(oldQuality !== undefined) {
        RemoveNegativeQuality(eventInfo);
    }

    let newQuality = eventInfo.newValue;
    
    if(newQuality !== undefined) {
        AddNegativeQuality(eventInfo);
    }
}

function AddNegativeQuality(eventInfo) {
    let rowId = eventInfo.sourceAttribute.split("_")[2];
    let prefix = "repeating_negativeQuality_" + rowId + "_";

    let newQuality = eventInfo.newValue;
    let description = NEGATIVE_QUALITY_DESCRIPTIONS[newQuality.toLowerCase()];

    if(description !== undefined) {
        let attributes = {};
        attributes[prefix + "negativeQuality_description"] = description;
        setAttrs(attributes);
    }

    switch(newQuality.toLowerCase()) {
        case "addict":
            UpdateNegativeQualityLevel(eventInfo);
            break;
        case "clumsy":
            setAttrs({
                clumsyPenalty: -2
            });
            break;
        case "dull":
            setAttrs({
                dullPenalty: -2
            });
            break;
        case "fragile":
            UpdateNegativeQualityLevel(eventInfo);
            break;
        case "weak":
            setAttrs({
                weakPenalty: -2
            });
            break;
        case "socially inept":
            setAttrs({
                sociallyIneptPenalty: -2
            });
            break;
    }
}

function RemoveNegativeQuality(eventInfo) {
    let rowId = eventInfo.sourceAttribute.split("_")[2];
    let prefix = "repeating_negativequality_" + rowId + "_";

    let oldQuality = eventInfo.previousValue;
    if(eventInfo.triggerName.startsWith("remove:")) {
        oldQuality = eventInfo.removedInfo[prefix + "negativeQuality_name"];
    }

    if(oldQuality === undefined) {
        return;
    }

    switch(oldQuality.toLowerCase()) {
        case "addict":
            setAttrs({
                addictPenalty: 0
            });
            break;
        case "clumsy":
            setAttrs({
                clumsyPenalty: 0
            });
            break;
        case "dull":
            setAttrs({
                dullPenalty: 0
            });
            break;
        case "fragile":
            setAttrs({
                fragilePenalty: 0
            });
            break;
        case "weak":
            setAttrs({
                weakPenalty: 0
            });
            break;
        case "socially inept":
            setAttrs({
                sociallyIneptPenalty: 0
            });
            break;
    }
}

function UpdateNegativeQualityLevel(eventInfo) {
    let rowId = eventInfo.sourceAttribute.split("_")[2];
    let prefix = "repeating_negativequality_" + rowId + "_";
    
    getAttrs([prefix + "negativeQuality_name", prefix + "negativeQuality_level"], function(values) {
        let quality = values[prefix + "negativeQuality_name"] || "";
        let level = parseInt(values[prefix + "negativeQuality_level"]) || 0;

        switch(quality.toLowerCase()) {
            case "addict":
                setAttrs({
                    addictPenalty: level * -1
                });
                break;
            case "fragile":
                setAttrs({
                    fragilePenalty: level * -1
                });
                break;
        }
    });
}