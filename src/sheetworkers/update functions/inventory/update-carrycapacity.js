function UpdateCarryCapacity() {
    getAttrs(["body", "athletics", "strongBonus", "weakPenalty"], function(values) {
        let body = parseInt(values.body)||0;
        let athletics = parseInt(values.athletics)||0;
        let strongBonus = parseInt(values.strongBonus)||0;
        let weakPenalty = parseInt(values.weakPenalty)||0;

        let athleticsBonus = Math.floor(athletics/2) * 5;
        let capacity = (body * 10) + athleticsBonus;

        if(strongBonus > 0)  {
            capacity = capacity * 2;
        }

        if(weakPenalty < 0) {
            capacity = Math.floor(capacity/2);
        }

        setAttrs({
            carryCapacity: "" + capacity + " Slots"
        });
    });
}