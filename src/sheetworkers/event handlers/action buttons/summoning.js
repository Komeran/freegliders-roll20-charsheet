on("clicked:subjugatespirit", SubjugateSpirit);
on("clicked:tapintofamiliarsenses", TapIntoFamiliarSenses);
on("clicked:summonspirit", _ => { SummonSpirit("Spirit"); });
on("clicked:banish", Banish);
on("clicked:summondemon", _ => { SummonSpirit("Demon"); });
on("clicked:summonangel", _ => { SummonSpirit("Angel"); });