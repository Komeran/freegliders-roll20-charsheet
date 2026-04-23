function UpdateArtisanship() {
    getAttrs(["artisanship", "agi"], function(values) {
        let artisanship = parseInt(values.artisanship)||0;
        let agi = parseInt(values.agi)||0;

        let mod = artisanship+agi;

        setAttrs({
            "artisanship": artisanship,
            "artisanshipMod": Signed(mod),
            "artisanshipPassive": 10+mod
        });
        
        UpdateSpellSaveDTs();
      });
}