var invUtil = {
   getItemCount: function(id, data, extra) {
      for (let y = 0; y <= 40; y++) {
         let actor = new PlayerActor(Player.get());
         let item = actor.getInventorySlot(y);
         if (item.id == id && item.data == data && item.extra){
            if (extra) {
               if (item.extra == extra) {
                  return item.count;
               }
            } else {
               return item.count;
            }
         }
      }
   },
   dropInventoryItem: function(id, count, data, extra) {
      let player = Player.get(),
         actor = new PlayerActor(player),
         pos = Entity.getPosition(player);
      for (let y = 0; y <= 40; y++) {
         let item = actor.getInventorySlot(y);
         if (item.extra && item.id == id && item.data == data && item.extra == extra && item.count == count) {
            World.drop(pos.x, pos.y, pos.z, id, count, data, item.extra);
            actor.setInventorySlot(y, item.id, item.count =- 1, item.data, item.extra)
         }
      }
   },

   hasItem: function(slot) {
      let actor = new PlayerActor(Player.get());
      let item = actor.getInventorySlot(slot);
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
      let actor = new PlayerActor(Player.get());
      for (let y = 0; y <= 36; y++) {
         let item = actor.getInventorySlot(y);
         if (item.id == id && item.data == data && item.extra && item.extra == extra) {
            actor.setInventorySlot(y, item.id, item.count - decrease || 1, item.data, item.extra)
         }
      }
   },
   removeingItem: function(id, data, decrease) {
      Callback.addCallback("ServerPlayerTick", function(player) {
         let actor = new PlayerActor(player);
         for (let y = 0; y <= 36; y++) {
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
      let actor = new PlayerActor(Player.get());
      for (let s = 0; s < 36; s++) {
         let item = actor.getInventorySlot(s);
         if (item.extra && item.extra == extra && item.id == id && item.data == data) {
            return item;
         }
      }
   }

};