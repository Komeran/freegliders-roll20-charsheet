function UpdateAthletics() {
    getAttrs(["athletics", "bod", "strongBonus", "weakPenalty"], function(values) {
        let athletics = parseInt(values.athletics)||0;
        let bod = parseInt(values.bod)||0;
        let strongBonus = parseInt(values.strongBonus)||0;
        let weakPenalty = parseInt(values.weakPenalty)||0;

        let mod = athletics + bod + strongBonus + weakPenalty;

        setAttrs({
            "athletics": athletics,
            "athleticsMod": Signed(mod),
            "athleticsPassive": 10+mod
        });

        UpdateHitDie();
        UpdateCarryCapacity();
        UpdateMeleeWeapons(); // for Powerful Strike
        UpdateRangedWeapons(); // for Powerful Strike
        UpdateSpellSaveDTs();
      });
}