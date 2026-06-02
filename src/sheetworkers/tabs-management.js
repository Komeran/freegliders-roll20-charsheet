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

export const WITCHCRAFT_TABS = ["runes", "rituals", "spells", "curses"];
for(let i = 0; i < WITCHCRAFT_TABS.length; i++) {
    on(`clicked:${WITCHCRAFT_TABS[i]}`, function() {
        setAttrs({
            witchcraftTab: i
        });
    });
}

const alchemyTabButtonlist = ["elixirs", "potions", "transmutation", "infusions"];
for(let i = 0; i < alchemyTabButtonlist.length; i++) {
    on(`clicked:${alchemyTabButtonlist[i]}`, function() {
        setAttrs({
            alchemyTab: i
        });
    });
}

export const ENGINEERING_TABS = ["cwmTab", "automachineryTab", "augmentationTab", "gunsmithingTab", "tinkeringTab", "vehiclemechanicsTab"];
for(let i = 0; i < ENGINEERING_TABS.length; i++) {
    on(`clicked:${ENGINEERING_TABS[i]}`, function() {
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

const AUTOMACHINERY_TABS = ["blueprintsautomachinery", "repair", "automatons"];
for(let i = 0; i < AUTOMACHINERY_TABS.length; i++) {
    on(`clicked:${AUTOMACHINERY_TABS[i]}`, function() {
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