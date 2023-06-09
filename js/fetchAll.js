document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://www.mariaj.one/wp-json/wp/v2/posts';
    const targetElement = document.getElementById('blogPostsContainer');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const postsPerPage = 10;
    let currentPage = 1;
  
    const fetchBlogPosts = (page) => {
      const pageUrl = `${apiUrl}?per_page=${postsPerPage}&page=${page}`;
  
      fetch(pageUrl)
        .then(response => response.json())
        .then(data => {
          const postPromises = data.map(post => {
            const imageUrl = post.featured_media;
            return fetch(`https://www.mariaj.one/wp-json/wp/v2/media/${imageUrl}`)
              .then(response => response.json())
              .then(mediaData => {
                return {
                  title: post.title.rendered,
                  imageUrl: mediaData.source_url,
                  id: post.id,
                };
              });
          });
  
          Promise.all(postPromises)
            .then(posts => {
              if (page === 1) {
                targetElement.innerHTML = ''; 
              }
  
              posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'blogPost';
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <img src="${post.imageUrl}" alt="${post.title}">
                    <a href="blogDetails.html?id=${post.id}" class="read-more-btn">Read More</a>
                    `;

                targetElement.appendChild(postElement);
              });
  
              if (data.length < postsPerPage) {
                loadMoreBtn.style.display = 'none';
              } else {
                loadMoreBtn.style.display = 'block';
              }
            })
            .catch(error => {
              console.error('Error:', error);
            });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };
  
    const loadMorePosts = () => {
      currentPage++;
      fetchBlogPosts(currentPage);
    };
  
    loadMoreBtn.addEventListener('click', loadMorePosts);
  
    fetchBlogPosts(currentPage);
  });
  