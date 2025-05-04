Game.registerMod("customSpellMod", {
	init: function () {
		// Delay mod logic to ensure Grimoire has loaded
		if (Game.Objects['Wizard tower'].minigameLoaded) {
			this.addSpell();
		} else {
			Game.registerHook('check', () => {
				if (Game.Objects['Wizard tower'].minigameLoaded) this.addSpell();
			});
		}
	},
	addSpell: function () {
		let minigame = Game.Objects['Wizard tower'].minigame;
		if (!minigame) return;

		// Define your custom spell
		const customSpell = {
			name: "Golden Blessing",
			desc: "Spawns a golden cookie immediately.",
			failDesc: "Nothing happens.",
			icon: [10, 7], // Icon coordinates from the game's icon sheet
			cost: 20, // Mana cost
			costMin: 10, // Min cost for cost scaling
			costMax: 100,
			effect: function () {
				// Your spell effect goes here
				Game.shimmerTypes['golden'].popFunc(); // Force a golden cookie
				return true; // Return true to indicate success
			},
			fail: function () {
				// Optional failure effect
				return false; // Return false = nothing happened
			},
			req: function () {
				// Conditions for casting; return true if spell is available
				return true;
			},
			// Optional: Customize the spell success/failure chance
			chance: function () {
				return 1; // Always succeed
			}
		};

		// Register the spell in the Grimoire
		minigame.spells.push(customSpell);

		// Rebuild spell list in UI
		minigame.buildSpellList();
	}
});
