import { CUSTOM_TEMPLATE_BEGINNING } from "../worker-constants";

/**
 * @type {Object.<string, {input: Array.<string>, label: string}>}
 */
const TRANSMUTE_DATA = {
    fire: {
        input: [
            "Water",
            "Earth",
            "Air"
        ],
        label: "Fire"
    },
    water: {
        input: [
            "Fire",
            "Earth",
            "Air"
        ],
        label: "Water"
    },
    earth: {
        input: [
            "Fire",
            "Water",
            "Air"
        ],
        label: "Earth"
    },
    air: {
        input: [
            "Fire",
            "Water",
            "Earth"
        ],
        label: "Air"
    }
};

on("clicked:transmuteessence", TransmuteEssence);
on("change:transmute_targetessence", TargetEssenceChanged);
on("change:transmute_inputfire", InputChanged);
on("change:transmute_inputwater", InputChanged);
on("change:transmute_inputearth", InputChanged);
on("change:transmute_inputair", InputChanged);

on("change:essence_fire", InputChanged);
on("change:essence_water", InputChanged);
on("change:essence_earth", InputChanged);
on("change:essence_air", InputChanged);

function TargetEssenceChanged() {
    getAttrs(['transmute_targetessence'], (values) => {
        const targetEssence = values['transmute_targetessence'] || '';

        const attributes = {};

        attributes[`transmute_input${targetEssence}`] = 0;

        setAttrs(attributes);
    });
}

function InputChanged() {
    getAttrs([
        'alchemy',
        'transmute_targetessence',
        'transmute_inputfire',
        'transmute_inputwater',
        'transmute_inputearth',
        'transmute_inputair',
        'essence_fire',
        'essence_water',
        'essence_earth',
        'essence_air'
    ], (values) => {
        const alchemyRanks = parseInt(values['alchemy']) || 0;
        const targetEssence = values['transmute_targetessence'] || '';
        const parsedInputs = {
            fire: parseInt(values['transmute_inputfire']) || 0,
            water: parseInt(values['transmute_inputwater']) || 0,
            earth: parseInt(values['transmute_inputearth']) || 0,
            air: parseInt(values['transmute_inputair']) || 0
        }
        const essence = {
            fire: parseInt(values['essence_fire']) || 0,
            water: parseInt(values['essence_water']) || 0,
            earth: parseInt(values['essence_earth']) || 0,
            air: parseInt(values['essence_air']) || 0
        }

        const attributes = {};

        // Enforce constraints
        Object.keys(parsedInputs).forEach((i) => {
            attributes[`transmute_input${i}`] = Math.max(0, Math.min(parsedInputs[i], essence[i] - (essence[i]%3)));
        });

        // Calculate output
        const data = TRANSMUTE_DATA[targetEssence];
        let output = 0;
        for(const i of data.input) {
            output += Math.floor(parsedInputs[i.toLowerCase()] / 3);
        }

        attributes['transmute_output'] = output;
        const minutes = Math.max(1, Math.ceil(output / alchemyRanks)) * 10;
        attributes['transmute_duration'] = `${minutes} minutes`;

        setAttrs(attributes);
    });
}

function TransmuteEssence() {
    getAttrs([
        'alchemy',
        'essence_fire',
        'essence_water',
        'essence_earth',
        'essence_air',
        'transmute_targetessence',
        'transmute_inputfire',
        'transmute_inputwater',
        'transmute_inputearth',
        'transmute_inputair',
        'transmute_output',
        'transmute_duration'
    ], function(values) {
        const alchemyRanks = parseInt(values['alchemy']) || 0;
        const fireEssence = parseInt(values['essence_fire']) || 0;
        const waterEssence = parseInt(values['essence_water']) || 0;
        const earthEssence = parseInt(values['essence_earth']) || 0;
        const airEssence = parseInt(values['essence_air']) || 0;
        /**
         * @type {string}
         */
        const targetEssence = values['transmute_targetessence'] || '';
        const duration = values['transmute_duration'] || '';
        const parsedInputs = {
            fire: parseInt(values['transmute_inputfire']) || 0,
            water: parseInt(values['transmute_inputwater']) || 0,
            earth: parseInt(values['transmute_inputearth']) || 0,
            air: parseInt(values['transmute_inputair']) || 0
        }
        const outputAmount = parseInt(values['transmute_output']) || 0;

        if(targetEssence.length === 0 || (fireEssence < 3 && waterEssence < 3 && earthEssence < 3 && airEssence < 3)) {
            return;
        }

        const data = TRANSMUTE_DATA[targetEssence];

        let rollString = CUSTOM_TEMPLATE_BEGINNING;

        rollString += `{{name=Transmute ${data.label} Essence}}`;

        rollString += `{{duration=${duration}}}`;

        rollString += '{{inputs=';
        rollString += data.input.map((i) => {
            if(parsedInputs[i.toLowerCase()] > 0) {
                return `${parsedInputs[i.toLowerCase()]} ${i}`;
            }
            else {
                return undefined;
            }
        }).filter((i) => i !== undefined).join(", ");
        rollString += '}}';

        rollString += `{{outputs=${outputAmount} ${data.label}}}`;
        
        rollString += `{{description=By spending 10 minutes, you can turn one type of essence (Fire, Water, Earth, or Air) into another type of essence. Each resulting Essence costs 3 Essence of the other type you put in. You can transmute for a maximum of [[${alchemyRanks}[Alchemy]]] essence at once. You can only transmute into one type of Essence in a single transmutation process, but you can mix input Essence types as long as every single resulting serving of Essence is made from 3 servings of only one type of Essence.}}`;

        startRoll(rollString, (r) => {
            setAttrs({
                'essence_fire': fireEssence + (targetEssence === "fire"? outputAmount : -1 * parsedInputs.fire),
                'essence_water': waterEssence + (targetEssence === "water"? outputAmount : -1 * parsedInputs.water),
                'essence_earth': earthEssence + (targetEssence === "earth"? outputAmount : -1 * parsedInputs.earth),
                'essence_air': airEssence + (targetEssence === "air"? outputAmount : -1 * parsedInputs.air)
            });

            finishRoll(r.rollId);
        });
    });
}