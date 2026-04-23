function UpdateMythology() {
    getAttrs(["mythology", "log", "educatedBonus"], function(values) {
        let mythology = parseInt(values.mythology)||0;
        let log = parseInt(values.log)||0;
        let educatedBonus = parseInt(values.educatedBonus)||0;

        let mod = mythology + log + educatedBonus;

        setAttrs({
            "mythology": mythology,
            "mythologyMod": Signed(mod),
            "mythologyPassive": 10 + mod
        });
        
        UpdateSpellSaveDTs();
    });
}