var invUtil = {
  chargeItem: function(chargedItem, chargeItem, repair, decrease) {
    Callback.addCallback("ServerPlayerTick", function(player) {
      let actor = new PlayerActor(player);
      for (let i = 0; i <= 36; i++) {
        for (let y = 0; y <= 36; y++) {
          let item = actor.getInventorySlot(i);
          let it = actor.getInventorySlot(y);
          if (item.id == chargedItem && it.id == chargeItem && World.getThreadTime() % 2 == 0 && item.data < Item.getMaxDamage(chargedItem)) {
            actor.setInventorySlot(i, item.id, item.count, item.data - repair, item.extra);
            actor.setInventorySlot(y, it.id, it.count - decrease || 1, it.data, it.extra);
            break;
          }
        }
      }
    });
  },

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
        World.drop(pos.x, pos.y, pos.z, id, count, data, extra || item.extra);
      }
    }
  },

  hasItem: function(id, data) {
    for (let y = 0; y <= 40; y++) {
      let actor = new PlayerActor(Player.get());
      let item = actor.getInventorySlot(y);
      if (item.id == id && item.data == data) {
        return true;
      } else {
        return false;
      }
    }
  },
  //хз робит ли
  getLeftHand: function() {
    return Entity.getOffhandItem(Player.get());
  },

  removeItem: function(id, data, decrease) {
    for (let y = 0; y <= 36; y++) {
      let actor = new PlayerActor(Player.get());
      let item = actor.getInventorySlot(y);
      if (item.id == id && item.data == data) {
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

  getItemSlot: function(id, data) {
    for (let y = 0; y <= 40; y++) {
      let actor = new PlayerActor(Player.get());
      let item = actor.getInventorySlot(y);
      if (item.id == id && item.data == data)
        return y;
    }
  }

};