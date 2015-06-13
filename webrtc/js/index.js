$(function() {
	// grab the room from the URL
	var room = location.search && location.search.split('?')[1];

	// create our webrtc connection
	var webrtc = new SimpleWebRTC({
		// the id/element dom element that will hold "our" video
		localVideoEl: 'localVideo',
		// the id/element dom element that will hold remote videos
		remoteVideosEl: '',
		// immediately ask for camera access
		autoRequestMedia: true,
		debug: false,
		detectSpeakingEvents: true,
		autoAdjustMic: false
	});

	webrtc.on('readyToCall', function() {
		// you can name it anything
		if (room) webrtc.joinRoom(room);
	});

	function showVolume(el, volume) {
		if (!el) return;
		if (volume < -45) volume = -45;
		if (volume > -20) volume = -20; 
		el.value = volume;
	}

	// we got access to the camera
	webrtc.on('localStream', function(stream) {
		var button = document.querySelector('form>button');
		if (button) button.removeAttribute('disabled');
		$('#localVolume').show();
	});
	// we did not get access to the camera
	webrtc.on('localMediaError', function(err) {});

	// local screen obtained
	webrtc.on('localScreenAdded', function(video) {
		video.onclick = function() {
			video.style.width = video.videoWidth + 'px';
			video.style.height = video.videoHeight + 'px';
		};
		document.getElementById('localScreenContainer').appendChild(video);
		$('#localScreenContainer').show();
	});
	
	// local screen removed
	webrtc.on('localScreenRemoved', function(video) {
		document.getElementById('localScreenContainer').removeChild(video);
		$('#localScreenContainer').hide();
	});

	// a peer video has been added
	webrtc.on('videoAdded', function(video, peer) {
		console.log('video added', peer);
		var ele='<div class="videoitem"><div class="item-t"><h3><i class="fa fa-user"></i>{{name}}</h3>'+
				'<div class="tools"><a class="box-close"><i class="fa fa-times"></i></a></div></div>'+
				'<meter id="localVolume" class="volume_bar" min="-45" max="-20" high="-25" low="-40"></meter></div>';
		if(peer)
		{
			$(ele).append(video).appendTo('#videochatroom');
		}
	});

	webrtc.on('videoRemoved', function(video, peer) {
		console.log('video removed ', peer);
		var el = $('#'+webrtc.getDomId(peer)).parent();
		if (el) {
			el.remove();
		}
	});
	webrtc.on('volumeChange', function(volume, treshold) {
		showVolume(document.getElementById('localVolume'), volume);
	});

	
	webrtc.on('remoteVolumeChange', function(peer, volume) {
		showVolume(document.getElementById('volume_' + peer.id), volume);
	});

	webrtc.on('iceFailed', function(peer) {
		var connstate = document.querySelector('#container_' + webrtc.getDomId(peer) + ' .connectionstate');
		console.log('local fail', connstate);
		if (connstate) {
			connstate.innerText = 'Connection failed.';
			fileinput.disabled = 'disabled';
		}
	});

	// remote p2p/ice failure
	webrtc.on('connectivityError', function(peer) {
		var connstate = document.querySelector('#container_' + webrtc.getDomId(peer) + ' .connectionstate');
		console.log('remote fail', connstate);
		if (connstate) {
			connstate.innerText = 'Connection failed.';
			fileinput.disabled = 'disabled';
		}
	});

	$('#videochatroom').on('click','.box-close',function(){
		$(this).parents().eq(2).remove();
	});
});
