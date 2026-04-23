function UpdateEconomy() {
    getAttrs(["economy", "log", "educatedBonus"], function(values) {
        let economy = parseInt(values.economy)||0;
        let log = parseInt(values.log)||0;
        let educatedBonus = parseInt(values.educatedBonus)||0;

        let mod = economy + log + educatedBonus;

        setAttrs({
            "economy": economy,
            "economyMod": Signed(mod),
            "economyPassive": 10 + mod
        });
        
        UpdateSpellSaveDTs();
    });
}