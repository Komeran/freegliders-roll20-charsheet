on("change:repeating_positiveQuality:positiveQuality_name", UpdatePositiveQuality);
on("change:repeating_positiveQuality:positiveQuality_level", UpdatePositiveQualityLevel);
on("remove:repeating_positiveQuality", RemovePositiveQuality);

on("change:agileBonus", UpdateAgi);
on("change:analyticalMindBonus", UpdateLog);
on("change:educatedBonus", UpdateKnowledgeSkills);
on("change:quickReflexesBonus", UpdateEvasion);
on("change:toughBonus", UpdateHP);
on("change:sneakyBonus", UpdateStealth);
on("change:inspiringPresenceBonus", UpdateWil);
on("change:strongBonus", UpdateAthletics);
on("change:silverTongueBonus", UpdateCha);

on("change:repeating_negativeQuality:negativeQuality_name", UpdateNegativeQuality);
on("change:repeating_negativeQuality:negativeQuality_level", UpdateNegativeQualityLevel);
on("remove:repeating_negativeQuality", RemoveNegativeQuality);

on("change:addictPenalty", UpdateBod);
on("change:clumsyPenalty", UpdateAgi);
on("change:dullPenalty", UpdateLog);
on("change:fragilePenalty", UpdateHP);
on("change:weakPenalty", UpdateAthletics);
on("change:sociallyIneptPenalty", UpdateCha);