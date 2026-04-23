function UpdateSurvival() {
    getAttrs(["survival", "int", "educatedBonus"], function(values) {
        let survival = parseInt(values.survival)||0;
        let int = parseInt(values.int)||0;
        let educatedBonus = parseInt(values.educatedBonus)||0;

        let mod = survival + int + educatedBonus;

        setAttrs({
            "survival": survival,
            "survivalMod": Signed(mod),
            "survivalPassive": 10 + mod
        });
        
        UpdateSpellSaveDTs();
    });
}