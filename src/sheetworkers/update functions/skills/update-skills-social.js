import { Signed } from "../../helpers";
import { UpdateSpellSaveDTs } from "../magic/update-spells";

export function UpdateDeception() {
    getAttrs(["deception", "cha"], function(values) {
        const deception = parseInt(values.deception)||0;
        const cha = parseInt(values.cha)||0;

        const mod = deception+cha;

        setAttrs({
            "deception": deception,
            "deceptionMod": Signed(mod),
            "deceptionPassive": 10+mod
        });
        
        UpdateSpellSaveDTs();
      });
}

export function UpdateIntimidation() {
    getAttrs(["intimidation", "cha"], function(values) {
        const intimidation = parseInt(values.intimidation)||0;
        const cha = parseInt(values.cha)||0;

        const mod = intimidation+cha;

        setAttrs({
            "intimidation": intimidation,
            "intimidationMod": Signed(mod),
            "intimidationPassive": 10+mod
        });
        
        UpdateSpellSaveDTs();
      });
}

export function UpdatePerformance() {
    getAttrs(["performance", "cha"], function(values) {
        const performance = parseInt(values.performance)||0;
        const cha = parseInt(values.cha)||0;

        const mod = performance+cha;

        setAttrs({
            "performance": performance,
            "performanceMod": Signed(mod),
            "performancePassive": 10+mod
        });
      });
}

export function UpdatePersuasion() {
    getAttrs(["persuasion", "cha"], function(values) {
        const persuasion = parseInt(values.persuasion)||0;
        const cha = parseInt(values.cha)||0;

        const mod = persuasion+cha;

        setAttrs({
            "persuasion": persuasion,
            "persuasionMod": Signed(mod),
            "persuasionPassive": 10+mod
        });
        
        UpdateSpellSaveDTs();
      });
}