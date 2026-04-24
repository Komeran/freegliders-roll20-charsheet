import { Signed } from "../helpers";
import { UpdateRangedWeapons } from "./combat/update-rangedweapons";
import { UpdateMaxMemorisedBlessings } from "./magic/update-blessings";
import { UpdateArtillery, UpdateBow, UpdateBrawling, UpdateOneHandedMelee, UpdatePistol, UpdateRifle, UpdateShield, UpdateTwoHandedMelee } from "./skills/update-skills-combat";
import { UpdateAugmentation, UpdateAutomachinery, UpdateClockworkMechanics, UpdateGunsmithing, UpdateTinkering, UpdateVehicleMechanics } from "./skills/update-skills-engineering";
import { UpdateAstronomy, UpdateEconomy, UpdateHistory, UpdateLiterature, UpdateMedicine, UpdateMythology, UpdateNature, UpdateSurvival } from "./skills/update-skills-knowledge";
import { UpdateAlchemy, UpdatePrayer, UpdateRunecraft, UpdateSpellwork, UpdateSummoning } from "./skills/update-skills-magic";
import { UpdateArtisanship, UpdateAthletics, UpdatePerception, UpdatePiloting, UpdateStealth } from "./skills/update-skills-physical";
import { UpdateDeception, UpdateIntimidation, UpdatePerformance, UpdatePersuasion } from "./skills/update-skills-social";
import { UpdateEvasion, UpdateInitiative, UpdateUnarmedStrike } from "./update-combat";
import { UpdateSRD } from "./magic/update-spells";
import { UpdateNpcAttackAtks, UpdateNpcAttackSaveDifficulties } from "../npc/npc";

export function UpdateAgi() {
    getAttrs(["agility", "agileBonus", "clumsyPenalty"], function(values) {
        const agility = parseInt(values.agility)||0;
        const agileBonus = parseInt(values.agileBonus)||0;
        const clumsyPenalty = parseInt(values.clumsyPenalty)||0;

        setAttrs({
            "agi": Signed(agility-5+agileBonus+clumsyPenalty)
        });

        UpdatePiloting();
        UpdateStealth();
        UpdateArtisanship();
        UpdateGunsmithing();
        UpdateTinkering();
        UpdateArtillery();
        UpdateBrawling();
        UpdateBow();
        UpdatePistol();
        UpdateRifle();
        UpdateOneHandedMelee();
        UpdateInitiative();
        UpdateEvasion();
        UpdateNpcAttackAtks();
        UpdateNpcAttackSaveDifficulties();
      });
}

export function UpdateBod() {
    getAttrs(["body", "addictPenalty"], function(values) {
        const body = parseInt(values.body)||0;
        const addictPenalty = parseInt(values.addictPenalty)||0;

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

export function UpdateCha() {
    getAttrs(["charisma", "silverTongueBonus", "sociallyIneptPenalty"], function(values) {
        const charisma = parseInt(values.charisma)||0;
        const silverTongueBonus = parseInt(values.silverTongueBonus)||0;
        const sociallyIneptPenalty = parseInt(values.sociallyIneptPenalty)||0;

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

export function UpdateInt() {
    getAttrs(["intuition"], function(values) {
        const intuition = parseInt(values.intuition)||0;

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

export function UpdateLog() {
    getAttrs(["logic", "analyticalMindBonus", "dullPenalty"], function(values) {
        const logic = parseInt(values.logic)||0;
        const analyticalMindBonus = parseInt(values.analyticalMindBonus)||0;
        const dullPenalty = parseInt(values.dullPenalty)||0;

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

export function UpdateWil() {
    getAttrs(["willpower", "inspiringPresenceBonus"], function(values) {
        const willpower = parseInt(values.willpower)||0;
        const inspiringPresenceBonus = parseInt(values.inspiringPresenceBonus)||0;

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