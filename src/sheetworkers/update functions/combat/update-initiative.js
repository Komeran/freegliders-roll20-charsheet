function UpdateInitiative() {
    getAttrs(["agi", "int"], function(values) {
        let agi = parseInt(values.agi)||0;
        let int = parseInt(values.int)||0;

        setAttrs({
            "initiative": Signed(agi+int)
        });
    });
}