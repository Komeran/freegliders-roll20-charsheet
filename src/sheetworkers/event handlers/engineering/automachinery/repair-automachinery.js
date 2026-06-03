import { CUSTOM_TEMPLATE_BEGINNING } from "../../../worker-constants";

on("clicked:repairautomachine", RepairAutomachine);

on("change:bolts", PartsChanged);
on("change:cogs", PartsChanged);
on("change:wires", PartsChanged);
on("change:plates", PartsChanged);
on("change:rods", PartsChanged);
on("change:lenses", PartsChanged);

on("change:repairautomachine_bolts", PartsChanged);
on("change:repairautomachine_cogs", PartsChanged);
on("change:repairautomachine_wires", PartsChanged);
on("change:repairautomachine_plates", PartsChanged);
on("change:repairautomachine_rods", PartsChanged);
on("change:repairautomachine_lenses", PartsChanged);

function PartsChanged() {
    getAttrs([
        "bolts",
        "cogs",
        "wires",
        "plates",
        "rods",
        "lenses",
        "repairautomachine_bolts",
        "repairautomachine_cogs",
        "repairautomachine_wires",
        "repairautomachine_plates",
        "repairautomachine_rods",
        "repairautomachine_lenses"
    ], (values) => {
        const parsedInputs = {
            bolts: parseInt(values['repairautomachine_bolts']) || 0,
            cogs: parseInt(values['repairautomachine_cogs']) || 0,
            wires: parseInt(values['repairautomachine_wires']) || 0,
            plates: parseInt(values['repairautomachine_plates']) || 0,
            rods: parseInt(values['repairautomachine_rods']) || 0,
            lenses: parseInt(values['repairautomachine_lenses']) || 0
        }
        const parts = {
            bolts: parseInt(values['bolts']) || 0,
            cogs: parseInt(values['cogs']) || 0,
            wires: parseInt(values['wires']) || 0,
            plates: parseInt(values['plates']) || 0,
            rods: parseInt(values['rods']) || 0,
            lenses: parseInt(values['lenses']) || 0
        }

        const attributes = {};

        // Enforce constraints
        Object.keys(parsedInputs).forEach((i) => {
            attributes[`repairautomachine_${i}`] = Math.max(0, Math.min(parsedInputs[i], parts[i]));
        });

        // Calculate output
        let diceCount = 0;
        for(const input of Object.values(parsedInputs)) {
            diceCount += input;
        }

        attributes['repairautomachine_amount'] = `${diceCount}d6`;

        setAttrs(attributes);
    });
}

function RepairAutomachine() {
    getAttrs([
        "automachinery",
        "bolts",
        "cogs",
        "wires",
        "plates",
        "rods",
        "lenses",
        "repairautomachine_bolts",
        "repairautomachine_cogs",
        "repairautomachine_wires",
        "repairautomachine_plates",
        "repairautomachine_rods",
        "repairautomachine_lenses",
        "repairautomachine_amount"
    ], (values) => {
        const bolts = parseInt(values['bolts']) || 0;
        const cogs = parseInt(values['cogs']) || 0;
        const wires = parseInt(values['wires']) || 0;
        const plates = parseInt(values['plates']) || 0;
        const rods = parseInt(values['rods']) || 0;
        const lenses = parseInt(values['lenses']) || 0;
        
        const inputBolts = parseInt(values['repairautomachine_bolts']) || 0;
        const inputCogs = parseInt(values['repairautomachine_cogs']) || 0;
        const inputWires = parseInt(values['repairautomachine_wires']) || 0;
        const inputPlates = parseInt(values['repairautomachine_plates']) || 0;
        const inputRods = parseInt(values['repairautomachine_rods']) || 0;
        const inputLenses = parseInt(values['repairautomachine_lenses']) || 0;

        const automachineryRanks = parseInt(values['automachinery']) || 0;

        const amount = values["repairautomachine_amount"] || "0";

        let rollString = CUSTOM_TEMPLATE_BEGINNING;

        rollString += "{{name=Repair Automachine}}";

        rollString += `{{action=${automachineryRanks >= 8 ? 'Minor' : 'Major'} Action}}`;
        rollString += "{{range=2m}}";

        const inputs = [];
        if(inputBolts > 0) {
            inputs.push(`${inputBolts} Bolt${inputBolts > 1 ? 's' : ''}`);
        }
        if(inputCogs > 0) {
            inputs.push(`${inputCogs} Cog${inputCogs > 1 ? 's' : ''}`);
        }
        if(inputWires > 0) {
            inputs.push(`${inputWires} Wire${inputWires > 1 ? 's' : ''}`);
        }
        if(inputPlates > 0) {
            inputs.push(`${inputPlates} Plate${inputPlates > 1 ? 's' : ''}`);
        }
        if(inputRods > 0) {
            inputs.push(`${inputRods} Rod${inputRods > 1 ? 's' : ''}`);
        }
        if(inputLenses > 0) {
            inputs.push(`${inputLenses} Lense${inputLenses > 1 ? 's' : ''}`);
        }

        rollString += `{{inputs=${inputs.join(', ')}}}`;

        rollString += `{{result1=[[${amount}]]}}`;

        rollString += `{{description=You perform repairs on an Automachine within 2m of you using Automachinery tools you’re holding. You expend up to [[@{automachinery}[Automachinery]]] parts of any kind (bolt, cog, wire, plate, rod, or lens) and roll a number of d6 equal to the number of parts expended. The Automachine regains hit points equal to the result.}}`;

        startRoll(rollString, (r) => {
            setAttrs({
                "bolts": bolts - inputBolts,
                "cogs": cogs - inputCogs,
                "wires": wires - inputWires,
                "plates": plates - inputPlates,
                "rods": rods - inputRods,
                "lenses": lenses - inputLenses
            });

            finishRoll(r.rollId);
        });
    });
}