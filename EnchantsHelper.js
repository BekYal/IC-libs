const Enchants = {
	registerHurtFunction: function(enchant, func, lev) {
Callback.addCallback('EntityHurt',
	function (attacker, victim, damageValue, damageType, someBool1, someBool2) {
		let item = Entity.getCarriedItem(attacker);
		let actor = new PlayerActor(attacker);
		if (item.extra && item.extra.getEnchantLevel(enchant) == (lev || 1) ) {
			let enchantLevel = item.extra.getEnchantLevel(enchant);
			func(item, enchantLevel, attacker, victim, damageValue, damageType);
		}
	});
	}
}