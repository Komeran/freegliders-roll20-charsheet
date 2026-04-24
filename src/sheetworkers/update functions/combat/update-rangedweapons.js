import { DamageStringToTemplateRollString, GetCustomTemplateAtkString, Signed } from "../../helpers";
import { CUSTOM_TEMPLATE_BEGINNING } from "../../worker-constants";

const RANGED_WEAPONS = {
    "derringer": {
        skill: "Pistol",
        properties: {
            light: true,
            armorPiercing: 1
        },
        damage: "1d4 Piercing",
        range: "6m/20m",
        ammoMax: 1,
        ammoType: "Bullet"
    },
    "flintlock pistol": {
        skill: "Pistol",
        properties: {
            light: true,
            armorPiercing: 1
        },
        damage: "1d6 Piercing",
        range: "8m/30m",
        ammoMax: 1,
        ammoType: "Bullet"
    },
    "revolver": {
        skill: "Pistol",
        properties: {
            light: true,
            armorPiercing: 1
        },
        damage: "1d6 Piercing",
        range: "8m/30m",
        ammoMax: 6,
        ammoType: "Bullet"
    },
    "pepperbox": {
        skill: "Pistol",
        properties: {
            light: true,
            armorPiercing: 2
        },
        damage: "1d8 Piercing",
        range: "6m/20m",
        ammoMax: 4,
        ammoType: "Bullet"
    },
    "flintlock rifle": {
        skill: "Rifle",
        properties: {
            armorPiercing: 3,
            twoHanded: true
        },
        damage: "1d10 Piercing",
        range: "12m/40m",
        ammoMax: 1,
        ammoType: "Bullet"
    },
    "blunderbuss": {
        skill: "Rifle",
        properties: {
            heavy: true,
            armorPiercing: 3,
            twoHanded: true
        },
        damage: "2d6 Piercing",
        range: "6m/20m",
        ammoMax: 1,
        ammoType: "Shell"
    },
    "lever-action rifle": {
        skill: "Rifle",
        properties: {
            armorPiercing: 3,
            twoHanded: true
        },
        damage: "1d10 Piercing",
        range: "8m/30m",
        ammoMax: 7,
        ammoType: "Round"
    },
    "bolt-action rifle": {
        skill: "Rifle",
        properties: {
            armorPiercing: 3,
            twoHanded: true
        },
        damage: "1d10 Piercing",
        range: "12m/40m",
        ammoMax: 10,
        ammoType: "Round"
    },
    "shotgun": {
        skill: "Rifle",
        properties: {
            armorPiercing: 3,
            twoHanded: true
        },
        damage: "2d6 Piercing",
        range: "8m/30m",
        ammoMax: 2,
        ammoType: "Shell"
    },
    "hand-crossbow": {
        skill: "Pistol",
        properties: {
            light: true,
            silent: true,
            armorPiercing: 1
        },
        damage: "1d4 Piercing",
        range: "12m/40m",
        ammoMax: 1,
        ammoType: "Bolt"
    },
    "crossbow": {
        skill: "Rifle",
        properties: {
            twoHanded: true,
            silent: true,
            armorPiercing: 2
        },
        damage: "1d8 Piercing",
        range: "30m/120m",
        ammoMax: 1,
        ammoType: "Bolt"
    },
    "shortbow": {
        skill: "Bow",
        properties: {
            twoHanded: true,
            silent: true
        },
        damage: "1d8 Piercing",
        range: "24m/100m",
        ammoMax: 1,
        ammoType: "Arrow"
    },
    "longbow": {
        skill: "Bow",
        properties: {
            twoHanded: true,
            silent: true
        },
        damage: "1d10 Piercing",
        range: "46m/180m",
        ammoMax: 1,
        ammoType: "Arrow"
    },
    "rocket launcher": {
        skill: "Artillery",
        properties: {
            twoHanded: true,
            heavy: true
        },
        damage: "2d10+[Q] Blunt 1d10 Fire",
        range: "8m/30m",
        ammoMax: 1,
        ammoType: "Rocket"
    },
    "machine gun (normal)": {
        skill: "Artillery",
        properties: {
            twoHanded: true,
            heavy: true,
            armorPiercing: 5
        },
        damage: "3d8 Piercing",
        range: "8m/30m",
        ammoMax: 10,
        ammoType: "Salvo"
    },
    "machine gun (spray)": {
        skill: "Artillery",
        properties: {
            twoHanded: true,
            heavy: true,
            armorPiercing: 5
        },
        damage: "1d8 Piercing",
        range: "8m Cone",
        ammoMax: 10,
        ammoType: "Salvo"
    },
    "flamethrower": {
        skill: "Artillery",
        properties: {
            twoHanded: true,
            heavy: true
        },
        damage: "4d6 Fire 1d4 Burning",
        range: "6m Cone",
        ammoMax: 20,
        ammoType: "Fuel"
    },
    "railgun": {
        skill: "Artillery",
        properties: {
            twoHanded: true,
            heavy: true,
            powered: 4,
            armorPiercing: 10
        },
        damage: "4d12 Piercing",
        range: "100m/500m",
        ammoMax: 1,
        ammoType: "Rail Dart"
    }
};

export function UpdateRangedWeapon(eventInfo) {
    if(eventInfo.previousValue === eventInfo.newValue) {
        return;
    }
    
    const rowId = eventInfo.sourceAttribute.split("_")[2];

    DoUpdateRangedWeapon(rowId);
    UpdateRangedWeaponRoll(eventInfo);
}

export function UpdateRangedWeapons() {
    getSectionIDs("rangedWeapon", function(ids) {
        for(var i = 0; i < ids.length; i++) {
            const prefix = "repeating_rangedWeapon_" + ids[i] + "_";

            DoUpdateRangedWeapon(ids[i]);
            UpdateRangedWeaponRoll({sourceAttribute: prefix});
        }
    });
}

function DoUpdateRangedWeapon(id) {
    const prefix = "repeating_rangedWeapon_" + id + "_";
    
    getAttrs([prefix+"rangedWeapon_name", prefix+"rangedWeapon_weaponExpert", prefix+"rangedWeapon_quality", prefix+"rangedWeapon_skill", prefix+"rangedWeapon_damage"], function(values) {
        const weaponName = values[prefix+"rangedWeapon_name"] || "";
        const isWeaponExpert = values[prefix + "rangedWeapon_weaponExpert"] == 'on';
        const weaponQuality = parseInt(values[prefix + "rangedWeapon_quality"]) || 0;
        const weaponSkill = values[prefix+"rangedWeapon_skill"] || "";
        const weaponDamage = values[prefix+"rangedWeapon_damage"] || "";

        const listWeapon = RANGED_WEAPONS[weaponName.toLowerCase()];
        const skill = listWeapon !== undefined ? listWeapon.skill : weaponSkill;

        const attributes = {};
        
        if(listWeapon !== undefined) {
            attributes[prefix+"rangedWeapon_skill"] = listWeapon.skill;
            attributes[prefix+"rangedWeapon_range"] = listWeapon.range;
            attributes[prefix+"rangedWeapon_ammo"] = listWeapon.ammoMax;
        }

        const sanitizedSkillName = skill.toLowerCase().replace(" ", "").replace("-", "");

        getAttrs([sanitizedSkillName + "Mod", "bod", "agi", "gunsmithing", sanitizedSkillName], function(values) {
            const skillMod = values[sanitizedSkillName + "Mod"] || "+0";
            const bod = values["bod"] || "+0";
            const agi = values["agi"] || "+0";
            const gunsmithing = parseInt(values["gunsmithing"]) || 0;
            const skillRanks = parseInt(values[sanitizedSkillName]) || 0;

            // ATK with Gun Training
            if(gunsmithing > skillRanks) {
                attributes[prefix+"rangedWeapon_atk"] = Signed(Math.max(skillRanks, Math.floor(gunsmithing / 2)) + parseInt(agi));
            }
            else {
                attributes[prefix+"rangedWeapon_atk"] = skillMod;
            }
            // Weapon Expert
            if(isWeaponExpert) {    
                attributes[prefix+"rangedWeapon_atk"] += "+2";
            }

            // Damage
            // Fill in Quality
            let damage = weaponDamage;
            if(listWeapon !== undefined) {
                damage = listWeapon.damage;
            }
            const damageParts = damage.replaceAll("[Q]", weaponQuality).split(" ");
            // Gunsmith Extra Damage
            if(weaponQuality >= 5) {
                const diceRegex = /^(\d*)([dD]\d*)/;
                // We check if there even is a dice component at the start
                // (has to be at start to be considered base damage dice)
                const regexMatch = damageParts[0].match(diceRegex);
                if(regexMatch) {
                    const dieSize = regexMatch[2]; // second capture group is die including the "d"
                    const extraDamageDice = Math.floor(weaponQuality / 5) + dieSize;
                    
                    const extraDamageIndex = damageParts[0].search(/[+-]\d*[dD]?\d*\[ExtraDamage\]/g);
                    if(extraDamageIndex == -1) {
                        damageParts[0] += "+" + extraDamageDice + "[ExtraDamage]";
                    }
                    else {
                        damageParts[0] = damageParts[0].replaceAll(/[+-]\d*[dD]?\d*\[ExtraDamage\]/g, "+" + extraDamageDice + "[ExtraDamage]");
                    }
                }
            }
            else {
                damageParts[0] = damageParts[0].replaceAll(/[+-]\d*[dD]?\d*\[ExtraDamage\]/g, "");
            }
            // Attribute Mod
            if(skill == "Pistol" || skill == "Rifle") {
                const agiIndex = damageParts[0].search(/[+-]\d*[dD]?\d*\[AGI\]/g);
                const bodIndex = damageParts[0].search(/[+-]\d*d?\[dD]*\[BOD\]/g);
                if(agiIndex > -1) {
                    damageParts[0] = damageParts[0].replaceAll(/[+-]\d*[dD]?\d*\[AGI\]/g, agi + "[AGI]");
                }
                if(bodIndex > -1) {
                    damageParts[0] = damageParts[0].replaceAll(/[+-]\d*[dD]?\d*\[BOD\]/g, agi + "[AGI]");
                }
                if(agiIndex == -1 && bodIndex == -1) {
                    damageParts[0] += agi + "[AGI]";
                }
            }
            else if (skill == "Bow") {
                const agiIndex = damageParts[0].search(/[+-]\d*[dD]?\d*\[AGI\]/g);
                const bodIndex = damageParts[0].search(/[+-]\d*[dD]?\d*\[BOD\]/g);
                if(agiIndex > -1) {
                    damageParts[0] = damageParts[0].replaceAll(/[+-]\d*[dD]?\d*\[AGI\]/g, bod + "[BOD]");
                }
                if(bodIndex > -1) {
                    damageParts[0] = damageParts[0].replaceAll(/[+-]\d*[dD]?\d*\[BOD\]/g, bod + "[BOD]");
                }
                if(agiIndex == -1 && bodIndex == -1) {
                    damageParts[0] += bod + "[BOD]";
                }
            }
            else {
                damageParts[0] = damageParts[0].replaceAll(/[+-]\d*[dD]?\d*\[BOD\]/g, "");
                damageParts[0] = damageParts[0].replaceAll(/[+-]\d*[dD]?\d*\[AGI\]/g, "");
            }
            // Weapon Expert
            if(isWeaponExpert) {
                const weaponExpertIndex = damageParts[0].search(/[+-]\d*[dD]?\d*\[WeaponExpert\]/g);
                if(weaponExpertIndex == -1) {
                    damageParts[0] += "+2[WeaponExpert]";
                }
                else {
                    damageParts[0] = damageParts[0].replaceAll(/[+-]\d*[dD]?\d*\[WeaponExpert\]/g, "+2[WeaponExpert]");
                }
            }
            else {
                damageParts[0] = damageParts[0].replaceAll(/[+-]\d*[dD]?\d*\[WeaponExpert\]/g, "");
            }

            let damageText = damageParts[0];
            for(let i = 1; i < damageParts.length; i++) {
                damageText += " " + damageParts[i];
            }

            attributes[prefix+"rangedWeapon_damage"] = damageText;

            setAttrs(attributes);
        });
    });
}

export function UpdateRangedWeaponRoll(eventInfo) {
    if(eventInfo.previousValue === eventInfo.newValue) {
        return;
    }
    
    const rowId = eventInfo.sourceAttribute.split("_")[2];
    const prefix = "repeating_rangedWeapon_" + rowId + "_";
    
    const attributes = {};

    getAttrs([prefix+"rangedWeapon_name", prefix+"rangedWeapon_damage", prefix+"rangedWeapon_atk", "athletics", "stealth", "artillery", prefix+"rangedWeapon_skill"], function(values) {
        const weaponName = values[prefix+"rangedWeapon_name"] || "";
        const weaponDamage = values[prefix+"rangedWeapon_damage"] || "";
        const weaponAtk = values[prefix+"rangedWeapon_atk"] || "";
        const athleticsRanks = parseInt(values["athletics"]) || 0;
        const stealthRanks = parseInt(values["stealth"]) || 0;
        const artilleryRanks = parseInt(values["artillery"]) || 0;
        const weaponSkill = values[prefix+"rangedWeapon_skill"] || "";

        let roll = `${CUSTOM_TEMPLATE_BEGINNING}{{name=${weaponName} Attack}}`;

        // To Hit
        if(weaponAtk != "") {
            roll += GetCustomTemplateAtkString(weaponAtk);
        }

        // Damage
        const damageAddsBOD = weaponSkill == "Bow";
        roll += DamageStringToTemplateRollString(weaponDamage, true, stealthRanks, damageAddsBOD, athleticsRanks, weaponSkill, artilleryRanks);

        attributes[prefix+"rangedWeapon_roll"] = roll;

        setAttrs(attributes);
    });
}