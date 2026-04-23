function UpdateDAV() {
    getAttrs(
        [
            "torsoTotalAV",
            "shieldAV",
            "shield"
        ],
        function(values) {
            let torsoAV = parseInt(values.torsoTotalAV)||0;
            let shieldAV = values.shieldAV || "0";
            let shield = parseInt(values.shield)||0;
            let torsoAugment = values["augmentations_torso"] || "";
            let torsoAugmentQuality = parseInt(values["augmentations_torso_quality"]) || 0;

            let effectiveAV = 0;
            let splitAV = shieldAV.split("(");
            if(splitAV.length === 1) {
                effectiveAV = parseInt(shieldAV) || 0;
            }
            else if(shield >= 5) {
                effectiveAV = parseInt(splitAV[1].replace(")", "")) || 0;
            }
            else {
                effectiveAV = parseInt(shieldAV) || 0;
            }

            setAttrs({
                dav: torsoAV + effectiveAV
            });
        }
    );
}