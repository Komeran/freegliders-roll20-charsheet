function UpdateBod() {
    getAttrs(["body", "addictPenalty"], function(values) {
        let body = parseInt(values.body)||0;
        let addictPenalty = parseInt(values.addictPenalty)||0;

        setAttrs({
            "bod": Signed(body - 5 + addictPenalty)
        });

        UpdateAthletics();
        UpdateVehicleMechanics();
        UpdateShield();
        UpdateTwoHandedMelee();
        UpdateUnarmedStrike();
        UpdateRangedWeapons(); // for damage and some atk values
        UpdateNpcAttackAtks();
        UpdateNpcAttackSaveDifficulties();
      });
}