function UpdateClockworkMechanics() {
    getAttrs(["clockworkmechanics", "log"], function(values) {
        let skill = parseInt(values.clockworkmechanics)||0;
        let stat = parseInt(values.log)||0;

        let mod = skill + stat;

        setAttrs({
            "clockworkmechanics": skill,
            "clockworkmechanicsMod": Signed(mod),
            "clockworkmechanicsPassive": 10 + mod
        });
        
        UpdateSpellSaveDTs();
    });
}