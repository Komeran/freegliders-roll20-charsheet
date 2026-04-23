function UpdateHP() {
    getAttrs(["body", "level", "hitdie", "toughBonus", "fragilePenalty"], function(values) {
        let body = parseInt(values.body)||0;
        let level = parseInt(values.level)||0;
        let hitdie = values.hitdie||"d0";
        let hitdieMax = parseInt(hitdie.substring(1))||0;
        let toughBonus = parseInt(values.toughBonus)||0;
        let fragilePenalty = parseInt(values.fragilePenalty)||0;

        setAttrs({
            "hp_max": ((hitdieMax/2)+body+toughBonus+fragilePenalty)*level
        });
    });
}