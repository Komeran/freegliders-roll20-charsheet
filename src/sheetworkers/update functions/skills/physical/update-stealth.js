function UpdateStealth() {
    getAttrs(["stealth", "agi", "sneakyBonus"], function(values) {
        let stealth = parseInt(values.stealth)||0;
        let agi = parseInt(values.agi)||0;
        let sneakyBonus = parseInt(values.sneakyBonus)||0;

        let mod = stealth+agi+sneakyBonus;

        setAttrs({
            "stealth": stealth,
            "stealthMod": Signed(mod),
            "stealthPassive": 10+mod
        });

        UpdateMeleeWeapons(); // for sneak attack
        UpdateRangedWeapons(); // for sneak attack
        UpdateSpellSaveDTs();
      });
}