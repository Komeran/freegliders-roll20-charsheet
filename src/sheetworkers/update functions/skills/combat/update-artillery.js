function UpdateArtillery() {
    getAttrs(["artillery", "agi"], function(values) {
        let skill = parseInt(values.artillery)||0;
        let stat = parseInt(values.agi)||0;

        let mod = skill + stat;

        setAttrs({
            "artillery": skill,
            "artilleryMod": Signed(mod),
            "artilleryPassive": 10 + mod
        });

        UpdateRangedWeapons(); // for atk
        UpdateSpellSaveDTs();
    });
}