on(`clicked:evasion`, function() {
    let rollString = `${CUSTOM_TEMPLATE_BEGINNING}{{name=Evasion Test [@{evasion}]}} `;
    rollString += GetCustomTemplateResultString(`@{evasion}`);
    startRoll(rollString, r => {
        finishRoll(r.rollId);
    });
});