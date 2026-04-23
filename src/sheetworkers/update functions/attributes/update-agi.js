function UpdateAgi() {
    getAttrs(["agility", "agileBonus", "clumsyPenalty"], function(values) {
        let agility = parseInt(values.agility)||0;
        let agileBonus = parseInt(values.agileBonus)||0;
        let clumsyPenalty = parseInt(values.clumsyPenalty)||0;

        setAttrs({
            "agi": Signed(agility-5+agileBonus+clumsyPenalty)
        });

        UpdatePiloting();
        UpdateStealth();
        UpdateArtisanship();
        UpdateGunsmithing();
        UpdateTinkering();
        UpdateArtillery();
        UpdateBrawling();
        UpdateBow();
        UpdatePistol();
        UpdateRifle();
        UpdateOneHandedMelee();
        UpdateInitiative();
        UpdateEvasion();
        UpdateNpcAttackAtks();
        UpdateNpcAttackSaveDifficulties();
      });
}