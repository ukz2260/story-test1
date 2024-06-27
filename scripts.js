document.getElementById('login-btn').addEventListener('click', function() {
    console.log('Login button clicked'); // ボタンがクリックされたことを確認する
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(function(result) {
        console.log('User signed in');
        loadVideos();
    }).catch(function(error) {
        console.error('Error during sign-in:', error); // エラーが発生した場合にエラーメッセージを表示する
    });
});

function loadVideos() {
    const videoFeed = document.getElementById('video-feed');
    db.collection('videos').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const videoData = doc.data();
            const videoElement = document.createElement('video');
            videoElement.src = videoData.url;
            videoElement.controls = true;
            videoFeed.appendChild(videoElement);
        });
    }).catch(function(error) {
        console.error('Error loading videos:', error); // 動画のロード中にエラーが発生した場合にエラーメッセージを表示する
    });
}
