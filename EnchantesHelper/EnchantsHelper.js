LIBRARY({
   name: "EnchantsHelper",
   version: 1,
   shared: true,
   api: "CoreEngine"
});
var Curses = [28, 27];

var Mask = {
   axe: 512,
   all: 16383,
   bow: 32,
   boots: 4,
   chestplate: 8,
   fishing_rod: 4096,
   flind_and_steel: 256,
   helmet: 0,
   hoe: 64,
   leggins: 2,
   pickaxs: 1024,
   shears: 128,
   shovel: 2048,
   weapon: 16,
   tool: 512 | 64 | 2048 | 128 | 1024,
   armor: 0 | 2 | 8 | 4,
   weapons: 16 | 512
};

IDRegistry.genItemID("enchanBook");
Item.createItem("enchanBook", "enchantment book", { name: "book_enchanted" }, { stack: 1 });
Item.setEnchantType('enchanBook', Mask.all, 10);

Callback.addCallback("ServerPlayerTick", function(player) {
   let actor = new PlayerActor(player);
   if (World.getThreadTime() % 100 == 0) {
      for (let y = 0; y <= 40; y++) {
         let item = actor.getInventorySlot(y);
         if (item.extra && item.id == ItemID.enchanBook) {
            actor.setInventorySlot(y, 403, item.count, item.data, item.extra);
         }
      }
   }
});



var Chance = {
      executeWithChance: function(chance, code) {
         if (Math.random() < chance) {
            code();
         }
      },
      executeWithPercentChance: function(percent, code) {
         if (Math.random() < percent / 100) {
            code();
         }
      },
      getChance: function(chance) {
         let res = false;
         if (Math.random() < chance) return !res;
         else return res;
      },
      getPercentChance: function(chance) {
         if (Math.random() < chance / 100) {
            return true;
         } else { false }
      }
   },

   Enchants = {
      randomTickEvent: function(enchant, callbackName, func, minRnd, maxRnd) {
         Callback.addCallback("ServerPlayerTick", function(player) {
            let actor = new PlayerActor(player);
            switch (callbackName) {
               case 'inInv':
                  if (World.getThreadTime() % Math.floor(Math.random() * (minRnd - maxRnd + 1)) == 0) {
                     for (let s = 0; s < 40; s++) {
                        let item = actor.getInventorySlot(s);
                        if (item.extra && item.extra.getEnchantLevel(enchant) != 0) {
                           let enchantLevel = item.extra.getEnchantLevel(enchant);
                           func(player, item, enchantLevel);
                        }
                     }
                  }
                  break;
               case 'inHand':
                  let item = Entity.getCarriedItem(player)
                  if (World.getThreadTime() % Math.floor(Math.random() * (minRnd - maxRnd + 1)) == 0 && item.extra && item.extra.getEnchantLevel(enchant) != 0) {
                     let enchantLevel = item.extra.getEnchantLevel(enchant);
                     func(player, item, enchantLevel);
                  }
                  break;
            }
         });
      },
      tickEvent: function(enchant, event, func, time) {
         Callback.addCallback("ServerPlayerTick", function(player) {
            let actor = new PlayerActor(player), item, enchantLevel;
               if (World.getThreadTime() % (time || 20) == 0) {
                  switch (event) {
                     case onNkaed:
                     case 'onNaked':
                        for (let y = 0; y < 4; y++) {
                           item = Entity.getArmorSlot(player, y);
                           if (item.extra && item.extra.getEnchantLevel(enchant) != 0) {
                              enchantLevel = item.extra.getEnchantLevel(enchant);
                              func(item, enchantLevel, player);
                           }
                        }
                        break;
                     case inInv:
                     case 'inInv':
                        for (let y = 0; y <= 40; y++) {
                           item = actor.getInventorySlot(y);
                           if (item.extra && item.extra.getEnchantLevel(enchant) != 0) {
                              enchantLevel = item.extra.getEnchantLevel(enchant);
                              func(item, enchantLevel, player);
                           }
                        }
                        break;
                     case inHand:
                     case 'inHand':
                        item = Entity.getCarriedItem(player);
                        if (item.extra && item.extra.getEnchantLevel(enchant) != 0) {
                           enchantLevel = item.extra.getEnchantLevel(enchant);
                           func(item, enchantLevel, player);
                        }
                        break;
                  }
               }
         });
      },
      itemEvent: function(enchant, event, func) {
         switch (event) {
            case click:
            case 'click':
               Callback.addCallback("ItemUse", function(coords, item, block, isExternal, player) {
                  if (item.extra && item.extra.getEnchantLevel(enchant) != 0) {
                     let enchantLevel = item.extra.getEnchantLevel(enchant);
                     func(enchantLevel, item, player, coords, block, isExternal);
                  }
               });
               break;
            case useOnDestroy:
            case 'useOnDestroy':
               Callback.addCallback('DestroyBlock', function(coords, block, player) {
                  let item = Entity.getCarriedItem(player);
                  if (item.extra && item.extra.getEnchantLevel(enchant) != 0) {
                     let enchantLevel = item.extra.getEnchantLevel(enchant);
                     func(enchantLevel, item, player, coords, block);
                  }
               });
               break;
            case targeting:
            case 'targeting':
               let activeTarget;
               Callback.addCallback('ItemUseNoTarget', function(item, player) {
                  if (!activeTarget && item.extra && item.extra.getEnchantLevel(enchant) != 0)
                     activeTarget = true;
               });
               Callback.addCallback('ItemUsingReleased', function(item, player) {
                  if (activeTarget && item.extra && item.extra.getEnchantLevel(enchant) != 0)
                     activeTarget = false;
               });
               Callback.addCallback("ServerPlayerTick", function(player) {
                  let item = Entity.getCarriedItem(player);
                  let enchantLevel = item.extra.getEnchantLevel(enchant);
                  if (activeTarget && item.extra && item.extra.getEnchantLevel(enchant) != 0)
                     func(item, player);
               });
               break;
            case targetRelease:
            case 'targetRelease':
               Callback.addCallback('ItemUsingReleased', function(item, player) {
                  if (item.extra && item.extra.getEnchantLevel(enchant) != 0) {
                     let enchantLevel = item.extra.getEnchantLevel(enchant);
                     func(enchantLevel, item, player);
                  }
               });
               break;
            case targetUse:
            case 'targetUse':
               Callback.addCallback('ItemUseNoTarget', function(item, player) {
                  if (item.extra && item.extra.getEnchantLevel(enchant) != 0) {
                     let enchantLevel = item.extra.getEnchantLevel(enchant);
                     func(enchantLevel, item, player);
                  }
               });
               break;
            case destroyItem:
            case 'destroyItem':
               Callback.addCallback("ServerPlayerTick", function(player) {
                  let item = Entity.getCarriedItem(player);
                  if (item.extra && item.extra.getEnchantLevel(enchant) != 0 & item.data >= Item.getmaxDamage(item.id)) {
                     let enchantLevel = item.extra.getEnchantLevel(enchant);
                     func(enchantLevel, item, player);
                  }
               });
               break
         }
      },
      entityEvent: function(enchant, event, func) {
         switch (event) {
            case entityKill:
            case 'entityKill':
               Callback.addCallback('EntityDeath', function(entity, attacker, damageType) {
                  let item = Entity.getCarriedItem(attacker);
                  if (item.extra && item.extra.getEnchantLevel(enchant) != 0) {
                     let enchantLevel = item.extra.getEnchantLevel(enchant);
                     func(enchantLevel, item, attacker, entity, damageType);
                  }
               });
               break;
            case itemEquipedDeath:
            case 'itemEquipedDeath':
               Callback.addCallback('EntityDeath', function(entity, attacker, damageType) {
                  let i = 0;
                  while (i < 4) {
                     let item = Entity.getArmorSlot(entity, i);
                     if (item.extra && item.extra.getEnchantLevel(enchant) != 0) {
                        let enchantLevel = item.extra.getEnchantLevel(enchant);
                     }
                  }
               })
               break;
         }
      }
   }/*,

   EnchantState = {
      InventoryEvent() {
         switch (event) {
         }
      },

   };*/


EXPORT("Enchants", Enchants);
EXPORT("Mask", Mask);
EXPORT("Masks", Mask);
EXPORT("EnchantState", EnchantState);
EXPORT("Curses", Curses);
EXPORT("Chance", Chance);