function UpdateLiterature() {
    getAttrs(["literature", "log", "educatedBonus"], function(values) {
        let literature = parseInt(values.literature)||0;
        let log = parseInt(values.log)||0;
        let educatedBonus = parseInt(values.educatedBonus)||0;

        let mod = literature + log + educatedBonus;

        setAttrs({
            "literature": literature,
            "literatureMod": Signed(mod),
            "literaturePassive": 10 + mod
        });
        
        UpdateSpellSaveDTs();
    });
}