#EnchantsHelper
## обьект Enchants
получение массива проклятий 
```JS 
getCurses();
```
 
 возврвашает булвое значение
проверка является ли зачарование проклятием
```JS
isCurse(enchant);
 ```
+ enchant - ID зачарования

возврашает булевое значение
добавление книги с зачарованием в творческий инвентарь 
```JS
addBook(enchant, level)
```
+ enchant - ID зачарования
+ level - уровень зачарования которое будет добавлено в инвентарь творческого режима
 
вызов функции при изпользовании предмета с указаным зачарованием в качестве меча  
```JS
hurt(enchant, function(item, enchantLevel, attacker, victim, damageValue, damageType){
	/* code */
}, level);
```
+ enchant - ID зачарования
+ function - калбэк функция передаюшая :
++ item - предмет с указаннм зачарованием
++ enchantLevel - уровень зачарования
++ следуюшие данные - все передоваемы данные в калбэке EntityHurt
+ level - уроень зачарования
# finish this later