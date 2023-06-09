document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'https://www.mariaj.one/wp-json/wp/v2/posts';
  const blogTitleElement = document.getElementById('blogTitle');
  const blogContentElement = document.getElementById('blogContent');

  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get('id');

  fetch(`${apiUrl}/${blogId}`)
    .then(response => response.json())
    .then(data => {
      const title = data.title.rendered;
      const content = data.content.rendered;

      blogTitleElement.textContent = title;
      blogContentElement.innerHTML = content;

      const imgTags = blogContentElement.getElementsByTagName('img');
      for (let i = 0; i < imgTags.length; i++) {
        const imgTag = imgTags[i];
        const originalSrc = imgTag.getAttribute('src');
        const updatedSrc = 'https://www.mariaj.one' + originalSrc;
        imgTag.setAttribute('src', updatedSrc);
        imgTag.classList.add('blog-image');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
