chrome.storage.local.get({
	active: false,
    pages: [],
	toHide: [],
	replacement: []
  }, function(items) {
	if (items.active) {
		var pages = items.pages;
		var toHide = items.toHide;
		var replacement = items.replacement;
		var currentUrl = location.toString();
		for (var i = 0; i < pages.length; i++) {
			if (pages[i] != '' && currentUrl.includes(pages[i])) {
				for (var j = 0; j < toHide.length; j++) {
					hideStuff(toHide[j], replacement[j]);
				}
			}
		}
	}
});

function hideStuff(toHide, replacement) {
	var n;
	var walk = document.createTreeWalker(document, NodeFilter.SHOW_TEXT, null, false);
	while(n = walk.nextNode()) {
		n.nodeValue = n.nodeValue.replaceCaseInsensitive(toHide, replacement);
	}
}

String.prototype.replaceCaseInsensitive = function(strReplace, strWith) {
    // See http://stackoverflow.com/a/3561711/556609
    var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    var reg = new RegExp(esc, 'ig');
    return this.replace(reg, strWith);
};