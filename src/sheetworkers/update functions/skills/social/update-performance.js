function UpdatePerformance() {
    getAttrs(["performance", "cha"], function(values) {
        let performance = parseInt(values.performance)||0;
        let cha = parseInt(values.cha)||0;

        let mod = performance+cha;

        setAttrs({
            "performance": performance,
            "performanceMod": Signed(mod),
            "performancePassive": 10+mod
        });
      });
}