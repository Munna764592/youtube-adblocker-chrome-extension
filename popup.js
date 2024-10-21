document.addEventListener('DOMContentLoaded', function () {
    const enableExtensionCheckbox = document.getElementById('enableExtension');

    // Get the current state of the extension (enabled/disabled) from storage
    chrome.storage.sync.get(['extensionEnabled'], function (result) {
        enableExtensionCheckbox.checked = result.extensionEnabled || false;
    });

    // Add event listener for the toggle switch (checkbox)
    enableExtensionCheckbox.addEventListener('change', function () {
        chrome.storage.sync.set({ 'extensionEnabled': this.checked }, function () {
            // Reload the current active tab when the extension is enabled/disabled
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.reload(tabs[0].id);
            });
        });
    });

});
