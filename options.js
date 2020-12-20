var urlElements = [];

var urlList = document.getElementById('urlList');

function getNewURLInputElement() {
	var input = document.createElement('input');
	input.id = "url";
	input.type = "text";
	input.placeholder = "URL";
	return input;
}

function getNewDeleteElement() {
	var button = document.createElement('button');
	button.id = "delete";
	button.innerText = "X";
	return button;
}
	
function addUrl(page) {
	var div = document.createElement('div');
	var input = getNewURLInputElement();
	input.value = page;
	var x = getNewDeleteElement();
	x.addEventListener('click', function() {
		var index = urlElements.indexOf(div);
		var element = urlElements[index];
		urlList.removeChild(element);
		urlElements.splice(index, 1);
	});
	var br = document.createElement('br');
	div.appendChild(br);
	div.appendChild(br);
	div.appendChild(input);
	div.appendChild(document.createTextNode(" "));
	div.appendChild(x);
	urlList.appendChild(div);
	urlElements.push(div);
}

chrome.storage.local.get(['pages'], function(items) {
	var pages = items.pages;
	if (pages == undefined || pages.length == 0) {
		pages = [""];
	}
	for (var i = 0; i < pages.length; i++) {
		addUrl(pages[i]);
	}
});

document.getElementById('addUrl').addEventListener('click', function() {
	addUrl("");
});

var stuffElements = [];

var stuffList = document.getElementById('stuffList');

function getNewHideInputElement() {
	var input = document.createElement('input');
	input.id = "toHide";
	input.type = "text";
	input.placeholder = "Stuff to hide";
	return input;
}

function getNewReplaceInputElement() {
	var input = document.createElement('input');
	input.id = "replacement";
	input.type = "text";
	input.placeholder = "Replace with";
	return input;
}

function addStuff(toHide, replacement) {
	var div = document.createElement('div');
	var inputHide = getNewHideInputElement();
	inputHide.value = toHide;
	var inputReplace = getNewReplaceInputElement();
	inputReplace.value = replacement;
	var x = getNewDeleteElement();
	x.addEventListener('click', function() {
		var index = stuffElements.indexOf(div);
		var element = stuffElements[index];
		stuffList.removeChild(element);
		stuffElements.splice(index, 1);
	});
	var br = document.createElement('br');
	div.appendChild(br);
	div.appendChild(br);
	div.appendChild(inputHide);
	div.appendChild(document.createTextNode(" "));
	div.appendChild(inputReplace);
	div.appendChild(document.createTextNode(" "));
	div.appendChild(x);
	stuffList.appendChild(div);
	stuffElements.push(div);
}

chrome.storage.local.get(['toHide', 'replacement'], function(items) {
	var toHide = items.toHide;
	var replacement = items.replacement;
	if (toHide == undefined || toHide.length == 0) {
		toHide = [""];
		replacement = [""];
	}
	for (var i = 0; i < toHide.length; i++) {
		addStuff(toHide[i], replacement[i]);
	}
});

document.getElementById('addStuff').addEventListener('click', function() {
	addStuff("", "");
});

function save() {
	var _pages = [];
	for (var i = 0; i < urlElements.length; i++) {
		var url = urlElements[i].getElementsByTagName('input')[0].value;
		if (url != '') {
			_pages.push(url);
		}
	}
	var _toHide = [];
	var _replacement = [];
	for (var i = 0; i < stuffElements.length; i++) {
		var inputs = stuffElements[i].getElementsByTagName('input');
		var hide = inputs[0].value;
		var replace = inputs[1].value;
		if (hide != '') {
			_toHide.push(hide);
			_replacement.push(replace);
		}
	}
	chrome.storage.local.set({pages: _pages, toHide: _toHide, replacement: _replacement}, function() {
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
			status.textContent = '';
		}, 2000);
	});
}

document.getElementById('save').addEventListener('click', save);