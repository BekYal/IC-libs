var invUtil = {
	getItemCount: function(id, data, extra) {
		for (let y = 0; y <= 40; y++) {
			let actor = new PlayerActor(Player.get());
			let item = actor.getInventorySlot(y);
			if (item.id == id && item.data == data && item.extra)
				if (extra) {
					if (item.extra == extra) {
						return item.count;
					}
				} else {
					return item.count;
				}
		}
	},

	dropInventoryItem: function(id, count, data, extra) {
		for (let y = 0; y <= 40; y++) {
			let actor = new PlayerActor(Player.get());
			let item = actor.getInventorySlot(y);
			let pos = Entity.getPosition(Player.get());
			if (item.id == id && item.data == data && item.extra && item.extra == (extra || item.extra) && item.count == count) {
				World.drop(pos.x, pos.y, pos.z, id, count, data, item.extra);
			}
		}
	},

	hasItem: function(slot) {
		let actor = new PlayerActor(Player.get());
		let item = actor.getInventorySlot(y);
		if (item.id && item.data) {
			return true;
		} else {
			return false;
		}
	},
	//хз робит ли
	getLeftHand: function() {
		return Entity.getOffhandItem(Player.get());
	},

	removeItem: function(id, data, extra, decrease) {
		for (let y = 0; y <= 36; y++) {
			let actor = new PlayerActor(Player.get());
			let item = actor.getInventorySlot(y);
			if (item.id == id && item.data == data && item.extra && item.extra == extra) {
				actor.setInventorySlot(y, item.id, item.count - decrease || 1, item.data, item.extra)
			}
		}
	},
	removeingItem: function(id, data, decrease) {
		Callback.addCallback("ServerPlayerTick", function(player) {
			for (let y = 0; y <= 36; y++) {
				let actor = new PlayerActor(Player.get());
				let item = actor.getInventorySlot(y);
				if (item.id == id && item.data == data) {
					actor.setInventorySlot(y, item.id, item.count - decrease || 1, item.data, item.extra)
				}
			}
		});
	},

	getInventorySize: function() {
		return 36;
	},

	getItemSlot: function(id, data, extra) {
		for (let y = 0; y <= 40; y++) {
			let actor = new PlayerActor(Player.get());
			let item = actor.getInventorySlot(y);
			if (item.id == id && item.data == data && item.extra)
				if (extra) {
					if (item.extra == extra) {
						return y;
					}
				} else {
					return y;
				}
		}
	}

};