function UpdateAstronomy() {
    getAttrs(["astronomy", "log", "educatedBonus"], function(values) {
        let astronomy = parseInt(values.astronomy)||0;
        let log = parseInt(values.log)||0;
        let educatedBonus = parseInt(values.educatedBonus)||0;

        let mod = astronomy + log + educatedBonus;

        setAttrs({
            "astronomy": astronomy,
            "astronomyMod": Signed(mod),
            "astronomyPassive": 10 + mod
        });
        
        UpdateSpellSaveDTs();
    });
}