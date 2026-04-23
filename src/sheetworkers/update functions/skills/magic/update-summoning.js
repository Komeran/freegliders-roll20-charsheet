function UpdateSummoning() {
    getAttrs(["summoning", "wil"], function(values) {
        let skill = parseInt(values.summoning)||0;
        let stat = parseInt(values.wil)||0;

        let mod = skill + stat;

        setAttrs({
            "summoning": skill,
            "summoningMod": Signed(mod),
            "summoningPassive": 10 + mod,
            "show_subjugatespirit": skill >= 2 && skill < 6 ? "on" : "off",
            "show_subjugatespiritminor": skill >= 6 ? "on" : "off",
            "show_tapintofamiliarsenses": skill >= 3 ? "on" : "off",
            "show_summonspirit": skill >= 4 ? "on" : "off",
            "show_banish": skill >= 7 ? "on" : "off",
            "show_breachtheveil": skill >= 8 ? "on" : "off"
        });
        
        UpdateSpellSaveDTs();
    });
}