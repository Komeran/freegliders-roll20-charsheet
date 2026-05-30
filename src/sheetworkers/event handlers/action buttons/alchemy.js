import { GetCustomTemplateResultString } from "../../helpers";
import { CUSTOM_TEMPLATE_BEGINNING } from "../../worker-constants";

on("clicked:extractessence", ExtractEssence);

function ExtractEssence() {
    getAttrs(["alchemy"], function(values) {
        const alchemyRanks = parseInt(values['alchemy']) || 0;

        let rollString = CUSTOM_TEMPLATE_BEGINNING;

        rollString += "{{name=Extract Essence}}";

        rollString += "{{duration=1 hour}}";

        const mod = "+@{alchemy}[Alchemy]@{log}[LOG]";
        rollString += GetCustomTemplateResultString(mod);
        
        rollString += `{{description=You can spend 1 hour to perform Extraction on up to [[${alchemyRanks}[Alchemy]]] objects. Make an Alchemy [LOG] test. The Difficulty for this test is 15 for unprocessed objects and 20 for processed objects. On a success, you manage to extract the Essence from the object. Whether you succeed or not, the object is destroyed. Make sure you have enough containers to store the Essence in before beginning the Extraction process, otherwise any Essence you can’t put into an appropriate container is lost.}}`;

        startRoll(rollString, (r) => {
            finishRoll(r.rollId);
        });
    });
}