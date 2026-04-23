function UpdatePerception() {
    getAttrs(["perception", "int"], function(values) {
        let perception = parseInt(values.perception)||0;
        let int = parseInt(values.int)||0;

        let mod = perception + int;

        setAttrs({
            "perception": perception,
            "perceptionMod": Signed(mod),
            "perceptionPassive": 10+mod
        });
        
        UpdateSpellSaveDTs();
      });
}