function UpdateHitDie() {
    getAttrs(["athletics"], function(values) {
        let athletics = parseInt(values.athletics)||0;
        let hitDice = ["d4", "d6", "d8", "d10", "d12", "d20"];

        setAttrs({
            "hitdie": hitDice[Math.floor(athletics/3)+1]
        });

        UpdateHP();
    });
}