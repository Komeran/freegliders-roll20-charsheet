function UpdateDeception() {
    getAttrs(["deception", "cha"], function(values) {
        let deception = parseInt(values.deception)||0;
        let cha = parseInt(values.cha)||0;

        let mod = deception+cha;

        setAttrs({
            "deception": deception,
            "deceptionMod": Signed(mod),
            "deceptionPassive": 10+mod
        });
        
        UpdateSpellSaveDTs();
      });
}