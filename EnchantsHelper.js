const Enchants = {

	hurtFunction: function(enchant, func, level) {
		Callback.addCallback('EntityHurt', function(attacker, victim, damageValue, damageType, someBool1, someBool2) {
			let item = Entity.getCarriedItem(attacker);
			if (item.extra && item.extra.getEnchantLevel(enchant) == (level || 1) && damageType == 2) {
				let enchantLevel = item.extra.getEnchantLevel(enchant);
				func(item, enchantLevel, attacker, victim, damageValue, damageType);
			}
		});
	},

	destroyBlock: function(enchant, func, level) {
		Callback.addCallback('DestroyBlock', function(coords, block, player) {
			let item = Entity.getCarriedItem(player);
			if (item.extra && item.extra.getEnchantLevel(enchant) == (level || 1)) {
				let enchantLevel = item.extra.getEnchantLevel(enchant);

				func(item, enchantLevel, coords, block, player);
			}
		});
	},
	useFunction: function(enchant, func, level) {
		Callback.addCallback("ItemUse", function(coords, item, block, isExternal, player) {
			if (item.extra && item.extra.getEnchantLevel(enchant) == (level || 1)) {
				let enchantLevel = item.extra.getEnchantLevel(enchant);
				func(coords, item, block, isExternal, player, enchantLevel);
			}
		});
	}

};

let LiveSteal = CustomEnchant.newEnchant("LiveSteal", Translation.translate("LiveSteal"))
	.setMinMaxLevel(1, 3)
	.setMask(MASKS.axe)
	.setFrequency(1);
Enchants.useFunction(LiveSteal.id, function(coords, item, block, isExternal, player, enchantLevel) {
	Game.message(item.extra + "");
}, 3);
Enchants.destroyBlock(LiveSteal.id, function(item, enchantLevel, coords, block, player) {
	Game.message(item.extra + "");
}, 3);

Enchants.hurtFunction(LiveSteal.id, function(item, enchantLevel, attacker, victim, damageValue, damageType) {
	Game.message(item.extra + "");
}, 3);