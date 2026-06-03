import { DamageTypeEmoji, GetCustomTemplateResultString } from "../../helpers";
import { CUSTOM_TEMPLATE_BEGINNING, SKILL_LABELS } from "../../worker-constants";

on("clicked:disassembleclockworkmechanics", () => { Disassemble("clockworkmechanics"); });
on("clicked:disassembleautomachinery", () => { Disassemble("automachinery"); });
on("clicked:disassembleaugmentation", () => { Disassemble("augmentation"); });
on("clicked:scrap", Scrap);
on("clicked:disassemblevehiclemechanics", () => { Disassemble("vehiclemechanics"); });
on("clicked:disassemblegunsmithing", () => { Disassemble("gunsmithing"); });

on("clicked:functionalprosthetic", FunctionalProsthetic);

on("clicked:installprosthetic", () => { Install("Prosthetic"); });
on("clicked:installautolimb", () => { Install("Autolimb"); });

on("clicked:acutedisrepairaction", () => { AcuteDisrepair("Action"); });
on("clicked:acutedisrepairreaction", () => { AcuteDisrepair("Reaction"); });

on("clicked:reverseengineertinkering", () => { ReverseEngineer("tinkering"); });
on("clicked:reverseengineerclockworkmechanics", () => { ReverseEngineer("clockworkmechanics"); });
on("clicked:reverseengineerautomachinery", () => { ReverseEngineer("automachinery"); });
on("clicked:reverseengineeraugmentation", () => { ReverseEngineer("augmentation"); });
on("clicked:reverseengineergunsmithing", () => { ReverseEngineer("gunsmithing"); });
on("clicked:reverseengineervehiclemechanics", () => { ReverseEngineer("vehiclemechanics"); });

/**
 * 
 * @param {string} skill 
 */
function Disassemble(skill) {
    getAttrs([
        'tinkering'
    ], (values) => {
        const tinkeringRanks = parseInt(values['tinkering']) || 0;
        
        const skillLabel = SKILL_LABELS[skill] || "";

        let rollString = CUSTOM_TEMPLATE_BEGINNING;

        rollString += `{{name=Disassembling (${skillLabel})}}`;

        rollString += "{{duration=1 hour}}";

        if(tinkeringRanks < 10) {
            const mod = `+@{${skill}}[${skillLabel}]@{log}[LOG]`;
            rollString += GetCustomTemplateResultString(mod);
        }
        
        const aOrAn = ['a', 'e', 'i', 'o', 'u'].indexOf(skill[0]) > -1 ? 'an' : 'a';

        rollString += `{{description=You can spend an hour disassembling a device crafted with ${skillLabel} using ${skillLabel} tools. Make ${aOrAn} ${skillLabel} [LOG] test against 20. On a success, you gain up to [[@{${skill}}[${skillLabel}]]] parts from the device’s blueprint. If the device’s complexity is equal to or lower than [[@{${skill}}[${skillLabel}]]], you gain all of its parts and you can not gain more parts of any type than were used to assemble it. If you fail, you don’t gain any parts and destroy the device. Regardless of whether you succeed or not, you gain the device’s power core if it had one installed.${tinkeringRanks >= 10 ? '\n\n**Master Tinkerer**\nDisassembling no longer requires you to roll a test. You always succeed.' : ''}}}`;

        startRoll(rollString, (r) => {
            finishRoll(r.rollId);
        });
    });
}

function Scrap() {
    getAttrs([
        'tinkering'
    ], (values) => {
        const tinkeringRanks = parseInt(values['tinkering']) || 0;

        let rollString = CUSTOM_TEMPLATE_BEGINNING;

        rollString += "{{name=Scrapping}}";

        rollString += "{{duration=1 hour}}";

        if(tinkeringRanks < 10) {
            const mod = '+@{tinkering}[Tinkering]@{log}[LOG]';
            rollString += GetCustomTemplateResultString(mod);
        }

        rollString += `{{description=You can spend an hour disassembling an explosive, clockwork, gun, or vehicle using Tinkering tools. Make a Tinkering [LOG] test against 20. On a success, you gain up to [[ceil(@{tinkering}[Tinkering]${tinkeringRanks >= 7 ? '' : '/2'})]] parts from the device’s blueprint. If the device’s complexity is equal to or lower than [[ceil(@{tinkering}[Tinkering]${tinkeringRanks >= 7 ? '' : '/2'})]], you gain all of its parts and you can not gain more parts of any type than were used to assemble it. If you fail, you don’t gain any parts and destroy the device. Regardless of whether you succeed or not, you gain the device’s power core if it had one installed.${tinkeringRanks >= 10 ? '\n\n**Master Tinkerer**\nScrapping no longer requires you to roll a test. You always succeed.' : ''}}}`;

        startRoll(rollString, (r) => {
            finishRoll(r.rollId);
        });
    });
}

/**
 * 
 * @param {string} deviceType 
 */
function Install(deviceType) {
    let rollString = CUSTOM_TEMPLATE_BEGINNING;

    rollString += `{{name=Install ${deviceType} (Augmentation)}}`;

    rollString += "{{duration=1 hour}}";

    const mod = `+@{augmentation}[Augmentation]@{agi}[AGI]+?{${deviceType} Quality&#124;0&#125;[Quality]+@{medicine}[Medicine]`;
    rollString += GetCustomTemplateResultString(mod);

    rollString += `{{damage=[[?{${deviceType} Complexity|0}d6]] ${DamageTypeEmoji('Slashing')}}}`;

    rollString += `{{description=To install a ${deviceType}, you need Surgical Tools. Make an Augmentation [AGI] test against 20. You get a +[[?{${deviceType} Quality|0}[Quality]]] bonus to the test. On a success, the ${deviceType} is installed. On a failure, the creature you tried to install it on takes [[?{${deviceType} Complexity}[Complexity]]]d6 slashing damage. This procedure takes you 1 hour. \n\n**Scrap Surgeon**\nYou can add your Medicine skill ranks to the test.}}`;

    startRoll(rollString, (r) => {
        finishRoll(r.rollId);
    });
}

function FunctionalProsthetic() {
    getAttrs([
        'wires'
    ], (values) => {
        const wires = parseInt(values['wires']) || 0;

        if(wires < 2) {
            return;
        }

        let rollString = CUSTOM_TEMPLATE_BEGINNING;

        rollString += `{{name=Functional Prosthetic}}`;

        rollString += "{{duration=1 hour}}";

        rollString += "{{inputs=2 Wires, PR 1 Power Source}}"; // TODO: Ask for Engine or Power Core and remove choice from inventory

        rollString += `{{description=You can use Augmentation tools to install a PR 1 Power Source into a Prosthetic to restore basic functionality and remove the Missing Limb penalty. This process takes 1 hour and costs 2 Wires in addition to the power source.}}`;

        startRoll(rollString, (r) => {
            setAttrs({
                'wires': wires - 2
            });

            finishRoll(r.rollId);
        });
    });
}

/**
 * 
 * @param {string} actionType 
 */
function AcuteDisrepair(actionType) {
    let rollString = CUSTOM_TEMPLATE_BEGINNING;

    rollString += `{{name=Acute Disrepair}}`;

    rollString += `{{action=Minor ${actionType}}}`;
    rollString += `{{range=2m}}`;

    const mod = `+@{gunsmithing}[Gunsmithing]@{agi}[AGI]`;
    rollString += GetCustomTemplateResultString(mod);

    rollString += `{{save=Evasion test}}`;

    rollString += `{{description=You attempt to disable a bow, pistol, or rifle that a creature within 2m of you ${actionType === 'Action' ? 'is holding' : 'is drawing'}. Make a Gunsmithing [AGI] test against the target creature’s Evasion test. On a success, the weapon becomes **inoperable** until it is repaired, which takes 10 minutes and a DT [[10+@{gunsmithing}[Gunsmithing]]] Gunsmithing [AGI] test.\n\nAn **inoperable** weapon can’t be fired normally, but can still be thrown or used for improvised melee attacks.}}`;

    startRoll(rollString, (r) => {
        finishRoll(r.rollId);
    });
}

/**
 * 
 * @param {string} skill 
 */
function ReverseEngineer(skill) {
    getAttrs([
        'tinkering'
    ], (values) => {
        const tinkeringRanks = parseInt(values['tinkering']) || 0;

        const skillLabel = SKILL_LABELS[skill] || "";

        let rollString = CUSTOM_TEMPLATE_BEGINNING;

        rollString += `{{name=Reverse Engineer (${skillLabel})}}`;

        rollString += "{{duration=1 hour}}";

        if(tinkeringRanks < 10) {
            const mod = `+@{${skill}}[${skillLabel}]@{log}[LOG]`;
            rollString += GetCustomTemplateResultString(mod);
        }

        rollString += `{{description=You can attempt to reverse engineer the blueprint for any device you ${skill === 'tinkering'? 'scrap' : 'disassemble'}. If you do so, you still roll your ${skillLabel} [LOG] test as normal. Successfully reverse engineering the device yields no parts, but it does yield up to [[@{${skill}}[${skillLabel}]]] pieces of the blueprint, as if you had received them through Designing.${tinkeringRanks >= 10 ? '\n\n**Master Tinkerer**\n' + (skill === 'tinkering'? 'Scrapping' : 'Disassembling') + ' no longer requires you to roll a test. You always succeed.' : ''}}}`;

        startRoll(rollString, (r) => {
            finishRoll(r.rollId);
        });
    });
}