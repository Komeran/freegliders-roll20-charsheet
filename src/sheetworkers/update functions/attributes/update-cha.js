function UpdateCha() {
    getAttrs(["charisma", "silverTongueBonus", "sociallyIneptPenalty"], function(values) {
        let charisma = parseInt(values.charisma)||0;
        let silverTongueBonus = parseInt(values.silverTongueBonus)||0;
        let sociallyIneptPenalty = parseInt(values.sociallyIneptPenalty)||0;

        setAttrs({
            "cha": Signed(charisma - 5 + silverTongueBonus + sociallyIneptPenalty)
        });

        UpdateDeception();
        UpdateIntimidation();
        UpdatePerformance();
        UpdatePersuasion();
        UpdateNpcAttackAtks();
        UpdateNpcAttackSaveDifficulties();
      });
}