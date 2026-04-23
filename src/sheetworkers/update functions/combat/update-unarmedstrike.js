function UpdateUnarmedStrike() {
    getAttrs(["bod", "brawlingMod", "brawling"], function(values) {
        let bod = parseInt(values.bod)||0;
        let brawlingMod = parseInt(values.brawlingMod)||0;
        let brawling = parseInt(values.brawling)||0;

        let martialArtsDice = Math.floor((brawling+2)/3);
        let martialArtsDamage = "";
        if(martialArtsDice > 0) {
            martialArtsDamage = "" + martialArtsDice + "d4 + ";
        }

        setAttrs({
            "unarmedStrike_atk": Signed(brawlingMod),
            "unarmedStrike_damage": martialArtsDamage + Math.max(1, bod) + " Blunt"
        });
    });
}