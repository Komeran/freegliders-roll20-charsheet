// Tabs management
const sheetButtonlist = ["pc", "npc"];
sheetButtonlist.forEach(button => {
    on(`clicked:${button}`, function() {
        setAttrs({
            pcTab: button
        });
    });
});

const sheetTabButtonlist = ["characterTab", "combatTab", "qualitiesTab", "inventoryTab", "prayerTab", "witchcraftTab", "alchemyTab", "engineeringTab", "augmentationsTab", "notesTab"];
for(let i = 0; i < sheetTabButtonlist.length; i++) {
    on(`clicked:${sheetTabButtonlist[i]}`, function() {
        setAttrs({
            sheetTab: i
        });
    });
}

const witchcraftTabButtonlist = ["runes", "rituals", "spells", "curses"];
for(let i = 0; i < witchcraftTabButtonlist.length; i++) {
    on(`clicked:${witchcraftTabButtonlist[i]}`, function() {
        setAttrs({
            witchcraftTab: i
        });
    });
}

const alchemyTabButtonlist = ["elixirs", "potions", "infusions"];
for(let i = 0; i < alchemyTabButtonlist.length; i++) {
    on(`clicked:${alchemyTabButtonlist[i]}`, function() {
        setAttrs({
            alchemyTab: i
        });
    });
}

const engineeringTabButtonlist = ["cwmTab", "automachineryTab", "augmentationTab", "gunsmithingTab", "tinkeringTab", "vehiclemechanicsTab"];
for(let i = 0; i < engineeringTabButtonlist.length; i++) {
    on(`clicked:${engineeringTabButtonlist[i]}`, function() {
        setAttrs({
            engineeringTab: i
        });
    });
}

const cwmTabButtonlist = ["gadgets", "cwmodules"];
for(let i = 0; i < cwmTabButtonlist.length; i++) {
    on(`clicked:${cwmTabButtonlist[i]}`, function() {
        setAttrs({
            cwmTab: i
        });
    });
}

const automachineryTabButtonlist = ["blueprintsautomachinery", "automatons"];
for(let i = 0; i < automachineryTabButtonlist.length; i++) {
    on(`clicked:${automachineryTabButtonlist[i]}`, function() {
        setAttrs({
            automachineryTab: i
        });
    });
}

const inventoryButtonlist = ["equipment", "money"];
inventoryButtonlist.forEach(button => {
    on(`clicked:${button}`, function() {
        setAttrs({
            inventoryTab: button
        });
    });
});