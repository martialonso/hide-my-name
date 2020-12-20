var urlElements = [];

var urlList = document.getElementById('urlList');

chrome.storage.local.get(['pages'], function(items) {
	var pages = items.pages;
	if (pages == undefined || pages.length == 0) {
		pages = [""];
	}
	for (var i = 0; i < pages.length; i++) {
		var page = pages[i];
		addUrl(page);
	}
});

function getNewInputElement() {
	var input = document.createElement('input');
	input.id = "url";
	input.type = "text";
	input.placeholder = "URL";
	return input;
}

function getNewDeleteElement() {
	var button = document.createElement('button');
	button.id = "deleteUrl";
	button.innerText = "X";
	return button;
}
	
function addUrl(page) {
	var div = document.createElement('div');
	var input = getNewInputElement();
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

function save() {
	var items = [];
	for (var i = 0; i < urlElements.length; i++) {
		var url = urlElements[i].getElementsByTagName('input')[0].value;
		if (url != '') {
			items.push(url);
		}
	}
	chrome.storage.local.set({pages: items}, function() {
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
			status.textContent = '';
		}, 2000);
	});
}

document.getElementById('addUrl').addEventListener('click', function() {
	addUrl("");
});

document.getElementById('save').addEventListener('click', save);