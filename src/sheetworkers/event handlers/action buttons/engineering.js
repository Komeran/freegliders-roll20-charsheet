import { GetCustomTemplateResultString } from "../../helpers";
import { CUSTOM_TEMPLATE_BEGINNING, SKILL_LABELS } from "../../worker-constants";

on("clicked:disassembleclockworkmechanics", () => { Disassemble("clockworkmechanics"); });
on("clicked:disassembleautomachinery", () => { Disassemble("automachinery"); });
on("clicked:disassembleaugmentation", () => { Disassemble("augmentation"); });
on("clicked:scrap", Scrap);
on("clicked:disassemblevehiclemechanics", () => { Disassemble("vehiclemechanics"); });
on("clicked:disassemblegunsmithing", () => { Disassemble("gunsmithing"); });

/**
 * 
 * @param {string} skill 
 */
function Disassemble(skill) {
    const skillLabel = SKILL_LABELS[skill] || "";

    let rollString = CUSTOM_TEMPLATE_BEGINNING;

    rollString += `{{name=Disassembling (${skillLabel})}}`;

    rollString += "{{duration=1 hour}}";

    const mod = `+@{${skill}}[${skillLabel}]@{log}[LOG]`;
    rollString += GetCustomTemplateResultString(mod);
    
    const aOrAn = ['a', 'e', 'i', 'o', 'u'].indexOf(skill[0]) > -1 ? 'an' : 'a';

    rollString += `{{description=You can spend an hour disassembling a device crafted with ${skillLabel} using ${skillLabel} tools. Make ${aOrAn} ${skillLabel} [LOG] test against 20. On a success, you gain up to [[@{${skill}}[${skillLabel}]]] parts from the device’s blueprint. If the device’s complexity is equal to or lower than [[@{${skill}}[${skillLabel}]]], you gain all of its parts and you can not gain more parts of any type than were used to assemble it. If you fail, you don’t gain any parts and destroy the device. Regardless of whether you succeed or not, you gain the device’s power core if it had one installed.}}`;

    startRoll(rollString, (r) => {
        finishRoll(r.rollId);
    });
}

function Scrap() {
    let rollString = CUSTOM_TEMPLATE_BEGINNING;

    rollString += "{{name=Scrapping}}";

    rollString += "{{duration=1 hour}}";

    const mod = '+@{tinkering}[Tinkering]@{log}[LOG]';
    rollString += GetCustomTemplateResultString(mod);

    rollString += `{{description=You can spend an hour disassembling an explosive, clockwork, gun, or vehicle using Tinkering tools. Make a Tinkering [LOG] test against 20. On a success, you gain up to [[ceil(@{tinkering}[Tinkering]/2)]] parts from the device’s blueprint. If the device’s complexity is equal to or lower than [[ceil(@{tinkering}[Tinkering]/2)]], you gain all of its parts and you can not gain more parts of any type than were used to assemble it. If you fail, you don’t gain any parts and destroy the device. Regardless of whether you succeed or not, you gain the device’s power core if it had one installed.}}`;

    startRoll(rollString, (r) => {
        finishRoll(r.rollId);
    });
}