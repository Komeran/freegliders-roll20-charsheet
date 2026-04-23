on("change:level", UpdateLevelStats);

on("clicked:healing", UseHealing);

on("change:faith", _ => {
    UpdateMiracleworkingMaximum();
    UpdateBlessings();
});