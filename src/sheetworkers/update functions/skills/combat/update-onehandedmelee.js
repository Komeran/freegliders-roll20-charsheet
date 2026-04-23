function UpdateOneHandedMelee() {
    getAttrs(["onehandedmelee", "agi"], function(values) {
        let skill = parseInt(values.onehandedmelee)||0;
        let stat = parseInt(values.agi)||0;

        let mod = skill + stat;

        setAttrs({
            "onehandedmelee": skill,
            "onehandedmeleeMod": Signed(mod),
            "onehandedmeleePassive": 10 + mod
        });

        UpdateMeleeWeapons(); // for atk
        UpdateSpellSaveDTs();
    });
}