var activeCheckbox = document.getElementById('active');

chrome.storage.local.get(['active'], function(items) {
	activeCheckbox.checked = items.active;
});

active.addEventListener('click', function() {
	chrome.storage.local.set({active: activeCheckbox.checked}, null);
});

document.getElementById('options').addEventListener('click', function() {
	if (chrome.runtime.openOptionsPage) {
		chrome.runtime.openOptionsPage();
	} else {
		window.open(chrome.runtime.getURL('options.html'));
	}
});