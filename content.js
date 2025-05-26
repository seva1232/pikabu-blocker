// Function to hide blocked authors' posts
function hideBlockedAuthors() {
  chrome.storage.sync.get({blockedAuthors: []}, (data) => {
    document.querySelectorAll('a.story__user-link.user__nick').forEach(authorElement => {
      const authorName = authorElement.textContent.trim();
      if (data.blockedAuthors.includes(authorName)) {
        const postContainer = authorElement.closest('.story__main');
        if (postContainer) {
          postContainer.style.display = 'none';
        }
      }
    });
  });
}

// Run initially
hideBlockedAuthors();

// Observe DOM changes for infinite scroll
const observer = new MutationObserver(hideBlockedAuthors);
observer.observe(document.body, {
  childList: true,
  subtree: true
});
