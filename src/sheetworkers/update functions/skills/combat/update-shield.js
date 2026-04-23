function UpdateShield() {
    getAttrs(["shield", "bod"], function(values) {
        let skill = parseInt(values.shield)||0;
        let stat = parseInt(values.bod)||0;

        let mod = skill + stat;

        setAttrs({
            "shield": skill,
            "shieldMod": Signed(mod),
            "shieldPassive": 10 + mod
        });

        UpdateDAV();
        UpdateMeleeWeapons(); // for atk
        UpdateSpellSaveDTs();
    });
}