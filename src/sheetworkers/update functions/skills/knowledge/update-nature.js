function UpdateNature() {
    getAttrs(["nature", "log", "educatedBonus"], function(values) {
        let nature = parseInt(values.nature)||0;
        let log = parseInt(values.log)||0;
        let educatedBonus = parseInt(values.educatedBonus)||0;

        let mod = nature + log + educatedBonus;

        setAttrs({
            "nature": nature,
            "natureMod": Signed(mod),
            "naturePassive": 10 + mod
        });
        
        UpdateSpellSaveDTs();
    });
}