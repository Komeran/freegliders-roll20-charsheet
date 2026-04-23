function UpdateWil() {
    getAttrs(["willpower", "inspiringPresenceBonus"], function(values) {
        let willpower = parseInt(values.willpower)||0;
        let inspiringPresenceBonus = parseInt(values.inspiringPresenceBonus)||0;

        setAttrs({
            "wil": Signed(willpower - 5 + inspiringPresenceBonus)
        });

        UpdatePrayer();
        UpdateSpellwork();
        UpdateSummoning();
        UpdateNpcAttackAtks();
        UpdateNpcAttackSaveDifficulties();
        UpdateSRD();
      });
}