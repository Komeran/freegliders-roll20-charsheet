function UpdateHistory() {
    getAttrs(["history", "log", "educatedBonus"], function(values) {
        let history = parseInt(values.history)||0;
        let log = parseInt(values.log)||0;
        let educatedBonus = parseInt(values.educatedBonus)||0;

        let mod = history + log + educatedBonus;

        setAttrs({
            "history": history,
            "historyMod": Signed(mod),
            "historyPassive": 10 + mod
        });
        
        UpdateSpellSaveDTs();
    });
}