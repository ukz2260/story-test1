const firebaseConfig = {
  apiKey: "AIzaSyCHSsfGXh4QejElJYAV-Mlp9ZCjxyP5db0",
  authDomain: "story-admin-fb.firebaseapp.com",
  projectId: "story-admin-fb",
  storageBucket: "story-admin-fb.appspot.com",
  messagingSenderId: "292323748173",
  appId: "1:292323748173:web:b9647e85cf99fb8d89af04"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

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
