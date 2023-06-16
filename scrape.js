const puppeteer = require("puppeteer");
const fs = require("fs");
const request = require("request");

let arr = [
  "Discmania-DD1",
  "Prodigy-M1",
  "Latitude-64-Mercy",
  "Latitude-64-Ballista-Pro",
  "EV-7-Mobius",
  "Viking-Thor",
  "Discmania-PD2",
  "Vibram-Crag",
  "Latitude-64-Scythe",
  "Lightning-#1-Helix",
  "Axiom-Hex",
  "Discmania-Paradigm",
  "Axiom-Tantrum",
  "Discraft-Nuke-SS",
  "Latitude-64-Trust",
  "Infinite-Discs-Alpaca",
  "Other-Marvel",
  "Westside-Maiden",
  "Lone-Star-Disc-Middy",
  "Innova-Cheetah",
  "Mint-Discs-Lobster",
  "Infinite-Discs-Myth",
  "Millennium-Scorpius",
  "MVP-Spin",
  "Vibram-Ridge",
  "Innova-Thunderbird",
  "Innova-FL",
  "Prodiscus-Fasti",
  "Innova-Wombat3",
  "Yikun-Crossbow",
  "Innova-TL3",
  "Innova-Fairway-Disc",
  "DGA-Torrent",
  "Latitude-64-Glory",
  "Crosslap-Credo",
  "Discraft-Tracker",
  "Viking-Rune",
  "Prodigy-FX-2",
  "Lightning-#1-Hyzer",
  "MVP-Glitch",
  "Innova-Caiman",
  "Clash-Discs-Peach",
  "Discmania-CD2",
  "Latitude-64-Core",
  "Prodiscus-Respecti",
  "Mint-Discs-Diamondback",
  "Clash-Discs-Salt",
  "Lone-Star-Disc-Guadalupe",
  "Dynamic-Discs-Suspect",
  "Thought-Space-Athletics-Coalesce",
  "Innova-Krait",
  "Innova-Starfire",
  "Yikun-Wings",
  "Discraft-Sol",
  "Prodigy-A2",
  "Prodigy-H5",
  "Vibram-Arch",
  "Innova-Teedevil",
  "Prodiscus-Sparta",
  "Discmania-Instinct",
  "Latitude-64-Savior",
  "Latitude-64-Missilen",
  "Clash-Discs-Soda",
  "Latitude-64-Cutlass",
  "Innova-Hawkeye",
  "Prodigy-X4",
  "Westside-Giant",
  "Løft-Discs-Silicon",
  "DGA-Sail",
  "Discmania-Essence",
  "RPM-Discs-Tara-iti",
  "Latitude-64-Anchor",
  "Latitude-64-Honor",
  "Prodigy-F-Model-OS",
  "MVP-Tesla",
  "Clash-Discs-Pepper",
  "Dynamic-Discs-Warant",
  "Innova-XCaliber",
  "Westside-Boatman",
  "Gateway-Devil-Hawk",
  "Infinite-Discs-Scarab",
  "Daredevil-Albatross",
  "Prodiscus-Midari",
  "Latitude-64-Sinus",
  "Discraft-Meteor",
  "Axiom-Mayhem",
  "Infinite-Discs-Maya",
  "Discmania-PDx",
  "Millennium-Astra",
  "Prodigy-Styder",
  "Yikun-Xing",
  "Prodigy-H2",
  "Latitude-64-Fuji",
  "Innova-Scorpion",
  "Prodigy-Shadowfax",
  "Axiom-Alias",
  "Prodigy-A5",
  "Other-Strike",
  "Discraft-Rattler",
  "Storm-The-Crater",
  "Above-Ground-Level-Locust",
  "Prodigy-Distortion",
  "MVP-Wave",
  "Lone-Star-Disc-Nimitz",
  "Prodigy-D1",
  "Dynamic-Discs-Judge",
  "Innova-VCobra",
  "Discmania-DD3-(new)",
  "Innova-Orc",
  "Prodigy-D2",
  "Innova-Wedge",
  "AquaFlight-Osprey",
  "Yikun-Rong",
  "Latitude-64-Saint-Pro",
  "MVP-Matrix",
  "Discraft-Zone-OS",
  "Above-Ground-Level-Manzanita",
  "Discmania-P3",
  "Legacy-Bandit",
  "Discmania-TD",
  "Discraft-Impact",
  "Dynamic-Discs-Guard",
  "Discmania-Sun-Bird",
  "Latitude-64-Saint",
  "Gateway-Rage",
  "Axiom-Defy",
  "Axiom-Fireball",
  "Innova-Mako",
  "Innova-VRoc",
  "Millennium-JLS",
  "Latitude-64-Havoc",
  "Innova-Sidewinder",
  "Discmania-DD",
  "Other-Minotaur",
  "Legacy-Aftermath",
  "Prodigy-H4",
  "Daredevil-Mammoth",
  "Lone-Star-Disc-Penny-Putter-(Victor)",
  "Lone-Star-Disc-Benny",
  "Prodigy-D2-Signature-(Falcor)",
  "AquaFlight-Swift",
  "Latitude-64-Fuse",
  "Daredevil-Swift-Fox",
  "Latitude-64-Compass",
  "Dynamic-Discs-Fugitive-(Supreme)",
  "Above-Ground-Level-Douglas-Fir",
  "Lone-Star-Disc-Chupacabra",
  "Vibram-UnLace",
  "RPM-Discs-Tui",
  "Infinite-Discs-Dynasty",
  "Hooligan-Discs-Yeet",
  "Dynamic-Discs-Sergeant",
  "Gateway-War-Spear",
  "Prodigy-X3",
  "Prodigy-PA4",
  "Discmania-P3X",
  "Thought-Space-Athletics-Pathfinder",
  "Dynamic-Discs-Evader",
  "Dynamic-Discs-Witness",
  "Legacy-Cannon",
  "Dynamic-Discs-Breakout",
  "Innova-Avatar",
  "Above-Ground-Level-Sycamore",
  "Gateway-Sabre",
  "Kastaplast-Stal",
  "Discmania-Enigma",
  "Clash-Discs-Fudge",
  "Discmania-Genius",
  "Prodigy-D-Model-OS",
  "Infinite-Discs-Aztec",
  "DGA-Tsunami",
  "Other-Pure-OG",
  "Legacy-Prowler",
  "Other-Leviathan",
  "Legacy-Rival",
  "Yikun-Qi",
  "RPM-Discs-Kahu-XG",
  "Innova-Mystere",
  "Westside-War-Horse",
  "Prodigy-FX-3",
  "Daredevil-Beaver",
  "Discraft-Cyclone",
  "Dynamic-Discs-Felon",
  "Discmania-TDx",
  "Mint-Discs-Freetail",
  "Discmania-P1-(New)",
  "Westside-Underworld",
  "Infinite-Discs-Tomb",
  "Latitude-64-Striker",
  "Wild-Discs-Addax-Reborn",
  "Yikun-Da'E",
  "Innova-Shark3",
  "Discmania-Splice",
  "MVP-Nomad",
  "Lone-Star-Disc-Dos-X",
  "Lone-Star-Disc-Curl",
  "Viking-Axe",
  "Yikun-Yi",
  "MVP-Photon",
  "Discraft-APX",
  "Discraft-Flash",
  "Latitude-64-Faith",
  "Dynamic-Discs-Proof",
  "Prodigy-H1-V2",
  "Millennium-Falcon",
  "MVP-Servo",
  "Latitude-64-Zion",
  "Gateway-Ninja",
  "Latitude-64-Sarek",
  "Gateway-Samurai",
  "Other-Era",
  "RPM-Discs-Huia",
  "DGA-Breaker",
  "Discmania-Maestro",
  "Latitude-64-Stiletto",
  "Streamline-Ascend",
  "Innova-Hydra",
  "Kastaplast-Kaxe-Z",
  "MVP-Particle",
  "Prodiscus-Titan",
  "Gateway-Slayer",
  "Discraft-Zeus",
  "Mint-Discs-Mustang",
  "Kastaplast-Grym",
  "Discraft-Challenger-OS",
  "Discmania-FD3",
  "Innova-Polecat",
  "Westside-Shield",
  "Clash-Discs-Ginger",
  "Discraft-Hornet",
  "Daredevil-Yeti",
  "Gateway-Mystic",
  "Discraft-Malta",
  "Discraft-Putt'r",
  "Daredevil-Walrus",
  "Lone-Star-Disc-Lone-Wolf",
  "Innova-Roc3",
  "Discraft-Buzzz-SS",
  "Other-Scale",
  "Westside-Tursas",
  "DGA-Banzai",
  "Discraft-Undertaker",
  "Dynamic-Discs-Thief",
  "Latitude-64-Caltrop",
  "Discmania-FD-(New)",
  "MVP-Ohm",
  "Yikun-Claws",
  "Prodigy-F5",
  "Clash-Discs-Cookie",
  "Discraft-Heat",
  "Gateway-Shaman",
  "Yikun-Jun",
  "Millennium-Aries",
  "Daredevil-Buffalo",
  "Discraft-Archer",
  "Storm-Abyss",
  "Clash-Discs-Honey",
  "Crosslap-Vigil",
  "Latitude-64-Fury",
  "Westside-Destiny",
  "Innova-Toro",
  "Discmania-Origin",
  "Latitude-64-Gauntlet",
  "Vibram-Ibex",
  "Prodigy-PA2",
  "Millennium-Veteran",
  "Westside-Swan-1-Reborn",
  "Lone-Star-Disc-BB6",
  "Latitude-64-Pearl",
  "Disctroyer-Nightjar",
  "Innova-Viking",
  "Gateway-Diablo-DT",
  "Innova-Savant",
  "Millennium-Omega",
  "Discmania-Magician",
  "Gateway-Assassin",
  "Prodigy-A1",
  "Innova-Bullfrog",
  "Discraft-Force",
  "Discraft-XS",
  "Above-Ground-Level-Cedar",
  "Wild-Discs-Angler",
  "Discmania-Mutant",
  "Latitude-64-Gladiator",
  "Latitude-64-Sapphire",
  "Thought-Space-Athletics-Mantra",
  "Discmania-Tilt",
  "Kastaplast-Falk",
  "Viking-Warrior-(Viking)",
  "MVP-Teleport",
  "Prodigy-D2-Max",
  "Viking-Knife",
  "Discraft-Banger-GT",
  "Axiom-Proxy",
  "DGA-Titanic",
  "Millennium-Astra-X",
  "DGA-Vortex",
  "Streamline-Drift",
  "Millennium-Aquarius",
  "Axiom-Virus",
  "Dynamic-Discs-EMac-Judge",
  "Crosslap-Lucky",
  "Westside-Harp",
  "RPM-Discs-Kotare",
  "Thought-Space-Athletics-Praxis",
  "Axiom-Envy",
  "Mint-Discs-Phoenix",
  "Discmania-DD3",
  "Latitude-64-Mace",
  "Mint-Discs-Bobcat",
  "Westside-Sword",
  "Latitude-64-Pioneer",
  "Innova-Viper",
  "Dynamic-Discs-Trespass",
  "Innova-Ape",
  "Innova-Archangel",
  "Disctroyer-FD-8-Stork",
  "Innova-Katana",
  "Prodigy-D6",
  "Legacy-Clutch",
  "MVP-Phase",
  "Infinite-Discs-Exodus",
  "Innova-Cro",
  "RPM-Discs-Piwakawaka",
  "MVP-Ion",
  "Gateway-Spirit",
  "Westside-Gatekeeper",
  "Innova-JK-Aviar",
  "Prodigy-X1",
  "Prodigy-M3",
  "Infinite-Discs-Anubis",
  "Innova-Yeti-Aviar",
  "Above-Ground-Level-Spruce",
  "Dynamic-Discs-Sockibomb-Felon",
  "Vibram-O-Lace",
  "Innova-Invictus",
  "Innova-Charger",
  "Yikun-Fu",
  "Lone-Star-Disc-Bayonet",
  "Millennium-Vela",
  "Innova-Wraith",
  "Innova-Ram",
  "Vibram-Vamp",
  "Daredevil-Big-Horn",
  "Discraft-Nebula",
  "Discraft-Xpress",
  "Gateway-Warlock",
  "DGA-Blowfly",
  "DGA-Avalanche",
  "Discmania-Fox-Spirit",
  "MVP-Zenith",
  "Crosslap-Shadowplay",
  "Innova-Coyote",
  "Innova-Dominator",
  "Lone-Star-Disc-Bowie",
  "Innova-Rhyno",
  "Wild-Discs-Hummingbird",
  "Discraft-Drone",
  "Latitude-64-Macana",
  "Viking-Cosmos",
  "Disctroyer-DD-13-Starling",
  "Daredevil-Wolverine",
  "Innova-Mirage",
  "Lightning-#1-Flyer",
  "Dynamic-Discs-Patrol",
  "Yikun-Jiao",
  "Innova-Juggernaut",
  "Legacy-Clozer",
  "Other-Gila",
  "Axiom-Trance",
  "Clash-Discs-Mint",
  "Latitude-64-Dagger",
  "Disc-Golf-UK-The-Count",
  "Legacy-Valor",
  "Axiom-Wrath",
  "MVP-Relativity",
  "Dynamic-Discs-Freedom",
  "Løft-Discs-Xenon",
  "MVP-Amp",
  "Discraft-Magnet",
  "Lightning-#1-Driver",
  "Prodigy-H7",
  "Discmania-P1",
  "AquaFlight-Peace-Frog",
  "Legacy-Recluse",
  "Discraft-Athena",
  "Prodigy-F3",
  "Yikun-Kui",
  "Discraft-Predator",
  "Storm-Radar",
  "Vibram-Valley",
  "Discraft-Nuke",
  "Innova-Manta",
  "Vibram-VP",
  "Innova-Teebird3",
  "Elevation-Disc-Golf-Arowana",
  "Prodigy-M-Model-OS",
  "Vibram-Launch",
  "Dynamic-Discs-Fugitive",
  "Prodigy-D3",
  "Yikun-Tomahawk",
  "Discmania-MD3-(Retooled)",
  "Legacy-Rampage",
  "Gateway-Diablo",
  "Yikun-Long",
  "Westside-Seer",
  "Westside-Pine",
  "Daredevil-Polar-Bear",
  "Discmania-TD2",
  "Yikun-Zheng",
  "Discraft-Focus",
  "Latitude-64-Ballista",
  "Thought-Space-Athletics-Votum",
  "Yikun-Wei",
  "Millennium-Omega4",
  "Kastaplast-Gote",
  "Kastaplast-Stig",
  "Prodigy-A4",
  "Prodigy-A3",
  "Axiom-Pyro",
  "Axiom-Rhythm",
  "Crosslap-Openwater",
  "Discraft-Challenger-SS",
  "Innova-Power-Disc2",
  "Westside-Queen",
  "RPM-Discs-Kea",
  "Discmania-Method",
  "Prodigy-F2",
  "Discraft-Mantis",
  "Dynamic-Discs-Maverick",
  "Legacy-Fighter",
  "Innova-Shryke",
  "MVP-Impulse",
  "Axiom-Delirium",
  "DGA-Riptide",
  "MVP-Tangent",
  "Daredevil-Woodchuck",
  "MVP-Volt",
  "Axiom-Tenacity",
  "Infinite-Discs-Pharaoh",
  "Clash-Discs-Berry",
  "Dynamic-Discs-Sheriff",
  "Prodigy-Reverb",
  "RPM-Discs-Kahu",
  "Prodigy-H1",
  "Prodiscus-Flipperi",
  "Latitude-64-Gobi",
  "Westside-Stag",
  "Prodigy-M-Model-US",
  "Infinite-Discs-Ra",
  "Innova-Wombat",
  "Lone-Star-Disc-Armadillo",
  "Discraft-Avenger",
  "Above-Ground-Level-Baobab",
  "Above-Ground-Level-Ponderosa",
  "RPM-Discs-Ruru",
  "Axiom-Clash",
  "MVP-Vector",
  "Viking-Ragnarok",
  "Gateway-Warrior-(Gateway)",
  "Viking-Barbarian",
  "Discmania-GM",
  "Innova-Skeeter",
  "Discmania-Rockstar",
  "Latitude-64-Bolt",
  "Innova-Dragon",
  "Innova-Archon",
  "DGA-Rogue",
  "Innova-Mid-Disc3",
  "Innova-Whippet",
  "Westside-Warship",
  "Gateway-Blade",
  "Discraft-Zombee",
  "Innova-Whale",
  "Innova-Daedalus",
  "Discraft-Scorch",
  "Discmania-MD3",
  "Prodigy-H3-V2",
  "DGA-Hypercane",
  "Discmania-CD3",
  "Infinite-Discs-Slab",
  "Dynamic-Discs-Captain",
  "Discraft-Captain's-Raptor",
  "Innova-AviarX3",
  "Innova-Leopard",
  "Prodigy-M5",
  "MVP-Orbital",
  "RPM-Discs-Takapu",
  "Legacy-Patriot",
  "Lone-Star-Disc-Mockingbird",
  "Other-Tiyanak",
  "Discraft-Crush",
  "DGA-Steady",
  "Latitude-64-Jade",
  "DGA-Gumbputt",
  "Other-Kraken",
  "Discraft-Surge",
  "Westside-Hatchet",
  "Clash-Discs-Butter",
  "Westside-Sorcerer",
  "Discraft-Hawk",
  "Disctroyer-MR-5-Skylark",
  "Innova-TeeRex",
  "Latitude-64-Flow",
  "Innova-Roadrunner",
  "Latitude-64-Raketen",
  "Millennium-Moab",
  "Dynamic-Discs-Culprit",
  "Innova-Lion",
  "Westside-Bear",
  "Discmania-CD1",
  "Discmania-Logic",
  "Dynamic-Discs-Truth,-EMAC",
  "Innova-Colossus",
  "Yikun-Hu",
  "Discraft-Hades",
  "Westside-Fortress",
  "Discmania-Spring-Ox",
  "RPM-Discs-Taniwha",
  "Innova-Rat",
  "RPM-Discs-Pekapeka",
  "Yikun-Lu",
  "Latitude-64-Rive",
  "Dynamic-Discs-Verdict",
  "Prodigy-M4",
  "Discmania-MD1",
  "Prodigy-D5",
  "Vibram-Lace",
  "Discmania-MD5",
  "Millennium-Sabot",
  "Discraft-Challenger",
  "Prodigy-D4-Max",
  "Innova-Max",
  "Discmania-Sea-Serpent",
  "Innova-Firebird",
  "Discraft-Fierce",
  "Discraft-Nuke-OS",
  "Gateway-Blaze",
  "Finish-Line-Supra",
  "Thought-Space-Athletics-Mana",
  "Infinite-Discs-Czar",
  "Latitude-64-Keystone",
  "Lone-Star-Disc-Tumbleweed",
  "Infinite-Discs-Cohort",
  "Discmania-Majesty",
  "DGA-Reef",
  "Løft-Discs-Bohrium",
  "MVP-Energy",
  "Legacy-Ghost",
  "Innova-Colt",
  "Løft-Discs-Hydrogen",
  "Wild-Discs-Orca",
  "Discraft-Stratus",
  "Prodigy-PA5",
  "Gateway-Chief-OS",
  "MVP-Switch",
  "Thought-Space-Athletics-Animus",
  "Yikun-View",
  "Viking-Fenrir",
  "Latitude-64-Spike",
  "Innova-Groove",
  "RPM-Discs-Kiwi",
  "Innova-KC-Aviar",
  "Prodigy-H4-V2",
  "MVP-Nitro",
  "Lone-Star-Disc-Jack-Rabbit",
  "Mint-Discs-Longhorn",
  "Discmania-FD2",
  "Above-Ground-Level-Beech",
  "Vibram-Solace",
  "Discmania-Tactic",
  "Discraft-Crank",
  "Clash-Discs-Mango",
  "Dynamic-Discs-Justice",
  "Infinite-Discs-Scepter",
  "Daredevil-Merlin",
  "Millennium-Sentinel",
  "Infinite-Discs-Emperor",
  "Latitude-64-Musket",
  "Streamline-Jet",
  "Innova-Wahoo",
  "Kastaplast-Lots",
  "Infinite-Discs-Roman",
  "Discraft-Wildcat",
  "Dynamic-Discs-Getaway",
  "Latitude-64-Falchion",
  "MVP-Shock",
  "MVP-Signal",
  "Gateway-Spear",
  "Disc-Golf-UK-The-Duke",
  "Discraft-Comet",
  "Prodiscus-Stari",
  "Yikun-Gou",
  "Finish-Line-Pace",
  "Discraft-Surge-SS",
  "Discraft-Ringer-GT",
  "Elevation-Disc-Golf-Gecko",
  "Other-Cypress",
  "Other-Narwhal",
  "Dynamic-Discs-Enforcer",
  "Streamline-Pilot",
  "Kastaplast-Svea",
  "Kastaplast-Jarn",
  "Yikun-Meteor-Hammer",
  "Discraft-Stalker",
  "DGA-Pipeline",
  "Discmania-FD",
  "Streamline-Stabilizer",
  "Discraft-Punisher",
  "Gateway-Voodoo",
  "Yikun-Ling",
  "Gateway-Houdini",
  "Wild-Discs-Great-White",
  "Other-Brontosaurus",
  "Clash-Discs-Spice",
  "Dynamic-Discs-Warden",
  "Other-I-One",
  "Above-Ground-Level-Madrone",
  "Innova-Roc",
  "Gateway-Speed-Demon",
  "Other-Zeal",
  "Prodigy-FX-4",
  "Latitude-64-River-Pro",
  "Lone-Star-Disc-Walker",
  "Latitude-64-Pure",
  "Mint-Discs-Jackalope",
  "Innova-Gazelle",
  "Discmania-PD",
  "Dynamic-Discs-Renegade",
  "Yikun-Kang",
  "Innova-Aviar-Classic",
  "Innova-Mamba",
  "Innova-Leopard3",
  "MVP-Limit",
  "Infinite-Discs-Kon-Tiki",
  "Disc-Golf-UK-The-Duchess",
  "Discraft-Crank-SS",
  "Discmania-PD3",
  "Lone-Star-Disc-Lariat",
  "Daredevil-Hellbender-(Razorback)",
  "Dynamic-Discs-Defender",
  "Yikun-Gui",
  "Latitude-64-Diamond",
  "Mint-Discs-Profit",
  "Daredevil-Grizzly",
  "Latitude-64-Explorer",
  "Mint-Discs-Goat-(Eternal)",
  "Discraft-Venom-(Retooled)",
  "Westside-Swan-2",
  "Other-White-Widow",
  "Discraft-Luna",
  "Prodigy-MX-1",
  "Kastaplast-Grym-X",
  "Innova-Vulcan",
  "Yikun-Hammer",
  "Daredevil-Ogopogo",
  "Westside-World",
  "Lightning-#1-Hookshot",
  "Lone-Star-Disc-Bluebonnet",
  "Innova-Wolf",
  "AquaFlight-Dragonfly",
  "Gateway-Illusion",
  "Innova-Destroyer",
  "Innova-Corvette",
  "Thought-Space-Athletics-Synapse",
  "Thought-Space-Athletics-Alter",
  "Millennium-Orion-LF",
  "Innova-Shark",
  "Lone-Star-Disc-Brazos",
  "Lone-Star-Disc-Frio",
  "Prodigy-P-Model-US",
  "Prodigy-D-Model-S",
  "Millennium-Polaris-LF",
  "Kastaplast-Reko-X",
  "Innova-Monarch",
  "Daredevil-Hellbender",
  "Prodigy-X2",
  "Other-KGB",
  "Discmania-Sensei",
  "Kastaplast-Berg",
  "Gateway-Apex",
  "Discraft-Raptor",
  "MVP-Deflector",
  "Axiom-Thrill",
  "Lone-Star-Disc-Tombstone",
  "Dynamic-Discs-Gavel",
  "DGA-Rift",
  "Innova-Xero",
  "Thought-Space-Athletics-Muse",
  "Discmania-MD",
  "Thought-Space-Athletics-Omen",
  "Clash-Discs-Popcorn",
  "Lone-Star-Disc-Warbird",
  "Wild-Discs-Tasmanian-Devil-V2",
  "Discmania-MD4",
  "Storm-The-Eye",
  "Discraft-Buzzz",
  "EV-7-Penrose",
  "Yikun-Bi",
  "Prodiscus-Origo",
  "MVP-Motion",
  "Legacy-Rebel",
  "Dynamic-Discs-Escape",
  "Millennium-Draco",
  "Millennium-Polaris-LS",
  "Discraft-Venom",
  "Discraft-Reaper",
  "Discmania-DD2",
  "Westside-Crown",
  "Kastaplast-Guld",
  "Millennium-Mortar",
  "Streamline-Runway",
  "Latitude-64-XXX",
  "Elevation-Disc-Golf-Interceptor",
  "Discmania-DDx",
  "Vibram-Obex",
  "Innova-IT",
  "Legacy-Phenom",
  "DGA-Steady-BL",
  "Other-Alpas",
  "Discraft-Talon",
  "Mint-Discs-Alpha",
  "Innova-Valkyrie",
  "Latitude-64-Ruby",
  "Daredevil-Timberwolf",
  "Discraft-Wasp",
  "Discmania-MD2",
  "MVP-Vertex",
  "Prodigy-D4",
  "Yikun-Yan",
  "Latitude-64-River",
  "Dynamic-Discs-Vandal",
  "Discmania-Link",
  "Discraft-Pulse",
  "MVP-Atom",
  "Discraft-Zeppelin",
  "Westside-Sling",
  "Viking-Berserker",
  "Vibram-Onyx",
  "Mint-Discs-Grackle",
  "DGA-Hurricane",
  "Infinite-Discs-Sphinx",
  "Innova-Invader",
  "Other-Serpent",
  "Innova-Eagle",
  "Infinite-Discs-Centurion",
  "Westside-Northman",
  "Prodiscus-Slaidi",
  "Lone-Star-Disc-Copperhead",
  "Innova-Dart",
  "Innova-Jay",
  "Elevation-Disc-Golf-Binx,-ecoFlex",
  "Millennium-Aurora/QMS",
  "Innova-Stud",
  "Disc-Golf-UK-The-Baron",
  "Prodigy-D3-Max",
  "Innova-Pig",
  "Innova-Mako3",
  "Discraft-Anax",
  "Discmania-P1x",
  "Lone-Star-Disc-Seguin",
  "Discmania-Mentor",
  "Innova-Classic-Roc",
  "Discraft-Thrasher",
  "Discraft-Flick",
  "Trash-Panda-Inner-Core",
  "MVP-Terra",
  "Discraft-Ringer",
  "Discmania-Astronaut",
  "Legacy-Vengeance",
  "Axiom-Paradox",
  "Innova-Panther",
  "Other-Lawin",
  "Innova-Spider",
  "Latitude-64-Grace",
  "Mint-Discs-Bullet",
  "Discmania-CD",
  "Westside-Adder",
  "Axiom-Crave",
  "Prodigy-P-Model-OS",
  "Gateway-Magic",
  "Discraft-Avenger-SS",
  "Latitude-64-Culverin",
  "Westside-Anvil",
  "Prodigy-PA3",
  "Millennium-Omega-Big-Bead",
  "Innova-Cobra",
  "Mint-Discs-Goat",
  "Legacy-Nemesis",
  "Discraft-Roach",
  "Gateway-Journey",
  "Gateway-Apache",
  "Prodiscus-Laseri",
  "Discraft-Sting",
  "Prodigy-F-Model-S",
  "Innova-Power-Disc",
  "Innova-Sonic",
  "Innova-Tern",
  "Lone-Star-Disc-Harpoon",
  "Disctroyer-PA-3-Sparrow",
  "Other-Stego",
  "Prodigy-PX-3",
  "Daredevil-BigFoot",
  "Millennium-Solstice",
  "RPM-Discs-Kahu-OS",
  "Other-Andro-C-(Retooled)",
  "Vibram-Notch",
  "MVP-Dimension",
  "Prodigy-MX-3",
  "Innova-TL",
  "MVP-Octane",
  "Yikun-Twin-Swords",
  "Lone-Star-Disc-The-Dome",
  "Infinite-Discs-Inca",
  "Axiom-Vanish",
  "MVP-Inertia",
  "Innova-Atlas",
  "Lone-Star-Disc-Mad-Cat",
  "MVP-Resistor",
  "DGA-Shockwave",
  "Innova-Roc-X3",
  "Latitude-64-Pirate",
  "Streamline-Electron-Stabilizer",
  "Other-Iridium",
  "MVP-Entropy",
  "DGA-Hellfire",
  "Innova-Firefly",
  "Discraft-Machete",
  "Innova-Beast",
  "MVP-Anode",
  "Discraft-Passion",
  "Discraft-XL",
  "Innova-Aero",
  "Millennium-Tank",
  "Innova-Banshee",
  "Innova-Aviar",
  "MVP-Terra-(Electron)",
  "Dynamic-Discs-Raider",
  "Lone-Star-Disc-Penny-Putter-(Premium)",
  "MVP-Catalyst",
  "MVP-Relay",
  "Millennium-Marksman",
  "Other-Andro-C",
  "Latitude-64-Bryce",
  "Latitude-64-Knight",
  "Prodigy-D-Model-US",
  "Discmania-Cloudbreaker",
  "Dynamic-Discs-Deputy",
  "Wild-Discs-Sea-Otter",
  "Westside-King",
  "Prodigy-X5",
  "Prodigy-D1-Max",
  "Elevation-Disc-Golf-Koi",
  "Innova-Teebird",
  "Innova-Nova",
  "Dynamic-Discs-Agent",
  "Latitude-64-Halo",
  "Dynamic-Discs-Criminal",
  "Thought-Space-Athletics-Temple",
  "Discraft-Xtreme",
  "Westside-Ahti",
  "Innova-Stingray",
  "Innova-Croc",
  "Daredevil-Sasquatch",
  "Innova-Foxbat",
  "Prodigy-P-Model-S",
  "Other-Golem",
  "Axiom-Panic",
  "Westside-Longbowman",
  "Hooligan-Discs-Thread",
  "MVP-Uplink",
  "MVP-Reactor",
  "Latitude-64-Spark",
  "Gateway-Prophecy",
  "Legacy-Gauge",
  "Kastaplast-Krut",
  "Streamline-Echo",
  "Prodigy-PA1",
  "Discraft-Buzzz-OS",
  "Vibram-Summit",
  "Kastaplast-Rask",
  "Discmania-PD-(New)",
  "Discmania-Shogun",
  "Other-Nice!",
  "Discmania-Rainmaker",
  "Axiom-Insanity",
  "Westside-Bard",
  "Axiom-Theory",
  "Innova-Animal",
  "Lone-Star-Disc-Bull-Snake",
  "Prodigy-F7",
  "Innova-Starfire-L",
  "Infinite-Discs-Ruin",
  "Streamline-Trace",
  "Innova-Python",
  "Latitude-64-Claymore",
  "Innova-Firestorm",
  "Prodiscus-Legenda",
  "Wild-Discs-Hyena",
  "Dynamic-Discs-Bounty",
  "DGA-Quake",
  "Above-Ground-Level-Magnolia",
  "Discmania-FD1",
  "Gateway-Karma",
  "Yikun-Shu",
  "Infinite-Discs-Raze",
  "Latitude-64-Hope-(Royal-Proto)",
  "Streamline-Flare",
  "Innova-Aviar-Driver",
  "Innova-Gator",
  "Daredevil-Sabertooth",
  "Prodigy-M-Model-S",
  "Storm-Wall-Cloud",
  "Innova-Aviar3",
  "Axiom-Inspire",
  "Prodigy-F-Model-US",
  "Millennium-Taurus",
  "Thought-Space-Athletics-Construct",
  "AquaFlight-Pelican",
  "Millennium-Quasar",
  "Prodiscus-Jokeri",
  "Lone-Star-Disc-Texas-Ranger",
  "Infinite-Discs-Chariot",
  "Legacy-Outlaw",
  "Viking-Odin",
  "Other-Apollo",
  "Gateway-Chief",
  "MVP-Tensor",
  "Legacy-Enemy",
  "Daredevil-Owl",
  "Legacy-Pursuit",
  "Prodigy-H3",
  "Westside-Catapult",
  "MVP-Axis",
  "Axiom-Excite",
  "Gateway-Scout",
  "Millennium-Orion-LS",
  "Elevation-Disc-Golf-Binx,-Newcomer",
  "Prodigy-F1",
  "Legacy-Mongoose",
  "Prodigy-M2",
  "Discraft-Glide",
  "Prodigy-H2-V2",
  "Yikun-Yao",
  "Discmania-P2",
  "Kastaplast-Kaxe",
  "DGA-Undertow",
  "Gateway-Demon",
  "Discmania-Mermaid",
  "Kastaplast-Reko",
  "Dynamic-Discs-Convict",
  "Legacy-Badger",
  "Discraft-Zone",
  "DGA-Aftershock",
  "Dynamic-Discs-Slammer",
  "RPM-Discs-Kotuku",
  "DGA-Tremor",
  "Other-Tyrant",
  "EV-7-Telos",
  "Latitude-64-Maul",
  "Dynamic-Discs-Marshal",
  "Dynamic-Discs-Evidence",
  "Legacy-Hunter",
  "Discraft-Vulture",
  "Hooligan-Discs-Vibe",
  "Vibram-Sole",
  "DGA-Squall",
  "Streamline-Lift",
  "Latitude-64-Recoil",
  "Daredevil-Caribou",
  "Discmania-P2-(new)",
  "Gateway-Element",
  "Wild-Discs-Addax",
  "Dynamic-Discs-Sockibomb-Slammer",
  "Hooligan-Discs-Flip",
  "Innova-Boss",
  "Daredevil-Moose",
  "Dynamic-Discs-Truth",
  "Gateway-Wizard",
  "Above-Ground-Level-Redwood",
  "Westside-Sampo",
  "Prodiscus-Razeri",
];

async function downloadImage(imageUrl, savePath) {
  return new Promise((resolve, reject) => {
    request.head(imageUrl, function (err, res, body) {
      request(imageUrl)
        .pipe(fs.createWriteStream(savePath))
        .on("close", resolve)
        .on("error", reject);
    });
  });
}

async function scrapeDiscImage(discName) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://infinitediscs.com/${discName}`);

  const imageUrl = await page.evaluate(() => {
    const images = document.getElementsByClassName("img-fluid");
    if (images.length > 0) {
      return images[0].src;
    }
    return null;
  });

  if (imageUrl) {
    const savePath = `disc-images/${discName}.png`;
    await downloadImage(imageUrl, savePath);
    console.log("Image saved for", discName);
  } else {
    console.error("Image not found for", discName);
  }

  await browser.close();
}

// Create the "disc-images" folder if it doesn't exist
if (!fs.existsSync("disc-images")) {
  fs.mkdirSync("disc-images");
}

// Throttle the requests to limit concurrent operations
const concurrencyLimit = 5; // Adjust this value as per your system's capacity

async function run() {
  for (let i = 0; i < arr.length; i += concurrencyLimit) {
    const batch = arr.slice(i, i + concurrencyLimit);
    const promises = batch
      .filter((discName) => discName.startsWith("RPM-Discs"))
      .map((discName) => scrapeDiscImage(discName));
    await Promise.all(promises);
  }
}

run()
  .then(() =>
    console.log("All disc images scraped and downloaded successfully.")
  )
  .catch((error) => console.error("An error occurred:", error));
