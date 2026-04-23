function UpdateLog() {
    getAttrs(["logic", "analyticalMindBonus", "dullPenalty"], function(values) {
        let logic = parseInt(values.logic)||0;
        let analyticalMindBonus = parseInt(values.analyticalMindBonus)||0;
        let dullPenalty = parseInt(values.dullPenalty)||0;

        setAttrs({
            "log": Signed(logic - 5 + analyticalMindBonus + dullPenalty)
        });

        UpdateAstronomy();
        UpdateEconomy();
        UpdateHistory();
        UpdateLiterature();
        UpdateMedicine();
        UpdateMythology();
        UpdateNature();
        UpdateClockworkMechanics();
        UpdateAutomachinery();
        UpdateAugmentation();
        UpdateAlchemy();
        UpdateRunecraft();
        UpdateNpcAttackAtks();
        UpdateNpcAttackSaveDifficulties();
        UpdateMaxMemorisedBlessings();
      });
}