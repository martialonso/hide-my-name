var activeCheckbox = document.getElementById('active');

chrome.storage.local.get(['active'], function(items) {
	activeCheckbox.checked = items.active;
});

active.addEventListener('click', function() {
	chrome.storage.local.set({active: activeCheckbox.checked}, null);
});