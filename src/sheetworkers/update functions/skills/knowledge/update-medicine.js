function UpdateMedicine() {
    getAttrs(["medicine", "log", "educatedBonus"], function(values) {
        let medicine = parseInt(values.medicine)||0;
        let log = parseInt(values.log)||0;
        let educatedBonus = parseInt(values.educatedBonus)||0;

        let mod = medicine + log + educatedBonus;

        setAttrs({
            "medicine": medicine,
            "medicineMod": Signed(mod),
            "medicinePassive": 10 + mod
        });
        
        UpdateSpellSaveDTs();
    });
}