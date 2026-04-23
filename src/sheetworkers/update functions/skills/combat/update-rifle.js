function UpdateRifle() {
    getAttrs(["rifle", "agi"], function(values) {
        let skill = parseInt(values.rifle)||0;
        let stat = parseInt(values.agi)||0;

        let mod = skill + stat;

        setAttrs({
            "rifle": skill,
            "rifleMod": Signed(mod),
            "riflePassive": 10 + mod
        });
        
        UpdateRangedWeapons(); // for atk
        UpdateSpellSaveDTs();
    });
}