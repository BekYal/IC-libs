const Enchants = {

	hurtFunction: function(enchant, func, level) {
		Callback.addCallback('EntityHurt', function(attacker, victim, damageValue, damageType, someBool1, someBool2) {
			let item = Entity.getCarriedItem(attacker);
			let enchantLevel = item.extra.getEnchantLevel(enchant);
			if (item.extra && item.extra.getEnchantLevel(enchant) == (level || 1) && damageType == 2) {
				func(item, enchantLevel, attacker, victim, damageValue, damageType);
			}
		});
	},

	destroyBlock: function(enchant, func, level) {
		Callback.addCallback('DestroyBlock', function(coords, block, player) {
			let item = Entity.getCarriedItem(player);
			let enchantLevel = item.extra.getEnchantLevel(enchant);
			if (item.extra && item.extra.getEnchantLevel(enchant) == (level || 1)) {
				func(item, enchantLevel, coords, block, player);
			}
		});
	}

};