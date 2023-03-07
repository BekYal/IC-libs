const Enchants = {
	registerHurtFunction: function(enchant, func, level) {
Callback.addCallback('EntityHurt',
	function (attacker, victim, damageValue, damageType, someBool1, someBool2) {
		let item = Entity.getCarriedItem(attacker);
		let actor = new PlayerActor(attacker);
		if (item.extra && item.extra.getEnchantLevel(enchant) == (level || 1) ) {
			
			func(item, attacker, victim, damageValue, damageType, someBool1, someBool2);
		}
	});
	}
};