document.addEventListener('DOMContentLoaded', () => {
    loadVideos();
});

function loadVideos() {
    fetch('/videos')
        .then(response => response.json())
        .then(data => {
            const videosDiv = document.getElementById('videos');
            videosDiv.innerHTML = '';
            data.forEach(video => {
                const videoElement = document.createElement('div');
                videoElement.innerHTML = `
                    <h3>${video.title}</h3>
                    <video width="320" height="240" controls>
                        <source src="videos/${video.filename}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                `;
                videosDiv.appendChild(videoElement);
            });
        });
}

function searchVideos() {
    const query = document.getElementById('searchBox').value;
    fetch(`/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '<p>Results</p> ';
            if (data.length > 0) {
                data.forEach(video => {
                    const videoElement = document.createElement('div');
                    videoElement.innerHTML = `
                        <h3>${video.title}</h3>
                        <video width="320" height="240" controls>
                            <source src="videos/${video.filename}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    `;
                    resultsDiv.appendChild(videoElement);
                });
            } else {
                resultsDiv.innerHTML = '<p>No videos found</p>';
            }
        });
}

function loadVideosDetails() {
    fetch('/videos')
        .then(response => response.json())
        .then(data => {
            const videosDiv = document.getElementById('videos');
            videosDiv.innerHTML = ''; // Clear the existing content

            data.forEach(video => {
                const videoElement = document.createElement('div');
                videoElement.innerHTML = `
                    <h3>${video.title}</h3>
                    <h3>${video.details}</h3>
                    <video width="320" height="240" controls>
                        <source src="videos/${video.filename}" type="video/mp4">
                        Your browser does not support the video tag.   
                    </video>
                    <br>
                    
                `;
                videosDiv.appendChild(videoElement);
            });
        })
        .catch(error => console.error('Error fetching video data:', error));
}

function noDetails() {
     const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = "";
     loadVideos();
}
