function UpdateAugmentation() {
    getAttrs(["augmentation", "log"], function(values) {
        let skill = parseInt(values.augmentation)||0;
        let stat = parseInt(values.log)||0;

        let mod = skill + stat;

        setAttrs({
            "augmentation": skill,
            "augmentationMod": Signed(mod),
            "augmentationPassive": 10 + mod
        });
        
        UpdateSpellSaveDTs();
    });
}