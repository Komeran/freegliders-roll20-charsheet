function UpdatePersuasion() {
    getAttrs(["persuasion", "cha"], function(values) {
        let persuasion = parseInt(values.persuasion)||0;
        let cha = parseInt(values.cha)||0;

        let mod = persuasion+cha;

        setAttrs({
            "persuasion": persuasion,
            "persuasionMod": Signed(mod),
            "persuasionPassive": 10+mod
        });
        
        UpdateSpellSaveDTs();
      });
}