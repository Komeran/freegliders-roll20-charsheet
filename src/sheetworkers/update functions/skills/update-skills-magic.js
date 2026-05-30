import { Signed } from "../../helpers";
import { UpdateMaxMemorisedBlessings } from "../magic/update-blessings";
import { UpdateCursePowers } from "../magic/update-curses";
import { UpdatePotions } from "../magic/update-potions";
import { UpdateFaith, UpdateHealing } from "../magic/update-prayer";
import { UpdateMaxMemorisedSpells, UpdateSpellSaveDTs, UpdateSRD } from "../magic/update-spells";
import { WITCHCRAFT_TABS } from "../../tabs-management";

export function UpdateAlchemy() {
    getAttrs(["alchemy", "log"], function(values) {
        const skill = parseInt(values.alchemy)||0;
        const stat = parseInt(values.log)||0;

        const mod = skill + stat;

        setAttrs({
            "alchemy": skill,
            "alchemyMod": Signed(mod),
            "alchemyPassive": 10 + mod,
            "show_alchemy": skill >= 1 ? "on" : "off",
            "show_extractessence": skill >= 1 && skill < 8 ? "on" : "off",
            "show_alchemistsnose": skill >= 4 ? "on" : "off",
            "show_transmutation": skill >= 6 ? "on" : "off",
            "show_infusion": skill >= 7 ? "on" : "off",
            "show_extractessencedouble": skill >= 8 ? "on" : "off"
        });
        
        UpdateSpellSaveDTs();
        UpdatePotions();
    });
}

export function UpdatePrayer() {
    getAttrs(["prayer", "wil"], function(values) {
        const skill = parseInt(values.prayer)||0;
        const stat = parseInt(values.wil)||0;

        const mod = skill + stat;

        setAttrs({
            "prayer": skill,
            "prayerMod": Signed(mod),
            "prayerPassive": 10 + mod,
            "show_prayer": skill >= 1 ? "on" : "off",
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

function UpdateShowWitchcraft() {
    getAttrs(["runecraft", "spellwork", "summoning", "witchcraftTab"], function(values) {
        const runecraft = parseInt(values.runecraft)||0;
        const spellwork = parseInt(values.spellwork)||0;
        const summoning = parseInt(values.summoning)||0;
        const witchcraftTab = parseInt(values['witchcraftTab']) || -1;
        let tab = WITCHCRAFT_TABS[witchcraftTab];

        if(tab === "rituals" && runecraft < 2) {
            if (runecraft >= 1) {
                tab = "runes";
            }
            else if (spellwork >= 1) {
                tab = "spells";
            }
            else {
                tab = "";
            }
        } else if (tab === "runes" && runecraft < 1) {
            if (spellwork >= 1) {
                tab = "spells";
            }
            else {
                tab = "";
            }
        } else if (tab === "spells" && spellwork < 1) {
            if (runecraft >= 1) {
                tab = "runes";
            }
            else {
                tab = "";
            }
        } else if (tab === "curses" && spellwork < 6) {
            if (spellwork >= 1) {
                tab = "spells";
            }
            else if (runecraft >= 1) {
                tab = "runes";
            }
            else {
                tab = "";
            }
        } else {
            if (runecraft >= 1) {
                tab = "runes";
            }
            else if (spellwork >= 1) {
                tab = "spells";
            }
            else {
                tab = "";
            }
        }

        setAttrs({
            "show_witchcraft": runecraft >= 1 || spellwork >= 1 || summoning >= 1 ? "on" : "off",
            "witchcraftTab": WITCHCRAFT_TABS.indexOf(tab)
        });
    });
}

export function UpdateRunecraft() {
    getAttrs(["runecraft", "log"], function(values) {
        const skill = parseInt(values.runecraft)||0;
        const stat = parseInt(values.log)||0;

        const mod = skill + stat;

        setAttrs({
            "runecraft": skill,
            "runecraftMod": Signed(mod),
            "runecraftPassive": 10 + mod,
            "show_runes": skill >= 1 ? "on" : "off",
            "show_rituals": skill >= 2 ? "on" : "off",
            "show_runereading": skill >= 5 ? "on" : "off"
        });

        UpdateMaxMemorisedSpells();
        UpdateSpellSaveDTs();
        UpdateShowWitchcraft();
    });
}

export function UpdateSpellwork() {
    getAttrs(["spellwork", "wil"], function(values) {
        const skill = parseInt(values.spellwork)||0;
        const stat = parseInt(values.wil)||0;

        const mod = skill + stat;

        const show7thSense = skill >= 8 ? "on" : "off";

        setAttrs({
            "spellwork": skill,
            "spellworkMod": Signed(mod),
            "spellworkPassive": 10 + mod,
            "show_spells": skill >= 1 ? "on" : "off",
            "show_sixthsense": skill >= 4 ? "on" : "off",
            "show_counterspell": skill >= 5 ? "on" : "off",
            "show_curses": skill >= 6 ? "on" : "off",
            "show_seventhsenseaction": show7thSense,
            "show_seventhsensereaction": show7thSense
        });

        UpdateMaxMemorisedSpells();
        UpdateCursePowers();
        UpdateSRD();
        UpdateSpellSaveDTs();
        UpdateShowWitchcraft();
    });
}

export function UpdateSummoning() {
    getAttrs(["summoning", "wil"], function(values) {
        const skill = parseInt(values.summoning)||0;
        const stat = parseInt(values.wil)||0;

        const mod = skill + stat;
        const breachTheVeil = skill >= 8 ? "on" : "off";

        setAttrs({
            "summoning": skill,
            "summoningMod": Signed(mod),
            "summoningPassive": 10 + mod,
            "show_subjugatespirit": skill >= 2 && skill < 6 ? "on" : "off",
            "show_spiritdominance": skill >= 6 ? "on" : "off",
            "show_subjugatespiritbtv": breachTheVeil,
            "show_tapintofamiliarsenses": skill >= 3 ? "on" : "off",
            "show_summonspirit": skill >= 4 ? "on" : "off",
            "show_banish": skill >= 7 ? "on" : "off",
            "show_summondemon": breachTheVeil,
            "show_summonangel": breachTheVeil,
            "show_summoning": skill >= 1 ? "on" : "off"
        });
        
        UpdateSpellSaveDTs();
        UpdateShowWitchcraft();
    });
}