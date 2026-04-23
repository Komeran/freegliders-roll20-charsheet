function UpdateSpellwork() {
    getAttrs(["spellwork", "wil"], function(values) {
        let skill = parseInt(values.spellwork)||0;
        let stat = parseInt(values.wil)||0;

        let mod = skill + stat;

        setAttrs({
            "spellwork": skill,
            "spellworkMod": Signed(mod),
            "spellworkPassive": 10 + mod,
            "show_sixthsense": skill >= 4 ? "on" : "off",
            "show_counterspell": skill >= 5 ? "on" : "off",
            "show_seventhsense": skill >= 8 ? "on" : "off"
        });

        UpdateMaxMemorisedSpells();
        UpdateCursePowers();
        UpdateSRD();
        UpdateSpellSaveDTs();
    });
}