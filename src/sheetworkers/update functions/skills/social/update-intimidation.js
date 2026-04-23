function UpdateIntimidation() {
    getAttrs(["intimidation", "cha"], function(values) {
        let intimidation = parseInt(values.intimidation)||0;
        let cha = parseInt(values.cha)||0;

        let mod = intimidation+cha;

        setAttrs({
            "intimidation": intimidation,
            "intimidationMod": Signed(mod),
            "intimidationPassive": 10+mod
        });
        
        UpdateSpellSaveDTs();
      });
}