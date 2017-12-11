/* eslint no-console: 'off', no-undef: 'off', max-len: 'off', */
const AllPokemon = ['Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon',
  'Charizard', 'Squirtle', 'Wartortle', 'Blastoise', 'Caterpie',
  'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill',
  'Pidgey', 'Pidgeotto', 'Pidgeot', 'Rattata', 'Raticate',
  'Spearow', 'Fearow', 'Ekans', 'Arbok', 'Pikachu',
  'Raichu', 'Sandshrew', 'Sandslash', 'Nidoran?', 'Nidorina',
  'Nidoqueen', 'Nidoran?', 'Nidorino', 'Nidoking', 'Clefairy',
  'Clefable', 'Vulpix', 'Ninetales', 'Jigglypuff',
  'Wigglytuff', 'Zubat', 'Golbat', 'Oddish', 'Gloom',
  'Vileplume', 'Paras', 'Parasect', 'Venonat', 'Venomoth',
  'Diglett', 'Dugtrio', 'Meowth', 'Persian', 'Psyduck',
  'Golduck', 'Mankey', 'Primeape', 'Growlithe', 'Arcanine',
  'Poliwag', 'Poliwhirl', 'Poliwrath', 'Abra', 'Kadabra',
  'Alakazam', 'Machop', 'Machoke', 'Machamp', 'Bellsprout',
  'Weepinbell', 'Victreebel', 'Tentacool', 'Tentacruel', 'Geodude',
  'Graveler', 'Golem', 'Ponyta', 'Rapidash', 'Slowpoke',
  'Slowbro', 'Magnemite', 'Magneton', "Farfetch'd", 'Doduo',
  'Dodrio', 'Seel', 'Dewgong', 'Grimer', 'Muk',
  'Shellder', 'Cloyster', 'Gastly', 'Haunter', 'Gengar',
  'Onix', 'Drowzee', 'Hypno', 'Krabby', 'Kingler',
  'Voltorb', 'Electrode', 'Exeggcute', 'Exeggutor', 'Cubone',
  'Marowak', 'Hitmonlee', 'Hitmonchan', 'Lickitung', 'Koffing',
  'Weezing', 'Rhyhorn', 'Rhydon', 'Chansey', 'Tangela',
  'Kangaskhan', 'Horsea', 'Seadra', 'Goldeen', 'Seaking',
  'Staryu', 'Starmie', 'Mr.Mime', 'Scyther', 'Jynx',
  'Electabuzz', 'Magmar', 'Pinsir', 'Tauros', 'Magikarp',
  'Gyarados', 'Lapras', 'Ditto', 'Eevee', 'Vaporeon',
  'Jolteon', 'Flareon', 'Porygon', 'Omanyte', 'Omastar',
  'Kabuto', 'Kabutops', 'Aerodactyl', 'Snorlax', 'Articuno',
  'Zapdos', 'Moltres', 'Dratini', 'Dragonair', 'Dragonite',
  'Mewtwo', 'Mew', 'Chikorita', 'Bayleef', 'Meganium',
  'Cyndaquil', 'Quilava', 'Typhlosion', 'Totodile', 'Croconaw',
  'Feraligatr', 'Sentret', 'Furret', 'Hoothoot', 'Noctowl',
  'Ledyba', 'Ledian', 'Spinarak', 'Ariados', 'Crobat',
  'Chinchou', 'Lanturn', 'Pichu', 'Cleffa', 'Igglybuff',
  'Togepi', 'Togetic', 'Natu', 'Xatu', 'Mareep',
  'Flaaffy', 'Ampharos', 'Bellossom', 'Marill',
  'Azumarill', 'Sudowoodo', 'Politoed', 'Hoppip', 'Skiploom',
  'Jumpluff', 'Aipom', 'Sunkern', 'Sunflora', 'Yanma',
  'Wooper', 'Quagsire', 'Espeon', 'Umbreon', 'Murkrow',
  'Slowking', 'Misdreavus', 'Unown', 'Wobbuffet', 'Girafarig',
  'Pineco', 'Forretress', 'Dunsparce', 'Gligar', 'Steelix',
  'Snubbull', 'Granbull', 'Qwilfish', 'Scizor', 'Shuckle',
  'Heracross', 'Sneasel', 'Teddiursa', 'Ursaring', 'Slugma',
  'Magcargo', 'Swinub', 'Piloswine', 'Corsola', 'Remoraid',
  'Octillery', 'Delibird', 'Mantine', 'Skarmory', 'Houndour',
  'Houndoom', 'Kingdra', 'Phanpy', 'Donphan', 'Porygon2',
  'Stantler', 'Smeargle', 'Tyrogue', 'Hitmontop', 'Smoochum',
  'Elekid', 'Magby', 'Miltank', 'Blissey', 'Raikou',/* eslint no-console: 'off', no-undef: 'off', max-len: 'off', */
const AllPokemon = ['Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon',
  'Charizard', 'Squirtle', 'Wartortle', 'Blastoise', 'Caterpie',
  'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill',
  'Pidgey', 'Pidgeotto', 'Pidgeot', 'Rattata', 'Raticate',
  'Spearow', 'Fearow', 'Ekans', 'Arbok', 'Pikachu',
  'Raichu', 'Sandshrew', 'Sandslash', 'Nidoran?', 'Nidorina',
  'Nidoqueen', 'Nidoran?', 'Nidorino', 'Nidoking', 'Clefairy',
  'Clefable', 'Vulpix', 'Ninetales', 'Jigglypuff',
  'Wigglytuff', 'Zubat', 'Golbat', 'Oddish', 'Gloom',
  'Vileplume', 'Paras', 'Parasect', 'Venonat', 'Venomoth',
  'Diglett', 'Dugtrio', 'Meowth', 'Persian', 'Psyduck',
  'Golduck', 'Mankey', 'Primeape', 'Growlithe', 'Arcanine',
  'Poliwag', 'Poliwhirl', 'Poliwrath', 'Abra', 'Kadabra',
  'Alakazam', 'Machop', 'Machoke', 'Machamp', 'Bellsprout',
  'Weepinbell', 'Victreebel', 'Tentacool', 'Tentacruel', 'Geodude',
  'Graveler', 'Golem', 'Ponyta', 'Rapidash', 'Slowpoke',
  'Slowbro', 'Magnemite', 'Magneton', "Farfetch'd", 'Doduo',
  'Dodrio', 'Seel', 'Dewgong', 'Grimer', 'Muk',
  'Shellder', 'Cloyster', 'Gastly', 'Haunter', 'Gengar',
  'Onix', 'Drowzee', 'Hypno', 'Krabby', 'Kingler',
  'Voltorb', 'Electrode', 'Exeggcute', 'Exeggutor', 'Cubone',
  'Marowak', 'Hitmonlee', 'Hitmonchan', 'Lickitung', 'Koffing',
  'Weezing', 'Rhyhorn', 'Rhydon', 'Chansey', 'Tangela',
  'Kangaskhan', 'Horsea', 'Seadra', 'Goldeen', 'Seaking',
  'Staryu', 'Starmie', 'Mr.Mime', 'Scyther', 'Jynx',
  'Electabuzz', 'Magmar', 'Pinsir', 'Tauros', 'Magikarp',
  'Gyarados', 'Lapras', 'Ditto', 'Eevee', 'Vaporeon',
  'Jolteon', 'Flareon', 'Porygon', 'Omanyte', 'Omastar',
  'Kabuto', 'Kabutops', 'Aerodactyl', 'Snorlax', 'Articuno',
  'Zapdos', 'Moltres', 'Dratini', 'Dragonair', 'Dragonite',
  'Mewtwo', 'Mew', 'Chikorita', 'Bayleef', 'Meganium',
  'Cyndaquil', 'Quilava', 'Typhlosion', 'Totodile', 'Croconaw',
  'Feraligatr', 'Sentret', 'Furret', 'Hoothoot', 'Noctowl',
  'Ledyba', 'Ledian', 'Spinarak', 'Ariados', 'Crobat',
  'Chinchou', 'Lanturn', 'Pichu', 'Cleffa', 'Igglybuff',
  'Togepi', 'Togetic', 'Natu', 'Xatu', 'Mareep',
  'Flaaffy', 'Ampharos', 'Bellossom', 'Marill',
  'Azumarill', 'Sudowoodo', 'Politoed', 'Hoppip', 'Skiploom',
  'Jumpluff', 'Aipom', 'Sunkern', 'Sunflora', 'Yanma',
  'Wooper', 'Quagsire', 'Espeon', 'Umbreon', 'Murkrow',
  'Slowking', 'Misdreavus', 'Unown', 'Wobbuffet', 'Girafarig',
  'Pineco', 'Forretress', 'Dunsparce', 'Gligar', 'Steelix',
  'Snubbull', 'Granbull', 'Qwilfish', 'Scizor', 'Shuckle',
  'Heracross', 'Sneasel', 'Teddiursa', 'Ursaring', 'Slugma',
  'Magcargo', 'Swinub', 'Piloswine', 'Corsola', 'Remoraid',
  'Octillery', 'Delibird', 'Mantine', 'Skarmory', 'Houndour',
  'Houndoom', 'Kingdra', 'Phanpy', 'Donphan', 'Porygon2',
  'Stantler', 'Smeargle', 'Tyrogue', 'Hitmontop', 'Smoochum',
  'Elekid', 'Magby', 'Miltank', 'Blissey', 'Raikou',
  'Entei', 'Suicune', 'Larvitar', 'Pupitar', 'Tyranitar',
  'Lugia', 'Ho-Oh', 'Celebi', 'Treecko', 'Grovyle',
  'Sceptile', 'Torchic', 'Combusken', 'Blaziken', 'Mudkip',
  'Marshtomp', 'Swampert', 'Poochyena', 'Mightyena', 'Zigzagoon',
  'Linoone', 'Wurmple', 'Silcoon', 'Beautifly', 'Cascoon',
  'Dustox', 'Lotad', 'Lombre', 'Ludicolo', 'Seedot',
  'Nuzleaf', 'Shiftry', 'Taillow', 'Swellow', 'Wingull',
  'Pelipper', 'Ralts', 'Kirlia', 'Gardevoir', 'Surskit',
  'Masquerain', 'Shroomish', 'Breloom', 'Slakoth', 'Vigoroth',
  'Slaking', 'Nincada', 'Ninjask', 'Shedinja', 'Whismur',
  'Loudred', 'Exploud', 'Makuhita', 'Hariyama', 'Azurill',
  'Nosepass', 'Skitty', 'Delcatty', 'Sableye', 'Mawile',
  'Aron', 'Lairon', 'Aggron', 'Meditite', 'Medicham',
  'Electrike', 'Manectric', 'Plusle', 'Minun', 'Volbeat',
  'Illumise', 'Roselia', 'Gulpin', 'Swalot', 'Carvanha',
  'Sharpedo', 'Wailmer', 'Wailord', 'Numel', 'Camerupt',
  'Torkoal', 'Spoink', 'Grumpig', 'Spinda', 'Trapinch',
  'Vibrava', 'Flygon', 'Cacnea', 'Cacturne', 'Swablu',
  'Altaria', 'Zangoose', 'Seviper', 'Lunatone', 'Solrock',
  'Barboach', 'Whiscash', 'Corphish', 'Crawdaunt', 'Baltoy',
  'Claydol', 'Lileep', 'Cradily', 'Anorith', 'Armaldo',
  'Feebas', 'Milotic', 'Castform', 'Kecleon', 'Shuppet',
  'Banette', 'Duskull', 'Dusclops', 'Tropius', 'Chimecho',
  'Absol', 'Wynaut', 'Snorunt', 'Glalie', 'Spheal',
  'Sealeo', 'Walrein', 'Clamperl', 'Huntail', 'Gorebyss',
  'Relicanth', 'Luvdisc', 'Bagon', 'Shelgon', 'Salamence',
  'Beldum', 'Metang', 'Metagross', 'Regirock', 'Regice',
  'Registeel', 'Latias', 'Latios', 'Kyogre', 'Groudon',
  'Rayquaza', 'Jirachi', 'Deoxys', 'Turtwig', 'Grotle',
  'Torterra', 'Chimchar', 'Monferno', 'Infernape', 'Piplup',
  'Prinplup', 'Empoleon', 'Starly', 'Staravia', 'Staraptor',
  'Bidoof', 'Bibarel', 'Kricketot', 'Kricketune', 'Shinx',
  'Luxio', 'Luxray', 'Budew', 'Roserade', 'Cranidos',
  'Rampardos', 'Shieldon', 'Bastiodon', 'Burmy', 'Wormadam',
  'Mothim', 'Combee', 'Vespiquen', 'Pachirisu', 'Buizel',
  'Floatzel', 'Cherubi', 'Cherrim', 'Shellos', 'Gastrodon',
  'Ambipom', 'Drifloon', 'Drifblim', 'Buneary', 'Lopunny',
  'Mismagius', 'Honchkrow', 'Glameow', 'Purugly', 'Chingling',
  'Stunky', 'Skuntank', 'Bronzor', 'Bronzong', 'Bonsly',
  'MimeJr.', 'Happiny', 'Chatot', 'Spiritomb', 'Gible',
  'Gabite', 'Garchomp', 'Munchlax', 'Riolu', 'Lucario',
  'Hippopotas', 'Hippowdon', 'Skorupi', 'Drapion', 'Croagunk',
  'Toxicroak', 'Carnivine', 'Finneon', 'Lumineon', 'Mantyke',
  'Snover', 'Abomasnow', 'Weavile', 'Magnezone', 'Lickilicky',
  'Rhyperior', 'Tangrowth', 'Electivire', 'Magmortar', 'Togekiss',
  'Yanmega', 'Leafeon', 'Glaceon', 'Gliscor', 'Mamoswine',
  'Porygon-Z', 'Gallade', 'Probopass', 'Dusknoir', 'Froslass',
  'Rotom', 'Uxie', 'Mesprit', 'Azelf', 'Dialga',
  'Palkia', 'Heatran', 'Regigigas', 'Giratina', 'Cresselia',
  'Phione', 'Manaphy', 'Darkrai', 'Shaymin', 'Arceus',
  'Victini', 'Snivy', 'Servine', 'Serperior', 'Tepig',
  'Pignite', 'Emboar', 'Oshawott', 'Dewott', 'Samurott',
  'Patrat', 'Watchog', 'Lillipup', 'Herdier', 'Stoutland',
  'Purrloin', 'Liepard', 'Pansage', 'Simisage', 'Pansear',
  'Simisear', 'Panpour', 'Simipour', 'Munna', 'Musharna',
  'Pidove', 'Tranquill', 'Unfezant', 'Blitzle', 'Zebstrika',
  'Roggenrola', 'Boldore', 'Gigalith', 'Woobat', 'Swoobat',
  'Drilbur', 'Excadrill', 'Audino', 'Timburr', 'Gurdurr',
  'Conkeldurr', 'Tympole', 'Palpitoad', 'Seismitoad', 'Throh',
  'Sawk', 'Sewaddle', 'Swadloon', 'Leavanny', 'Venipede',
  'Whirlipede', 'Scolipede', 'Cottonee', 'Whimsicott', 'Petilil',
  'Lilligant', 'Basculin', 'Sandile', 'Krokorok', 'Krookodile',
  'Darumaka', 'Darmanitan', 'Maractus', 'Dwebble', 'Crustle',
  'Scraggy', 'Scrafty', 'Sigilyph', 'Yamask', 'Cofagrigus',
  'Tirtouga', 'Carracosta', 'Archen', 'Archeops', 'Trubbish',
  'Garbodor', 'Zorua', 'Zoroark', 'Minccino', 'Cinccino',
  'Gothita', 'Gothorita', 'Gothitelle', 'Solosis', 'Duosion',
  'Reuniclus', 'Ducklett', 'Swanna', 'Vanillite', 'Vanillish',
  'Vanilluxe', 'Deerling', 'Sawsbuck', 'Emolga', 'Karrablast',
  'Escavalier', 'Foongus', 'Amoonguss', 'Frillish', 'Jellicent',
  'Alomomola', 'Joltik', 'Galvantula', 'Ferroseed', 'Ferrothorn',
  'Klink', 'Klang', 'Klinklang', 'Tynamo', 'Eelektrik',
  'Eelektross', 'Elgyem', 'Beheeyem', 'Litwick', 'Lampent',
  'Chandelure', 'Axew', 'Fraxure', 'Haxorus', 'Cubchoo',
  'Beartic', 'Cryogonal', 'Shelmet', 'Accelgor', 'Stunfisk',
  'Mienfoo', 'Mienshao', 'Druddigon', 'Golett', 'Golurk',
  'Pawniard', 'Bisharp', 'Bouffalant', 'Rufflet', 'Braviary',
  'Vullaby', 'Mandibuzz', 'Heatmor', 'Durant', 'Deino',
  'Zweilous', 'Hydreigon', 'Larvesta', 'Volcarona', 'Cobalion',
  'Terrakion', 'Virizion', 'Tornadus', 'Thundurus', 'Reshiram',
  'Zekrom', 'Landorus', 'Kyurem', 'Keldeo', 'Meloetta',
  'Genesect', 'Chespin', 'Quilladin', 'Chesnaught', 'Fennekin',
  'Braixen', 'Delphox', 'Froakie', 'Frogadier', 'Greninja',
  'Bunnelby', 'Diggersby', 'Fletchling', 'Fletchinder', 'Talonflame',
  'Scatterbug', 'Spewpa', 'Vivillon', 'Litleo', 'Pyroar',
  'Flabebe', 'Floette', 'Florges', 'Skiddo', 'Gogoat',
  'Pancham', 'Pangoro', 'Furfrou', 'Espurr', 'Meowstic',
  'Honedge', 'Doublade', 'Aegislash', 'Spritzee', 'Aromatisse',
  'Swirlix', 'Slurpuff', 'Inkay', 'Malamar', 'Binacle',
  'Barbaracle', 'Skrelp', 'Dragalge', 'Clauncher', 'Clawitzer',
  'Helioptile', 'Heliolisk', 'Tyrunt', 'Tyrantrum', 'Amaura',
  'Aurorus', 'Sylveon', 'Hawlucha', 'Dedenne', 'Carbink',
  'Goomy', 'Sliggoo', 'Goodra', 'Klefki', 'Phantump',
  'Trevenant', 'Pumpkaboo', 'Gourgeist', 'Bergmite', 'Avalugg',
  'Noibat', 'Noivern', 'Xerneas', 'Yveltal', 'Zygarde',
  'Diancie', 'Hoopa', 'Volcanion', 'Rowlet', 'Dartrix',
  'Decidueye', 'Litten', 'Torracat', 'Incineroar', 'Popplio',
  'Brionne', 'Primarina', 'Pikipek', 'Trumbeak', 'Toucannon',
  'Yungoos', 'Gumshoos', 'Grubbin', 'Charjabug', 'Vikavolt',
  'Crabrawler', 'Crabominable', 'Oricorio', 'Cutiefly', 'Ribombee',
  'Rockruff', 'Lycanroc', 'Wishiwashi', 'Mareanie', 'Toxapex',
  'Mudbray', 'Mudsdale', 'Dewpider', 'Araquanid', 'Fomantis',
  'Lurantis', 'Morelull', 'Shiinotic', 'Salandit', 'Salazzle',
  'Stufful', 'Bewear', 'Bounsweet', 'Steenee', 'Tsareena',
  'Comfey', 'Oranguru', 'Passimian', 'Wimpod', 'Golisopod',
  'Sandygast', 'Palossand', 'Pyukumuku', 'Type:Null', 'Silvally',
  'Minior', 'Komala', 'Turtonator', 'Togedemaru', 'Mimikyu',
  'Bruxish', 'Drampa', 'Dhelmise', 'Jangmo-o', 'Hakamo-o',
  'Kommo-o', 'TapuKoko', 'TapuLele', 'TapuBulu', 'TapuFini',
  'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Nihilego',
  'Buzzwole', 'Pheromosa', 'Xurkitree', 'Celesteela', 'Kartana',
  'Guzzlord', 'Necrozma', 'Magearna', 'Marshadow'];

const GenerationOne = ['Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon',
  'Charizard', 'Squirtle', 'Wartortle', 'Blastoise', 'Caterpie',
  'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill',
  'Pidgey', 'Pidgeotto', 'Pidgeot', 'Rattata', 'Raticate',
  'Spearow', 'Fearow', 'Ekans', 'Arbok', 'Pikachu',
  'Raichu', 'Sandshrew', 'Sandslash', 'Nidoran?', 'Nidorina',
  'Nidoqueen', 'Nidoran?', 'Nidorino', 'Nidoking', 'Clefairy',
  'Clefable', 'Vulpix', 'Ninetales', 'Jigglypuff',
  'Wigglytuff', 'Zubat', 'Golbat', 'Oddish', 'Gloom',
  'Vileplume', 'Paras', 'Parasect', 'Venonat', 'Venomoth',
  'Diglett', 'Dugtrio', 'Meowth', 'Persian', 'Psyduck',
  'Golduck', 'Mankey', 'Primeape', 'Growlithe', 'Arcanine',
  'Poliwag', 'Poliwhirl', 'Poliwrath', 'Abra', 'Kadabra',
  'Alakazam', 'Machop', 'Machoke', 'Machamp', 'Bellsprout',
  'Weepinbell', 'Victreebel', 'Tentacool', 'Tentacruel', 'Geodude',
  'Graveler', 'Golem', 'Ponyta', 'Rapidash', 'Slowpoke',
  'Slowbro', 'Magnemite', 'Magneton', "Farfetch'd", 'Doduo',
  'Dodrio', 'Seel', 'Dewgong', 'Grimer', 'Muk',
  'Shellder', 'Cloyster', 'Gastly', 'Haunter', 'Gengar',
  'Onix', 'Drowzee', 'Hypno', 'Krabby', 'Kingler',
  'Voltorb', 'Electrode', 'Exeggcute', 'Exeggutor', 'Cubone',
  'Marowak', 'Hitmonlee', 'Hitmonchan', 'Lickitung', 'Koffing',
  'Weezing', 'Rhyhorn', 'Rhydon', 'Chansey', 'Tangela',
  'Kangaskhan', 'Horsea', 'Seadra', 'Goldeen', 'Seaking',
  'Staryu', 'Starmie', 'Mr.Mime', 'Scyther', 'Jynx',
  'Electabuzz', 'Magmar', 'Pinsir', 'Tauros', 'Magikarp',
  'Gyarados', 'Lapras', 'Ditto', 'Eevee', 'Vaporeon',
  'Jolteon', 'Flareon', 'Porygon', 'Omanyte', 'Omastar',
  'Kabuto', 'Kabutops', 'Aerodactyl', 'Snorlax', 'Articuno',
  'Zapdos', 'Moltres', 'Dratini', 'Dragonair', 'Dragonite',
  'Mewtwo', 'Mew'];

const GenerationTwo = ['Chikorita', 'Bayleef', 'Meganium',
  'Cyndaquil', 'Quilava', 'Typhlosion', 'Totodile', 'Croconaw',
  'Feraligatr', 'Sentret', 'Furret', 'Hoothoot', 'Noctowl',
  'Ledyba', 'Ledian', 'Spinarak', 'Ariados', 'Crobat',
  'Chinchou', 'Lanturn', 'Pichu', 'Cleffa', 'Igglybuff',
  'Togepi', 'Togetic', 'Natu', 'Xatu', 'Mareep',
  'Flaaffy', 'Ampharos', 'Bellossom', 'Marill',
  'Azumarill', 'Sudowoodo', 'Politoed', 'Hoppip', 'Skiploom',
  'Jumpluff', 'Aipom', 'Sunkern', 'Sunflora', 'Yanma',
  'Wooper', 'Quagsire', 'Espeon', 'Umbreon', 'Murkrow',
  'Slowking', 'Misdreavus', 'Unown', 'Wobbuffet', 'Girafarig',
  'Pineco', 'Forretress', 'Dunsparce', 'Gligar', 'Steelix',
  'Snubbull', 'Granbull', 'Qwilfish', 'Scizor', 'Shuckle',
  'Heracross', 'Sneasel', 'Teddiursa', 'Ursaring', 'Slugma',
  'Magcargo', 'Swinub', 'Piloswine', 'Corsola', 'Remoraid',
  'Octillery', 'Delibird', 'Mantine', 'Skarmory', 'Houndour',
  'Houndoom', 'Kingdra', 'Phanpy', 'Donphan', 'Porygon2',
  'Stantler', 'Smeargle', 'Tyrogue', 'Hitmontop', 'Smoochum',
  'Elekid', 'Magby', 'Miltank', 'Blissey', 'Raikou',
  'Entei', 'Suicune', 'Larvitar', 'Pupitar', 'Tyranitar',
  'Lugia', 'Ho-Oh', 'Celebi'];

const GenerationThree = ['Treecko', 'Grovyle',
  'Sceptile', 'Torchic', 'Combusken', 'Blaziken', 'Mudkip',
  'Marshtomp', 'Swampert', 'Poochyena', 'Mightyena', 'Zigzagoon',
  'Linoone', 'Wurmple', 'Silcoon', 'Beautifly', 'Cascoon',
  'Dustox', 'Lotad', 'Lombre', 'Ludicolo', 'Seedot',
  'Nuzleaf', 'Shiftry', 'Taillow', 'Swellow', 'Wingull',
  'Pelipper', 'Ralts', 'Kirlia', 'Gardevoir', 'Surskit',
  'Masquerain', 'Shroomish', 'Breloom', 'Slakoth', 'Vigoroth',
  'Slaking', 'Nincada', 'Ninjask', 'Shedinja', 'Whismur',
  'Loudred', 'Exploud', 'Makuhita', 'Hariyama', 'Azurill',
  'Nosepass', 'Skitty', 'Delcatty', 'Sableye', 'Mawile',
  'Aron', 'Lairon', 'Aggron', 'Meditite', 'Medicham',
  'Electrike', 'Manectric', 'Plusle', 'Minun', 'Volbeat',
  'Illumise', 'Roselia', 'Gulpin', 'Swalot', 'Carvanha',
  'Sharpedo', 'Wailmer', 'Wailord', 'Numel', 'Camerupt',
  'Torkoal', 'Spoink', 'Grumpig', 'Spinda', 'Trapinch',
  'Vibrava', 'Flygon', 'Cacnea', 'Cacturne', 'Swablu',
  'Altaria', 'Zangoose', 'Seviper', 'Lunatone', 'Solrock',
  'Barboach', 'Whiscash', 'Corphish', 'Crawdaunt', 'Baltoy',
  'Claydol', 'Lileep', 'Cradily', 'Anorith', 'Armaldo',
  'Feebas', 'Milotic', 'Castform', 'Kecleon', 'Shuppet',
  'Banette', 'Duskull', 'Dusclops', 'Tropius', 'Chimecho',
  'Absol', 'Wynaut', 'Snorunt', 'Glalie', 'Spheal',
  'Sealeo', 'Walrein', 'Clamperl', 'Huntail', 'Gorebyss',
  'Relicanth', 'Luvdisc', 'Bagon', 'Shelgon', 'Salamence',
  'Beldum', 'Metang', 'Metagross', 'Regirock', 'Regice',
  'Registeel', 'Latias', 'Latios', 'Kyogre', 'Groudon',
  'Rayquaza', 'Jirachi', 'Deoxys'];

const GenerationFour = ['Turtwig', 'Grotle',
  'Torterra', 'Chimchar', 'Monferno', 'Infernape', 'Piplup',
  'Prinplup', 'Empoleon', 'Starly', 'Staravia', 'Staraptor',
  'Bidoof', 'Bibarel', 'Kricketot', 'Kricketune', 'Shinx',
  'Luxio', 'Luxray', 'Budew', 'Roserade', 'Cranidos',
  'Rampardos', 'Shieldon', 'Bastiodon', 'Burmy', 'Wormadam',
  'Mothim', 'Combee', 'Vespiquen', 'Pachirisu', 'Buizel',
  'Floatzel', 'Cherubi', 'Cherrim', 'Shellos', 'Gastrodon',
  'Ambipom', 'Drifloon', 'Drifblim', 'Buneary', 'Lopunny',
  'Mismagius', 'Honchkrow', 'Glameow', 'Purugly', 'Chingling',
  'Stunky', 'Skuntank', 'Bronzor', 'Bronzong', 'Bonsly',
  'MimeJr.', 'Happiny', 'Chatot', 'Spiritomb', 'Gible',
  'Gabite', 'Garchomp', 'Munchlax', 'Riolu', 'Lucario',
  'Hippopotas', 'Hippowdon', 'Skorupi', 'Drapion', 'Croagunk',
  'Toxicroak', 'Carnivine', 'Finneon', 'Lumineon', 'Mantyke',
  'Snover', 'Abomasnow', 'Weavile', 'Magnezone', 'Lickilicky',
  'Rhyperior', 'Tangrowth', 'Electivire', 'Magmortar', 'Togekiss',
  'Yanmega', 'Leafeon', 'Glaceon', 'Gliscor', 'Mamoswine',
  'Porygon-Z', 'Gallade', 'Probopass', 'Dusknoir', 'Froslass',
  'Rotom', 'Uxie', 'Mesprit', 'Azelf', 'Dialga',
  'Palkia', 'Heatran', 'Regigigas', 'Giratina', 'Cresselia',
  'Phione', 'Manaphy', 'Darkrai', 'Shaymin', 'Arceus',
  'Victini'];

const GenerationFive = ['Snivy', 'Servine', 'Serperior', 'Tepig',
  'Pignite', 'Emboar', 'Oshawott', 'Dewott', 'Samurott',
  'Patrat', 'Watchog', 'Lillipup', 'Herdier', 'Stoutland',
  'Purrloin', 'Liepard', 'Pansage', 'Simisage', 'Pansear',
  'Simisear', 'Panpour', 'Simipour', 'Munna', 'Musharna',
  'Pidove', 'Tranquill', 'Unfezant', 'Blitzle', 'Zebstrika',
  'Roggenrola', 'Boldore', 'Gigalith', 'Woobat', 'Swoobat',
  'Drilbur', 'Excadrill', 'Audino', 'Timburr', 'Gurdurr',
  'Conkeldurr', 'Tympole', 'Palpitoad', 'Seismitoad', 'Throh',
  'Sawk', 'Sewaddle', 'Swadloon', 'Leavanny', 'Venipede',
  'Whirlipede', 'Scolipede', 'Cottonee', 'Whimsicott', 'Petilil',
  'Lilligant', 'Basculin', 'Sandile', 'Krokorok', 'Krookodile',
  'Darumaka', 'Darmanitan', 'Maractus', 'Dwebble', 'Crustle',
  'Scraggy', 'Scrafty', 'Sigilyph', 'Yamask', 'Cofagrigus',
  'Tirtouga', 'Carracosta', 'Archen', 'Archeops', 'Trubbish',
  'Garbodor', 'Zorua', 'Zoroark', 'Minccino', 'Cinccino',
  'Gothita', 'Gothorita', 'Gothitelle', 'Solosis', 'Duosion',
  'Reuniclus', 'Ducklett', 'Swanna', 'Vanillite', 'Vanillish',
  'Vanilluxe', 'Deerling', 'Sawsbuck', 'Emolga', 'Karrablast',
  'Escavalier', 'Foongus', 'Amoonguss', 'Frillish', 'Jellicent',
  'Alomomola', 'Joltik', 'Galvantula', 'Ferroseed', 'Ferrothorn',
  'Klink', 'Klang', 'Klinklang', 'Tynamo', 'Eelektrik',
  'Eelektross', 'Elgyem', 'Beheeyem', 'Litwick', 'Lampent',
  'Chandelure', 'Axew', 'Fraxure', 'Haxorus', 'Cubchoo',
  'Beartic', 'Cryogonal', 'Shelmet', 'Accelgor', 'Stunfisk',
  'Mienfoo', 'Mienshao', 'Druddigon', 'Golett', 'Golurk',
  'Pawniard', 'Bisharp', 'Bouffalant', 'Rufflet', 'Braviary',
  'Vullaby', 'Mandibuzz', 'Heatmor', 'Durant', 'Deino',
  'Zweilous', 'Hydreigon', 'Larvesta', 'Volcarona', 'Cobalion',
  'Terrakion', 'Virizion', 'Tornadus', 'Thundurus', 'Reshiram',
  'Zekrom', 'Landorus', 'Kyurem', 'Keldeo', 'Meloetta',
  'Genesect'];

const GenerationSix = ['Chespin', 'Quilladin', 'Chesnaught', 'Fennekin',
  'Braixen', 'Delphox', 'Froakie', 'Frogadier', 'Greninja',
  'Bunnelby', 'Diggersby', 'Fletchling', 'Fletchinder', 'Talonflame',
  'Scatterbug', 'Spewpa', 'Vivillon', 'Litleo', 'Pyroar',
  'Flabebe', 'Floette', 'Florges', 'Skiddo', 'Gogoat',
  'Pancham', 'Pangoro', 'Furfrou', 'Espurr', 'Meowstic',
  'Honedge', 'Doublade', 'Aegislash', 'Spritzee', 'Aromatisse',
  'Swirlix', 'Slurpuff', 'Inkay', 'Malamar', 'Binacle',
  'Barbaracle', 'Skrelp', 'Dragalge', 'Clauncher', 'Clawitzer',
  'Helioptile', 'Heliolisk', 'Tyrunt', 'Tyrantrum', 'Amaura',
  'Aurorus', 'Sylveon', 'Hawlucha', 'Dedenne', 'Carbink',
  'Goomy', 'Sliggoo', 'Goodra', 'Klefki', 'Phantump',
  'Trevenant', 'Pumpkaboo', 'Gourgeist', 'Bergmite', 'Avalugg',
  'Noibat', 'Noivern', 'Xerneas', 'Yveltal', 'Zygarde',
  'Diancie', 'Hoopa', 'Volcanion'];

const GenerationSeven = ['Rowlet', 'Dartrix',
  'Decidueye', 'Litten', 'Torracat', 'Incineroar', 'Popplio',
  'Brionne', 'Primarina', 'Pikipek', 'Trumbeak', 'Toucannon',
  'Yungoos', 'Gumshoos', 'Grubbin', 'Charjabug', 'Vikavolt',
  'Crabrawler', 'Crabominable', 'Oricorio', 'Cutiefly', 'Ribombee',
  'Rockruff', 'Lycanroc', 'Wishiwashi', 'Mareanie', 'Toxapex',
  'Mudbray', 'Mudsdale', 'Dewpider', 'Araquanid', 'Fomantis',
  'Lurantis', 'Morelull', 'Shiinotic', 'Salandit', 'Salazzle',
  'Stufful', 'Bewear', 'Bounsweet', 'Steenee', 'Tsareena',
  'Comfey', 'Oranguru', 'Passimian', 'Wimpod', 'Golisopod',
  'Sandygast', 'Palossand', 'Pyukumuku', 'Type:Null', 'Silvally',
  'Minior', 'Komala', 'Turtonator', 'Togedemaru', 'Mimikyu',
  'Bruxish', 'Drampa', 'Dhelmise', 'Jangmo-o', 'Hakamo-o',
  'Kommo-o', 'TapuKoko', 'TapuLele', 'TapuBulu', 'TapuFini',
  'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Nihilego',
  'Buzzwole', 'Pheromosa', 'Xurkitree', 'Celesteela', 'Kartana',
  'Guzzlord', 'Necrozma', 'Magearna', 'Marshadow'];

const AmorphousEgg = ['Koffing', 'Weezing', 'Misdreavus', 'Wobbuffet', 'Slugma',
  'Magcargo', 'Ralts', 'Kirlia', 'Gardevoir', 'Gulpin',
  'Swalot', 'Castform', 'Shuppet', 'Banette', 'Duskull',
  'Dusclops', 'Chimecho', 'Shellos', 'Gastrodon', 'Drifloon',
  'Drifblim', 'Mismagius', 'Spiritomb', 'Gallade', 'Dusknoir',
  'Rotom', 'Yamask', 'Cofagrigus', 'Solosis', 'Duosion',
  'Reuniclus', 'Frillish', 'Jellicent', 'Tynamo', 'Eelektrik',
  'Eelektross', 'Litwick', 'Lampent', 'Chandelure', 'Stunfisk',
  'Phantump', 'Trevenant', 'Pumpkaboo', 'Gourgeist', 'Sandygast',
  'Palossand', 'Mimikyu', 'Grimer', 'Muk', 'Gastly',
  'Haunter', 'Gengar'];

const BugEgg = ['Scyther', 'Pinsir', 'Ledyba', 'Ledian', 'Spinarak',
  'Ariados', 'Yanma', 'Pineco', 'Forretress', 'Gligar',
  'Scizor', 'Shuckle', 'Heracross', 'Wurmple', 'Silcoon',
  'Beautifly', 'Cascoon', 'Dustox', 'Surskit', 'Masquerain',
  'Nincada', 'Ninjask', 'Volbeat', 'Illumise', 'Trapinch',
  'Vibrava', 'Flygon', 'Kricketot', 'Kricketune', 'Burmy',
  'Wormadam', 'Mothim', 'Combee', 'Vespiquen', 'Skorupi',
  'Drapion', 'Yanmega', 'Gliscor', 'Sewaddle', 'Swadloon',
  'Leavanny', 'Venipede', 'Whirlipede', 'Scolipede', 'Dwebble',
  'Crustle', 'Karrablast', 'Escavalier', 'Joltik', 'Galvantula',
  'Shelmet', 'Accelgor', 'Durant', 'Larvesta', 'Volcarona',
  'Scatterbug', 'Scatterbug', 'Spewpa', 'Vivillon', 'Grubbin',
  'Charjabug', 'Charjabug', 'Vikavolt', 'Cutiefly', 'Ribombee',
  'Dewpider', 'Araquanid', 'Wimpod', 'Golisopod', 'Caterpie',
  'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill',
  'Paras', 'Parasect', 'Venonat', 'Venomoth'];

const DragonEgg = ['Horsea', 'Seadra', 'Magikarp', 'Gyarados', 'Dratini',
  'Dragonair', 'Dragonair', 'Dragonite', 'Dragonite', 'Kingdra',
  'Treecko', 'Grovyle', 'Sceptile', 'Swablu', 'Altaria',
  'Seviper', 'Feebas', 'Milotic', 'Bagon', 'Shelgon',
  'Salamence', 'Gible', 'Gabite', 'Garchomp', 'Scraggy',
  'Scrafty', 'Axew', 'Fraxure', 'Haxorus', 'Druddigon',
  'Deino', 'Zweilous', 'Hydreigon', 'Skrelp', 'Dragalge',
  'Helioptile', 'Heliolisk', 'Tyrunt', 'Tyrantrum', 'Goomy',
  'Sliggoo', 'Goodra', 'Salandit', 'Salazzle', 'Turtonator',
  'Drampa', 'Jangmo-o', 'Hakamo-o', 'Kommo-o', 'Charmander',
  'Charmeleon', 'Charizard', 'Ekans', 'Arbok'];

const FairyEgg = ['Chansey', 'Togetic', 'Marill', 'Azumarill', 'Hoppip',
  'Skiploom', 'Jumpluff', 'Snubbull', 'Granbull', 'Blissey',
  'Shroomish', 'Breloom', 'Skitty', 'Delcatty', 'Mawile',
  'Plusle', 'Minun', 'Roselia', 'Castform', 'Snorunt',
  'Glalie', 'Roserade', 'Pachirisu', 'Cherubi', 'Cherrim',
  'Togekiss', 'Froslass', 'Phione', 'Manaphy', 'Audino',
  'Cottonee', 'Whimsicott', 'Flabébé', 'Floette', 'Florges',
  'Spritzee', 'Aromatisse', 'Swirlix', 'Slurpuff', 'Dedenne',
  'Carbink', 'Cutiefly', 'Ribombee', 'Togedemaru', 'Pikachu',
  'Raichu', 'Clefairy', 'Clefairy', 'Clefable', 'Jigglypuff',
  'Wigglytuff'];

const FieldEgg = ['Rhyhorn', 'Rhydon', 'Tauros', 'Eevee', 'Vaporeon',
  'Jolteon', 'Flareon', 'Cyndaquil', 'Quilava', 'Typhlosion',
  'Sentret', 'Furret', 'Mareep', 'Flaaffy', 'Ampharos',
  'Aipom', 'Wooper', 'Quagsire', 'Espeon', 'Umbreon',
  'Girafarig', 'Dunsparce', 'Snubbull', 'Granbull', 'Sneasel',
  'Teddiursa', 'Ursaring', 'Swinub', 'Piloswine', 'Delibird',
  'Houndour', 'Houndoom', 'Phanpy', 'Donphan', 'Stantler',
  'Smeargle', 'Miltank', 'Torchic', 'Combusken', 'Blaziken',
  'Poochyena', 'Mightyena', 'Zigzagoon', 'Linoone', 'Seedot',
  'Nuzleaf', 'Shiftry', 'Slakoth', 'Vigoroth', 'Slaking',
  'Whismur', 'Loudred', 'Exploud', 'Skitty', 'Delcatty',
  'Mawile', 'Electrike', 'Manectric', 'Wailmer', 'Wailord',
  'Numel', 'Camerupt', 'Torkoal', 'Spoink', 'Grumpig',
  'Spinda', 'Zangoose', 'Seviper', 'Kecleon', 'Absol',
  'Spheal', 'Sealeo', 'Walrein', 'Chimchar', 'Monferno', 'Infernape',
  'Piplup', 'Prinplup', 'Empoleon', 'Bidoof', 'Bibarel',
  'Shinx', 'Luxio', 'Luxray', 'Pachirisu', 'Buizel',
  'Floatzel', 'Ambipom', 'Buneary', 'Lopunny', 'Glameow',
  'Purugly', 'Stunky', 'Skuntank', 'Lucario', 'Hippopotas',
  'Hippowdon', 'Weavile', 'Rhyperior', 'Leafeon', 'Glaceon',
  'Mamoswine', 'Snivy', 'Servine', 'Serperior', 'Tepig',
  'Pignite', 'Emboar', 'Oshawott', 'Dewott', 'Samurott',
  'Patrat', 'Watchog', 'Lillipup', 'Herdier', 'Stoutland',
  'Purrloin', 'Liepard', 'Pansage', 'Simisage', 'Pansear',
  'Simisear', 'Panpour', 'Simipour', 'Munna', 'Musharna',
  'Blitzle', 'Zebstrika', 'Woobat', 'Swoobat', 'Drilbur',
  'Excadrill', 'Sandile', 'Krokorok', 'Krookodile', 'Darumaka',
  'Darmanitan', 'Scraggy', 'Scrafty', 'Zorua', 'Zoroark',
  'Minccino', 'Cinccino', 'Deerling', 'Sawsbuck', 'Emolga',
  'Cubchoo', 'Beartic', 'Mienfoo', 'Mienshao', 'Bouffalant',
  'Heatmor', 'Chespin', 'Quilladin', 'Chesnaught', 'Fennekin', 'Braixen',
  'Delphox', 'Bunnelby', 'Diggersby', 'Litleo', 'Pyroar',
  'Skiddo', 'Gogoat', 'Pancham', 'Pangoro', 'Furfrou',
  'Espurr', 'Meowstic', 'Sylveon', 'Dedenne', 'Litten',
  'Torracat', 'Incineroar', 'Popplio', 'Brionne', 'Primarina',
  'Yungoos', 'Gumshoos', 'Rockruff', 'Lycanroc', 'Mudbray',
  'Mudsdale', 'Stufful', 'Bewear', 'Oranguru', 'Passimian',
  'Komala', 'Togedemaru', 'Rattata', 'Raticate', 'Ekans',
  'Arbok', 'Pikachu', 'Raichu', 'Sandshrew', 'Sandslash',
  'Nidoran?', 'Nidoran?', 'Nidorino', 'Nidoking', 'Vulpix',
  'Ninetales', 'Diglett', 'Dugtrio', 'Meowth', 'Persian',
  'Psyduck', 'Golduck', 'Mankey', 'Primeape', 'Growlithe',
  'Arcanine', 'Ponyta', 'Rapidash', "Farfetch'd", 'Seel',
  'Dewgong'];

const FlyingEgg = ['Aerodactyl', 'Hoothoot', 'Noctowl', 'Crobat', 'Togetic',
  'Natu', 'Xatu', 'Murkrow', 'Skarmory', 'Taillow',
  'Swellow', 'Wingull', 'Pelipper', 'Swablu', 'Altaria',
  'Starly', 'Staravia', 'Staraptor', 'Honchkrow', 'Chatot',
  'Togekiss', 'Pidove', 'Tranquill', 'Unfezant', 'Woobat',
  'Swoobat', 'Sigilyph', 'Archen', 'Archeops', 'Ducklett',
  'Swanna', 'Rufflet', 'Braviary', 'Vullaby', 'Mandibuzz',
  'Fletchling', 'Fletchinder', 'Talonflame', 'Noibat', 'Noivern',
  'Rowlet', 'Dartrix', 'Decidueye', 'Pikipek', 'Trumbeak',
  'Toucannon', 'Oricorio', 'Pidgey', 'Pidgeotto', 'Pidgeot',
  'Spearow', 'Fearow', 'Zubat', 'Golbat', "Farfetch'd",
  'Doduo', 'Dodrio'];

const GrassEgg = ['Exeggcute', 'Exeggutor', 'Tangela', 'Chikorita', 'Bayleef',
  'Meganium', 'Bellossom', 'Hoppip', 'Skiploom', 'Jumpluff',
  'Sunkern', 'Sunflora', 'Lotad', 'Lombre', 'Ludicolo',
  'Seedot', 'Nuzleaf', 'Shiftry', 'Shroomish', 'Breloom',
  'Roselia', 'Cacnea', 'Cacturne', 'Tropius', 'Turtwig',
  'Grotle', 'Torterra', 'Roserade', 'Cherubi', 'Cherrim',
  'Carnivine', 'Snover', 'Abomasnow', 'Tangrowth', 'Snivy',
  'Servine', 'Serperior', 'Cottonee', 'Whimsicott', 'Petilil',
  'Lilligant', 'Maractus', 'Foongus', 'Amoonguss', 'Ferroseed',
  'Ferrothorn', 'Phantump', 'Trevenant', 'Fomantis', 'Lurantis',
  'Morelull', 'Shiinotic', 'Bounsweet', 'Steenee', 'Tsareena',
  'Comfey', 'Bulbasaur', 'Ivysaur', 'Venusaur', 'Oddish',
  'Gloom', 'Vileplume', 'Paras', 'Parasect', 'Bellsprout',
  'Weepinbell', 'Victreebel'];

const HumanLikeEgg = ['Hitmonlee', 'Hitmonchan', 'Mr. Mime', 'Jynx',
  'Electabuzz', 'Magmar', 'Hitmontop', 'Makuhita', 'Hariyama',
  'Sableye', 'Meditite', 'Medicham', 'Volbeat', 'Illumise',
  'Spinda', 'Cacnea', 'Cacturne', 'Chimchar', 'Monferno',
  'Infernape', 'Buneary', 'Lopunny', 'Lucario', 'Croagunk',
  'Toxicroak', 'Electivire', 'Magmortar', 'Timburr', 'Gurdurr',
  'Conkeldurr', 'Throh', 'Sawk', 'Gothita', 'Gothorita',
  'Gothitelle', 'Elgyem', 'Beheeyem', 'Mienfoo', 'Mienshao',
  'Pawniard', 'Bisharp', 'Pancham', 'Pangoro', 'Hawlucha',
  'Abra', 'Kadabra', 'Alakazam', 'Machop', 'Machoke',
  'Machamp', 'Drowzee', 'Hypno'];

const MineralEgg = ['Voltorb', 'Electrode', 'Porygon', 'Sudowoodo', 'Steelix',
  'Porygon2', 'Shedinja', 'Nosepass', 'Lunatone', 'Solrock',
  'Baltoy', 'Claydol', 'Snorunt', 'Glalie', 'Beldum',
  'Metang', 'Metagross', 'Bronzor', 'Bronzong', 'Magnezone',
  'Porygon-Z', 'Probopass', 'Froslass', 'Roggenrola', 'Boldore',
  'Gigalith', 'Dwebble', 'Crustle', 'Yamask', 'Cofagrigus',
  'Trubbish', 'Garbodor', 'Vanillite', 'Vanillish', 'Vanilluxe',
  'Ferroseed', 'Ferrothorn', 'Klink', 'Klang', 'Klinklang',
  'Cryogonal', 'Golett', 'Golurk', 'Honedge', 'Doublade',
  'Aegislash', 'Carbink', 'Klefki', 'Minior', 'Dhelmise',
  'Geodude', 'Graveler', 'Golem', 'Magnemite', 'Magneton',
  'Onix'];

const MonsterEgg = ['Cubone', 'Marowak', 'Lickitung', 'Rhyhorn', 'Rhydon',
  'Kangaskhan', 'Lapras', 'Snorlax', 'Chikorita', 'Bayleef',
  'Meganium', 'Totodile', 'Croconaw', 'Feraligatr', 'Mareep',
  'Flaaffy', 'Ampharos', 'Slowking', 'Larvitar', 'Pupitar',
  'Tyranitar', 'Treecko', 'Grovyle', 'Sceptile', 'Mudkip',
  'Marshtomp', 'Swampert', 'Whismur', 'Loudred', 'Exploud',
  'Aron', 'Lairon', 'Aggron', 'Tropius', 'Turtwig',
  'Grotle', 'Torterra', 'Cranidos', 'Rampardos', 'Shieldon',
  'Bastiodon', 'Gible', 'Gabite', 'Garchomp', 'Snover',
  'Abomasnow', 'Lickilicky', 'Rhyperior', 'Axew', 'Fraxure',
  'Haxorus', 'Druddigon', 'Helioptile', 'Heliolisk', 'Tyrunt',
  'Tyrantrum', 'Amaura', 'Aurorus', 'Bergmite', 'Avalugg',
  'Salandit', 'Salazzle', 'Turtonator', 'Drampa', 'Bulbasaur',
  'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard',
  'Squirtle', 'Wartortle', 'Blastoise', 'Nidoran?', 'Nidoran?',
  'Nidorino', 'Nidoking', 'Slowpoke', 'Slowbro'];

const Water1Egg = ['Horsea', 'Seadra', 'Lapras', 'Omanyte', 'Omastar',
  'Kabuto', 'Kabutops', 'Dratini', 'Dragonair', 'Dragonite',
  'Totodile', 'Croconaw', 'Feraligatr', 'Marill', 'Azumarill',
  'Politoed', 'Wooper', 'Quagsire', 'Slowking', 'Corsola',
  'Remoraid', 'Octillery', 'Delibird', 'Mantine', 'Kingdra',
  'Mudkip', 'Marshtomp', 'Swampert', 'Lotad', 'Lombre',
  'Ludicolo', 'Wingull', 'Pelipper', 'Surskit', 'Masquerain',
  'Corphish', 'Crawdaunt', 'Feebas', 'Milotic', 'Spheal',
  'Sealeo', 'Walrein', 'Clamperl', 'Huntail', 'Gorebyss',
  'Relicanth', 'Piplup', 'Prinplup', 'Empoleon', 'Bidoof',
  'Bibarel', 'Buizel', 'Floatzel', 'Shellos', 'Gastrodon',
  'Phione', 'Manaphy', 'Tympole', 'Palpitoad', 'Seismitoad',
  'Tirtouga', 'Carracosta', 'Ducklett', 'Swanna', 'Alomomola',
  'Stunfisk', 'Froakie', 'Frogadier', 'Greninja', 'Inkay',
  'Malamar', 'Skrelp', 'Dragalge', 'Clauncher', 'Clawitzer',
  'Popplio', 'Brionne', 'Primarina', 'Mareanie', 'Toxapex',
  'Dewpider', 'Araquanid', 'Pyukumuku', 'Squirtle', 'Wartortle',
  'Blastoise', 'Psyduck', 'Golduck', 'Poliwag', 'Poliwhirl',
  'Poliwrath', 'Slowpoke', 'Slowbro', 'Seel', 'Dewgong'];

const Water2Egg = ['Goldeen', 'Seaking', 'Magikarp', 'Gyarados', 'Chinchou',
  'Lanturn', 'Qwilfish', 'Remoraid', 'Octillery', 'Carvanha',
  'Sharpedo', 'Wailmer', 'Wailord', 'Barboach', 'Whiscash',
  'Relicanth', 'Luvdisc', 'Finneon', 'Lumineon', 'Basculin',
  'Alomomola', 'Inkay', 'Malamar', 'Wishiwashi', 'Bruxish'];

const DittoEgg = ['Ditto', 'Ditto', 'Ditto', 'Ditto', 'Ditto',
  'Ditto'];

const UndisoveredEgg = ['Articuno', 'Zapdos', 'Moltres', 'Mewtwo', 'Mew',
  'Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Unown',
  'Tyrogue', 'Smoochum', 'Elekid', 'Magby', 'Raikou',
  'Entei', 'Suicune', 'Lugia', 'Ho-Oh', 'Celebi',
  'Azurill', 'Wynaut', 'Regirock', 'Regice', 'Registeel',
  'Latias', 'Latios', 'Kyogre', 'Groudon', 'Rayquaza',
  'Jirachi', 'Deoxys', 'Budew', 'Chingling', 'Bonsly',
  'Mime Jr.', 'Happiny', 'Munchlax', 'Riolu', 'Mantyke',
  'Uxie', 'Mesprit', 'Azelf', 'Dialga', 'Palkia',
  'Heatran', 'Regigigas', 'Giratina', 'Cresselia', 'Darkrai',
  'Shaymin', 'Arceus', 'Victini', 'Cobalion', 'Terrakion',
  'Virizion', 'Tornadus', 'Thundurus', 'Reshiram', 'Zekrom',
  'Landorus', 'Kyurem', 'Keldeo', 'Meloetta', 'Genesect',
  'Xerneas', 'Yveltal', 'Zygarde', 'Diancie', 'Hoopa',
  'Volcanion', 'Type:', 'Silvally', 'Tapu', 'Tapu',
  'Tapu', 'Tapu', 'Cosmog', 'Cosmoem', 'Solgaleo',
  'Lunala', 'Nihilego', 'Buzzwole', 'Pheromosa', 'Xurkitree',
  'Celesteela', 'Kartana', 'Guzzlord', 'Necrozma', 'Magearna',
  'Nidorina', 'Nidoqueen'];

module.exports = {
  name: 'pokemon',
  func(msg, { send, args, prefix }) {
    // Incase nothing is said
    if (!args[0]) {
      return send(`Please type " {}pokemon help " to continue.`.replace(/{}/g, prefix));
    }

    // For the help command
    if (args[0] === 'help') {
      return send(`Please type in the following secondary commands to use **${_.escapeRegExp(prefix)}**pokemon\n**${_.escapeRegExp(prefix)}**pokemon all\n**${_.escapeRegExp(prefix)}**pokemon gen1\n**${_.escapeRegExp(prefix)}**pokemon gen2\n**${_.escapeRegExp(prefix)}**pokemon gen3\n**${_.escapeRegExp(prefix)}**pokemon gen4\n**${_.escapeRegExp(prefix)}**pokemon gen5\n**${_.escapeRegExp(prefix)}**pokemon gen6\n**${_.escapeRegExp(prefix)}**pokemon gen7\n**${_.escapeRegExp(prefix)}**pokemon 3all\n**${_.escapeRegExp(prefix)}**pokemon 3gen1\n**${_.escapeRegExp(prefix)}**pokemon 3gen2\n**${_.escapeRegExp(prefix)}**pokemon 3gen3\n**${_.escapeRegExp(prefix)}**pokemon 3gen4\n**${_.escapeRegExp(prefix)}**pokemon 3gen5\n**${_.escapeRegExp(prefix)}**pokemon 3gen6\n**${_.escapeRegExp(prefix)}**pokemon 3gen7\n**${_.escapeRegExp(prefix)}**pokemon 6all\n**${_.escapeRegExp(prefix)}**pokemon 6gen1\n**${_.escapeRegExp(prefix)}**pokemon 6gen2\n**${_.escapeRegExp(prefix)}**pokemon 6gen3\n**${_.escapeRegExp(prefix)}**pokemon 6gen4\n**${_.escapeRegExp(prefix)}**pokemon 6gen5\n**${_.escapeRegExp(prefix)}**pokemon 6gen6\n**${_.escapeRegExp(prefix)}**pokemon 6gen7\n**${_.escapeRegExp(prefix)}**pokemon egg`);
    }

    // Start of the Generation Commands
    // All Generations (1)
    if (args[0] === 'all') {
      COUNT = 1;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(AllPokemon[~~(AllPokemon.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // All Generations (3)
    if (args[0] === '3all') {
      COUNT = 3;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(AllPokemon[~~(AllPokemon.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // All Generations (6)
    if (args[0] === '6all') {
      COUNT = 6;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(AllPokemon[~~(AllPokemon.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation One (1)
    if (args[0] === 'gen1') {
      COUNT = 1;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationOne[~~(GenerationOne.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation One (3)
    if (args[0] === '3gen1') {
      COUNT = 3;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationOne[~~(GenerationOne.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation One (6)
    if (args[0] === '6gen1') {
      COUNT = 6;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationOne[~~(GenerationOne.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Two (1)
    if (args[0] === 'gen2') {
      COUNT = 1;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationTwo[~~(GenerationTwo.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Two (3)
    if (args[0] === '3gen2') {
      COUNT = 3;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationTwo[~~(GenerationTwo.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Two (6)
    if (args[0] === '6gen2') {
      COUNT = 6;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationTwo[~~(GenerationTwo.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Three (1)
    if (args[0] === 'gen3') {
      COUNT = 1;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationThree[~~(GenerationThree.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Three (3)
    if (args[0] === '3gen3') {
      COUNT = 3;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationThree[~~(GenerationThree.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Three (6)
    if (args[0] === '6gen3') {
      COUNT = 6;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationThree[~~(GenerationThree.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Four (1)
    if (args[0] === 'gen4') {
      COUNT = 1;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationFour[~~(GenerationFour.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Four (3)
    if (args[0] === '3gen4') {
      COUNT = 3;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationFour[~~(GenerationFour.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Four (6)
    if (args[0] === '6gen4') {
      COUNT = 6;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationFour[~~(GenerationFour.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Five (1)
    if (args[0] === 'gen5') {
      COUNT = 1;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationFive[~~(GenerationFive.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Five (3)
    if (args[0] === '3gen5') {
      COUNT = 3;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationFive[~~(GenerationFive.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Five (6)
    if (args[0] === '6gen5') {
      COUNT = 6;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationFive[~~(GenerationFive.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Six (1)
    if (args[0] === 'gen6') {
      COUNT = 1;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationSix[~~(GenerationSix.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Six (3)
    if (args[0] === '3gen6') {
      COUNT = 3;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationSix[~~(GenerationSix.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Six (6)
    if (args[0] === '6gen6') {
      COUNT = 6;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationSix[~~(GenerationSix.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Seven (1)
    if (args[0] === 'gen7') {
      COUNT = 1;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationSeven[~~(GenerationSeven.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Seven (3)
    if (args[0] === '3gen7') {
      COUNT = 3;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationSeven[~~(GenerationSeven.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Seven (6)
    if (args[0] === '6gen7') {
      COUNT = 6;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationSeven[~~(GenerationSeven.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Eggs!
    if (args[0] === 'egg') {
      // Egg Check
      if (!args[1]) {
        return send(`Please enter one of the following commands for an egg group filter\n**${_.escapeRegExp(prefix)}**pokemon egg amorph\n**${_.escapeRegExp(prefix)}**pokemon egg 3amorph\n**${_.escapeRegExp(prefix)}**pokemon egg 6amorph\n**${_.escapeRegExp(prefix)}**pokemon egg bug\n**${_.escapeRegExp(prefix)}**pokemon egg 3bug\n**${_.escapeRegExp(prefix)}**pokemon egg 6bug\n**${_.escapeRegExp(prefix)}**pokemon egg dragon\n**${_.escapeRegExp(prefix)}**pokemon egg 3dragon\n**${_.escapeRegExp(prefix)}**pokemon egg 6dragon\n**${_.escapeRegExp(prefix)}**pokemon egg fairy\n**${_.escapeRegExp(prefix)}**pokemon egg 3fairy\n**${_.escapeRegExp(prefix)}**pokemon egg 6fairy!\n**${_.escapeRegExp(prefix)}**pokemon egg field\n**${_.escapeRegExp(prefix)}**pokemon egg 3field\n**${_.escapeRegExp(prefix)}**pokemon egg 6field\n**${_.escapeRegExp(prefix)}**pokemon egg flying\n**${_.escapeRegExp(prefix)}**pokemon egg 3flying\n**${_.escapeRegExp(prefix)}**pokemon egg 6flying\n**${_.escapeRegExp(prefix)}**pokemon egg grass\n**${_.escapeRegExp(prefix)}**pokemon egg 3grass\n**${_.escapeRegExp(prefix)}**pokemon egg 6grass\n**${_.escapeRegExp(prefix)}**pokemon egg human\n**${_.escapeRegExp(prefix)}**pokemon egg 3human\n**${_.escapeRegExp(prefix)}**pokemon egg 6human\n**${_.escapeRegExp(prefix)}**pokemon egg mineral\n**${_.escapeRegExp(prefix)}**pokemon egg 3mineral\n**${_.escapeRegExp(prefix)}**pokemon egg 6mineral\n**${_.escapeRegExp(prefix)}**pokemon egg monster\n**${_.escapeRegExp(prefix)}**pokemon egg 3monster\n**${_.escapeRegExp(prefix)}**pokemon egg 6monster\n**${_.escapeRegExp(prefix)}**pokemon egg water1\n**${_.escapeRegExp(prefix)}**pokemon egg 3water1\n**${_.escapeRegExp(prefix)}**pokemon egg 6water1\n**${_.escapeRegExp(prefix)}**pokemon egg water2\n**${_.escapeRegExp(prefix)}**pokemon egg 3water2\n**${_.escapeRegExp(prefix)}**pokemon egg 6water2\n**${_.escapeRegExp(prefix)}**pokemon egg water3\n**${_.escapeRegExp(prefix)}**pokemon egg 3water3\n**${_.escapeRegExp(prefix)}**pokemon egg 6water3\n**${_.escapeRegExp(prefix)}**pokemon egg ditto\n**${_.escapeRegExp(prefix)}**pokemon egg 3ditto\n**${_.escapeRegExp(prefix)}**pokemon egg 6ditto\n**${_.escapeRegExp(prefix)}**pokemon egg undisc\n**${_.escapeRegExp(prefix)}**pokemon egg 3undisc\n**${_.escapeRegExp(prefix)}**pokemon egg 6undisc`);
      }

      // Amorphous Eggs (1)
      if (args[1] === 'amorph') {
        COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(AmorphousEgg[~~(AmorphousEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Amorphous Eggs (3)
      if (args[1] === '3amorph') {
        COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(AmorphousEgg[~~(AmorphousEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Amorphous Eggs (6)
      if (args[1] === '6amorph') {
        COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(AmorphousEgg[~~(AmorphousEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Bug Eggs (1)
      if (args[1] === 'bug') {
        COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(BugEgg[~~(BugEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Bug Eggs (3)
      if (args[1] === '3bug') {
        COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(BugEgg[~~(BugEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Bug Eggs (6)
      if (args[1] === '6bug') {
        COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(BugEgg[~~(BugEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Dragon Eggs (1)
      if (args[1] === 'dragon') {
        COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(DragonEgg[~~(DragonEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Dragon Eggs (3)
      if (args[1] === '3dragon') {
        COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(DragonEgg[~~(DragonEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Dragon Eggs (6)
      if (args[1] === '6dragon') {
        COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(DragonEgg[~~(DragonEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Fairy Eggs (1)
      if (args[1] === 'fairy') {
        COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(FairyEgg[~~(FairyEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Fairy Eggs (3)
      if (args[1] === '3fairy') {
        COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(FairyEgg[~~(FairyEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Fairy Eggs (6)
      if (args[1] === '6fairy') {
        COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(FairyEgg[~~(FairyEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Field Eggs (1)
      if (args[1] === 'field') {
        COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(FieldEgg[~~(FieldEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Field Eggs (3)
      if (args[1] === '3field') {
        COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(FieldEgg[~~(FieldEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Field Eggs (6)
      if (args[1] === '6field') {
        COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(FieldEgg[~~(FieldEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Flying Eggs (1)
      if (args[1] === 'flying') {
        COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(FlyingEgg[~~(FlyingEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Flying Eggs (3)
      if (args[1] === '3flying') {
        COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(FlyingEgg[~~(FlyingEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Flying Eggs (6)
      if (args[1] === '6flying') {
        COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(FlyingEgg[~~(FlyingEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Grass Eggs (1)
      if (args[1] === 'grass') {
        COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(GrassEgg[~~(GrassEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Grass Eggs (3)
      if (args[1] === '3grass') {
        COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(GrassEgg[~~(GrassEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Grass Eggs (6)
      if (args[1] === '6grass') {
        COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(GrassEgg[~~(GrassEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Human-Like Eggs (1)
      if (args[1] === 'human') {
        COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(HumanLikeEgg[~~(HumanLikeEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Human-Like Eggs (3)
      if (args[1] === '3human') {
        COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(HumanLikeEgg[~~(HumanLikeEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Human-Like Eggs (6)
      if (args[1] === '6human') {
        COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(HumanLikeEgg[~~(HumanLikeEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Mineral Eggs (1)
      if (args[1] === 'mineral') {
        COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(MineralEgg[~~(MineralEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Mineral Eggs (3)
      if (args[1] === '3mineral') {
        COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(MineralEgg[~~(MineralEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Mineral Eggs (3)
      if (args[1] === '6mineral') {
        COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(MineralEgg[~~(MineralEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Monster Eggs (1)
      if (args[1] === 'monster') {
        COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(MonsterEgg[~~(MonsterEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Monster Eggs (3)
      if (args[1] === '3monster') {
        COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(MonsterEgg[~~(MonsterEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Monster Eggs (6)
      if (args[1] === '6monster') {
        COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(MonsterEgg[~~(MonsterEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Water 1 Eggs (1)
      if (args[1] === 'water1') {
        COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(Water1Egg[~~(Water1Egg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Water 1 Eggs (3)
      if (args[1] === '3water1') {
        COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(Water1Egg[~~(Water1Egg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Water 1 Eggs (6)
      if (args[1] === '6water1') {
        COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(Water1Egg[~~(Water1Egg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Water 2 Eggs (1)
      if (args[1] === 'water2') {
        COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(Water2Egg[~~(Water2Egg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Water 2 Eggs (3)
      if (args[1] === '3water2') {
        COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(Water2Egg[~~(Water2Egg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Water 2 Eggs (6)
      if (args[1] === '6water2') {
        COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(Water2Egg[~~(Water2Egg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Ditto Eggs (1)
      if (args[1] === 'ditto') {
        return send(`${DittoEgg[Math.floor(DittoEgg.length * Math.random())]}`);
      }

      // Ditto Eggs (3)
      if (args[1] === '3ditto') {
        return send(`Ditto, Ditto, Ditto`);
      }

      // Ditto Eggs (6)
      if (args[1] === '6ditto') {
        return send(`Ditto, Ditto, Ditto, Ditto, Ditto, Ditto`);
      }

      // Undiscovered Eggs (1)
      if (args[1] === 'undisc') {
        COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(UndisoveredEgg[~~(UndisoveredEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Undiscovered Eggs (3)
      if (args[1] === '3undisc') {
        COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(UndisoveredEgg[~~(UndisoveredEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Undiscovered Eggs (6)
      if (args[1] === '6undisc') {
        COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(UndisoveredEgg[~~(UndisoveredEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }
    }
    // End of eggs brackets
    return send('Uh-oh. Contact Evildeathpro#4442 because there was an error!');
  },
};

  'Entei', 'Suicune', 'Larvitar', 'Pupitar', 'Tyranitar',
  'Lugia', 'Ho-Oh', 'Celebi', 'Treecko', 'Grovyle',
  'Sceptile', 'Torchic', 'Combusken', 'Blaziken', 'Mudkip',
  'Marshtomp', 'Swampert', 'Poochyena', 'Mightyena', 'Zigzagoon',
  'Linoone', 'Wurmple', 'Silcoon', 'Beautifly', 'Cascoon',
  'Dustox', 'Lotad', 'Lombre', 'Ludicolo', 'Seedot',
  'Nuzleaf', 'Shiftry', 'Taillow', 'Swellow', 'Wingull',
  'Pelipper', 'Ralts', 'Kirlia', 'Gardevoir', 'Surskit',
  'Masquerain', 'Shroomish', 'Breloom', 'Slakoth', 'Vigoroth',
  'Slaking', 'Nincada', 'Ninjask', 'Shedinja', 'Whismur',
  'Loudred', 'Exploud', 'Makuhita', 'Hariyama', 'Azurill',
  'Nosepass', 'Skitty', 'Delcatty', 'Sableye', 'Mawile',
  'Aron', 'Lairon', 'Aggron', 'Meditite', 'Medicham',
  'Electrike', 'Manectric', 'Plusle', 'Minun', 'Volbeat',
  'Illumise', 'Roselia', 'Gulpin', 'Swalot', 'Carvanha',
  'Sharpedo', 'Wailmer', 'Wailord', 'Numel', 'Camerupt',
  'Torkoal', 'Spoink', 'Grumpig', 'Spinda', 'Trapinch',
  'Vibrava', 'Flygon', 'Cacnea', 'Cacturne', 'Swablu',
  'Altaria', 'Zangoose', 'Seviper', 'Lunatone', 'Solrock',
  'Barboach', 'Whiscash', 'Corphish', 'Crawdaunt', 'Baltoy',
  'Claydol', 'Lileep', 'Cradily', 'Anorith', 'Armaldo',
  'Feebas', 'Milotic', 'Castform', 'Kecleon', 'Shuppet',
  'Banette', 'Duskull', 'Dusclops', 'Tropius', 'Chimecho',
  'Absol', 'Wynaut', 'Snorunt', 'Glalie', 'Spheal',
  'Sealeo', 'Walrein', 'Clamperl', 'Huntail', 'Gorebyss',
  'Relicanth', 'Luvdisc', 'Bagon', 'Shelgon', 'Salamence',
  'Beldum', 'Metang', 'Metagross', 'Regirock', 'Regice',
  'Registeel', 'Latias', 'Latios', 'Kyogre', 'Groudon',
  'Rayquaza', 'Jirachi', 'Deoxys', 'Turtwig', 'Grotle',
  'Torterra', 'Chimchar', 'Monferno', 'Infernape', 'Piplup',
  'Prinplup', 'Empoleon', 'Starly', 'Staravia', 'Staraptor',
  'Bidoof', 'Bibarel', 'Kricketot', 'Kricketune', 'Shinx',
  'Luxio', 'Luxray', 'Budew', 'Roserade', 'Cranidos',
  'Rampardos', 'Shieldon', 'Bastiodon', 'Burmy', 'Wormadam',
  'Mothim', 'Combee', 'Vespiquen', 'Pachirisu', 'Buizel',
  'Floatzel', 'Cherubi', 'Cherrim', 'Shellos', 'Gastrodon',
  'Ambipom', 'Drifloon', 'Drifblim', 'Buneary', 'Lopunny',
  'Mismagius', 'Honchkrow', 'Glameow', 'Purugly', 'Chingling',
  'Stunky', 'Skuntank', 'Bronzor', 'Bronzong', 'Bonsly',
  'MimeJr.', 'Happiny', 'Chatot', 'Spiritomb', 'Gible',
  'Gabite', 'Garchomp', 'Munchlax', 'Riolu', 'Lucario',
  'Hippopotas', 'Hippowdon', 'Skorupi', 'Drapion', 'Croagunk',
  'Toxicroak', 'Carnivine', 'Finneon', 'Lumineon', 'Mantyke',
  'Snover', 'Abomasnow', 'Weavile', 'Magnezone', 'Lickilicky',
  'Rhyperior', 'Tangrowth', 'Electivire', 'Magmortar', 'Togekiss',
  'Yanmega', 'Leafeon', 'Glaceon', 'Gliscor', 'Mamoswine',
  'Porygon-Z', 'Gallade', 'Probopass', 'Dusknoir', 'Froslass',
  'Rotom', 'Uxie', 'Mesprit', 'Azelf', 'Dialga',
  'Palkia', 'Heatran', 'Regigigas', 'Giratina', 'Cresselia',
  'Phione', 'Manaphy', 'Darkrai', 'Shaymin', 'Arceus',
  'Victini', 'Snivy', 'Servine', 'Serperior', 'Tepig',
  'Pignite', 'Emboar', 'Oshawott', 'Dewott', 'Samurott',
  'Patrat', 'Watchog', 'Lillipup', 'Herdier', 'Stoutland',
  'Purrloin', 'Liepard', 'Pansage', 'Simisage', 'Pansear',
  'Simisear', 'Panpour', 'Simipour', 'Munna', 'Musharna',
  'Pidove', 'Tranquill', 'Unfezant', 'Blitzle', 'Zebstrika',
  'Roggenrola', 'Boldore', 'Gigalith', 'Woobat', 'Swoobat',
  'Drilbur', 'Excadrill', 'Audino', 'Timburr', 'Gurdurr',
  'Conkeldurr', 'Tympole', 'Palpitoad', 'Seismitoad', 'Throh',
  'Sawk', 'Sewaddle', 'Swadloon', 'Leavanny', 'Venipede',
  'Whirlipede', 'Scolipede', 'Cottonee', 'Whimsicott', 'Petilil',
  'Lilligant', 'Basculin', 'Sandile', 'Krokorok', 'Krookodile',
  'Darumaka', 'Darmanitan', 'Maractus', 'Dwebble', 'Crustle',
  'Scraggy', 'Scrafty', 'Sigilyph', 'Yamask', 'Cofagrigus',
  'Tirtouga', 'Carracosta', 'Archen', 'Archeops', 'Trubbish',
  'Garbodor', 'Zorua', 'Zoroark', 'Minccino', 'Cinccino',
  'Gothita', 'Gothorita', 'Gothitelle', 'Solosis', 'Duosion',
  'Reuniclus', 'Ducklett', 'Swanna', 'Vanillite', 'Vanillish',
  'Vanilluxe', 'Deerling', 'Sawsbuck', 'Emolga', 'Karrablast',
  'Escavalier', 'Foongus', 'Amoonguss', 'Frillish', 'Jellicent',
  'Alomomola', 'Joltik', 'Galvantula', 'Ferroseed', 'Ferrothorn',
  'Klink', 'Klang', 'Klinklang', 'Tynamo', 'Eelektrik',
  'Eelektross', 'Elgyem', 'Beheeyem', 'Litwick', 'Lampent',
  'Chandelure', 'Axew', 'Fraxure', 'Haxorus', 'Cubchoo',
  'Beartic', 'Cryogonal', 'Shelmet', 'Accelgor', 'Stunfisk',
  'Mienfoo', 'Mienshao', 'Druddigon', 'Golett', 'Golurk',
  'Pawniard', 'Bisharp', 'Bouffalant', 'Rufflet', 'Braviary',
  'Vullaby', 'Mandibuzz', 'Heatmor', 'Durant', 'Deino',
  'Zweilous', 'Hydreigon', 'Larvesta', 'Volcarona', 'Cobalion',
  'Terrakion', 'Virizion', 'Tornadus', 'Thundurus', 'Reshiram',
  'Zekrom', 'Landorus', 'Kyurem', 'Keldeo', 'Meloetta',
  'Genesect', 'Chespin', 'Quilladin', 'Chesnaught', 'Fennekin',
  'Braixen', 'Delphox', 'Froakie', 'Frogadier', 'Greninja',
  'Bunnelby', 'Diggersby', 'Fletchling', 'Fletchinder', 'Talonflame',
  'Scatterbug', 'Spewpa', 'Vivillon', 'Litleo', 'Pyroar',
  'Flabebe', 'Floette', 'Florges', 'Skiddo', 'Gogoat',
  'Pancham', 'Pangoro', 'Furfrou', 'Espurr', 'Meowstic',
  'Honedge', 'Doublade', 'Aegislash', 'Spritzee', 'Aromatisse',
  'Swirlix', 'Slurpuff', 'Inkay', 'Malamar', 'Binacle',
  'Barbaracle', 'Skrelp', 'Dragalge', 'Clauncher', 'Clawitzer',
  'Helioptile', 'Heliolisk', 'Tyrunt', 'Tyrantrum', 'Amaura',
  'Aurorus', 'Sylveon', 'Hawlucha', 'Dedenne', 'Carbink',
  'Goomy', 'Sliggoo', 'Goodra', 'Klefki', 'Phantump',
  'Trevenant', 'Pumpkaboo', 'Gourgeist', 'Bergmite', 'Avalugg',
  'Noibat', 'Noivern', 'Xerneas', 'Yveltal', 'Zygarde',
  'Diancie', 'Hoopa', 'Volcanion', 'Rowlet', 'Dartrix',
  'Decidueye', 'Litten', 'Torracat', 'Incineroar', 'Popplio',
  'Brionne', 'Primarina', 'Pikipek', 'Trumbeak', 'Toucannon',
  'Yungoos', 'Gumshoos', 'Grubbin', 'Charjabug', 'Vikavolt',
  'Crabrawler', 'Crabominable', 'Oricorio', 'Cutiefly', 'Ribombee',
  'Rockruff', 'Lycanroc', 'Wishiwashi', 'Mareanie', 'Toxapex',
  'Mudbray', 'Mudsdale', 'Dewpider', 'Araquanid', 'Fomantis',
  'Lurantis', 'Morelull', 'Shiinotic', 'Salandit', 'Salazzle',
  'Stufful', 'Bewear', 'Bounsweet', 'Steenee', 'Tsareena',
  'Comfey', 'Oranguru', 'Passimian', 'Wimpod', 'Golisopod',
  'Sandygast', 'Palossand', 'Pyukumuku', 'Type:Null', 'Silvally',
  'Minior', 'Komala', 'Turtonator', 'Togedemaru', 'Mimikyu',
  'Bruxish', 'Drampa', 'Dhelmise', 'Jangmo-o', 'Hakamo-o',
  'Kommo-o', 'TapuKoko', 'TapuLele', 'TapuBulu', 'TapuFini',
  'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Nihilego',
  'Buzzwole', 'Pheromosa', 'Xurkitree', 'Celesteela', 'Kartana',
  'Guzzlord', 'Necrozma', 'Magearna', 'Marshadow'];

const GenerationOne = ['Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon',
  'Charizard', 'Squirtle', 'Wartortle', 'Blastoise', 'Caterpie',
  'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill',
  'Pidgey', 'Pidgeotto', 'Pidgeot', 'Rattata', 'Raticate',
  'Spearow', 'Fearow', 'Ekans', 'Arbok', 'Pikachu',
  'Raichu', 'Sandshrew', 'Sandslash', 'Nidoran?', 'Nidorina',
  'Nidoqueen', 'Nidoran?', 'Nidorino', 'Nidoking', 'Clefairy',
  'Clefable', 'Vulpix', 'Ninetales', 'Jigglypuff',
  'Wigglytuff', 'Zubat', 'Golbat', 'Oddish', 'Gloom',
  'Vileplume', 'Paras', 'Parasect', 'Venonat', 'Venomoth',
  'Diglett', 'Dugtrio', 'Meowth', 'Persian', 'Psyduck',
  'Golduck', 'Mankey', 'Primeape', 'Growlithe', 'Arcanine',
  'Poliwag', 'Poliwhirl', 'Poliwrath', 'Abra', 'Kadabra',
  'Alakazam', 'Machop', 'Machoke', 'Machamp', 'Bellsprout',
  'Weepinbell', 'Victreebel', 'Tentacool', 'Tentacruel', 'Geodude',
  'Graveler', 'Golem', 'Ponyta', 'Rapidash', 'Slowpoke',
  'Slowbro', 'Magnemite', 'Magneton', "Farfetch'd", 'Doduo',
  'Dodrio', 'Seel', 'Dewgong', 'Grimer', 'Muk',
  'Shellder', 'Cloyster', 'Gastly', 'Haunter', 'Gengar',
  'Onix', 'Drowzee', 'Hypno', 'Krabby', 'Kingler',
  'Voltorb', 'Electrode', 'Exeggcute', 'Exeggutor', 'Cubone',
  'Marowak', 'Hitmonlee', 'Hitmonchan', 'Lickitung', 'Koffing',
  'Weezing', 'Rhyhorn', 'Rhydon', 'Chansey', 'Tangela',
  'Kangaskhan', 'Horsea', 'Seadra', 'Goldeen', 'Seaking',
  'Staryu', 'Starmie', 'Mr.Mime', 'Scyther', 'Jynx',
  'Electabuzz', 'Magmar', 'Pinsir', 'Tauros', 'Magikarp',
  'Gyarados', 'Lapras', 'Ditto', 'Eevee', 'Vaporeon',
  'Jolteon', 'Flareon', 'Porygon', 'Omanyte', 'Omastar',
  'Kabuto', 'Kabutops', 'Aerodactyl', 'Snorlax', 'Articuno',
  'Zapdos', 'Moltres', 'Dratini', 'Dragonair', 'Dragonite',
  'Mewtwo', 'Mew'];

const GenerationTwo = ['Chikorita', 'Bayleef', 'Meganium',
  'Cyndaquil', 'Quilava', 'Typhlosion', 'Totodile', 'Croconaw',
  'Feraligatr', 'Sentret', 'Furret', 'Hoothoot', 'Noctowl',
  'Ledyba', 'Ledian', 'Spinarak', 'Ariados', 'Crobat',
  'Chinchou', 'Lanturn', 'Pichu', 'Cleffa', 'Igglybuff',
  'Togepi', 'Togetic', 'Natu', 'Xatu', 'Mareep',
  'Flaaffy', 'Ampharos', 'Bellossom', 'Marill',
  'Azumarill', 'Sudowoodo', 'Politoed', 'Hoppip', 'Skiploom',
  'Jumpluff', 'Aipom', 'Sunkern', 'Sunflora', 'Yanma',
  'Wooper', 'Quagsire', 'Espeon', 'Umbreon', 'Murkrow',
  'Slowking', 'Misdreavus', 'Unown', 'Wobbuffet', 'Girafarig',
  'Pineco', 'Forretress', 'Dunsparce', 'Gligar', 'Steelix',
  'Snubbull', 'Granbull', 'Qwilfish', 'Scizor', 'Shuckle',
  'Heracross', 'Sneasel', 'Teddiursa', 'Ursaring', 'Slugma',
  'Magcargo', 'Swinub', 'Piloswine', 'Corsola', 'Remoraid',
  'Octillery', 'Delibird', 'Mantine', 'Skarmory', 'Houndour',
  'Houndoom', 'Kingdra', 'Phanpy', 'Donphan', 'Porygon2',
  'Stantler', 'Smeargle', 'Tyrogue', 'Hitmontop', 'Smoochum',
  'Elekid', 'Magby', 'Miltank', 'Blissey', 'Raikou',
  'Entei', 'Suicune', 'Larvitar', 'Pupitar', 'Tyranitar',
  'Lugia', 'Ho-Oh', 'Celebi'];

const GenerationThree = ['Treecko', 'Grovyle',
  'Sceptile', 'Torchic', 'Combusken', 'Blaziken', 'Mudkip',
  'Marshtomp', 'Swampert', 'Poochyena', 'Mightyena', 'Zigzagoon',
  'Linoone', 'Wurmple', 'Silcoon', 'Beautifly', 'Cascoon',
  'Dustox', 'Lotad', 'Lombre', 'Ludicolo', 'Seedot',
  'Nuzleaf', 'Shiftry', 'Taillow', 'Swellow', 'Wingull',
  'Pelipper', 'Ralts', 'Kirlia', 'Gardevoir', 'Surskit',
  'Masquerain', 'Shroomish', 'Breloom', 'Slakoth', 'Vigoroth',
  'Slaking', 'Nincada', 'Ninjask', 'Shedinja', 'Whismur',
  'Loudred', 'Exploud', 'Makuhita', 'Hariyama', 'Azurill',
  'Nosepass', 'Skitty', 'Delcatty', 'Sableye', 'Mawile',
  'Aron', 'Lairon', 'Aggron', 'Meditite', 'Medicham',
  'Electrike', 'Manectric', 'Plusle', 'Minun', 'Volbeat',
  'Illumise', 'Roselia', 'Gulpin', 'Swalot', 'Carvanha',
  'Sharpedo', 'Wailmer', 'Wailord', 'Numel', 'Camerupt',
  'Torkoal', 'Spoink', 'Grumpig', 'Spinda', 'Trapinch',
  'Vibrava', 'Flygon', 'Cacnea', 'Cacturne', 'Swablu',
  'Altaria', 'Zangoose', 'Seviper', 'Lunatone', 'Solrock',
  'Barboach', 'Whiscash', 'Corphish', 'Crawdaunt', 'Baltoy',
  'Claydol', 'Lileep', 'Cradily', 'Anorith', 'Armaldo',
  'Feebas', 'Milotic', 'Castform', 'Kecleon', 'Shuppet',
  'Banette', 'Duskull', 'Dusclops', 'Tropius', 'Chimecho',
  'Absol', 'Wynaut', 'Snorunt', 'Glalie', 'Spheal',
  'Sealeo', 'Walrein', 'Clamperl', 'Huntail', 'Gorebyss',
  'Relicanth', 'Luvdisc', 'Bagon', 'Shelgon', 'Salamence',
  'Beldum', 'Metang', 'Metagross', 'Regirock', 'Regice',
  'Registeel', 'Latias', 'Latios', 'Kyogre', 'Groudon',
  'Rayquaza', 'Jirachi', 'Deoxys'];

const GenerationFour = ['Turtwig', 'Grotle',
  'Torterra', 'Chimchar', 'Monferno', 'Infernape', 'Piplup',
  'Prinplup', 'Empoleon', 'Starly', 'Staravia', 'Staraptor',
  'Bidoof', 'Bibarel', 'Kricketot', 'Kricketune', 'Shinx',
  'Luxio', 'Luxray', 'Budew', 'Roserade', 'Cranidos',
  'Rampardos', 'Shieldon', 'Bastiodon', 'Burmy', 'Wormadam',
  'Mothim', 'Combee', 'Vespiquen', 'Pachirisu', 'Buizel',
  'Floatzel', 'Cherubi', 'Cherrim', 'Shellos', 'Gastrodon',
  'Ambipom', 'Drifloon', 'Drifblim', 'Buneary', 'Lopunny',
  'Mismagius', 'Honchkrow', 'Glameow', 'Purugly', 'Chingling',
  'Stunky', 'Skuntank', 'Bronzor', 'Bronzong', 'Bonsly',
  'MimeJr.', 'Happiny', 'Chatot', 'Spiritomb', 'Gible',
  'Gabite', 'Garchomp', 'Munchlax', 'Riolu', 'Lucario',
  'Hippopotas', 'Hippowdon', 'Skorupi', 'Drapion', 'Croagunk',
  'Toxicroak', 'Carnivine', 'Finneon', 'Lumineon', 'Mantyke',
  'Snover', 'Abomasnow', 'Weavile', 'Magnezone', 'Lickilicky',
  'Rhyperior', 'Tangrowth', 'Electivire', 'Magmortar', 'Togekiss',
  'Yanmega', 'Leafeon', 'Glaceon', 'Gliscor', 'Mamoswine',
  'Porygon-Z', 'Gallade', 'Probopass', 'Dusknoir', 'Froslass',
  'Rotom', 'Uxie', 'Mesprit', 'Azelf', 'Dialga',
  'Palkia', 'Heatran', 'Regigigas', 'Giratina', 'Cresselia',
  'Phione', 'Manaphy', 'Darkrai', 'Shaymin', 'Arceus',
  'Victini'];

const GenerationFive = ['Snivy', 'Servine', 'Serperior', 'Tepig',
  'Pignite', 'Emboar', 'Oshawott', 'Dewott', 'Samurott',
  'Patrat', 'Watchog', 'Lillipup', 'Herdier', 'Stoutland',
  'Purrloin', 'Liepard', 'Pansage', 'Simisage', 'Pansear',
  'Simisear', 'Panpour', 'Simipour', 'Munna', 'Musharna',
  'Pidove', 'Tranquill', 'Unfezant', 'Blitzle', 'Zebstrika',
  'Roggenrola', 'Boldore', 'Gigalith', 'Woobat', 'Swoobat',
  'Drilbur', 'Excadrill', 'Audino', 'Timburr', 'Gurdurr',
  'Conkeldurr', 'Tympole', 'Palpitoad', 'Seismitoad', 'Throh',
  'Sawk', 'Sewaddle', 'Swadloon', 'Leavanny', 'Venipede',
  'Whirlipede', 'Scolipede', 'Cottonee', 'Whimsicott', 'Petilil',
  'Lilligant', 'Basculin', 'Sandile', 'Krokorok', 'Krookodile',
  'Darumaka', 'Darmanitan', 'Maractus', 'Dwebble', 'Crustle',
  'Scraggy', 'Scrafty', 'Sigilyph', 'Yamask', 'Cofagrigus',
  'Tirtouga', 'Carracosta', 'Archen', 'Archeops', 'Trubbish',
  'Garbodor', 'Zorua', 'Zoroark', 'Minccino', 'Cinccino',
  'Gothita', 'Gothorita', 'Gothitelle', 'Solosis', 'Duosion',
  'Reuniclus', 'Ducklett', 'Swanna', 'Vanillite', 'Vanillish',
  'Vanilluxe', 'Deerling', 'Sawsbuck', 'Emolga', 'Karrablast',
  'Escavalier', 'Foongus', 'Amoonguss', 'Frillish', 'Jellicent',
  'Alomomola', 'Joltik', 'Galvantula', 'Ferroseed', 'Ferrothorn',
  'Klink', 'Klang', 'Klinklang', 'Tynamo', 'Eelektrik',
  'Eelektross', 'Elgyem', 'Beheeyem', 'Litwick', 'Lampent',
  'Chandelure', 'Axew', 'Fraxure', 'Haxorus', 'Cubchoo',
  'Beartic', 'Cryogonal', 'Shelmet', 'Accelgor', 'Stunfisk',
  'Mienfoo', 'Mienshao', 'Druddigon', 'Golett', 'Golurk',
  'Pawniard', 'Bisharp', 'Bouffalant', 'Rufflet', 'Braviary',
  'Vullaby', 'Mandibuzz', 'Heatmor', 'Durant', 'Deino',
  'Zweilous', 'Hydreigon', 'Larvesta', 'Volcarona', 'Cobalion',
  'Terrakion', 'Virizion', 'Tornadus', 'Thundurus', 'Reshiram',
  'Zekrom', 'Landorus', 'Kyurem', 'Keldeo', 'Meloetta',
  'Genesect'];

const GenerationSix = ['Chespin', 'Quilladin', 'Chesnaught', 'Fennekin',
  'Braixen', 'Delphox', 'Froakie', 'Frogadier', 'Greninja',
  'Bunnelby', 'Diggersby', 'Fletchling', 'Fletchinder', 'Talonflame',
  'Scatterbug', 'Spewpa', 'Vivillon', 'Litleo', 'Pyroar',
  'Flabebe', 'Floette', 'Florges', 'Skiddo', 'Gogoat',
  'Pancham', 'Pangoro', 'Furfrou', 'Espurr', 'Meowstic',
  'Honedge', 'Doublade', 'Aegislash', 'Spritzee', 'Aromatisse',
  'Swirlix', 'Slurpuff', 'Inkay', 'Malamar', 'Binacle',
  'Barbaracle', 'Skrelp', 'Dragalge', 'Clauncher', 'Clawitzer',
  'Helioptile', 'Heliolisk', 'Tyrunt', 'Tyrantrum', 'Amaura',
  'Aurorus', 'Sylveon', 'Hawlucha', 'Dedenne', 'Carbink',
  'Goomy', 'Sliggoo', 'Goodra', 'Klefki', 'Phantump',
  'Trevenant', 'Pumpkaboo', 'Gourgeist', 'Bergmite', 'Avalugg',
  'Noibat', 'Noivern', 'Xerneas', 'Yveltal', 'Zygarde',
  'Diancie', 'Hoopa', 'Volcanion'];

const GenerationSeven = ['Rowlet', 'Dartrix',
  'Decidueye', 'Litten', 'Torracat', 'Incineroar', 'Popplio',
  'Brionne', 'Primarina', 'Pikipek', 'Trumbeak', 'Toucannon',
  'Yungoos', 'Gumshoos', 'Grubbin', 'Charjabug', 'Vikavolt',
  'Crabrawler', 'Crabominable', 'Oricorio', 'Cutiefly', 'Ribombee',
  'Rockruff', 'Lycanroc', 'Wishiwashi', 'Mareanie', 'Toxapex',
  'Mudbray', 'Mudsdale', 'Dewpider', 'Araquanid', 'Fomantis',
  'Lurantis', 'Morelull', 'Shiinotic', 'Salandit', 'Salazzle',
  'Stufful', 'Bewear', 'Bounsweet', 'Steenee', 'Tsareena',
  'Comfey', 'Oranguru', 'Passimian', 'Wimpod', 'Golisopod',
  'Sandygast', 'Palossand', 'Pyukumuku', 'Type:Null', 'Silvally',
  'Minior', 'Komala', 'Turtonator', 'Togedemaru', 'Mimikyu',
  'Bruxish', 'Drampa', 'Dhelmise', 'Jangmo-o', 'Hakamo-o',
  'Kommo-o', 'TapuKoko', 'TapuLele', 'TapuBulu', 'TapuFini',
  'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Nihilego',
  'Buzzwole', 'Pheromosa', 'Xurkitree', 'Celesteela', 'Kartana',
  'Guzzlord', 'Necrozma', 'Magearna', 'Marshadow'];

const AmorphousEgg = ['Koffing', 'Weezing', 'Misdreavus', 'Wobbuffet', 'Slugma',
  'Magcargo', 'Ralts', 'Kirlia', 'Gardevoir', 'Gulpin',
  'Swalot', 'Castform', 'Shuppet', 'Banette', 'Duskull',
  'Dusclops', 'Chimecho', 'Shellos', 'Gastrodon', 'Drifloon',
  'Drifblim', 'Mismagius', 'Spiritomb', 'Gallade', 'Dusknoir',
  'Rotom', 'Yamask', 'Cofagrigus', 'Solosis', 'Duosion',
  'Reuniclus', 'Frillish', 'Jellicent', 'Tynamo', 'Eelektrik',
  'Eelektross', 'Litwick', 'Lampent', 'Chandelure', 'Stunfisk',
  'Phantump', 'Trevenant', 'Pumpkaboo', 'Gourgeist', 'Sandygast',
  'Palossand', 'Mimikyu', 'Grimer', 'Muk', 'Gastly',
  'Haunter', 'Gengar'];

const BugEgg = ['Scyther', 'Pinsir', 'Ledyba', 'Ledian', 'Spinarak',
  'Ariados', 'Yanma', 'Pineco', 'Forretress', 'Gligar',
  'Scizor', 'Shuckle', 'Heracross', 'Wurmple', 'Silcoon',
  'Beautifly', 'Cascoon', 'Dustox', 'Surskit', 'Masquerain',
  'Nincada', 'Ninjask', 'Volbeat', 'Illumise', 'Trapinch',
  'Vibrava', 'Flygon', 'Kricketot', 'Kricketune', 'Burmy',
  'Wormadam', 'Mothim', 'Combee', 'Vespiquen', 'Skorupi',
  'Drapion', 'Yanmega', 'Gliscor', 'Sewaddle', 'Swadloon',
  'Leavanny', 'Venipede', 'Whirlipede', 'Scolipede', 'Dwebble',
  'Crustle', 'Karrablast', 'Escavalier', 'Joltik', 'Galvantula',
  'Shelmet', 'Accelgor', 'Durant', 'Larvesta', 'Volcarona',
  'Scatterbug', 'Scatterbug', 'Spewpa', 'Vivillon', 'Grubbin',
  'Charjabug', 'Charjabug', 'Vikavolt', 'Cutiefly', 'Ribombee',
  'Dewpider', 'Araquanid', 'Wimpod', 'Golisopod', 'Caterpie',
  'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill',
  'Paras', 'Parasect', 'Venonat', 'Venomoth'];

const DragonEgg = ['Horsea', 'Seadra', 'Magikarp', 'Gyarados', 'Dratini',
  'Dragonair', 'Dragonair', 'Dragonite', 'Dragonite', 'Kingdra',
  'Treecko', 'Grovyle', 'Sceptile', 'Swablu', 'Altaria',
  'Seviper', 'Feebas', 'Milotic', 'Bagon', 'Shelgon',
  'Salamence', 'Gible', 'Gabite', 'Garchomp', 'Scraggy',
  'Scrafty', 'Axew', 'Fraxure', 'Haxorus', 'Druddigon',
  'Deino', 'Zweilous', 'Hydreigon', 'Skrelp', 'Dragalge',
  'Helioptile', 'Heliolisk', 'Tyrunt', 'Tyrantrum', 'Goomy',
  'Sliggoo', 'Goodra', 'Salandit', 'Salazzle', 'Turtonator',
  'Drampa', 'Jangmo-o', 'Hakamo-o', 'Kommo-o', 'Charmander',
  'Charmeleon', 'Charizard', 'Ekans', 'Arbok'];

const FairyEgg = ['Chansey', 'Togetic', 'Marill', 'Azumarill', 'Hoppip',
  'Skiploom', 'Jumpluff', 'Snubbull', 'Granbull', 'Blissey',
  'Shroomish', 'Breloom', 'Skitty', 'Delcatty', 'Mawile',
  'Plusle', 'Minun', 'Roselia', 'Castform', 'Snorunt',
  'Glalie', 'Roserade', 'Pachirisu', 'Cherubi', 'Cherrim',
  'Togekiss', 'Froslass', 'Phione', 'Manaphy', 'Audino',
  'Cottonee', 'Whimsicott', 'Flabébé', 'Floette', 'Florges',
  'Spritzee', 'Aromatisse', 'Swirlix', 'Slurpuff', 'Dedenne',
  'Carbink', 'Cutiefly', 'Ribombee', 'Togedemaru', 'Pikachu',
  'Raichu', 'Clefairy', 'Clefairy', 'Clefable', 'Jigglypuff',
  'Wigglytuff'];

const FieldEgg = ['Rhyhorn', 'Rhydon', 'Tauros', 'Eevee', 'Vaporeon',
  'Jolteon', 'Flareon', 'Cyndaquil', 'Quilava', 'Typhlosion',
  'Sentret', 'Furret', 'Mareep', 'Flaaffy', 'Ampharos',
  'Aipom', 'Wooper', 'Quagsire', 'Espeon', 'Umbreon',
  'Girafarig', 'Dunsparce', 'Snubbull', 'Granbull', 'Sneasel',
  'Teddiursa', 'Ursaring', 'Swinub', 'Piloswine', 'Delibird',
  'Houndour', 'Houndoom', 'Phanpy', 'Donphan', 'Stantler',
  'Smeargle', 'Miltank', 'Torchic', 'Combusken', 'Blaziken',
  'Poochyena', 'Mightyena', 'Zigzagoon', 'Linoone', 'Seedot',
  'Nuzleaf', 'Shiftry', 'Slakoth', 'Vigoroth', 'Slaking',
  'Whismur', 'Loudred', 'Exploud', 'Skitty', 'Delcatty',
  'Mawile', 'Electrike', 'Manectric', 'Wailmer', 'Wailord',
  'Numel', 'Camerupt', 'Torkoal', 'Spoink', 'Grumpig',
  'Spinda', 'Zangoose', 'Seviper', 'Kecleon', 'Absol',
  'Spheal', 'Sealeo', 'Walrein', 'Chimchar', 'Monferno', 'Infernape',
  'Piplup', 'Prinplup', 'Empoleon', 'Bidoof', 'Bibarel',
  'Shinx', 'Luxio', 'Luxray', 'Pachirisu', 'Buizel',
  'Floatzel', 'Ambipom', 'Buneary', 'Lopunny', 'Glameow',
  'Purugly', 'Stunky', 'Skuntank', 'Lucario', 'Hippopotas',
  'Hippowdon', 'Weavile', 'Rhyperior', 'Leafeon', 'Glaceon',
  'Mamoswine', 'Snivy', 'Servine', 'Serperior', 'Tepig',
  'Pignite', 'Emboar', 'Oshawott', 'Dewott', 'Samurott',
  'Patrat', 'Watchog', 'Lillipup', 'Herdier', 'Stoutland',
  'Purrloin', 'Liepard', 'Pansage', 'Simisage', 'Pansear',
  'Simisear', 'Panpour', 'Simipour', 'Munna', 'Musharna',
  'Blitzle', 'Zebstrika', 'Woobat', 'Swoobat', 'Drilbur',
  'Excadrill', 'Sandile', 'Krokorok', 'Krookodile', 'Darumaka',
  'Darmanitan', 'Scraggy', 'Scrafty', 'Zorua', 'Zoroark',
  'Minccino', 'Cinccino', 'Deerling', 'Sawsbuck', 'Emolga',
  'Cubchoo', 'Beartic', 'Mienfoo', 'Mienshao', 'Bouffalant',
  'Heatmor', 'Chespin', 'Quilladin', 'Chesnaught', 'Fennekin', 'Braixen',
  'Delphox', 'Bunnelby', 'Diggersby', 'Litleo', 'Pyroar',
  'Skiddo', 'Gogoat', 'Pancham', 'Pangoro', 'Furfrou',
  'Espurr', 'Meowstic', 'Sylveon', 'Dedenne', 'Litten',
  'Torracat', 'Incineroar', 'Popplio', 'Brionne', 'Primarina',
  'Yungoos', 'Gumshoos', 'Rockruff', 'Lycanroc', 'Mudbray',
  'Mudsdale', 'Stufful', 'Bewear', 'Oranguru', 'Passimian',
  'Komala', 'Togedemaru', 'Rattata', 'Raticate', 'Ekans',
  'Arbok', 'Pikachu', 'Raichu', 'Sandshrew', 'Sandslash',
  'Nidoran?', 'Nidoran?', 'Nidorino', 'Nidoking', 'Vulpix',
  'Ninetales', 'Diglett', 'Dugtrio', 'Meowth', 'Persian',
  'Psyduck', 'Golduck', 'Mankey', 'Primeape', 'Growlithe',
  'Arcanine', 'Ponyta', 'Rapidash', "Farfetch'd", 'Seel',
  'Dewgong'];

const FlyingEgg = ['Aerodactyl', 'Hoothoot', 'Noctowl', 'Crobat', 'Togetic',
  'Natu', 'Xatu', 'Murkrow', 'Skarmory', 'Taillow',
  'Swellow', 'Wingull', 'Pelipper', 'Swablu', 'Altaria',
  'Starly', 'Staravia', 'Staraptor', 'Honchkrow', 'Chatot',
  'Togekiss', 'Pidove', 'Tranquill', 'Unfezant', 'Woobat',
  'Swoobat', 'Sigilyph', 'Archen', 'Archeops', 'Ducklett',
  'Swanna', 'Rufflet', 'Braviary', 'Vullaby', 'Mandibuzz',
  'Fletchling', 'Fletchinder', 'Talonflame', 'Noibat', 'Noivern',
  'Rowlet', 'Dartrix', 'Decidueye', 'Pikipek', 'Trumbeak',
  'Toucannon', 'Oricorio', 'Pidgey', 'Pidgeotto', 'Pidgeot',
  'Spearow', 'Fearow', 'Zubat', 'Golbat', "Farfetch'd",
  'Doduo', 'Dodrio'];

const GrassEgg = ['Exeggcute', 'Exeggutor', 'Tangela', 'Chikorita', 'Bayleef',
  'Meganium', 'Bellossom', 'Hoppip', 'Skiploom', 'Jumpluff',
  'Sunkern', 'Sunflora', 'Lotad', 'Lombre', 'Ludicolo',
  'Seedot', 'Nuzleaf', 'Shiftry', 'Shroomish', 'Breloom',
  'Roselia', 'Cacnea', 'Cacturne', 'Tropius', 'Turtwig',
  'Grotle', 'Torterra', 'Roserade', 'Cherubi', 'Cherrim',
  'Carnivine', 'Snover', 'Abomasnow', 'Tangrowth', 'Snivy',
  'Servine', 'Serperior', 'Cottonee', 'Whimsicott', 'Petilil',
  'Lilligant', 'Maractus', 'Foongus', 'Amoonguss', 'Ferroseed',
  'Ferrothorn', 'Phantump', 'Trevenant', 'Fomantis', 'Lurantis',
  'Morelull', 'Shiinotic', 'Bounsweet', 'Steenee', 'Tsareena',
  'Comfey', 'Bulbasaur', 'Ivysaur', 'Venusaur', 'Oddish',
  'Gloom', 'Vileplume', 'Paras', 'Parasect', 'Bellsprout',
  'Weepinbell', 'Victreebel'];

const HumanLikeEgg = ['Hitmonlee', 'Hitmonchan', 'Mr. Mime', 'Jynx',
  'Electabuzz', 'Magmar', 'Hitmontop', 'Makuhita', 'Hariyama',
  'Sableye', 'Meditite', 'Medicham', 'Volbeat', 'Illumise',
  'Spinda', 'Cacnea', 'Cacturne', 'Chimchar', 'Monferno',
  'Infernape', 'Buneary', 'Lopunny', 'Lucario', 'Croagunk',
  'Toxicroak', 'Electivire', 'Magmortar', 'Timburr', 'Gurdurr',
  'Conkeldurr', 'Throh', 'Sawk', 'Gothita', 'Gothorita',
  'Gothitelle', 'Elgyem', 'Beheeyem', 'Mienfoo', 'Mienshao',
  'Pawniard', 'Bisharp', 'Pancham', 'Pangoro', 'Hawlucha',
  'Abra', 'Kadabra', 'Alakazam', 'Machop', 'Machoke',
  'Machamp', 'Drowzee', 'Hypno'];

const MineralEgg = ['Voltorb', 'Electrode', 'Porygon', 'Sudowoodo', 'Steelix',
  'Porygon2', 'Shedinja', 'Nosepass', 'Lunatone', 'Solrock',
  'Baltoy', 'Claydol', 'Snorunt', 'Glalie', 'Beldum',
  'Metang', 'Metagross', 'Bronzor', 'Bronzong', 'Magnezone',
  'Porygon-Z', 'Probopass', 'Froslass', 'Roggenrola', 'Boldore',
  'Gigalith', 'Dwebble', 'Crustle', 'Yamask', 'Cofagrigus',
  'Trubbish', 'Garbodor', 'Vanillite', 'Vanillish', 'Vanilluxe',
  'Ferroseed', 'Ferrothorn', 'Klink', 'Klang', 'Klinklang',
  'Cryogonal', 'Golett', 'Golurk', 'Honedge', 'Doublade',
  'Aegislash', 'Carbink', 'Klefki', 'Minior', 'Dhelmise',
  'Geodude', 'Graveler', 'Golem', 'Magnemite', 'Magneton',
  'Onix'];

const MonsterEgg = ['Cubone', 'Marowak', 'Lickitung', 'Rhyhorn', 'Rhydon',
  'Kangaskhan', 'Lapras', 'Snorlax', 'Chikorita', 'Bayleef',
  'Meganium', 'Totodile', 'Croconaw', 'Feraligatr', 'Mareep',
  'Flaaffy', 'Ampharos', 'Slowking', 'Larvitar', 'Pupitar',
  'Tyranitar', 'Treecko', 'Grovyle', 'Sceptile', 'Mudkip',
  'Marshtomp', 'Swampert', 'Whismur', 'Loudred', 'Exploud',
  'Aron', 'Lairon', 'Aggron', 'Tropius', 'Turtwig',
  'Grotle', 'Torterra', 'Cranidos', 'Rampardos', 'Shieldon',
  'Bastiodon', 'Gible', 'Gabite', 'Garchomp', 'Snover',
  'Abomasnow', 'Lickilicky', 'Rhyperior', 'Axew', 'Fraxure',
  'Haxorus', 'Druddigon', 'Helioptile', 'Heliolisk', 'Tyrunt',
  'Tyrantrum', 'Amaura', 'Aurorus', 'Bergmite', 'Avalugg',
  'Salandit', 'Salazzle', 'Turtonator', 'Drampa', 'Bulbasaur',
  'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard',
  'Squirtle', 'Wartortle', 'Blastoise', 'Nidoran?', 'Nidoran?',
  'Nidorino', 'Nidoking', 'Slowpoke', 'Slowbro'];

const Water1Egg = ['Horsea', 'Seadra', 'Lapras', 'Omanyte', 'Omastar',
  'Kabuto', 'Kabutops', 'Dratini', 'Dragonair', 'Dragonite',
  'Totodile', 'Croconaw', 'Feraligatr', 'Marill', 'Azumarill',
  'Politoed', 'Wooper', 'Quagsire', 'Slowking', 'Corsola',
  'Remoraid', 'Octillery', 'Delibird', 'Mantine', 'Kingdra',
  'Mudkip', 'Marshtomp', 'Swampert', 'Lotad', 'Lombre',
  'Ludicolo', 'Wingull', 'Pelipper', 'Surskit', 'Masquerain',
  'Corphish', 'Crawdaunt', 'Feebas', 'Milotic', 'Spheal',
  'Sealeo', 'Walrein', 'Clamperl', 'Huntail', 'Gorebyss',
  'Relicanth', 'Piplup', 'Prinplup', 'Empoleon', 'Bidoof',
  'Bibarel', 'Buizel', 'Floatzel', 'Shellos', 'Gastrodon',
  'Phione', 'Manaphy', 'Tympole', 'Palpitoad', 'Seismitoad',
  'Tirtouga', 'Carracosta', 'Ducklett', 'Swanna', 'Alomomola',
  'Stunfisk', 'Froakie', 'Frogadier', 'Greninja', 'Inkay',
  'Malamar', 'Skrelp', 'Dragalge', 'Clauncher', 'Clawitzer',
  'Popplio', 'Brionne', 'Primarina', 'Mareanie', 'Toxapex',
  'Dewpider', 'Araquanid', 'Pyukumuku', 'Squirtle', 'Wartortle',
  'Blastoise', 'Psyduck', 'Golduck', 'Poliwag', 'Poliwhirl',
  'Poliwrath', 'Slowpoke', 'Slowbro', 'Seel', 'Dewgong'];

const Water2Egg = ['Goldeen', 'Seaking', 'Magikarp', 'Gyarados', 'Chinchou',
  'Lanturn', 'Qwilfish', 'Remoraid', 'Octillery', 'Carvanha',
  'Sharpedo', 'Wailmer', 'Wailord', 'Barboach', 'Whiscash',
  'Relicanth', 'Luvdisc', 'Finneon', 'Lumineon', 'Basculin',
  'Alomomola', 'Inkay', 'Malamar', 'Wishiwashi', 'Bruxish'];

const DittoEgg = ['Ditto', 'Ditto', 'Ditto', 'Ditto', 'Ditto',
  'Ditto'];

const UndisoveredEgg = ['Articuno', 'Zapdos', 'Moltres', 'Mewtwo', 'Mew',
  'Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Unown',
  'Tyrogue', 'Smoochum', 'Elekid', 'Magby', 'Raikou',
  'Entei', 'Suicune', 'Lugia', 'Ho-Oh', 'Celebi',
  'Azurill', 'Wynaut', 'Regirock', 'Regice', 'Registeel',
  'Latias', 'Latios', 'Kyogre', 'Groudon', 'Rayquaza',
  'Jirachi', 'Deoxys', 'Budew', 'Chingling', 'Bonsly',
  'Mime Jr.', 'Happiny', 'Munchlax', 'Riolu', 'Mantyke',
  'Uxie', 'Mesprit', 'Azelf', 'Dialga', 'Palkia',
  'Heatran', 'Regigigas', 'Giratina', 'Cresselia', 'Darkrai',
  'Shaymin', 'Arceus', 'Victini', 'Cobalion', 'Terrakion',
  'Virizion', 'Tornadus', 'Thundurus', 'Reshiram', 'Zekrom',
  'Landorus', 'Kyurem', 'Keldeo', 'Meloetta', 'Genesect',
  'Xerneas', 'Yveltal', 'Zygarde', 'Diancie', 'Hoopa',
  'Volcanion', 'Type:', 'Silvally', 'Tapu', 'Tapu',
  'Tapu', 'Tapu', 'Cosmog', 'Cosmoem', 'Solgaleo',
  'Lunala', 'Nihilego', 'Buzzwole', 'Pheromosa', 'Xurkitree',
  'Celesteela', 'Kartana', 'Guzzlord', 'Necrozma', 'Magearna',
  'Nidorina', 'Nidoqueen'];

module.exports = {
  name: 'pokemon',
  async func(msg, { send, args, prefix }) {
    // Incase nothing is said
    if (!args[0]) {
      return send(`Please type " {}pokemon help " to continue.`.replace(/{}/g, prefix));
    }

    // For the help command
    if (args[0] == 'help') {
      return send(`Please type in the following secondary commands to use **${_.escapeRegExp(prefix)}**pokemon\n**${_.escapeRegExp(prefix)}**pokemon all\n**${_.escapeRegExp(prefix)}**pokemon gen1\n**${_.escapeRegExp(prefix)}**pokemon gen2\n**${_.escapeRegExp(prefix)}**pokemon gen3\n**${_.escapeRegExp(prefix)}**pokemon gen4\n**${_.escapeRegExp(prefix)}**pokemon gen5\n**${_.escapeRegExp(prefix)}**pokemon gen6\n**${_.escapeRegExp(prefix)}**pokemon gen7\n**${_.escapeRegExp(prefix)}**pokemon 3all\n**${_.escapeRegExp(prefix)}**pokemon 3gen1\n**${_.escapeRegExp(prefix)}**pokemon 3gen2\n**${_.escapeRegExp(prefix)}**pokemon 3gen3\n**${_.escapeRegExp(prefix)}**pokemon 3gen4\n**${_.escapeRegExp(prefix)}**pokemon 3gen5\n**${_.escapeRegExp(prefix)}**pokemon 3gen6\n**${_.escapeRegExp(prefix)}**pokemon 3gen7\n**${_.escapeRegExp(prefix)}**pokemon 6all\n**${_.escapeRegExp(prefix)}**pokemon 6gen1\n**${_.escapeRegExp(prefix)}**pokemon 6gen2\n**${_.escapeRegExp(prefix)}**pokemon 6gen3\n**${_.escapeRegExp(prefix)}**pokemon 6gen4\n**${_.escapeRegExp(prefix)}**pokemon 6gen5\n**${_.escapeRegExp(prefix)}**pokemon 6gen6\n**${_.escapeRegExp(prefix)}**pokemon 6gen7\n**${_.escapeRegExp(prefix)}**pokemon egg`);
    }

    // Start of the Generation Commands
    // All Generations (1)
    if (args[0] == 'all') {
      AllPokemon, COUNT = 1;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(AllPokemon[~~(AllPokemon.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // All Generations (3)
    if (args[0] == '3all') {
      AllPokemon, COUNT = 3;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(AllPokemon[~~(AllPokemon.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // All Generations (6)
    if (args[0] == '6all') {
      AllPokemon, COUNT = 6;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(AllPokemon[~~(AllPokemon.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation One (1)
    if (args[0] == 'gen1') {
      GenerationOne, COUNT = 1;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationOne[~~(GenerationOne.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation One (3)
    if (args[0] == '3gen1') {
      GenerationOne, COUNT = 3;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationOne[~~(GenerationOne.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation One (6)
    if (args[0] == '6gen1') {
      GenerationOne, COUNT = 6;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationOne[~~(GenerationOne.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Two (1)
    if (args[0] == 'gen2') {
      GenerationTwo, COUNT = 1;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationTwo[~~(GenerationTwo.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Two (3)
    if (args[0] == '3gen2') {
      GenerationTwo, COUNT = 3;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationTwo[~~(GenerationTwo.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Two (6)
    if (args[0] == '6gen2') {
      GenerationTwo, COUNT = 6;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationTwo[~~(GenerationTwo.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Three (1)
    if (args[0] == 'gen3') {
      GenerationThree, COUNT = 1;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationThree[~~(GenerationThree.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Three (3)
    if (args[0] == '3gen3') {
      GenerationThree, COUNT = 3;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationThree[~~(GenerationThree.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Three (6)
    if (args[0] == '6gen3') {
      GenerationThree, COUNT = 6;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationThree[~~(GenerationThree.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Four (1)
    if (args[0] == 'gen4') {
      GenerationFour, COUNT = 1;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationFour[~~(GenerationFour.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Four (3)
    if (args[0] == '3gen4') {
      GenerationFour, COUNT = 3;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationFour[~~(GenerationFour.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Four (6)
    if (args[0] == '6gen4') {
      GenerationFour, COUNT = 6;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationFour[~~(GenerationFour.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Five (1)
    if (args[0] == 'gen5') {
      GenerationFive, COUNT = 1;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationFive[~~(GenerationFive.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Five (3)
    if (args[0] == '3gen5') {
      GenerationFive, COUNT = 3;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationFive[~~(GenerationFive.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Five (6)
    if (args[0] == '6gen5') {
      GenerationFive, COUNT = 6;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationFive[~~(GenerationFive.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Six (1)
    if (args[0] == 'gen6') {
      GenerationSix, COUNT = 1;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationSix[~~(GenerationSix.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Six (3)
    if (args[0] == '3gen6') {
      GenerationSix, COUNT = 3;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationSix[~~(GenerationSix.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Six (6)
    if (args[0] == '6gen6') {
      GenerationSix, COUNT = 6;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationSix[~~(GenerationSix.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Seven (1)
    if (args[0] == 'gen7') {
      GenerationSeven, COUNT = 1;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationSeven[~~(GenerationSeven.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Seven (3)
    if (args[0] == '3gen7') {
      GenerationSeven, COUNT = 3;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationSeven[~~(GenerationSeven.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Generation Seven (6)
    if (args[0] == '6gen7') {
      GenerationSeven, COUNT = 6;
      const choices = new Set;
      while (choices.size < COUNT) choices.add(GenerationSeven[~~(GenerationSeven.length * Math.random())]);
      return send(`${Array.from(choices)}`);
    }

    // Eggs!
    if (args[0] == 'egg') {
      // Egg Check
      if (!args[1]) {
        return send(`Please enter one of the following commands for an egg group filter\n**${_.escapeRegExp(prefix)}**pokemon egg amorph\n**${_.escapeRegExp(prefix)}**pokemon egg 3amorph\n**${_.escapeRegExp(prefix)}**pokemon egg 6amorph\n**${_.escapeRegExp(prefix)}**pokemon egg bug\n**${_.escapeRegExp(prefix)}**pokemon egg 3bug\n**${_.escapeRegExp(prefix)}**pokemon egg 6bug\n**${_.escapeRegExp(prefix)}**pokemon egg dragon\n**${_.escapeRegExp(prefix)}**pokemon egg 3dragon\n**${_.escapeRegExp(prefix)}**pokemon egg 6dragon\n**${_.escapeRegExp(prefix)}**pokemon egg fairy\n**${_.escapeRegExp(prefix)}**pokemon egg 3fairy\n**${_.escapeRegExp(prefix)}**pokemon egg 6fairy!\n**${_.escapeRegExp(prefix)}**pokemon egg field\n**${_.escapeRegExp(prefix)}**pokemon egg 3field\n**${_.escapeRegExp(prefix)}**pokemon egg 6field\n**${_.escapeRegExp(prefix)}**pokemon egg flying\n**${_.escapeRegExp(prefix)}**pokemon egg 3flying\n**${_.escapeRegExp(prefix)}**pokemon egg 6flying\n**${_.escapeRegExp(prefix)}**pokemon egg grass\n**${_.escapeRegExp(prefix)}**pokemon egg 3grass\n**${_.escapeRegExp(prefix)}**pokemon egg 6grass\n**${_.escapeRegExp(prefix)}**pokemon egg human\n**${_.escapeRegExp(prefix)}**pokemon egg 3human\n**${_.escapeRegExp(prefix)}**pokemon egg 6human\n**${_.escapeRegExp(prefix)}**pokemon egg mineral\n**${_.escapeRegExp(prefix)}**pokemon egg 3mineral\n**${_.escapeRegExp(prefix)}**pokemon egg 6mineral\n**${_.escapeRegExp(prefix)}**pokemon egg monster\n**${_.escapeRegExp(prefix)}**pokemon egg 3monster\n**${_.escapeRegExp(prefix)}**pokemon egg 6monster\n**${_.escapeRegExp(prefix)}**pokemon egg water1\n**${_.escapeRegExp(prefix)}**pokemon egg 3water1\n**${_.escapeRegExp(prefix)}**pokemon egg 6water1\n**${_.escapeRegExp(prefix)}**pokemon egg water2\n**${_.escapeRegExp(prefix)}**pokemon egg 3water2\n**${_.escapeRegExp(prefix)}**pokemon egg 6water2\n**${_.escapeRegExp(prefix)}**pokemon egg water3\n**${_.escapeRegExp(prefix)}**pokemon egg 3water3\n**${_.escapeRegExp(prefix)}**pokemon egg 6water3\n**${_.escapeRegExp(prefix)}**pokemon egg ditto\n**${_.escapeRegExp(prefix)}**pokemon egg 3ditto\n**${_.escapeRegExp(prefix)}**pokemon egg 6ditto\n**${_.escapeRegExp(prefix)}**pokemon egg undisc\n**${_.escapeRegExp(prefix)}**pokemon egg 3undisc\n**${_.escapeRegExp(prefix)}**pokemon egg 6undisc`);
      }

      // Amorphous Eggs (1)
      if (args[1] == 'amorph') {
        AmorphousEgg, COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(AmorphousEgg[~~(AmorphousEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Amorphous Eggs (3)
      if (args[1] == '3amorph') {
        AmorphousEgg, COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(AmorphousEgg[~~(AmorphousEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Amorphous Eggs (6)
      if (args[1] == '6amorph') {
        AmorphousEgg, COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(AmorphousEgg[~~(AmorphousEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Bug Eggs (1)
      if (args[1] == 'bug') {
        BugEgg, COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(BugEgg[~~(BugEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Bug Eggs (3)
      if (args[1] == '3bug') {
        BugEgg, COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(BugEgg[~~(BugEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Bug Eggs (6)
      if (args[1] == '6bug') {
        BugEgg, COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(BugEgg[~~(BugEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Dragon Eggs (1)
      if (args[1] == 'dragon') {
        DragonEgg, COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(DragonEgg[~~(DragonEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Dragon Eggs (3)
      if (args[1] == '3dragon') {
        DragonEgg, COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(DragonEgg[~~(DragonEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Dragon Eggs (6)
      if (args[1] == '6dragon') {
        DragonEgg, COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(DragonEgg[~~(DragonEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Fairy Eggs (1)
      if (args[1] == 'fairy') {
        FairyEgg, COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(FairyEgg[~~(FairyEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Fairy Eggs (3)
      if (args[1] == '3fairy') {
        FairyEgg, COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(FairyEgg[~~(FairyEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Fairy Eggs (6)
      if (args[1] == '6fairy') {
        FairyEgg, COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(FairyEgg[~~(FairyEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Field Eggs (1)
      if (args[1] == 'field') {
        FieldEgg, COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(FieldEgg[~~(FieldEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Field Eggs (3)
      if (args[1] == '3field') {
        FieldEgg, COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(FieldEgg[~~(FieldEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Field Eggs (6)
      if (args[1] == '6field') {
        FieldEgg, COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(FieldEgg[~~(FieldEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Flying Eggs (1)
      if (args[1] == 'flying') {
        FlyingEgg, COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(FlyingEgg[~~(FlyingEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Flying Eggs (3)
      if (args[1] == '3flying') {
        FlyingEgg, COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(FlyingEgg[~~(FlyingEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Flying Eggs (6)
      if (args[1] == '6flying') {
        FlyingEgg, COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(FlyingEgg[~~(FlyingEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Grass Eggs (1)
      if (args[1] == 'grass') {
        GrassEgg, COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(GrassEgg[~~(GrassEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Grass Eggs (3)
      if (args[1] == '3grass') {
        GrassEgg, COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(GrassEgg[~~(GrassEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Grass Eggs (6)
      if (args[1] == '6grass') {
        GrassEgg, COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(GrassEgg[~~(GrassEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Human-Like Eggs (1)
      if (args[1] == 'human') {
        HumanLikeEgg, COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(HumanLikeEgg[~~(HumanLikeEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Human-Like Eggs (3)
      if (args[1] == '3human') {
        HumanLikeEgg, COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(HumanLikeEgg[~~(HumanLikeEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Human-Like Eggs (6)
      if (args[1] == '6human') {
        HumanLikeEgg, COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(HumanLikeEgg[~~(HumanLikeEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Mineral Eggs (1)
      if (args[1] == 'mineral') {
        MineralEgg, COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(MineralEgg[~~(MineralEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Mineral Eggs (3)
      if (args[1] == '3mineral') {
        MineralEgg, COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(MineralEgg[~~(MineralEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Mineral Eggs (3)
      if (args[1] == '6mineral') {
        MineralEgg, COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(MineralEgg[~~(MineralEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Monster Eggs (1)
      if (args[1] == 'monster') {
        MonsterEgg, COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(MonsterEgg[~~(MonsterEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Monster Eggs (3)
      if (args[1] == '3monster') {
        MonsterEgg, COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(MonsterEgg[~~(MonsterEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Monster Eggs (6)
      if (args[1] == '6monster') {
        MonsterEgg, COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(MonsterEgg[~~(MonsterEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Water 1 Eggs (1)
      if (args[1] == 'water1') {
        Water1Egg, COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(Water1Egg[~~(Water1Egg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Water 1 Eggs (3)
      if (args[1] == '3water1') {
        Water1Egg, COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(Water1Egg[~~(Water1Egg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Water 1 Eggs (6)
      if (args[1] == '6water1') {
        Water1Egg, COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(Water1Egg[~~(Water1Egg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Water 2 Eggs (1)
      if (args[1] == 'water2') {
        Water2Egg, COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(Water2Egg[~~(Water2Egg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Water 2 Eggs (3)
      if (args[1] == '3water2') {
        Water2Egg, COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(Water2Egg[~~(Water2Egg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Water 2 Eggs (6)
      if (args[1] == '6water2') {
        Water2Egg, COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(Water2Egg[~~(Water2Egg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Ditto Eggs (1)
      if (args[1] == 'ditto') {
        return send(`${DittoEgg[Math.floor(DittoEgg.length * Math.random())]}`);
      }

      // Ditto Eggs (3)
      if (args[1] == '3ditto') {
        return send(`${DittoEgg[Math.floor(DittoEgg.length * Math.random())]}` + ',' + `${DittoEgg[Math.floor(DittoEgg.length * Math.random())]}` + ',' + `${DittoEgg[Math.floor(DittoEgg.length * Math.random())]}`);
      }

      // Ditto Eggs (6)
      if (args[1] == '6ditto') {
        return send(`${DittoEgg[Math.floor(DittoEgg.length * Math.random())]}` + ',' + `${DittoEgg[Math.floor(DittoEgg.length * Math.random())]}` + ',' + `${DittoEgg[Math.floor(DittoEgg.length * Math.random())]}` + `${DittoEgg[Math.floor(DittoEgg.length * Math.random())]}` + ',' + `${DittoEgg[Math.floor(DittoEgg.length * Math.random())]}` + ',' + `${DittoEgg[Math.floor(DittoEgg.length * Math.random())]}`);
      }

      // Undiscovered Eggs (1)
      if (args[1] == 'undisc') {
        UndisoveredEgg, COUNT = 1;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(UndisoveredEgg[~~(UndisoveredEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Undiscovered Eggs (3)
      if (args[1] == '3undisc') {
        UndisoveredEgg, COUNT = 3;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(UndisoveredEgg[~~(UndisoveredEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }

      // Undiscovered Eggs (6)
      if (args[1] == '6undisc') {
        UndisoveredEgg, COUNT = 6;
        const choices = new Set;
        while (choices.size < COUNT) choices.add(UndisoveredEgg[~~(UndisoveredEgg.length * Math.random())]);
        return send(`${Array.from(choices)}`);
      }
	 } // End of eggs brackets
  }, // End of the command!
};
