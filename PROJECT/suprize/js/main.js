			var songs = [										 //variables song array hai of objects ka  
		{
		'name': 'Badri Ki Dulhania (Title Track)',				
		'artist': 'Neha Kakkar, Monali Thakur',
		'album': 'Badrinath ki Dulhania',
		'duration': '2:56',
		'fileName': 'song1.mp3',
		'image':'song1.jpg'
		},
		{
        'name': 'Humma Song',
        'artist': ' Shashaa Tirupati',
        'album': 'Ok Jaanu',
        'duration': '3:15',
        'fileName': 'song2.mp3',
		'image':'song2.jpg'
		},
		{
        'name': 'Nashe Si Chadh Gayi',
        'artist': 'Arijit Singh',
        'album': 'Befikre',
        'duration': '2:34',
        'fileName': 'song3.mp3',
		'image':'song3.jpg'
		},
		{
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:29',
        'fileName': 'song4.mp3',
		'image':'song4.jpg'
		}] 
		function addSongNameClickEvent(songObj,position)				//var fileName = ['song1.mp3','song2.mp3','song3.mp3','song4.mp3']; 					
		{
			var songName = songObj.fileName; // New Variable
			var id="#song"+position										// ek var id create krega for selected song
			$(id).click(function() {									// jb us id pe click hoga tb
			var audio = document.querySelector('audio');				//audio select hogi
			var currentSong = audio.src;								// usse ek variable current song me dalege and check krege ki kya wo 
			if(currentSong.search(songName) != -1)						// ussi song name ki hai jo abhi play ho rha hai ya nhi 
			{
			toggleSong();												//agr nhi hai to toggle funn chla do
			}
			else {
			audio.src = songName;										//wrna nya audio source song name me daalo and play lr do
			toggleSong();
			changeCurrentSongDetails(songObj);							// or uski detail bhi change ke do
			}
			});
		}
		function changeCurrentSongDetails(songObj) 
		{
			$('.current-song-image').attr('src','img/' + songObj.image)		//adding song source
			$('.current-song-name').text(songObj.name)						//adding song name 
			$('.current-song-album').text(songObj.album)					//adding album name
		}

		function fancyTimeFormat(time)										//time duration ko : me show krne ke liye 
		{																	// Hours, minutes and seconds
		var hrs = ~~(time / 3600);
		var mins = ~~((time % 3600) / 60);
		var secs = time % 60;												// Output like "1:01" or "4:03:59" or "123:03:59"
		var ret = "";
		if (hrs > 0) 
			{
				ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
			}
		ret += "" + mins + ":" + (secs < 10 ? "0" : "");
		ret += "" + secs;
		return ret;
		}
		function updateCurrentTime()									//song ki duration ka time update krta hai  
		{
			var song = document.querySelector('audio');					// song select kiya 
			var currentTime = Math.floor(song.currentTime);				//currentTime se song ka time kiya usse var me daLA 
			currentTime = fancyTimeFormat(currentTime);					// formate change kiya 
			var duration = Math.floor(song.duration);					//ye song ki duration leta hai 
			duration = fancyTimeFormat(duration)
			$('.time-elapsed').text(currentTime);						//dono ko add kra diya 
			$('.song-duration').text(duration);					
		}

		window.onload = function() {									// ye funn window ke load hone pr khud chlta hai 
			changeCurrentSongDetails(songs[0]);

			 for(var i =0; i < songs.length;i++) 						//	har song ko travel krne ke kiya for loop
			{
				var obj = songs[i];
				var name = '#song' + (i+1);
				var song = $(name);
				song.find('.song-name').text(obj.name);						// har song ki info add ki
				song.find('.song-artist').text(obj.artist);
				song.find('.song-album').text(obj.album);
				song.find('.song-length').text(obj.duration);
				addSongNameClickEvent(obj,i+1);								
			}

			updateCurrentTime();									// ye current time update krta HAI 
			//$('#songs').DataTable();
			$('#songs').DataTable({paging: false});					//data tables me songs ko load kraya 
			setInterval(function() {								//har interval pr ye time update krta hai 
			updateCurrentTime();
			},1000);
			}
		function toggleSong() 
		{
			var song = document.querySelector('audio');				// song select kiya 
			if(song.paused == true) {								//pause hai to 
			//console.log('Playing');					
			$('.play-icon').removeClass('fa-play').addClass('fa-pause');	// icon change hiya by assind and removing class
			song.play();											// play kiya 
			}
			else {													// other wise 
			//console.log('Pausing');
			$('.play-icon').removeClass('fa-pause').addClass('fa-play');
			song.pause();											// play ko pause kr diya 	
			}
		}
		$('.welcome-screen form').on('submit', function(e) {
			e.preventDefault();
				//var message = "Welcome,to songify"+kundan;
				//$('.audio').attr('src','song1.mp3');
				//$('.main .user-name').text(message);						
				//$('.welcome-screen').addClass('hidden');			// welcome class hide ho jayegi
				//$('.main').removeClass('hidden');					// and main se hide class remove ho jayegi
				setTimeout(function()
				{								//har interval pr ye time update krta hai
				},3000);
			
		});
		$('.play-icon').on('click', function() 
		{
			toggleSong();
			
		});
		$('.fa-step-forward').on('click', function() {
				var audio = document.querySelector('audio');
				setTimeout(function () {
                audio.currentTime += 10;
				}, 200);											// this is use to skip the duration of the song
		});
		
				$('.fa-step-backward').on('click', function() {
				var audio = document.querySelector('audio');
				setTimeout(function () {
                audio.currentTime -= 10;
				}, 200);											// this is use to skip the duration of the song
		});

		$('body').on('click', function() 
		{
		
			setTimeout(function(){ $(".user-name").addClass("animated swing");	}, 150);
			setTimeout(function(){ $(".user-name").removeClass("animated swing");	}, 300);
		});

		$('body').on('keypress', function(event)
		{
			var target = event.target;
			if (event.keyCode == 32  && target.tagName !='INPUT')
				{
				toggleSong();
				
				//setTimeout(function(){ $('.main .username').addClass('animated swing');}, 3000);
				setTimeout(function(){ $('.key9').removeClass('playing');}, 100);
				}
		});
		var currentSongNumber = 1;
		var willLoop = 0;
		var willShuffle = 0; 										// will use this soon
		$('.fa-repeat').on('click',function() 
		{
			$('.fa-repeat').toggleClass('disabled')
			willLoop = 1 - willLoop;
		});
		$('.fa-random').on('click',function()
		{
			$('.fa-random').toggleClass('disabled')
			willShuffle = 1 - willShuffle;
		}); 			
	$('audio').on('ended',function() 
	{
		var audio = document.querySelector('audio');
		if (willShuffle == 1) 
		{
			var nextSongNumber = randomExcluded(1,4,currentSongNumber); 		// Calling our function from Stackoverflow
			var nextSongObj = songs[nextSongNumber-1];
			audio.src = nextSongObj.fileName;
			toggleSong();
			changeCurrentSongDetails(nextSongObj);
			currentSongNumber = nextSongNumber;
		}
		else if(currentSongNumber < 4) 
		{
			var nextSongObj = songs[currentSongNumber];
			audio.src = nextSongObj.fileName;
			toggleSong();
			changeCurrentSongDetails(nextSongObj);
			currentSongNumber = currentSongNumber + 1;
		}
		else if(willLoop == 1) 
		{
			
		}
		else 
		{
			$('.play-icon').removeClass('fa-pause').addClass('fa-play');
			audio.currentTime = 0;
		}
	})
	
	function randomExcluded(min, max, excluded) {
    var n = Math.floor(Math.random() * (max-min) + min);
    if (n >= excluded) n++;
    return n;
}

var audioControl = document.getElementsByTagName('audio')[0];

$('.muted').click(function () {
    audioControl.muted = !audioControl.muted;
    return false;
});

//VOLUME BAR
//volume bar event
var volumeDrag = false;
$('.volume,.volumeBar').on('mousedown', function (e) { //onTouchStart
    volumeDrag = true;
    audioControl.muted = false;
    $('.sound').removeClass('muted');
    updateVolume(e.pageX);
});
$(document).on('mouseup', function (e) { //touchend
    if (volumeDrag) {
        volumeDrag = false;
        updateVolume(e.pageX);
    }
});
$(document).on('mousemove', function (e) { //touchmove
    if (volumeDrag) {
        updateVolume(e.pageX);
    }
});
var updateVolume = function (x, vol) 
{
    var volume = $('.volume');
    var percentage;
    //if only volume have specificed
    //then direct update volume
    if (vol) {
        percentage = vol * 100;
    } else {
        var position = x - volume.offset().left;
        percentage = 100 * position / volume.width();
    }

    if (percentage > 100) {
        percentage = 100;
    }
    if (percentage < 0) {
        percentage = 0;
    }

    //update volume bar and video volume
    $('.volume').css('clip', 'rect(0px, '+percentage+'px, 50px, 0px)')
    //$('.volume').css('width', percentage + '%');
    audioControl.volume = percentage / 100;
    
    console.log(percentage);

    //change sound icon based on volume
    if (audioControl.volume == 0) {
        $('.sound').removeClass('sound2').addClass('muted');
    } else if (audioControl.volume > 0.5) {
        $('.sound').removeClass('muted').addClass('sound2');
    } else {
        $('.sound').removeClass('muted').removeClass('sound2');
    }

};

