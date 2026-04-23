function UpdateAutomachinery() {
    getAttrs(["automachinery", "log"], function(values) {
        let skill = parseInt(values.automachinery)||0;
        let stat = parseInt(values.log)||0;

        let mod = skill + stat;

        setAttrs({
            "automachinery": skill,
            "automachineryMod": Signed(mod),
            "automachineryPassive": 10 + mod
        });
        
        UpdateSpellSaveDTs();
    });
}