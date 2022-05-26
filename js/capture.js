
// https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos

// we wrap the whole script in an anonymous function to avoid global variables, 
// then setting up various variables we'll be using

(function() {
  // The width and height of the captured photo. We will set the
  // width to the value defined here, but the height will be
  // calculated based on the aspect ratio of the input stream.

  var width = 320;    // We will scale the photo width to this
  var height = 0;     // This will be computed based on the input stream

/*
  var width = 320;
  var height = 240;
*/

  // |streaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  var streaming = false;

  // The various HTML elements we need to configure or control. These
  // will be set by the startup() function.

  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;

  function showViewLiveResultButton() {

        if (window.self !== window.top) {
          // Ensure that if our document is in a frame, we get the user
          // to first open it in its own tab or window. Otherwise, it
          // won't be able to request permission for camera access.

          document.querySelector(".contentarea").remove();
          const button = document.createElement("button");
          button.textContent = "View live result of the example code above";
          document.body.append(button);
          button.addEventListener('click', () => window.open(location.href));
          return true;
        }

    return false;
  }

  function startup() {

    if (showViewLiveResultButton()) { return; }

    // var videoElement = document.querySelector('video');

    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');

    audioSelect = document.getElementById('audioSource');
    videoSelect = document.getElementById('videoSource');

    audioSelect.onchange = getStream;
    videoSelect.onchange = getStream;

    getStream().then(getDevices).then(gotDevices);

    function getDevices() {
        // AFAICT in Safari this only gets default devices until gUM is called :/
        return navigator.mediaDevices.enumerateDevices();
    }

    function gotDevices(deviceInfos) {
          window.deviceInfos = deviceInfos; // make available to console
          console.log('Available input and output devices:', deviceInfos);
          for (const deviceInfo of deviceInfos) {
            const option = document.createElement('option');
            option.value = deviceInfo.deviceId;
            if (deviceInfo.kind === 'audioinput') {
              option.text = deviceInfo.label || `Microphone ${audioSelect.length + 1}`;
              audioSelect.appendChild(option);
            } else if (deviceInfo.kind === 'videoinput') {
              option.text = deviceInfo.label || `Camera ${videoSelect.length + 1}`;
              videoSelect.appendChild(option);
            }
          }
    }


    function getStream() {
          if (window.stream) {
            window.stream.getTracks().forEach(track => {
              track.stop();
            });
          }
          const audioSource = audioSelect.value;
          const videoSource = videoSelect.value;
          const constraints = {
            audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
            video: {deviceId: videoSource ? {exact: videoSource} : undefined}
          };
          return navigator.mediaDevices.getUserMedia(constraints).
            then(gotStream).catch(handleError);
    }

    function gotStream(stream) {
          window.stream = stream; // make stream available to console
          audioSelect.selectedIndex = [...audioSelect.options].
            findIndex(option => option.text === stream.getAudioTracks()[0].label);
          videoSelect.selectedIndex = [...videoSelect.options].
            findIndex(option => option.text === stream.getVideoTracks()[0].label);
          video.srcObject = stream;
    }

    function handleError(error) {
        console.error('Error: ', error);
    }

    // stream is defined here and now

    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false 
    })
    .then(function(stream) {
        video.srcObject = stream;

        video.play();

    })
    .catch(function(err) {
        console.log("An error occurred: " + err);
    });

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);

        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.

        if (isNaN(height)) {
          height = width / (4/3);
        }

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    startbutton.addEventListener('click', function(ev){
      takepicture();
      ev.preventDefault();
    }, false);

    clearphoto();
  }

  // Fill the photo with an indication that none has been
  // captured.

  function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.

  function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);

      // console.log(data);

    } else {
      clearphoto();
    }
  }

  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener('load', startup, false);

}) ();  // close and execute


