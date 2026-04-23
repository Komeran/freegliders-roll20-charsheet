function UpdateTinkering() {
    getAttrs(["tinkering", "agi"], function(values) {
        let skill = parseInt(values.tinkering)||0;
        let stat = parseInt(values.agi)||0;

        let mod = skill + stat;

        setAttrs({
            "tinkering": skill,
            "tinkeringMod": Signed(mod),
            "tinkeringPassive": 10 + mod
        });
        
        UpdateSpellSaveDTs();
    });
}