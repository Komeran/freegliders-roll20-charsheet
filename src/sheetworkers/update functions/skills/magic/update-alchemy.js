function UpdateAlchemy() {
    getAttrs(["alchemy", "log"], function(values) {
        let skill = parseInt(values.alchemy)||0;
        let stat = parseInt(values.log)||0;

        let mod = skill + stat;

        setAttrs({
            "alchemy": skill,
            "alchemyMod": Signed(mod),
            "alchemyPassive": 10 + mod,
            "show_extractessence": "off" // skill >= 1 ? "on" : "off"
        });
        
        UpdateSpellSaveDTs();
        UpdatePotions();
    });
}