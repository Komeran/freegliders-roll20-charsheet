function UpdateRunecraft() {
    getAttrs(["runecraft", "log"], function(values) {
        let skill = parseInt(values.runecraft)||0;
        let stat = parseInt(values.log)||0;

        let mod = skill + stat;

        setAttrs({
            "runecraft": skill,
            "runecraftMod": Signed(mod),
            "runecraftPassive": 10 + mod,
            "show_runereading": skill >= 5 ? "on" : "off"
        });

        UpdateMaxMemorisedSpells();
        UpdateSpellSaveDTs();
    });
}