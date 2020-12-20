chrome.storage.local.get({
    pages: [],
	toHide: ["Martí Alonso"], //Temp value for testing
	replacement: ["El Tímido"] //Temp value for testing
  }, function(items) {
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
});

function hideStuff(toHide, replacement) {
	var elements = document.evaluate('//*[contains(text(),"' + toHide + '")]', document, null, XPathResult.ANY_TYPE);
	var element = elements.iterateNext();
	var elem = [];
	while (element) {
		elem.push(element);
		element = elements.iterateNext();
	}

	for (var i = 0; i < elem.length; i++) {
		var e = elem[i];
		e.innerText = e.innerText.replace(toHide, replacement);
	}
}