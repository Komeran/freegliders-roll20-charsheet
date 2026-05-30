import { Signed } from "../../helpers";
import { ENGINEERING_TABS } from "../../tabs-management";
import { UpdateRangedWeapons } from "../combat/update-rangedweapons";
import { UpdateSpellSaveDTs } from "../magic/update-spells";

function UpdateShowEngineering() {
    getAttrs([
        "augmentation",
        "automachinery",
        "clockworkmechanics",
        "gunsmithing",
        "tinkering",
        "vehiclemechanics",
        "engineeringTab"
    ], function(values) {
        const augmentation = parseInt(values.augmentation)||0;
        const automachinery = parseInt(values.automachinery)||0;
        const clockworkmechanics = parseInt(values.clockworkmechanics)||0;
        const gunsmithing = parseInt(values.gunsmithing)||0;
        const tinkering = parseInt(values.tinkering)||0;
        const vehiclemechanics = parseInt(values.vehiclemechanics)||0;
        const engineeringTab = parseInt(values['engineeringTab']) || -1;
        let tab = ENGINEERING_TABS[engineeringTab];

        if(tab === "cwmTab" && clockworkmechanics < 1) {
            if (automachinery >= 1) {
                tab = "automachineryTab";
            }
            else if (augmentation >= 1) {
                tab = "augmentationTab";
            }
            else if (gunsmithing >= 1) {
                tab = "gunsmithingTab";
            }
            else if (tinkering >= 1) {
                tab = "tinkeringTab";
            }
            else if (vehiclemechanics >= 1) {
                tab = "vehiclemechanicsTab";
            }
            else {
                tab = "";
            }
        } else if (tab === "automachineryTab" && automachinery < 1) {
            if (clockworkmechanics >= 1) {
                tab = "cwmTab";
            }
            else if (augmentation >= 1) {
                tab = "augmentationTab";
            }
            else if (gunsmithing >= 1) {
                tab = "gunsmithingTab";
            }
            else if (tinkering >= 1) {
                tab = "tinkeringTab";
            }
            else if (vehiclemechanics >= 1) {
                tab = "vehiclemechanicsTab";
            }
            else {
                tab = "";
            }
        } else if (tab === "augmentationTab" && augmentation < 1) {
            if (clockworkmechanics >= 1) {
                tab = "cwmTab";
            }
            else if (automachinery >= 1) {
                tab = "automachineryTab";
            }
            else if (gunsmithing >= 1) {
                tab = "gunsmithingTab";
            }
            else if (tinkering >= 1) {
                tab = "tinkeringTab";
            }
            else if (vehiclemechanics >= 1) {
                tab = "vehiclemechanicsTab";
            }
            else {
                tab = "";
            }
        } else if (tab === "gunsmithingTab" && gunsmithing < 1) {
            if (clockworkmechanics >= 1) {
                tab = "cwmTab";
            }
            else if (automachinery >= 1) {
                tab = "automachineryTab";
            }
            else if (augmentation >= 1) {
                tab = "augmentationTab";
            }
            else if (tinkering >= 1) {
                tab = "tinkeringTab";
            }
            else if (vehiclemechanics >= 1) {
                tab = "vehiclemechanicsTab";
            }
            else {
                tab = "";
            }
        } else if (tab === "tinkeringTab" && tinkering < 1) {
            if (clockworkmechanics >= 1) {
                tab = "cwmTab";
            }
            else if (automachinery >= 1) {
                tab = "automachineryTab";
            }
            else if (augmentation >= 1) {
                tab = "augmentationTab";
            }
            else if (gunsmithing >= 1) {
                tab = "gunsmithingTab";
            }
            else if (vehiclemechanics >= 1) {
                tab = "vehiclemechanicsTab";
            }
            else {
                tab = "";
            }
        } else if (tab === "vehiclemechanicsTab" && vehiclemechanics < 1) {
            if (clockworkmechanics >= 1) {
                tab = "cwmTab";
            }
            else if (automachinery >= 1) {
                tab = "automachineryTab";
            }
            else if (augmentation >= 1) {
                tab = "augmentationTab";
            }
            else if (gunsmithing >= 1) {
                tab = "gunsmithingTab";
            }
            else if (tinkering >= 1) {
                tab = "tinkeringTab";
            }
            else {
                tab = "";
            }
        } else {
            if (clockworkmechanics >= 1) {
                tab = "cwmTab";
            }
            else if (automachinery >= 1) {
                tab = "automachineryTab";
            }
            else if (augmentation >= 1) {
                tab = "augmentationTab";
            }
            else if (gunsmithing >= 1) {
                tab = "gunsmithingTab";
            }
            else if (tinkering >= 1) {
                tab = "tinkeringTab";
            }
            else if (vehiclemechanics >= 1) {
                tab = "vehiclemechanicsTab";
            }
            else {
                tab = "";
            }
        }

        setAttrs({
            "show_engineering": augmentation >= 1 || automachinery >= 1 || clockworkmechanics >= 1 || gunsmithing >= 1 || tinkering >= 1 || vehiclemechanics >= 1 ? "on" : "off",
            "engineeringTab": ENGINEERING_TABS.indexOf(tab)
        });
    });
}

export function UpdateAugmentation() {
    getAttrs(["augmentation", "log"], function(values) {
        const skill = parseInt(values.augmentation)||0;
        const stat = parseInt(values.log)||0;

        const mod = skill + stat;

        setAttrs({
            "augmentation": skill,
            "augmentationMod": Signed(mod),
            "augmentationPassive": 10 + mod,
            "show_augmentation": skill >= 1 ? "on" : "off",
            "show_disassembleaugmentation": skill >= 1 ? "on" : "off"
        });
        
        UpdateSpellSaveDTs();
        UpdateShowEngineering();
    });
}

export function UpdateAutomachinery() {
    getAttrs(["automachinery", "log"], function(values) {
        const skill = parseInt(values.automachinery)||0;
        const stat = parseInt(values.log)||0;

        const mod = skill + stat;

        setAttrs({
            "automachinery": skill,
            "automachineryMod": Signed(mod),
            "automachineryPassive": 10 + mod,
            "show_automachinery": skill >= 1 ? "on" : "off",
            "show_disassembleautomachinery": skill >= 1 ? "on" : "off"
        });
        
        UpdateSpellSaveDTs();
        UpdateShowEngineering();
    });
}

export function UpdateClockworkMechanics() {
    getAttrs(["clockworkmechanics", "log"], function(values) {
        const skill = parseInt(values.clockworkmechanics)||0;
        const stat = parseInt(values.log)||0;

        const mod = skill + stat;

        setAttrs({
            "clockworkmechanics": skill,
            "clockworkmechanicsMod": Signed(mod),
            "clockworkmechanicsPassive": 10 + mod,
            "show_clockworkmechanics": skill >= 1 ? "on" : "off",
            "show_clockworkgadgets": skill >= 1 ? "on" : "off",
            "show_clockworkmodules": skill >= 7 ? "on" : "off",
            "show_disassembleclockworkmechanics": skill >= 1 ? "on" : "off"
        });
        
        UpdateSpellSaveDTs();
        UpdateShowEngineering();
    });
}

export function UpdateGunsmithing() {
    getAttrs(["gunsmithing", "agi"], function(values) {
        const skill = parseInt(values.gunsmithing)||0;
        const stat = parseInt(values.agi)||0;

        const mod = skill + stat;

        setAttrs({
            "gunsmithing": skill,
            "gunsmithingMod": Signed(mod),
            "gunsmithingPassive": 10 + mod,
            "show_gunsmithing": skill >= 1 ? "on" : "off",
            "show_disassemblegunsmithing": skill >= 1 ? "on" : "off"
        });

        UpdateRangedWeapons(); // For Gun Training
        UpdateSpellSaveDTs();
        UpdateShowEngineering();
    });
}

export function UpdateTinkering() {
    getAttrs(["tinkering", "agi"], function(values) {
        const skill = parseInt(values.tinkering)||0;
        const stat = parseInt(values.agi)||0;

        const mod = skill + stat;

        setAttrs({
            "tinkering": skill,
            "tinkeringMod": Signed(mod),
            "tinkeringPassive": 10 + mod,
            "show_tinkering": skill >= 1 ? "on" : "off",
            "show_scrap": skill >= 1 ? "on" : "off"
        });
        
        UpdateSpellSaveDTs();
        UpdateShowEngineering();
    });
}

export function UpdateVehicleMechanics() {
    getAttrs(["vehiclemechanics", "bod"], function(values) {
        const skill = parseInt(values.vehiclemechanics)||0;
        const stat = parseInt(values.bod)||0;

        const mod = skill + stat;

        setAttrs({
            "vehiclemechanics": skill,
            "vehiclemechanicsMod": Signed(mod),
            "vehiclemechanicsPassive": 10 + mod,
            "show_vehiclemechanics": skill >= 1 ? "on" : "off",
            "show_disassemblevehiclemechanics": skill >= 1 ? "on" : "off"
        });
        
        UpdateSpellSaveDTs();
        UpdateShowEngineering();
    });
}