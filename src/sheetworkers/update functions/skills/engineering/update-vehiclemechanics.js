function UpdateVehicleMechanics() {
    getAttrs(["vehiclemechanics", "bod"], function(values) {
        let skill = parseInt(values.vehiclemechanics)||0;
        let stat = parseInt(values.bod)||0;

        let mod = skill + stat;

        setAttrs({
            "vehiclemechanics": skill,
            "vehiclemechanicsMod": Signed(mod),
            "vehiclemechanicsPassive": 10 + mod
        });
        
        UpdateSpellSaveDTs();
    });
}