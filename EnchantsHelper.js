LIBRARY({
    name: "EnchantsHelper",
    version: 1,
    shared: true,
    api: "CoreEngine"
});

IDRegistry.genItemId("enchanBook");
Item.createItem("enchanBook", "enchantment book", { name: "book_enchanted" }, { stack: 1 });
Item.getItemByID(ItemID.enchanBook).setEnchantType(MASK.ALL);
var MASK = {
	AXE: 512,
	ALL: 16383,
	BOW: 32,
	BOOTS: 4,
	CHESTPLATE: 8,
	FISHING_ROD: 4096,
	FLIND_AND_STEEL: 256,
	HELMET: 0,
	HOE: 64,
	LEGGINS: 2,
	PICKAXS: 1024,
	SHEARS: 128,
	SHOVEL: 2048,
	WEAPON: 16,
	TOOL: 512 | 64 | 2048 | 128 | 1024,
	ARMOR: 0 | 2 | 8 | 4,
	WEAPONS: 32 | 16 | 512
};

let Curses = [28, 27];

const Enchants = {
	getCurses: function() {
		return Curses;
	},
	setCurse: function(enchant) {
		Curses.push(enchant);
	},
	isCurse: function(enchant) {
		for (var i = 0; i < Curses.length; i++) {
			if (Curses[i] === enchant) {
				return true;
			}
		}
		return false;
	},
	addBook: function(enchant, level) {
		for (let i = 1; i <= level; i++) {
			let extra = new ItemExtraData();
			extra.addEnchant(enchant, i);
			Item.addToCreative(ItemID.enchanBook, 1, 0, extra);
		}
	},
	hurt: function(enchant, func, level) {
		Callback.addCallback('EntityHurt', function(attacker, victim, damageValue, damageType, someBool1, someBool2) {
			let item = Entity.getCarriedItem(attacker);
			if (item.extra && item.extra.getEnchantLevel(enchant) == (level || 3) && damageType == 2) {
				let enchantLevel = item.extra.getEnchantLevel(enchant);
				func(item, enchantLevel, attacker, victim, damageValue, damageType);
			}
		});
	},
	hurtOwner: function(enchant, func, level) {
		Callback.addCallback('EntityHurt', function(attacker, victim, damageValue, damageType, someBool1, someBool2) {
			for (let y = 0; y < 4; y++) {
				let item = Entity.getArmorSlot(player, y);
				if (item.extra && item.extra.getEnchantLevel(enchant) == (level || 3)) {
					let enchantLevel = item.extra.getEnchantLevel(enchant);
					func(item, enchantLevel, attacker, victim, damageValue, damageType);
				}
			}

		});
	},
	destroyBlock: function(enchant, func, level) {
		Callback.addCallback('DestroyBlock', function(coords, block, player) {
			let item = Entity.getCarriedItem(player);
			if (item.extra && item.extra.getEnchantLevel(enchant) == (level || 3)) {
				let enchantLevel = item.extra.getEnchantLevel(enchant);
				func(item, enchantLevel, coords, block, player);
			}
		});
	},
	useItem: function(enchant, func, level) {
		Callback.addCallback("ItemUse", function(coords, item, block, isExternal, player) {
			if (item.extra && item.extra.getEnchantLevel(enchant) == (level || 3)) {
				let enchantLevel = item.extra.getEnchantLevel(enchant);
				func(coords, item, block, isExternal, player, enchantLevel);
			}
		});
	},
	inInv: function(enchant, func, level) {
		Callback.addCallback("ServerPlayerTick", function(player) {
			for (let y = 0; y <= 40; y++) {
				let actor = new PlayerActor(player);
				let item = actor.getInventorySlot(y);
				if (item.extra && item.extra.getEnchantLevel(enchant) == (level || 3)) {
					let enchantLevel = item.extra.getEnchantLevel(enchant);
					func(item, enchantLevel, player);
				}
			}
		});
	},
	onNaked: function(enchant, func, level) {
		Callback.addCallback("ServerPlayerTick", function(player) {
			for (let y = 0; y < 4; y++) {
				let item = Entity.getArmorSlot(player, y);
				if (item.extra && item.extra.getEnchantLevel(enchant) == (level || 3)) {
					let enchantLevel = item.extra.getEnchantLevel(enchant);
					func(item, enchantLevel, player);
				}
			}
		});
	},
	preventDaamage: function(enchant, level) {
		Callback.addCallback('EntityHurt', function(attacker, victim, damageValue, damageType, someBool1, someBool2) {
			for (let y = 0; y < 4; y++) {
				let item = Entity.getArmorSlot(player, y);
				if (item.extra && item.extra.getEnchantLevel(enchant) == (level || 3)) {
					Game.prevent();
				}
			}
		});
	}
};	

EXPORT("Enchants", Enchants);
EXPORT("MASK", MASK);
EXPORT("Cursee", Curses);


