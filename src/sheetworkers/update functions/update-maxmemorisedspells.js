function UpdateMaxMemorisedSpells() {
    getAttrs(["spellwork", "runecraft", "log"], function(values) {
        let spellwork = parseInt(values.spellwork)||0;
        let runecraft = parseInt(values.runecraft)||0;
        let log = parseInt(values.log)||0;

        let skillRankBonus = spellwork;

        if(runecraft >= 9) {
            skillRankBonus = Math.max(spellwork, runecraft);
        }

        setAttrs({
            "memorisedSpells_max": Math.max(1, log + skillRankBonus)
        });
    });
}