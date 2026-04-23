function UpdateBrawling() {
    getAttrs(["brawling", "agi"], function(values) {
        let skill = parseInt(values.brawling)||0;
        let stat = parseInt(values.agi)||0;

        let mod = skill + stat;

        setAttrs({
            "brawling": skill,
            "brawlingMod": Signed(mod),
            "brawlingPassive": 10 + mod
        });

        UpdateUnarmedStrike();
        UpdateMeleeWeapons(); // for atk
        UpdateSpellSaveDTs();
    });
}