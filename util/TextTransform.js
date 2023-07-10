let TextTransform = {
	toName(str) {
		var words = str.split(/(?=[A-Z])/);
		for (var i = 0; i < words.length; i++) {
			words[i] = words[i].toLowerCase();
			if (i > 0) {
				words[i] = ' ' + words[i];
			}
		}
		return words.join('');
	},
	toTexture(str) {
		TextTransform.toName(str).replace(/ /g, '_');
	}
};