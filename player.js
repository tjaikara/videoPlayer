window.addEventListener('load', function(){

	//Video Container
	video= document.getElementById('video');
	pauseScreen = document.getElementById('screen');
	screenButton = document.getElementById('screen-button');

	//Progress bar container
	pbarContainer = document.getElementById('pbar-container');
	pbar = document.getElementById('pbar');

	//Buttons container
	playButton = document.getElementById('play-button');
	timeField = document.getElementById('time-field');
	soundBotton = document.getElementById('sound-button');
	sbarContainer = document.getElementById('sbar-container');
	sbar = document.getElementById('sbar');
	fullscreenButtom = document.getElementById('fullscreen-button');


	video.load();
	video.addEventListener('canplay', function(){
		playButton.addEventListener('click', playorPause, false);
		pbarContainer.addEventListener('click', skip, false);
		updtePlayer();
		soundBotton.addEventListener('click', muteOrUnmute, false);
		sbarContainer.addEventListener('click', updateVolume, false);
		fullscreenButtom.addEventListener('click', fullScreen, false);
		screenButton.addEventListener('click', playorPause, false);
	}, false)
	
}, false);

function playorPause(){
	if(video.paused){
		video.play();
		playButton.src = 'img/pause.png';
		update = setInterval(updtePlayer, 30);

		pauseScreen.style.display = 'none';
		screenButton.src = 'img/play.png';

	}
	else{
		video.pause();
		playButton.src = 'img/play.png';
		window.clearInterval(update);

		pauseScreen.style.display = 'block';
		screenButton.src = 'img/play.png';
	}
}

function updtePlayer(){
	var percentage = (video.currentTime/video.duration)*100;
	pbar.style.width = percentage+'%';
	timeField.innerHTML = getFormatedTime();
	if(video.ended){
		window.clearInterval(update);
		playButton.src = 'img/replay.png';

		pauseScreen.style.display = 'block';
		screenButton.src = 'img/replay.png';
	}
	else if (video.paused){
		playButton.src = 'img/play.png';
		screenButton.src = 'img/play.png';
	}
}

function skip(ev){
	var mouseX = ev.pageX - pbarContainer.offsetLeft;
	var barWidth = window.getComputedStyle(pbarContainer).getPropertyValue('width');
	barWidth = parseFloat(barWidth.substr(0, barWidth.length - 2));

	video.currentTime = (mouseX/barWidth)*video.duration;
	updtePlayer();

}

function getFormatedTime(){
	//1:31
	var seconds = Math.round(video.currentTime);
	var minutes = Math.floor(seconds/60);
	if(minutes > 0) seconds -= minutes*60;
	if(seconds.toString().length === 1) seconds= '0'+seconds;

	var totalSeconds = Math.round(video.duration);
	var totalMinutes = Math.floor(totalSeconds/60);
	if(totalMinutes > 0) totalSeconds -=totalMinutes*60;
	if(totalSeconds.toString().length === 1) totalSeconds = '0'+ totalSeconds;

	return minutes+ ':' + seconds + '/' + totalMinutes + ':' + totalSeconds;
}

function muteOrUnmute(){
	if(!video.muted){
		video.muted = true;
		soundBotton.src = 'img/mute.png'
		sbar.style.display = 'none';

	}
	else{
		video.muted = false;
		soundBotton.src = 'img/sound.png';
		sbar.style.display = 'block';
	}
}

function updateVolume(ev){

	var mouseX = ev.pageX - sbarContainer.offsetLeft;
	var barWidth = window.getComputedStyle(sbarContainer).getPropertyValue('width');
	barWidth = parseFloat(barWidth.substr(0, barWidth.length - 2));

	video.volume = (mouseX/barWidth);
	sbar.style.width = (mouseX/barWidth)*100 + '%';
	video.muted = false;
	soundBotton.src = 'img/sound.png';
	sbar.style.display = 'block';


}

function fullScreen(){

	if(video.requestFullscreen){
		video.requestFullscreen();
	}
	else if (video.webkitRequestFullscreen){
		video.webkitRequestFullscreen();
	}
	else if(video.mozRequestFullscreen){
		video.mozRequestFullscreen();
	}
	else if(video.msRequestFullscreen){
		video.msRequestFullscreen();
	}

}
