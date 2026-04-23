function UpdatePrayer() {
    getAttrs(["prayer", "wil"], function(values) {
        let skill = parseInt(values.prayer)||0;
        let stat = parseInt(values.wil)||0;

        let mod = skill + stat;

        setAttrs({
            "prayer": skill,
            "prayerMod": Signed(mod),
            "prayerPassive": 10 + mod,
            "show_prayeroffaith": skill >= 1 ? "on" : "off",
            "show_workmiracle": skill >= 2 ? "on" : "off",
            "show_repelunholy": skill >= 4 ? "on" : "off",
            "show_identifycurse": skill >= 5 ? "on" : "off",
            "show_liftcurse": skill >= 5 ? "on" : "off"
        });

        UpdateFaith();
        UpdateHealing();
        UpdateMaxMemorisedBlessings();
        UpdateSpellSaveDTs();
    });
}