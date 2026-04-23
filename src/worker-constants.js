// Constants
const TEST_TYPE_PROMPT = "?{Roll Type|Normal,[[1d20]]|Advantage,{[[1d20]]&#44;[[1d20]]&#125;kh1|Disadvantage,{[[1d20]]&#44;[[1d20]]&#125;kl1}";

const CUSTOM_TEMPLATE_BEGINNING = `?{Secret|Open,|Secret,/w gm} &{template:custom}`;

const SKILLS = [
    "athletics",
    "perception",
    "piloting",
    "stealth",
    "artisanship",
    "deception",
    "intimidation",
    "performance",
    "persuasion",
    "astronomy",
    "economy",
    "history",
    "literature",
    "medicine",
    "mythology",
    "nature",
    "survival",
    "clockworkmechanics",
    "automachinery",
    "augmentation",
    "gunsmithing",
    "tinkering",
    "vehiclemechanics",
    "alchemy",
    "prayer",
    "spellwork",
    "runecraft",
    "summoning",
    "artillery",
    "brawling",
    "bow",
    "pistol",
    "rifle",
    "shield",
    "onehandedmelee",
    "twohandedmelee"
];

const ATTRIBUTES = [
    "agility",
    "body",
    "charisma",
    "intuition",
    "logic",
    "willpower"
];

const ATTRIBUTE_MODS = [
    "agi",
    "bod",
    "cha",
    "int",
    "log",
    "wil"
];

const DAMAGE_TYPES = {
    "blunt": "&#x1F528;",
    "slashing": "&#x1F52A;",
    "piercing": "&#x27B6;",
    "fire": "&#x1F525;",
    "cold": "&#x2744;",
    "electrical": "&#x26A1;",
    "acid": "&#x1F9EA;",
    "poison": "&#x2620;"
};

const ATTRIBUTE_MOD_NAMES = {
    "agi": "Agility",
    "bod": "Body",
    "cha": "Charisma",
    "int": "Intuition",
    "log": "Logic",
    "wil": "Willpower"
};

const SKILL_MOD_NAMES_ATTRIBUTES = {
    "athletics": {
        mod: "athleticsMod",
        name: "Athletics",
        attribute: "BOD"
    },
    "perception": {
        mod: "perceptionMod",
        name: "Perception",
        attribute: "INT"
    },
    "piloting": {
        mod: "pilotingMod",
        name: "Piloting",
        attribute: "AGI"
    },
    "stealth": {
        mod: "stealthMod",
        name: "Stealth",
        attribute: "AGI"
    },
    "artisanship": {
        mod: "artisanshipMod",
        name: "Artisanship",
        attribute: "AGI"
    },
    "deception": {
        mod: "deceptionMod",
        name: "Deception",
        attribute: "CHA"
    },
    "intimidation": {
        mod: "intimidationMod",
        name: "Intimidation",
        attribute: "CHA"
    },
    "performance": {
        mod: "performanceMod",
        name: "Performance",
        attribute: "CHA"
    },
    "persuasion": {
        mod: "persuasionMod",
        name: "Persuasion",
        attribute: "CHA"
    },
    "astronomy": {
        mod: "astronomyMod",
        name: "Astronomy",
        attribute: "LOG"
    },
    "economy": {
        mod: "economyMod",
        name: "Economy",
        attribute: "LOG"
    },
    "history": {
        mod: "historyMod",
        name: "History",
        attribute: "LOG"
    },
    "literature": {
        mod: "literatureMod",
        name: "Literature",
        attribute: "LOG"
    },
    "medicine": {
        mod: "medicineMod",
        name: "Medicine",
        attribute: "LOG"
    },
    "mythology": {
        mod: "mythologyMod",
        name: "Mythology",
        attribute: "LOG"
    },
    "nature": {
        mod: "natureMod",
        name: "Nature",
        attribute: "LOG"
    },
    "survival": {
        mod: "survivalMod",
        name: "Survival",
        attribute: "INT"
    },
    "clockworkmechanics": {
        mod: "clockworkmechanicsMod",
        name: "Clockwork Mechanics",
        attribute: "LOG"
    },
    "automachinery": {
        mod: "automachineryMod",
        name: "Automachinery",
        attribute: "LOG"
    },
    "augmentation": {
        mod: "augmentationMod",
        name: "Augmentation",
        attribute: "LOG"
    },
    "gunsmithing": {
        mod: "gunsmithingMod",
        name: "Gunsmithing",
        attribute: "AGI"
    },
    "tinkering": {
        mod: "tinkeringMod",
        name: "Tinkering",
        attribute: "AGI"
    },
    "vehiclemechanics": {
        mod: "vehiclemechanicsMod",
        name: "Vehicle Mechanics",
        attribute: "BOD"
    },
    "alchemy": {
        mod: "alchemyMod",
        name: "Alchemy",
        attribute: "LOG"
    },
    "prayer": {
        mod: "prayerMod",
        name: "Prayer",
        attribute: "WIL"
    },
    "spellwork": {
        mod: "spellworkMod",
        name: "Spellwork",
        attribute: "WIL"
    },
    "runecraft": {
        mod: "runecraftMod",
        name: "Runecraft",
        attribute: "LOG"
    },
    "summoning": {
        mod: "summoningMod",
        name: "Summoning",
        attribute: "WIL"
    },
    "artillery": {
        mod: "artilleryMod",
        name: "Artillery",
        attribute: "AGI"
    },
    "brawling": {
        mod: "brawlingMod",
        name: "Brawling",
        attribute: "AGI"
    },
    "bow": {
        mod: "bowMod",
        name: "Bow",
        attribute: "AGI"
    },
    "pistol": {
        mod: "pistolMod",
        name: "Pistol",
        attribute: "AGI"
    },
    "rifle": {
        mod: "rifleMod",
        name: "Rifle",
        attribute: "AGI"
    },
    "shield": {
        mod: "shieldMod",
        name: "Shield",
        attribute: "BOD"
    },
    "onehandedmelee": {
        mod: "onehandedmeleeMod",
        name: "One-Handed Melee",
        attribute: "AGI"
    },
    "twohandedmelee": {
        mod: "twohandedmeleeMod",
        name: "Two-Handed Melee",
        attribute: "BOD"
    }
};

const POTIONS = {
    "healing": {
        essence: "2 Water, 2 Fire, 2 Earth, 2 Air",
        effect: "Restores [P]d4 hit points."
    },
    "cleansing": {
        essence: "3 Water, 3 Earth",
        effect: "Cures all stacks of poison."
    },
    "haste": {
        essence: "2 Fire, 3 Air",
        effect: "Grants +1 Minor Action each turn for [P] turns."
    },
    "restoration": {
        essence: "5 Earth",
        effect: "At the start of your turn, you regain 1d4 hit points for the next [P] turns."
    },
    "water breathing": {
        essence: "3 Water, 2 Air",
        effect: "For the next [P] hours, you can breathe underwater."
    },
    "flight": {
        essence: "6 Air",
        effect: "For the next [P] minutes, you can fly with a speed equal to your walking speed."
    },
    "charm": {
        essence: "3 Water, 2 Fire",
        effect: "For the next [P] hours, you have advantage on Persuasion tests."
    },
    "muscle": {
        essence: "1 Fire, 4 Earth",
        effect: "For the next [P] hours, you have advantage on Athletics tests."
    },
    "fire immunity": {
        essence: "6 Water",
        effect: "For the next [P] minutes, you are immune to Fire damage."
    },
    "lightning immunity": {
        essence: "6 Earth",
        effect: "For the next [P] minutes, you are immune to Lightning damage."
    },
    "acid immunity": {
        essence: "3 Earth, 3 Water",
        effect: "For the next [P] minutes, you are immune to Acid damage."
    },
    "poison immunity": {
        essence: "3 Earth, 3 Water",
        effect: "For the next [P] minutes, you are immune to Poison damage. You can still gain additional poison stacks."
    },
    "hardening": {
        essence: "6 Earth",
        effect: "For the next minute, you gain a +[P] bonus to all your Armor Values."
    },
    "night vision": {
        essence: "1 Water, 3 Fire, 1 Air",
        effect: "For the next [P] hours, you can see in dim light as if it was bright light and in total darkness as if it were dim light."
    },
    "explosion": {
        essence: "6 Fire",
        effect: "When this potion is thrown, it explodes in a 10m radius sphere, dealing [P]d6 Fire damage to creatures and objects in the area."
    },
    "last stand": {
        essence: "2 Water, 4 Fire, 2 Earth, 2 Air",
        effect: "For the next minute, if damage from any source other than a critical or deadly hit would reduce you to 0 hit points, you keep 1 hit point. At the end of that minute, if you’re at 1 hit point still, you immediately drop unconscious."
    },
    "wound closure": {
        essence: "4 Water, 1 Fire, 1 Earth",
        effect: "Cures all stacks of bleeding."
    }
};

const CURSES = {
    "lycanthropy": {
        natura: "20 Fire",
        target: "1 Creature (Human)",
        sacrifice: "Fresh blood drawn directly from the target within the last hour that must be trifled over a silver blade.",
        description: "Also known as the werewolf curse. This curse turns a human into a werewolf. Every full moon at nightfall the target turns into a humanoid wolf creature (Use the Werewolf stat sheet). While in this form, it is driven by an insatiable hunger for meat, especially that of humans. At dawn, the target turns back into its human form and loses all memories of anything that happened while turned.",
        breakingCondition: "The curse can be broken by trifling fresh blood of the witch that inflicted the curse drawn within the last hour onto a silver blade and stabbing the target with it."
    },
    "bad luck": {
        natura: "5 Fire, 5 Air, 5 Earth, 5 Water",
        target: "1 Creature",
        sacrifice: "A symbol of luck such as a four leaf clover that must be burnt along with a strand of hair taken off of the target within the last hour.",
        description: "The target creature has disadvantage on all tests.",
        breakingCondition: "Once a day at the end of a Long Rest, the target can attempt to break the curse by performing a difficult task and rolling a 20 on at least one of the d20s on the associated test."
    },
    "eternal nightmares": {
        natura: "10 Air, 10 Water",
        target: "1 Creature",
        sacrifice: "A lock of the target's hair, burned with black wax and placed under their bed or pillow.",
        description: "The target creature is plagued by vivid, horrifying nightmares whenever they sleep. Long Rests only recover half of their health point maximum - [P] health points.",
        breakingCondition: "The target must defeat a creature spawned from their nightmares in the dream world. In order to do that, the target must be made aware of the situation in their dream by means of a Dreamwalk ritual."
    },
    "rusting decay": {
        natura: "10 Earth",
        target: "1 Object (weapon, or piece of armor)",
        sacrifice: "A piece of metal that has naturally rusted over 50 years or more, ground into powder and sprinkled over the object.",
        description: "The target object constantly corrodes.\nIf it is a piece of armor, its AV is cumulatively reduced by 1 every day at dawn. Once its AV hits 0, it crumbles to dust and is destroyed.\nIf it is a weapon, it gets a cumulative -1 penalty to all damage rolls daily at dawn. After 10 - [P] + [Q] days (where [Q] is the weapon’s quality or 0 if it has no associated quality) the weapon crumbles to dust and is destroyed.",
        breakingCondition: "None."
    },
    "forked tongue": {
        natura: "10 Air, 5 Water",
        target: "1 Creature",
        sacrifice: "The burned tongue of a songbird, which must be eaten by the target.",
        description: "The target creature cannot speak the truth. Every spoken statement is twisted into a lie, even if unintentional.",
        breakingCondition: "The target must witness the witch that inflicted the curse on it speaking 3 lies within one day."
    },
    "shattered fate": {
        natura: "5 Fire, 5 Air, 5 Earth, 5 Water",
        target: "1 Creature",
        sacrifice: "A mirror that the target has looked into within the last day, shattered and buried at a crossroads.",
        description: "Whenever the target rolls a natural 20 on a test, they must reroll and use the new result.",
        breakingCondition: "The target must voluntarily fail a task at great personal cost."
    },
    "gluttony": {
        natura: "10 Earth, 5 Water",
        target: "1 Creature",
        sacrifice: "A food item the target has taken a bite out of within the last 24 hours that must be fed to an animal with black fur or feathers at midnight.",
        description: "The target can never feel full. They must consume three times as much food daily to avoid exhaustion, but no amount of food can ever truly satisfy them.",
        breakingCondition: "The target must fast for seven full days (no food, only water), enduring the hardship without falling unconscious or dying. At the dawn of the 8th day the curse is broken."
    },
    "silence": {
        natura: "20 Air",
        target: "1 Creature",
        sacrifice: "The written notes of a melody that the target has hummed or whistled within the last hour, which you must eat.",
        description: "The target is rendered mute. They cannot speak or produce vocal sounds.",
        breakingCondition: "The target must witness the witch that inflicted the curse humming, whistling, or singing the melody that she ate."
    },
    "grasping roots": {
        natura: "17 Earth",
        target: "a [P] x 10m square area",
        sacrifice: "A branch of an ancient tree mixed with the blood of a medium or larger carnivore that must be implanted in the centre of the target area. Creatures smeared with some of the same blood when inflicting the curse can pass the area unaffected.",
        description: "The target area becomes overgrown with aggressive moving roots and vines.\nMovement through the cursed area is halved.\nAt the start of each creature’s turn in the area, they must succeed on an Athletics or Evasion test against 10 + [P] or be restrained until the start of their next turn.",
        breakingCondition: "Burn the branch of the ancient tree at the centre of the area."
    },
    "sanguine seal": {
        natura: "7 Fire, 10 Earth, 3 Water",
        target: "a room or building up to [P] x 10m in its largest dimension",
        sacrifice: "Blood of the person who most recently owned or controlled the structure, which must be smeared over one of the room’s or building’s entrances.",
        description: "All doors, windows, and other access points in the target area can only be opened by creatures marked with the blood used in the sacrifice.\nAll others find doors and windows impossibly sealed. They’re unable to open the doors and windows by any means short of magic.",
        breakingCondition: "The person whose blood was used for the sacrifice must personally ask someone who isn’t marked by the blood to enter the target area."
    }
};

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

const MELEE_WEAPONS = {
    "brass knuckle": {
        skill: "Brawling",
        properties: {
            light: true
        },
        damage: "1d4 Blunt"
    },
    "cestus": {
        skill: "Brawling",
        properties: {
            light: true
        },
        damage: "1d6 Blunt"
    },
    "knife": {
        skill: "One-Handed Melee",
        properties: {
            light: true
        },
        damage: "1d4 Slashing"
    },
    "dagger": {
        skill: "One-Handed Melee",
        properties: {
            light: true
        },
        damage: "1d4 Piercing"
    },
    "throwing knife": {
        skill: "One-Handed Melee",
        properties: {
            light: true,
            thrown: {
                close: "6m",
                long: "18m"
            }
        },
        damage: "1d4 Piercing"
    },
    "broadsword": {
        skill: "One-Handed Melee",
        damage: "1d8 Slashing"
    },
    "longsword": {
        skill: "One-Handed Melee",
        properties: {
            Versatile: "1d12"
        },
        damage: "1d10 Slashing"
    },
    "cutlass": {
        skill: "One-Handed Melee",
        properties: {
            light: true
        },
        damage: "1d6 Slashing"
    },
    "rapier": {
        skill: "One-Handed Melee",
        damage: "1d8 Slashing"
    },
    "smallsword": {
        skill: "One-Handed Melee",
        properties: {
            light: true
        },
        damage: "1d6 Piercing"
    },
    "cane sword": {
        skill: "One-Handed Melee",
        damage: "1d6 Slashing"
    },
    "hardened cane": {
        skill: "One-Handed Melee",
        damage: "1d6 Blunt"
    },
    "baton": {
        skill: "One-Handed Melee",
        properties: {
            light: true
        },
        damage: "1d8 Blunt"
    },
    "spiked club": {
        skill: "One-Handed Melee",
        damage: "1d6 Blunt 1d4 Piercing"
    },
    "mace": {
        skill: "One-Handed Melee",
        damage: "1d8 Blunt"
    },
    "warhammer": {
        skill: "One-Handed Melee",
        properties: {
            Versatile: "1d10"
        },
        damage: "1d8 Blunt"
    },
    "war pick": {
        skill: "One-Handed Melee",
        properties: {
            Versatile: "1d10"
        },
        damage: "1d8 Piercing"
    },
    "battle axe": {
        skill: "One-Handed Melee",
        properties: {
            Versatile: "1d10"
        },
        damage: "1d8 Slashing"
    },
    "throwing axe": {
        skill: "One-Handed Melee",
        properties: {
            thrown: {
                close: "6m",
                long: "18m"
            }
        },
        damage: "1d6 Slashing"
    },
    "hatchet": {
        skill: "One-Handed Melee",
        properties: {
            light: true
        },
        damage: "1d6 Slashing"
    },
    "staff": {
        skill: "One-Handed Melee",
        properties: {
            Versatile: "1d8"
        },
        damage: "1d6 Blunt"
    },
    "greatsword": {
        skill: "Two-Handed Melee",
        properties: {
            twoHanded: true
        },
        damage: "2d6 Slashing"
    },
    "maul": {
        skill: "Two-Handed Melee",
        properties: {
            twoHanded: true
        },
        damage: "1d12 Blunt"
    },
    "pike": {
        skill: "Two-Handed Melee",
        properties: {
            twoHanded: true
        },
        damage: "1d8 Piercing"
    },
    "halberd": {
        skill: "Two-Handed Melee",
        properties: {
            twoHanded: true
        },
        damage: "1d8 Slashing"
    },
    "glaive": {
        skill: "Two-Handed Melee",
        properties: {
            twoHanded: true
        },
        damage: "1d10 Piercing"
    },
    "whip": {
        skill: "Two-Handed Melee",
        properties: {
            twoHanded: true
        },
        damage: "1d6 Slashing"
    }
};

const SPELLS = {
    "fire bolt": {
        action: "Major Action",
        components: "Motus, Vox",
        natura: "3 Fire",
        range: "20m",
        attackType: "Ranged",
        damage: "[P]d6 Fire",
        description: "You hurl a flame at a target within range. Make a ranged spell attack against the target. If it hits, you deal [P]d6 fire damage to them and they gain 1 stack of burning."
    },
    "fireball": {
        action: "Major Action",
        components: "Motus, Vox",
        natura: "5 Fire",
        range: "20m",
        area: "10m Sphere",
        saveType: "Evasion",
        saveDTType: "srd",
        damage: "[P]d6 Fire",
        description: "You hurl a ball of fire that explodes. All creatures and objects in the target area must make an Evasion test. A target takes [P]d6 fire damage and gains 1 stack of burning on a failed test. On a successful test it takes half damage and no stack of burning."
    },
    "water bolt": {
        action: "Major Action",
        components: "Motus, Vox",
        natura: "3 Water",
        range: "20m",
        attackType: "Ranged",
        damage: "[P]d6 Blunt",
        description: "You hurl a mote of water at a target within range. Make a ranged spell attack against the target. If it hits, you deal [P]d6 blunt damage to them and they become wet."
    },
    "waterball": {
        action: "Major Action",
        components: "Motus, Vox",
        natura: "5 Water",
        range: "20m",
        area: "10m Sphere",
        saveType: "Evasion",
        saveDTType: "srd",
        damage: "[P]d6 Blunt",
        description: "You hurl a ball of water that explodes. All creatures and objects in the target area must make an Evasion test. A target takes [P]d6 blunt damage and becomes wet on a failed test. On a successful test it takes half damage and doesn’t become wet."
    },
    "tremor": {
        action: "Major Action",
        components: "Motus, Vox",
        natura: "3 Earth",
        range: "20m",
        saveType: "Evasion",
        saveDTType: "srd",
        damage: "[P]d6 Blunt",
        description: "The ground beneath a target within range shakes. The target must make an Evasion test. It takes [P]d6 blunt damage on a fail and falls prone. On a successful test it takes half damage and doesn’t fall prone."
    },
    "earthquake": {
        action: "Major Action",
        components: "Motus, Vox",
        natura: "5 Earth",
        range: "20m",
        area: "10m Circle",
        saveType: "Evasion",
        saveDTType: "srd",
        damage: "[P]d6 Blunt",
        description: "The ground in the target area within range shakes. All creatures must make an Evasion test. A target takes [P]d6 blunt damage on a fail and falls prone. On a successful test it takes half damage and doesn’t fall prone."
    },
    "air bolt": {
        action: "Major Action",
        components: "Motus, Vox",
        natura: "3 Air",
        range: "20m",
        attackType: "Ranged",
        damage: "[P]d6 Slashing",
        description: "You send a mote of condensed air at a target within range. Make a ranged spell attack against the target. If it hits, you deal [P]d6 slashing damage to them and push them 2m away from you."
    },
    "air bomb": {
        action: "Major Action",
        components: "Motus, Vox",
        natura: "5 Air",
        range: "20m",
        area: "10m Sphere",
        saveType: "Evasion",
        saveDTType: "srd",
        damage: "[P]d6 Blunt",
        description: "You hurl a mote of condensed air that explodes. All creatures and objects in the target area must make an Evasion test. A target takes [P]d6 blunt damage and is pushed 2m away from the center of the explosion. On a successful test it takes half damage and is not pushed away."
    },
    "icicle": {
        action: "Major Action",
        components: "Motus, Vox",
        natura: "2 Water, 2 Air",
        range: "20m",
        attackType: "Ranged",
        damage: "[P]d6+[P] Cold",
        description: "You hurl a pointy icicle at a target within range. Make a ranged spell attack against the target. If it hits, you deal [P]d6 + [P] cold damage to them and they gain 1 stack of bleeding."
    },
    "lava mote": {
        action: "Major Action",
        components: "Motus, Vox",
        natura: "2 Fire, 2 Earth",
        range: "20m",
        attackType: "Ranged",
        damage: "[P]d6 Blunt + [P] Fire",
        description: "You hurl a mote of molten rock at a target within range. Make a ranged spell attack against the target. If it hits, you deal [P]d6 blunt + [P] fire damage to them and they gain 1 stack of burning."
    },
    "spark": {
        action: "Major Action",
        components: "Motus, Vox",
        natura: "2 Fire, 2 Air",
        range: "20m",
        attackType: "Ranged",
        damage: "[P]d6+[P] Electrical",
        description: "You send an electrical spark to a target within range. Make a ranged spell attack against the target. If it hits, you deal [P]d6 + [P] electrical damage to them and they become nauseous until the end of their next turn."
    },
    "steam cloud": {
        action: "Major Action",
        components: "Motus, Vox",
        natura: "3 Fire, 3 Water",
        range: "20m",
        area: "10m Sphere",
        saveType: "Body",
        saveDTType: "srd",
        damage: "[P]d6+[P] Fire",
        description: "You create a cloud of hot water vapour in the target area that disperses quickly. All creatures in the area must make a Body test. They take [P]d6 + [P] fire damage and become wet on a failed test. On a successful test, they take half damage and don’t become wet."
    },
    "acid splash": {
        action: "Major Action",
        components: "Motus, Vox",
        natura: "3 Water, 3 Earth",
        range: "20m",
        area: "10m Circle",
        attackType: "Ranged",
        damage: "[P]d8+[P] Acid",
        description: "You hurl a mote of acid at a target within range. Make a ranged spell attack against the target. If it hits, you deal [P]d8 + [P] acid damage to them."
    },
    "acid rain": {
        action: "Major Action",
        components: "Motus, Vox",
        natura: "5 Water, 5 Earth",
        range: "20m",
        area: "10m/20m Cylinder",
        saveType: "Evasion",
        saveDTType: "srd",
        damage: "[P]d8+[P] Acid",
        description: "You make it rain acid in the target area. All creatures in the area must make an Evasion test. They take [P]d8 + [P] acid damage on a failed test. On a successful test, they take half damage."
    },
    "dust cloud": {
        action: "Major Action",
        components: "Motus, Vox",
        natura: "2 Earth, 2 Air",
        range: "20m",
        area: "10m Sphere",
        duration: "[P] minutes",
        description: "You create a cloud of dust in the target area that remains for the duration. The area in the cloud is heavily obscured. A strong wind can disperse the cloud, ending the spell."
    },
    "break warding": {
        action: "Major Action",
        components: "Vox",
        natura: "1 Air, 5 Fire, 1 Earth",
        range: "Touch",
        description: "You break a warding with a Power less or equal to [P], ending its effect on the target creature, object or place (a vehicle, room, or building). You can use this spell to attempt to break a warding with a higher power, but you need to succeed on a Spellwork [WIL] test against 10 + the warding’s power."
    },
    "levitate": {
        action: "Major Action",
        components: "Motus, Vox",
        natura: "4 Air",
        range: "20m",
        duration: "[P] minutes (C)",
        saveType: "Willpower",
        saveDTType: "srd",
        description: "You attempt to lift a target creature or object no heavier than [P] x 50 kg within range up to 10m up into the air for the duration. If the target is an unwilling creature, it can make a Willpower test to resist the spell on a success. While affected, the target has its speed reduced to 0 and can’t benefit from effects that increase its speed. The target can use a Major Action on its turn to repeat the Willpower test, ending the spell on a success.\nOn each of your turns while this spell is active, you can use a Minor Action to move the target up to 10m in any direction, but not through solid objects."
    },
    "unlock": {
        action: "Major Action",
        components: "Motus",
        natura: "3 Air, 1 Earth",
        range: "10m",
        description: "You unlock a target lock within range with a lock raring of [P] or lower. If the lock rating of the target is higher, you need to succeed on a Spellwork [WIL] test against 10 + the target lock’s rating, otherwise the spell fails.\nAlternatively, you can unlock a magical lock, in which case you apply the same rules except instead of the lock rating, you use the Power of the magic that keeps the lock locked."
    },
    "deflect": {
        action: "Minor Reaction",
        components: "Motus",
        natura: "1 Air, 1 Earth",
        range: "Self",
        description: "When you’re attacked by a creature you can see, you can use this spell to attempt to deflect the attack. You gain a +5 + [P] bonus to your Evasion test against the triggering attack. You can declare using this spell after rolling your Evasion test but before you know whether you would be hit or not."
    },
    "reflect": {
        action: "Major Reaction",
        components: "Motus, Vox",
        natura: "1 Air, 2 Earth, 1 Water",
        range: "Self",
        attackType: "Ranged",
        description: "When you’re attacked by a creature you can see, you can use this spell to attempt to deflect the attack and possibly make it reflect back to the attacker. You gain a +5 + [P] bonus to your Evasion test against the triggering attack. You can declare using this spell after rolling your Evasion test but before you know whether you would be hit or not. If the attack misses you, make a melee spell attack (if the triggering attack was a melee attack) or a ranged spell attack (if the triggering attack was a ranged attack) against the attacker. On a hit, the attacker takes the damage of his own attack."
    },
    "control fire": {
        action: "Minor Action",
        components: "Motus",
        natura: "1 Fire",
        range: "[P] x 10m",
        description: "You control the element of fire in a small manner around you. Choose one of the following effects:\n- You instantly light or snuff out all flammable objects (candles, oil-lamps, braziers, bonfires, and the like) in a [P]m cube within range.\n- You change the colour of all fires in a [P]m cube within range to any colour you like.\n- You warm up an object that you can see that is no larger than [P]m in any dimension for up to 10 minutes, after which it may cool down again. You can’t make it hot enough to hurt someone this way.\n- You remove [P] stacks of burning from a creature within range that you can see."
    },
    "control water": {
        action: "Minor Action",
        components: "Motus",
        natura: "1 Water",
        range: "[P] x 10m",
        description: "You control the element of water in a small manner around you. Choose one of the following effects:\n- You instantly freeze or unfreeze up to [P] liters of water within range that you can see.\n- You force any droplets of rain that would fall on a target creature or object no larger than [P]m in any dimension within range that you can see to avoid the target just before they would hit it and fall to the ground next to it instead.\n- You instantly dry or wet a surface, object, or creature no larger than [P]m in any dimension that you can see within range."
    },
    "blink": {
        action: "Minor Action",
        components: "Motus",
        natura: "3 Air",
        range: "[P] x 5m",
        description: "You along with everything you’re wearing or carrying instantly disappear and reappear in an unoccupied space within range. If you try to blink into a space that is occupied, the spell fails and the Natura is lost."
    },
    "group blink": {
        action: "Minor Action",
        components: "Motus",
        natura: "5 Air",
        range: "[P] x 5m",
        description: "You and up to [P] creatures you’re touching along with everything you and them are wearing or carrying instantly disappear and reappear in an unoccupied space within range. If you try to blink into a space that is occupied, the spell fails and the Natura is lost. If there is enough space at the target location for at least yourself, the spell still takes effect but any target creature that doesn't fit the target space with you is left behind."
    },
    "teleport": {
        action: "Major Action",
        components: "Motus, Vox",
        natura: "6 Air",
        range: "[P] x 10km",
        description: "Pick a target location within range that you have either been to before, can see, or that you have an associated object of. An associated object can be anything that has either spent at least a year at the target location or has been there in the last 24 hours.\nYou along with everything you’re wearing or carrying instantly disappear and reappear in an unoccupied space close to the target. If there is no unoccupied space close to the target, the spell fails and the Natura is lost."
    },
    "group teleport": {
        action: "Major Action",
        components: "Motus, Vox",
        natura: "10 Air",
        range: "[P] x 10km",
        description: "Pick a target location within range that you have either been to before, can see, or that you have an associated object of. An associated object can be anything that has either spent at least a year at the target location or has been there in the last 24 hours.\nYou and up to [P] creatures you’re touching along with everything you and them are wearing or carrying instantly disappear and reappear in an unoccupied space close to the target. If there is no unoccupied space close to the target, the spell fails and the Natura is lost. If there is enough space at the target location for at least yourself, the spell still takes effect but any target creature that doesn't fit the target space with you is left behind."
    },
    "glow": {
        action: "Major Action",
        components: "Motus, Vox",
        natura: "2 Fire",
        description: "An object you touch starts glowing, giving off bright light in a 10m radius and dim light in a 10 m radius beyond that for up to [P] hours or until you end the spell at any point requiring no action. Casting this spell on an object that is already affected by this spell, resets the duration to the new Glow spell’s duration and increases the light radius additively."
    },
    "hex": {
        action: "Minor Reaction",
        components: "Vox",
        natura: "1 Air, 2 Water",
        range: "[P] x 10m",
        description: "When a creature you can see or hear within range makes a test that you’re aware of, you can cast this spell to impose disadvantage on the creature’s roll."
    },
    "stupor": {
        action: "Major Action",
        components: "Motus, Vox",
        natura: "3 Earth, 3 Water",
        duration: "1 minute (C)",
        description: "You speak a powerful command at a target creature you can see within range. The target must make a Willpower test against 10 + [P]. On a failure, the target becomes paralyzed for the duration."
    },
    "mindlink": {
        action: "Major Action",
        components: "Motus",
        natura: "5 Air",
        range: "[P]km",
        duration: "5 minutes (C)",
        description: "You create a temporary mental connection between yourself and a creature within range that you have met before. If the creature is willing, the connection is established, allowing you to talk to them telepathically for the duration."
    },
    "silence": {
        action: "Major Action",
        components: "Vox",
        natura: "5 Air",
        duration: "[P] minutes (C)",
        description: "A target creature within range becomes unable to speak, sing, or otherwise make sounds with their mouth."
    },
    "restrain": {
        action: "Major Action",
        components: "Motus, Vox",
        natura: "3 Earth",
        range: "10m",
        duration: "1 minute (C)",
        description: "A target creature within range must succeed on a DT 10 + [P] Athletics [BOD] or Evasion test or become restrained by magical chains, vines, or similar, that appear and wrap around it. At the end of each of the target’s turns, it can attempt a DT 10 + [P] Athletics [BOD] test to break free, ending the spell on a success."
    },
    "chain pull": {
        action: "Minor Action",
        components: "Motus",
        natura: "1 Air, 1 Earth",
        range: "[P] x 10m",
        attackType: "Ranged",
        description: "Make a ranged spell attack against a target creature within range. On a hit, the target gets pulled up to [P] x 4m towards you by a magical chain, vine, or similar."
    },
    "air bubble": {
        action: "Major Action",
        components: "Motus",
        natura: "3 Air",
        range: "Touch",
        duration: "[P] hours",
        description: "The target creature’s head is surrounded by a bubble of breathable air for the duration. Gases, smoke, dust, and liquids are kept out of the bubble and the air inside the bubble is always fresh and breathable, no matter the surrounding environment."
    },
    "command": {
        action: "Major Action",
        components: "Vox",
        natura: "5 Air, 1 Fire, 1 Water",
        duration: "[P] minutes",
        saveType: "Willpower",
        saveDTType: "srd",
        description: "You utter a simple command to a target creature that can hear and understand you. The target must succeed on a Willpower test or become charmed by you. While charmed in this way, the target must obey and fulfill the command you uttered when casting the spell to the best of its ability. If the command would result in the target getting hurt, it has advantage on the Willpower test. At the end of each of the target’s turns, it can repeat the Willpower test and end the spell on a success."
    },
    "enthrall": {
        action: "Major Action",
        components: "Vox",
        natura: "10 Air, 3 Fire, 2 Water",
        duration: "[P] hours",
        saveType: "Willpower",
        saveDTType: "srd",
        description: "You utter a command to a target creature that can hear and understand you. The target must succeed on a Willpower test or become charmed by you. While charmed in this way, the target must obey and fulfill the command you uttered when casting the spell to the best of its ability. If the command would result in the target getting hurt, it has advantage on the Willpower test."
    },
    "clean": {
        action: "Minor Action",
        components: "Motus",
        natura: "1 Air",
        range: "10m",
        description: "You magically clean up to [P] creatures of your choice that you can see within range. Their skin, hair, clothes, and equipment are dried and cleaned of any dirt or grime. Alternatively, you can target an area up to [P]m in any dimension and affect all surfaces and objects not worn or carried by creatures inside it in the same way."
    },
    "ignite": {
        action: "Major Action",
        components: "Motus, Vox",
        natura: "3 Fire",
        range: "20m",
        description: "The target object or creature ignites and gains [P] stacks of the burning condition."
    }
};

const RITUALS = {
    "scrying": {
        essence: "5 Air, 5 Water, 5 Earth",
        description: "As part of this ritual you infuse a reflective surface like a puddle of water, a mirror, or a shiny piece of metal that must not move while the ritual is being performed.\nChoose a target creature, object, or place. Make a Spellwork [WIL] test with a difficulty of 10 that is modified based on how familiar you are with the target and what sort of physical connection you have to it. If the target is a creature, the base difficulty is equal to that creature’s Willpower test instead of 10. If you succeed on your test, the ritual takes effect, otherwise it fails.\nFor the next [P] × 10 minutes the target and its surroundings are visible and audible through the infused surface as if it was following it around. If the target is a creature, it feels observed."
    },
    "nightvision": {
        essence: "3 Fire, 3 Air",
        description: "As part of this ritual you infuse up to [P] willing creatures that must not move while the ritual is being performed.\nThe target creatures gain Nightvision for the next 12 hours."
    },
    "water breathing": {
        essence: "3 Air, 3 Water",
        description: "As part of this ritual you infuse up to [P] willing creatures that must not move while the ritual is being performed.\nThe target creatures gain the ability to breathe underwater for the next 12 hours."
    },
    "warming": {
        essence: "3 Fire",
        description: "As part of this ritual you infuse a willing creature that must not move while the ritual is being performed.\nThe target creature is unaffected by extreme cold temperatures for the next [P] days. No damage resistance is gained in this way."
    },
    "cooling": {
        essence: "2 Air, 1 Water",
        description: "As part of this ritual you infuse a willing creature that must not move while the ritual is being performed.\nThe target creature is unaffected by extreme heat for the next [P] days. No damage resistance is gained in this way."
    },
    "beauty": {
        essence: "2 Fire, 2 Air, 2 Earth, 2 Water",
        description: "As part of this ritual you infuse a willing humanoid creature that must not move while the ritual is being performed.\nThe target becomes a more beautiful version of itself and gains a +[P] bonus to Social tests for the next 24 hours, after which it is returned to its former appearance."
    },
    "disguise": {
        essence: "4 Air, 4 Earth",
        description: "As part of this ritual you infuse a willing human that must not move while the ritual is being performed.\nThe target turns into a different person with an appearance and voice of your choice. It can be any person you have seen before or a new person with an entirely made up appearance and voice, as long as the desired outcome is no more than 50 cm taller or smaller than the target. The target remains in this form for [P] hours, after which it reverts back."
    },
    "locate": {
        essence: "3 Air, 3 Water, 3 Earth",
        description: "As part of this ritual you infuse a map, compass, divining rod or something similar that must not move while the ritual is being performed.\nChoose a target creature, object, or place. Make a Spellwork [WIL] test with a difficulty of 10 that is modified based on how familiar you are with the target and what sort of physical connection you have to it. If the target is a creature, the base difficulty is equal to that creature’s Willpower test instead of 10. If you succeed on your test, the ritual takes effect, otherwise it fails.\nFor the next [P] × 10 minutes the infused object shows the location of the target. For example, a dot on an infused map, or the compass pointing towards the target instead of north."
    },
    "astral projection": {
        essence: "10 Air, 5 Water",
        description: "You project your consciousness to a place of your choice within [P] km that you can see or describe (for example 200m north, or behind the door). You appear at the target location as an incorporeal spectral ghost that looks like yourself. While in this form, you can float in all directions at a speed of 20m and can move through objects and creatures. You can not interact with the world around you in any physical way but you can talk as normal. While in this form, your physical body remains in a deep meditative unconscious state and you are unable to perceive what it perceives until you end the ritual at any point as a Minor Action. If your physical body takes any damage, the ritual ends immediately."
    },
    "dreamwalk": {
        essence: "8 Air, 3 Water",
        description: "You project your consciousness and that of up to [P] other creatures into the dream of a target sleeping creature within [P] km. If the target creature is not unconscious, the ritual fails. You and the other dreamwalkers can choose to appear as silent, invisible observers or as participants within the dream and at any point while the ritual is ongoing, you and the other dreamwalkers can switch into different participants or back to silent observers. As participants, you can interact with the dream and the dreamer. As silent observers you can not interact with the dream or the dreamer, but observe everything.\nWhen a dreamwalker takes the form of a participant, they make a Deception vs Intuition contest against the dreamer. If the dreamer wins, they notice that something is off and may choose to expel that participant from their dream, ending the ritual for the affected dreamwalker."
    },
    "identify": {
        essence: "5 Air, 10 Water",
        description: "As part of the ritual you examine an object that must not move while the ritual is being performed.\nYou learn what the object is called, what it is used for, who created it (if it was crafted in any way), where it is from (if it was not crafted but harvested from somewhere like a piece of rock, a plant or a part of a creature), what it is worth in its current state, how much Essence can be extracted from it, and what Infusions or Rituals (if any) are affecting it."
    },
    "divination warding": {
        essence: "6 Air, 6 Water",
        description: "As part of the ritual you infuse an object, creature or place (a vehicle, room, or building) no larger than [P]m in any direction that must not move while the ritual is being performed.\nFor the next [P] hours, the target is warded against scrying and magical location, causing any such rituals or other magical effects to fail on them.\nIf this ritual is successfully performed on the same object or place for 10 consecutive times without a break for 10 days in a row, the effect becomes permanent on the target.\nIf the target is already affected by this ritual, it keeps the higher powered version."
    },
    "spirit warding": {
        essence: "4 Air, 6 Water, 2 Earth",
        description: "As part of the ritual you infuse a place (a vehicle, room, or building) no larger than [P]m in any direction that must not move while the ritual is being performed.\nFor the next [P] hours, the target is warded against spirits and creatures without a physical form (like ghosts, or astral projections), making it unable for them to enter the area in any way. Any such creature already in the area is expelled to the nearest unoccupied space outside of the target area.\nIf this ritual is successfully performed on the same place for 10 consecutive times without a break for 10 days in a row, the effect becomes permanent.\nIf the target is already affected by this ritual, it keeps the higher powered version."
    },
    "monster warding": {
        essence: "4 Fire, 4 Air, 4 Water, 4 Earth",
        description: "As part of the ritual you infuse a creature or place (a vehicle, room, or building) no larger than [P]m in any direction that must not move while the ritual is being performed.\nIf the target is a place:\nFor the next [P] hours, the target is warded against monsters, making it unable for them to enter the area in any way. Any such creature already in the area is expelled to the nearest unoccupied space outside of the target area.\nIf this ritual is successfully performed on the same place for 10 consecutive times without a break for 10 days in a row, the effect becomes permanent.\nIf the target is a creature:\nFor the next [P] hours, the target is warded against monsters, making it unable for them to possess or charm them. Ongoing possessions or charms by monsters are suspended for the duration of the warding. Also, all monsters have disadvantage on attacks against the target.\nIf the target is already affected by this ritual, it keeps the higher powered version."
    },
    "death warding": {
        essence: "5 Fire, 5 Air, 5 Water, 5 Earth",
        description: "As part of the ritual you infuse a creature that must not move while the ritual is being performed.\nFor the next [P] hours, the target is warded against death. The next time the target creature would die within that time, they are reduced to 1 hit point instead, ending the ritual.\nIf the target is already affected by this ritual, it keeps the higher powered version."
    },
    "[damage type] warding": {
        essence: "3 Fire, 3 Air, 3 Water, 3 Earth",
        description: "As part of the ritual you infuse a creature or object no larger than [P]m in any direction that must not move while the ritual is being performed.\nFor the next [P] hours, the target becomes resistant against one damage type of your choice.\nIf the target is already affected by this ritual with the same damage type selected, it keeps the higher powered version. If the target is affected by another version of this ritual with a different damage type selected, both versions of the ritual remain in effect."
    },
    "open portal": {
        essence: "20 Air",
        description: "As part of the ritual you infuse a surface.\nChoose a target location within [P] x 10km that you have either been to before, can see, or that you have an associated object of. An associated object can be anything that has either spent at least a year at the target location or has been there in the last 24 hours.\nAt the end of the ritual, a portal in the shape of your choice, but no larger than [P]m in any dimension opens on the surface you infused. At the same time a connected portal opens in the target location aligned just like the surface you infused. Both portals can only be walked through on one side and the other side is opaque and solid.\nThe portals remain open until [P] minutes have passed, upon which they collapse instantly, cutting any objects or creatures within clean through."
    },
    "blade bond": {
        essence: "10 Air, 5 Earth",
        description: "Even though the name suggests otherwise, this ritual works on any target object up to [P] Slots in size and weight. This ritual binds the target to you magically.\nAs a Minor Action, you can summon an object bound to you by this ritual, making it appear in your empty hand(s), on your body (if it’s a piece of clothing or armor) or in an empty space directly in front of you.\nThe ritual is most commonly used on daggers and swords, which is where the name comes from, but can be and is used on all kinds of objects.\nAn object can only be bound to one creature by this ritual. Performing this ritual again on an object already bound by it to a creature will remove the previous bond."
    },
    "bought time": {
        essence: "20 Air, 20 Earth, 20 Fire, 20 Water",
        description: "At the end of this ritual, make a Spellwork [WIL] or Spellwork [BOD] test against 20 + [P].\nOn a success, the ritual succeeds and your life expectancy increases by [P] years. You can choose to also reduce your apparent age, meaning your physical appearance, by up to that same amount.\nOn a failure, the ritual’s effect is reversed and you immediately grow [P] years older."
    }
};

const NEGATIVE_QUALITY_DESCRIPTIONS = {
    "addict": "You can select this quality more than once, but have to select a different drug each time.\nAt Level 1, you have a -1 penalty to all Body tests. This penalty increases by -1 for each Level after 1.\nAt Level 2, you have disadvantage on Body tests if you haven’t had a dose of the chosen drug in the last 24 hours.\nAt Level 3, you have disadvantage on Body tests if you haven’t had a dose of the chosen drug in the last 2 hours.",
    "callous": "You gain a -2 penalty on Intuition tests made to judge the intentions or emotional state of another creature, for example when trying to tell if they’re telling the truth.\nThis quality is incompatible with Empathetic.",
    "clumsy": "You have a -2 penalty to Agility tests.\nThis quality is incompatible with Agile.",
    "disgraced": "You have disadvantage on Prayer and Mythology tests related to your own religion.",
    "dull": "You have a -2 penalty to Logic tests.\nThis quality is incompatible with Analytical Mind.",
    "essence vulnerability": "You have disadvantage on Willpower tests made to resist spells, rituals, or curses.",
    "farsighted": "At Level 1, you have a -1 penalty to all Perception tests relying on sight. This penalty increases by -1 for each Level after 1.\nAt Level 2, you apply the same penalty to attack tests against targets within 6m of you.\nAt Level 3, you have disadvantage on Perception tests relying on sight.\nWearing prescription lenses can offset the level of this quality, or suppress it altogether.\nThis quality is incompatible with Nearsighted.",
    "fragile": "Your maximum hit points decrease by your character level for each level of Fragile.\nThis quality is incompatible with Tough.",
    "hard of hearing": "At Level 1, you have a -1 penalty to all Perception tests relying on hearing. This penalty increases by -1 for each Level after 1.\nAt Level 2, you apply the same penalty to Initiative and Evasion tests.\nAt Level 3, you have disadvantage on Perception tests relying on hearing.\nUsing hearing aids can offset the level of this quality, or suppress it altogether.",
    "nearsighted": "At Level 1, you have a -1 penalty to all Perception tests relying on sight. This penalty increases by -1 for each Level after 1.\nAt Level 2, you apply the same penalty to attack tests against targets that are 6m or more away from you.\nAt Level 3, you have disadvantage on Perception tests relying on sight.\nWearing prescription lenses can offset the level of this quality, or suppress it altogether.\nThis quality is incompatible with Farsighted.",
    "slow": "Your movement speed decreases by 2m for each level of Slow.\nThis quality is incompatible with Fast.",
    "weak": "You have a -2 penalty to Athletics tests and your carry capacity is halved.\nThis quality is incompatible with Strong.",
    "phobia": "You are irrationally afraid of something which will be referred to as the target of your phobia. You can have multiple instances of this quality, choosing a different target for each instance.\nWhile you’re exposed to the target of your phobia, you have disadvantage on all tests. Being exposed means you’re perceiving the target in whatever way.\nThe level of this quality is tied to how common the target of your phobia is. Keep in mind that different environments might make it more or less likely to encounter certain things and that should be factored in here. Talk to your GM to determine the level of your phobia.\nLevel 1 means your target is quite rare or specific and it’s rather unlikely to encounter it. For example, you might be afraid of unicorns or ghosts.\nLevel 2 means you are likely to encounter your target, though not on a regular basis. For example, you might be afraid of power cores or wolves.\nLevel 3 means you are very likely to encounter your target on a regular basis if you don’t actively avoid it. For example, you might be afraid of spiders or firearms.",
    "socially inept": "You have a -2 penalty to Charisma tests.\nThis quality is incompatible with Silver Tongue."
};

const POSITIVE_QUALITY_DESCRIPTIONS = {
    "agile": "You gain a +2 bonus on all Agility tests.\nThis quality is incompatible with Clumsy.",
    "ambidextrous": "While dual-wielding, you can benefit from Extra Attacks of your off-hand weapon. If both weapons would give you Extra Attacks, only the one that gives you more attacks applies.\nYou lose these benefits if you lose a hand or arm until it is restored or replaced.",
    "analytical mind": "You gain a +2 bonus on all Logic tests.\nThis quality is incompatible with Dull.",
    "educated": "At Level 1, you gain a +1 bonus on all Knowledge skill tests. This bonus increases by +1 for each Level of Educated after 1.\nAt Level 2, whenever you fail a knowledge skill test made to recall information, you at least know where to find the information you’re missing, provided you have at least 1 Rank in the skill.\nAt Level 3, you have advantage on knowledge skill tests made to recall information if you have at least 1 Rank in the skill.",
    "eidetic memory": "At Level 1, you can accurately recall anything you have experienced within the last 24 hours.\nAt Level 2, you can accurately recall anything you have experienced within the last month.\nAt Level 3, you can accurately recall anything you have experienced within the last year.",
    "elemental attunement (water)": "You can choose this quality only once and have to select one of the 4 elements: Water, Earth, Fire, Air.\nWhen you expend essence of the chosen element, you need one less essence of that element and the complexity of any formula using this essence is also one less for you.",
    "elemental attunement (earth)": "You can choose this quality only once and have to select one of the 4 elements: Water, Earth, Fire, Air.\nWhen you expend essence of the chosen element, you need one less essence of that element and the complexity of any formula using this essence is also one less for you.",
    "elemental attunement (fire)": "You can choose this quality only once and have to select one of the 4 elements: Water, Earth, Fire, Air.\nWhen you expend essence of the chosen element, you need one less essence of that element and the complexity of any formula using this essence is also one less for you.",
    "elemental attunement (air)": "You can choose this quality only once and have to select one of the 4 elements: Water, Earth, Fire, Air.\nWhen you expend essence of the chosen element, you need one less essence of that element and the complexity of any formula using this essence is also one less for you.",
    "empathetic": "You gain a +2 bonus on all Intuition tests made to judge the intentions or emotional state of another creature, for example when trying to tell if they’re telling the truth.\nThis quality is incompatible with Callous.",
    "essence sensitivity": "At Level 1, you can spend 10 minutes examining an unprocessed object (like a plant, a piece of rock or crystal, or an animal part) to find out what Essence could be extracted from it, if any.\nAt Level 2, you have Advantage on Evasion and Willpower tests against spells, curses and magical effects.\nAt Level 3, you have advantage on Spellwork, Runecraft, and Alchemy tests made to experiment for formulae and recipes.",
    "fast": "Your movement speed increases by 2m for each level of Fast.\nThis quality is incompatible with Slow.",
    "pious": "You have advantage on Prayer tests other than attacks and Mythology tests related to your own religion.",
    "quick reflexes": "You gain a +2 bonus on all Evasion tests.",
    "sniper": "Your ranged weapon attacks ignore half and three-quarters cover.\nIn addition, when you aim at specific body parts with ranged weapons, you ignore the target’s Shield Armor bonus on a hit.",
    "sharpshooter": "Attacking at long range doesn’t impose disadvantage on your attack.",
    "tough": "Your maximum hit points increase by your character level for each level of Tough.\nAt Tough Level 3, when you take a Breather, you gain the benefits of a Short Rest.\nThis quality is incompatible with Fragile.",
    "weapon expert": "You can take this quality multiple times, but every time you have to choose a different type of weapon.\nYou gain a +2 bonus to the attack and damage when attacking with the chosen weapon type.",
    "sneaky": "You gain a +2 bonus to Stealth tests and can attempt to hide even when only lightly obscured.",
    "inspiring presence": "You and friendly creatures within 10m gain a +2 bonus to Willpower tests.",
    "strong": "You gain a +2 bonus to Athletics tests and your carry capacity doubles.\nThis quality is incompatible with Weak.",
    "silver tongue": "You gain a +2 bonus on all Charisma tests.\nThis quality is incompatible with Socially Inept."
};

const BLESSINGS = {
    "blessing of regeneration": {
        action: "Major Action",
        components: "Motus, Vox",
        faith: 5,
        range: "10m",
        duration: "1 minute",
        description: "The target creature restores [P] hit points at the start of each of its turns for the duration."
    },
    "blessing of protection": {
        action: "Major Action",
        components: "Motus, Vox",
        faith: 3,
        range: "20m",
        duration: "10 minutes",
        description: "The target creature or object gains a +[P] bonus to all of its Armor Values for the duration."
    },
    "blessing of haste": {
        action: "Major Action",
        components: "Motus, Vox",
        faith: 10,
        range: "10m",
        duration: "1 minute",
        description: "The target creature’s movement speed increases by +[P] × 2 m and it gains an additional Minor Action for the duration."
    },
    "blessing of attention": {
        action: "Major Action",
        components: "Vox",
        faith: 3,
        range: "20m",
        duration: "1 minute",
        description: "The target creature gains a +[P] bonus to all Evasion tests for the duration."
    },
    "blessing of burden": {
        action: "Major Action",
        components: "Vox",
        faith: 2,
        range: "Touch",
        duration: "[P] hours",
        description: "The target creature’s carry capacity is doubled for the duration."
    },
    "blessing of warding off evil": {
        action: "Major Action",
        components: "Motus, Vox",
        faith: 20,
        range: "Touch",
        area: "10m Dome",
        duration: "[P] hours",
        description: "You create a warded space around a target point on a surface you touch. For the duration, no unholy creature can enter the area or target another creature inside the area with an attack, spell, or other magical effect. Areas of Effect created from an unholy creature can not extend inside of the blessed area."
    },
    "blessing of sanctity": {
        action: "Major Action",
        components: "Motus, Vox",
        faith: 15,
        range: "Touch",
        duration: "[P] minutes",
        description: "For the duration, the target creature’s unholy trait is suppressed."
    },
    "blessing of purification": {
        action: "Minor Action",
        components: "Motus",
        faith: 4,
        range: "10m",
        description: "If the target is a creature, you remove [P] stacks of the poisoned condition from it.\nIf the target is a food or drink, you make it safe to consume, neutralising any poisons in it and removing any harmful impurities."
    },
    "blessing of health": {
        action: "Major Action",
        components: "Motus, Vox",
        faith: 7,
        range: "Touch",
        description: "You cure the target of a disease."
    },
    "blessing of wound closure": {
        action: "Minor Action",
        components: "Vox",
        faith: 5,
        range: "Touch",
        description: "The target creature loses [P] stacks of bleeding."
    },
    "blessing of guidance": {
        action: "Major Action",
        components: "Motus, Vox",
        faith: 10,
        range: "10m",
        duration: "1 minute",
        description: "For the duration, the target creature gains a +[P] bonus to all tests made with one attribute that you choose when bestowing this blessing."
    },
    "blessing of smiting": {
        action: "Minor Action",
        components: "Motus",
        faith: 3,
        range: "Touch",
        description: "The target of this blessing can be either a weapon, or up to 20 pieces of ammunition. The next time the target deals damage to an unholy creature, it deals an extra +[P] fire damage to it that ignores resistances, vulnerabilities and armor."
    },
    "blessing of comprehension": {
        action: "Major Action",
        components: "Vox",
        faith: 6,
        range: "20m",
        duration: "1 hour",
        description: "Up to [P] target creatures within range understand all spoken and written languages for the duration. The blessing fails for targets that don’t understand any languages before the blessing is bestowed."
    },
    "blessing of comfort": {
        action: "Major Action",
        components: "Motus, Vox",
        faith: 5,
        range: "10m",
        duration: "[P] hours",
        description: "For the duration, the target creature is unaffected by extreme temperatures, like the heat of a desert or the cold of a glacier."
    }
};

const RUNES = {
    "calidum": {
        target: "Object or Creature",
        natura: "1 Fire",
        description: "Target gets warmed up to nice and cozy temperatures in cold environments. A creature affected by the Calidum rune or wearing a piece of clothing with the Calidum rune suffers no ill effects from non-magical cold weather and gains a +[P] bonus on tests made to resist the frozen condition."
    },
    "frigus": {
        target: "Object or Creature",
        natura: "1 Water",
        description: "Target gets chilled down to nice and cozy temperatures in hot environments. A creature affected by the Frigus rune or wearing a piece of clothing with the Frigus rune suffers no ill effects from non-magical hot weather and gains a +[P] bonus on tests made to resist the burning condition."
    },
    "reparo": {
        target: "Object",
        natura: "2 Earth",
        description: "Target object regains [P] health points every hour, as any damage done to it is slowly mended. This does not restore any magical properties."
    },
    "sano": {
        target: "Creature",
        natura: "2 Earth",
        description: "Target creature regains [P] health points at the end of every rest."
    },
    "conservo": {
        target: "Object (Container)",
        natura: "1 Earth, 1 Water",
        description: "Perishable objects, like food for example, that are stored inside the target container stay fresh for an additional [P] days."
    },
    "respiratio": {
        target: "Creature",
        natura: "2 Air",
        description: "Target creature can hold its breath for an additional [P] minutes."
    },
    "purgo": {
        target: "Object (Container)",
        natura: "1 Water, 2 Fire",
        description: "Water and other drinks inside the target container are purified of all non-magical poisons and become safe to drink. Potions and Elixirs with a Potency below [P] are purified as well, turning them into water."
    },
    "levis": {
        target: "Object or Creature",
        natura: "1 Air, 1 Earth",
        description: "Target object or creature has its weight reduced by [P]kg to a minimum of 1kg."
    },
    "gravis": {
        target: "Object or Creature",
        natura: "2 Earth",
        description: "Target object or creature has its weight increased by [P]kg."
    },
    "sera": {
        target: "Object (Container)",
        natura: "2 Earth",
        description: "Target container becomes locked magically. The lock can be unlocked temporarily using a passphrase determined when carving the rune and locked again by the same phrase or a different one also determined when carving the rune. A Sera rune can’t be picked but it can be forced open with brute force as if it was a lock with rating [P]."
    },
    "mundo": {
        target: "Object",
        natura: "2 Water",
        description: "Target object is cleaned and can’t get soiled in any non-magical way."
    },
    "protego": {
        target: "Object (Clothing, Armor, or Shield)",
        natura: "2 Earth",
        description: "Target piece of clothing or armor, or shield gets a +1 bonus to its Armor Value. This bonus can not increase the target’s Armor Value above [P]."
    },
    "silentium": {
        target: "Surface (Door, Window, Wall, Floor, or Ceiling inside a closed room)",
        natura: "3 Air",
        description: "Target room’s walls, doors, windows, floors, and ceilings become soundproof while all doors and windows are closed. Sounds that aren’t particularly loud, like explosions or yelling can neither enter nor escape the room while it is closed. The rune can only affect a room that is no larger than [P]m in any dimension, but can be stacked with other Silentium runes to increase that limit additively."
    },
    "damnum (air)": {
        target: "Up to 10 pieces of Ammunition or 1 Weapon",
        natura: "1 Air",
        description: "Target pieces of ammunition or weapon are enchanted to inflict additional effects based on the Element of Natura used when carving the rune.\nAir: On hit, the target is pushed back 2m."
    },
    "damnum (earth)": {
        target: "Up to 10 pieces of Ammunition or 1 Weapon",
        natura: "1 Earth",
        description: "Target pieces of ammunition or weapon are enchanted to inflict additional effects based on the Element of Natura used when carving the rune.\nEarth: On hit, the target takes +[P] blunt damage."
    },
    "damnum (fire)": {
        target: "Up to 10 pieces of Ammunition or 1 Weapon",
        natura: "1 Fire",
        description: "Target pieces of ammunition or weapon are enchanted to inflict additional effects based on the Element of Natura used when carving the rune.\nFire: On hit, they deal +[P] fire damage."
    },
    "damnum (water)": {
        target: "Up to 10 pieces of Ammunition or 1 Weapon",
        natura: "1 Water",
        description: "Target pieces of ammunition or weapon are enchanted to inflict additional effects based on the Element of Natura used when carving the rune.\nWater: On hit, the target takes +[P] cold damage."
    },
    "clypeus cordis": {
        target: "Object (Armor or Shield)",
        natura: "2 Earth",
        description: "Generates a shimmering protective barrier around the wearer of the target armor or shield. The barrier has a pool of [P] health points. When the target object or its wearer takes damage, the barrier takes damage first with no vulnerabilities or resistances and any leftover damage carries over."
    },
    "radians": {
        target: "Object",
        natura: "1 Fire",
        description: "The rune emits a warm glow, emitting dim light in a [P] x 2m radius."
    },
    "supprimo": {
        target: "Object or Creature",
        natura: "2 Air, 2 Earth, 2 Fire, 2 Water",
        description: "Every curse with a Power of [P] or lower that is affecting the target is suppressed for the target as long as this rune is active. The rune fades after [P] hours, upon which any suppressed curses continue."
    },
    "visio obscura": {
        target: "Creature",
        natura: "1 Air, 1 Fire",
        description: "The target gains Night Vision out to [P] x 2m."
    },
    "vita surripuit": {
        target: "Object (Melee Weapon)",
        natura: "1 Earth, 1 Fire, 3 Water",
        description: "The target melee weapon is enhanced to steal health from enemies. Once per turn, when the weapon hits a creature, the wielder of the weapon heals for the damage dealt after armor, vulnerabilities and resistances (to a maximum of [P] hit points)."
    },
    "auge salus": {
        target: "Creature",
        natura: "2 Earth, 3 Water",
        description: "Target creature’s maximum hit points are increased by +[P]."
    }
};