function UpdateBow() {
    getAttrs(["bow", "agi"], function(values) {
        let skill = parseInt(values.bow)||0;
        let stat = parseInt(values.agi)||0;

        let mod = skill + stat;

        setAttrs({
            "bow": skill,
            "bowMod": Signed(mod),
            "bowPassive": 10 + mod
        });
        
        UpdateRangedWeapons(); // for atk
        UpdateSpellSaveDTs();
    });
}