const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.continuous = true;

recognition.onresult = (event) => {
  const command = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
  console.log("Command:", command);

  if (command === "go to next tab") {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      const activeTab = tabs.find(tab => tab.active);
      const nextTabIndex = (activeTab.index + 1) % tabs.length;
      chrome.tabs.update(tabs[nextTabIndex].id, { active: true });
    });
  } else if (command === "scroll down") {
    chrome.scripting.executeScript({
      target: { allFrames: true },
      func: () => window.scrollBy(0, window.innerHeight)
    });
  }
};

chrome.runtime.onInstalled.addListener(() => {
  recognition.start();
});
