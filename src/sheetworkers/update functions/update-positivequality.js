function UpdatePositiveQuality(eventInfo) {
    let oldQuality = eventInfo.previousValue;

    if(oldQuality !== undefined) {
        RemovePositiveQuality(eventInfo);
    }

    let newQuality = eventInfo.newValue;
    
    if(newQuality !== undefined) {
        AddPositiveQuality(eventInfo);
    }
}

function AddPositiveQuality(eventInfo) {
    let rowId = eventInfo.sourceAttribute.split("_")[2];
    let prefix = "repeating_positiveQuality_" + rowId + "_";

    let newQuality = eventInfo.newValue;
    let description = POSITIVE_QUALITY_DESCRIPTIONS[newQuality.toLowerCase()];
    
    let attributes = {};

    if(description !== undefined) {
        attributes[prefix + "positiveQuality_description"] = description;
    }

    attributes.elementalAttunement = "";

    switch(newQuality.toLowerCase()) {
        case "agile":
            attributes.agileBonus = "+2";
            break;
        case "analytical mind":
            attributes.analyticalMindBonus = "+2";
            break;
        case "educated":
            UpdatePositiveQualityLevel(eventInfo);
            break;
        case "quick reflexes":
            attributes.quickReflexesBonus = "+2";
            break;
        case "tough":
            UpdatePositiveQualityLevel(eventInfo);
            break;
        case "sneaky":
            attributes.sneakyBonus = "+2";
            break;
        case "inspiring presence":
            attributes.inspiringPresenceBonus = "+2";
            break;
        case "strong":
            attributes.strongBonus = "+2";
            break;
        case "silver tongue":
            attributes.silverTongueBonus = "+2";
            break;
        case "elemental attunement (air)":
            attributes.elementalAttunement = "air";
            break;
        case "elemental attunement (earth)":
            attributes.elementalAttunement = "earth";
            break;
        case "elemental attunement (fire)":
            attributes.elementalAttunement = "fire";
            break;
        case "elemental attunement (water)":
            attributes.elementalAttunement = "water";
            break;
    }
    
    setAttrs(attributes);
}

function RemovePositiveQuality(eventInfo) {
    let rowId = eventInfo.sourceAttribute.split("_")[2];
    let prefix = "repeating_positivequality_" + rowId + "_";

    let oldQuality = eventInfo.previousValue;
    if(eventInfo.triggerName.startsWith("remove:")) {
        oldQuality = eventInfo.removedInfo[prefix + "positiveQuality_name"];
    }

    if(oldQuality === undefined) {
        return;
    }

    let attributes = {};

    switch(oldQuality.toLowerCase()) {
        case "agile":
            attributes.agileBonus = "";
            break;
        case "analytical mind":
            attributes.analyticalMindBonus = "";
            break;
        case "educated":
            attributes.educatedBonus = "";
            break;
        case "quick reflexes":
            attributes.quickReflexesBonus = "";
            break;
        case "tough":
            attributes.toughBonus = "";
            break;
        case "sneaky":
            attributes.sneakyBonus = "";
            break;
        case "inspiring presence":
            attributes.inspiringPresenceBonus = "";
            break;
        case "strong":
            attributes.strongBonus = "";
            break;
        case "silver tongue":
            attributes.silverTongueBonus = "";
            break;
        case "elemental attunement (air)":
            attributes.elementalAttunement = "";
            break;
        case "elemental attunement (earth)":
            attributes.elementalAttunement = "";
            break;
        case "elemental attunement (fire)":
            attributes.elementalAttunement = "";
            break;
        case "elemental attunement (water)":
            attributes.elementalAttunement = "";
            break;
    }
    
    setAttrs(attributes);
}

function UpdatePositiveQualityLevel(eventInfo) {
    let rowId = eventInfo.sourceAttribute.split("_")[2];
    let prefix = "repeating_positivequality_" + rowId + "_";
    
    getAttrs([prefix + "positiveQuality_name", prefix + "positiveQuality_level"], function(values) {
        let quality = values[prefix + "positiveQuality_name"] || "";
        let level = parseInt(values[prefix + "positiveQuality_level"]) || 0;

        switch(quality.toLowerCase()) {
            case "educated":
                setAttrs({
                    educatedBonus: level
                });
                break;
            case "tough":
                setAttrs({
                    toughBonus: level
                });
                break;
        }
    });
}