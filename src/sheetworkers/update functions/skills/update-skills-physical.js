import { Signed } from "../../helpers";
import { UpdateMeleeWeapons } from "../combat/update-meleeweapons";
import { UpdateRangedWeapons } from "../combat/update-rangedweapons";
import { UpdateSpellSaveDTs } from "../magic/update-spells";
import { UpdateHitDie } from "../update-combat";
import { UpdateCarryCapacity } from "../update-inventory";

export function UpdateArtisanship() {
    getAttrs(["artisanship", "agi"], function(values) {
        const artisanship = parseInt(values.artisanship)||0;
        const agi = parseInt(values.agi)||0;

        const mod = artisanship+agi;

        setAttrs({
            "artisanship": artisanship,
            "artisanshipMod": Signed(mod),
            "artisanshipPassive": 10+mod
        });
        
        UpdateSpellSaveDTs();
      });
}

export function UpdateAthletics() {
    getAttrs(["athletics", "bod", "strongBonus", "weakPenalty"], function(values) {
        const athletics = parseInt(values.athletics)||0;
        const bod = parseInt(values.bod)||0;
        const strongBonus = parseInt(values.strongBonus)||0;
        const weakPenalty = parseInt(values.weakPenalty)||0;

        const mod = athletics + bod + strongBonus + weakPenalty;

        setAttrs({
            "athletics": athletics,
            "athleticsMod": Signed(mod),
            "athleticsPassive": 10+mod
        });

        UpdateHitDie();
        UpdateCarryCapacity();
        UpdateMeleeWeapons(); // for Powerful Strike
        UpdateRangedWeapons(); // for Powerful Strike
        UpdateSpellSaveDTs();
      });
}

export function UpdatePerception() {
    getAttrs(["perception", "int"], function(values) {
        const perception = parseInt(values.perception)||0;
        const int = parseInt(values.int)||0;

        const mod = perception + int;

        setAttrs({
            "perception": perception,
            "perceptionMod": Signed(mod),
            "perceptionPassive": 10+mod
        });
        
        UpdateSpellSaveDTs();
      });
}

export function UpdatePiloting() {
    getAttrs(["piloting", "agi"], function(values) {
        const piloting = parseInt(values.piloting)||0;
        const agi = parseInt(values.agi)||0;

        const mod = piloting+agi;

        setAttrs({
            "piloting": piloting,
            "pilotingMod": Signed(mod),
            "pilotingPassive": 10+mod
        });
        
        UpdateSpellSaveDTs();
      });
}

export function UpdateStealth() {
    getAttrs(["stealth", "agi", "sneakyBonus"], function(values) {
        const stealth = parseInt(values.stealth)||0;
        const agi = parseInt(values.agi)||0;
        const sneakyBonus = parseInt(values.sneakyBonus)||0;

        const mod = stealth+agi+sneakyBonus;

        setAttrs({
            "stealth": stealth,
            "stealthMod": Signed(mod),
            "stealthPassive": 10+mod
        });

        UpdateMeleeWeapons(); // for sneak attack
        UpdateRangedWeapons(); // for sneak attack
        UpdateSpellSaveDTs();
      });
}