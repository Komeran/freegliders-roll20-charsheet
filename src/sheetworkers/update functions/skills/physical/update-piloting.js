function UpdatePiloting() {
    getAttrs(["piloting", "agi"], function(values) {
        let piloting = parseInt(values.piloting)||0;
        let agi = parseInt(values.agi)||0;

        let mod = piloting+agi;

        setAttrs({
            "piloting": piloting,
            "pilotingMod": Signed(mod),
            "pilotingPassive": 10+mod
        });
        
        UpdateSpellSaveDTs();
      });
}