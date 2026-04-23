function UpdatePistol() {
    getAttrs(["pistol", "agi"], function(values) {
        let skill = parseInt(values.pistol)||0;
        let stat = parseInt(values.agi)||0;

        let mod = skill + stat;

        setAttrs({
            "pistol": skill,
            "pistolMod": Signed(mod),
            "pistolPassive": 10 + mod
        });
        
        UpdateRangedWeapons(); // for atk
        UpdateSpellSaveDTs();
    });
}