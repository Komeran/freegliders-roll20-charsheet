// Custom Sheet Roll Buttons
for(let mod of Object.keys(ATTRIBUTE_MOD_NAMES)) {
    on(`clicked:${mod}`, function() {
        let rollString = `${CUSTOM_TEMPLATE_BEGINNING}{{name=${ATTRIBUTE_MOD_NAMES[mod]} Test [@{${mod}}]}} `;
        rollString += GetCustomTemplateResultString(`@{${mod}}`);
        startRoll(rollString, r => {
            finishRoll(r.rollId);
        });
    });
}

for(let skill of Object.keys(SKILL_MOD_NAMES_ATTRIBUTES)) {
    let mna = SKILL_MOD_NAMES_ATTRIBUTES[skill];
    on(`clicked:${skill}`, function() {
        let rollString = `${CUSTOM_TEMPLATE_BEGINNING}{{name=${mna.name} [${mna.attribute}] Test [@{${mna.mod}}]}} `;
        rollString += GetCustomTemplateResultString(`@{${mna.mod}}`);
        startRoll(rollString, r => {
            finishRoll(r.rollId);
        });
    });
}