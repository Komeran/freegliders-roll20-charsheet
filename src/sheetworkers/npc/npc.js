import { DamageStringToTemplateRollString, GetCustomTemplateAtkString, Signed } from "../helpers";
import { CUSTOM_TEMPLATE_BEGINNING } from "../worker-constants";

const ATTRIBUTE_MOD_TAGS = {
    Agility: "[AGI]",
    Body: "[BOD]",
    Charisma: "[CHA]",
    Intuition: "[INT]",
    Logic: "[LOG]",
    Willpower: "[WIL]"
};

export function RollNpcAttack(eventInfo) {
    const rowId = eventInfo.sourceAttribute.split("_")[2];
    const prefix = "repeating_npcAttack_" + rowId + "_npc_attack_";

    getAttrs(
        [
            prefix + "name",                // Name
            prefix + "type",                // Melee / Ranged / Special
            prefix + "type2",               // Weapon / Unarmed / Spell / Innate
            prefix + "isAttackTest",        // isAttackTest Checkbox
            prefix + "requiresSave",        // requiresSave Checkbox
            prefix + "atk",                 // ATK
            prefix + "difficulty",          // DT
            prefix + "saveAttribute",       // Save Attribute
            prefix + "saveSkill",           // Save Skill
            prefix + "damage",              // Damage
            prefix + "description"          // Description
        ],
        function(values) {
            const name = values[prefix + "name"] || "";
            const type = values[prefix + "type"] || "";
            const type2 = values[prefix + "type2"] || "";
            const isAttackTest = values[prefix + "isAttackTest"] == "on";
            const requiresSave = values[prefix + "requiresSave"] == "on";
            const atk = values[prefix + "atk"] || "";
            const difficulty = values[prefix + "difficulty"] || "";
            const saveAttribute = values[prefix + "saveAttribute"] || "";
            const saveSkill = values[prefix + "saveSkill"] || "";
            const damage = values[prefix + "damage"] || "";
            const description = values[prefix + "description"] || "";

            let roll = CUSTOM_TEMPLATE_BEGINNING;

            roll += "{{name=" + name + "}}";
            roll += "{{type=" + type + " " + type2 + "}}";

            // Attack Test
            if(isAttackTest) {
                roll += GetCustomTemplateAtkString(atk);
            }

            // Save Test
            if(requiresSave) {
                roll += "{{save=DT " + difficulty;

                if(saveSkill == "Evasion") {
                    roll += " Evasion";
                }
                else if(saveSkill != "none") {
                    roll += " " + saveSkill + " " + ATTRIBUTE_MOD_TAGS[saveAttribute];
                }
                else {
                    roll += " " + saveAttribute;
                }

                roll += "}}";
            }

            // Damage Roll
            if(damage != "") {
                roll += DamageStringToTemplateRollString(damage);
            }

            // Description
            if(description != "") {
                roll += "{{description=" + description + "}}";
            }

            startRoll(roll, (r) => {
                finishRoll(r.rollId);
            });
        }
    );
}

export function UpdateNpcAttackAtks() {
    getSectionIDs("npcAttack", function(ids) {
        for(const rowId of ids) {
            DoUpdateNpcAttackAtk(rowId);
        }
    });
}

export function UpdateNpcAttackAtk(eventInfo) {
    if(eventInfo.previousValue === eventInfo.newValue) {
        return;
    }
    
    const rowId = eventInfo.sourceAttribute.split("_")[2];
    DoUpdateNpcAttackAtk(rowId);
}

function DoUpdateNpcAttackAtk(rowId) {
    const prefix = "repeating_npcAttack_" + rowId + "_npc_attack_";

    getAttrs([prefix + "atkMod", prefix + "atkAttribute", "agi", "bod", "cha", "int", "log", "wil"], function (values){
        const atkMod = parseInt(values[prefix + "atkMod"]) || 0;
        const atkAttribute = values[prefix + "atkAttribute"] || "";
        const attributeMods = {
            Agility      : parseInt(values["agi"]) || 0,
            Body         : parseInt(values["bod"]) || 0,
            Charisma     : parseInt(values["cha"]) || 0,
            Intelligence : parseInt(values["int"]) || 0,
            Logic        : parseInt(values["log"]) || 0,
            Willpower    : parseInt(values["wil"]) || 0
        };

        let atk = atkMod;

        if(atkAttribute != "" && atkAttribute != "none") {
            atk += attributeMods[atkAttribute];
        }

        const attributes = {};
        attributes[prefix + "atk"] = Signed(atk);

        setAttrs(attributes);
    });
}

export function UpdateNpcAttackSaveDifficulties() {
    getSectionIDs("npcAttack", function(ids) {
        for(const rowId of ids) {
            DoUpdateNpcAttackSaveDifficulty(rowId);
        }
    });
}

export function UpdateNpcAttackSaveDifficulty(eventInfo) {
    if(eventInfo.previousValue === eventInfo.newValue) {
        return;
    }
    
    const rowId = eventInfo.sourceAttribute.split("_")[2];
    DoUpdateNpcAttackSaveDifficulty(rowId);
}

function DoUpdateNpcAttackSaveDifficulty(rowId) {
    const prefix = "repeating_npcAttack_" + rowId + "_npc_attack_";

    getAttrs([prefix + "difficultyMod", prefix + "difficultyAttribute", "agi", "bod", "cha", "int", "log", "wil"], function (values){
        const difficultyMod = parseInt(values[prefix + "difficultyMod"]) || 0;
        const difficultyAttribute = values[prefix + "difficultyAttribute"] || "";
        const attributeMods = {
            Agility      : parseInt(values["agi"]) || 0,
            Body         : parseInt(values["bod"]) || 0,
            Charisma     : parseInt(values["cha"]) || 0,
            Intelligence : parseInt(values["int"]) || 0,
            Logic        : parseInt(values["log"]) || 0,
            Willpower    : parseInt(values["wil"]) || 0
        };

        let difficulty = 0;
        difficulty += difficultyMod;

        if(difficultyAttribute != "" && difficultyAttribute != "none") {
            difficulty += attributeMods[difficultyAttribute];
        }

        const attributes = {};
        attributes[prefix + "difficulty"] = difficulty;

        setAttrs(attributes);
    });
}