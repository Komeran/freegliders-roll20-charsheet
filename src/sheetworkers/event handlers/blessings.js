on("change:repeating_blessing:blessing_name", UpdateBlessing);
on("change:repeating_blessing:blessing_faith", UpdateBlessing);
on("change:repeating_blessing:blessing_memorised", UpdateMemorisedBlessings);
on("remove:repeating_blessing", UpdateMemorisedBlessings);