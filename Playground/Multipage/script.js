document.addEventListener('DOMContentLoaded', () => {
  loadContent('home');

  document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', (event) => {
          event.preventDefault();
          const page = link.getAttribute('href').split('.')[0];
          loadContent(page);
      });
  });
});

function loadContent(page) {
  fetch('content.json')
      .then(response => response.json())
      .then(data => {
          document.getElementById('content').innerHTML = data[page];
      })
      .catch(error => console.error('Error loading content:', error));
}
