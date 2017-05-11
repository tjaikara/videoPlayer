window.addEventListener('load', function(){

	//Video Container
	video= document.getElementById('video');

	//Progress bar container
	pbarContainer = document.getElementById('pbar-container');
	pbar = document.getElementById('pbar');

	//Buttons container
	playButton = document.getElementById('play-button');
	timeField = document.getElementById('time-field');


	video.load();
	video.addEventListener('canplay', function(){
		playButton.addEventListener('click', playorPause, false);
		pbarContainer.addEventListener('click', skip, false);
	}, false)
	
}, false);

function playorPause(){
	if(video.paused){
		video.play();
		playButton.src = 'img/pause.png';
		update = setInterval(updtePlayer, 30);

	}
	else{
		video.pause();
		playButton.src = 'img/play.png';
		window.clearInterval(update);
	}
}

function updtePlayer(){
	var percentage = (video.currentTime/video.duration)*100;
	pbar.style.width = percentage+'%';
	timeField.innerHTML = getFormatedTime();
	if(video.ended){
		window.clearInterval(update);
		playButton.src = 'img/replay.png';
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

	if(minutes.toString().length === 1) minutes= '0' + minutes;

	var totalSeconds = Math.round(video.duaration);
	var totalMinutes = Math.floor(totalSeconds/60);
	return minutes+ ':' + seconds;
}