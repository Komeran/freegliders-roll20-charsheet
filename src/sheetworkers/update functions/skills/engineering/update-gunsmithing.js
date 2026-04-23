function UpdateGunsmithing() {
    getAttrs(["gunsmithing", "agi"], function(values) {
        let skill = parseInt(values.gunsmithing)||0;
        let stat = parseInt(values.agi)||0;

        let mod = skill + stat;

        setAttrs({
            "gunsmithing": skill,
            "gunsmithingMod": Signed(mod),
            "gunsmithingPassive": 10 + mod
        });

        UpdateRangedWeapons(); // For Gun Training
        UpdateSpellSaveDTs();
    });
}