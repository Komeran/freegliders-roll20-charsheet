function UpdateInt() {
    getAttrs(["intuition"], function(values) {
        let intuition = parseInt(values.intuition)||0;

        setAttrs({
            "int": Signed(intuition-5)
        });

        UpdatePerception();
        UpdateSurvival();
        UpdateInitiative();
        UpdateEvasion();
        UpdateNpcAttackAtks();
        UpdateNpcAttackSaveDifficulties();
      });
}