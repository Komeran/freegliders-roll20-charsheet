function UpdateTwoHandedMelee() {
    getAttrs(["twohandedmelee", "bod"], function(values) {
        let skill = parseInt(values.twohandedmelee)||0;
        let stat = parseInt(values.bod)||0;

        let mod = skill + stat;

        setAttrs({
            "twohandedmelee": skill,
            "twohandedmeleeMod": Signed(mod),
            "twohandedmeleePassive": 10 + mod
        });
        
        UpdateMeleeWeapons(); // for atk
        UpdateSpellSaveDTs();
    });
}