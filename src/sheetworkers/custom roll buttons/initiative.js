on(`clicked:initiative`, function() {
    let rollString = `${CUSTOM_TEMPLATE_BEGINNING}{{name=Initiative Test [@{initiative}]}} `;
    rollString += GetCustomTemplateResultString(`@{initiative}`, true);
    rollString += "&{tracker}";
    startRoll(rollString, r => {
        finishRoll(r.rollId);
    });
});