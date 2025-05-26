document.getElementById('addButton').addEventListener('click', addAuthor);
loadBlockList();

function addAuthor() {
  const author = document.getElementById('authorInput').value.trim();
  if (author) {
    chrome.storage.sync.get({blockedAuthors: []}, function(data) {
      const updatedList = [...new Set([...data.blockedAuthors, author])];
      chrome.storage.sync.set({blockedAuthors: updatedList}, loadBlockList);
    });
  }
}

function loadBlockList() {
  chrome.storage.sync.get({blockedAuthors: []}, function(data) {
    const list = document.getElementById('blockList');
    list.innerHTML = '';
    data.blockedAuthors.forEach(author => {
      const li = document.createElement('li');
      li.textContent = author;
      li.addEventListener('click', () => removeAuthor(author));
      list.appendChild(li);
    });
  });
}

function removeAuthor(author) {
  chrome.storage.sync.get({blockedAuthors: []}, function(data) {
    const updatedList = data.blockedAuthors.filter(a => a !== author);
    chrome.storage.sync.set({blockedAuthors: updatedList}, loadBlockList);
  });
}