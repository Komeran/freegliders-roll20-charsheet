function UpdateEvasion() {
    getAttrs(["agi", "int", "quickReflexesBonus"], function(values) {
        let agi = parseInt(values.agi)||0;
        let int = parseInt(values.int)||0;
        let quickReflexesBonus = parseInt(values.quickReflexesBonus)||0;

        setAttrs({
            "evasion": Signed(agi+int+quickReflexesBonus)
        });
    });
}