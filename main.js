let timerStarted = false;
let alarm = new Audio('alarm.mp3')
let input_minutes;
let exitTimer = false;


let theme = localStorage.getItem('theme') || false;
if(!theme){
    theme = "black";
    localStorage.setItem('theme', theme)
}


// COLORS
let root = document.querySelector(':root')
let rootStyles = getComputedStyle(root)
let timerColor = rootStyles.getPropertyValue('--timer-color')
let buttonColor = rootStyles.getPropertyValue('--button-color')
let textColor = rootStyles.getPropertyValue('--text-color')
let boxShadowColor = rootStyles.getPropertyValue('--box-shadow')
let inputDisabledColor = rootStyles.getPropertyValue('--input-disabled')
let bgColor = rootStyles.getPropertyValue('--bg-color')
let clockImg = document.getElementById("clockImg")
setTheme(true)


function setTheme(on_init){
    if(!on_init) {
        if(theme === "black"){
            theme = "white"
        } else {
            theme = "black"
        }
        localStorage.setItem('theme', theme);
    }

    if(theme === "black"){
        clockImg.src = "clock-white.png"
        root.style.setProperty('--timer-color', 'white')
        root.style.setProperty('--button-color', 'white')
        root.style.setProperty('--text-color', '#111111')
        root.style.setProperty('--box-shadow', 'white')
        root.style.setProperty('--input-disabled', 'white')
        root.style.setProperty('--bg-color', '#111111')
        

    } else {
        clockImg.src = "clock-black.png"
        root.style.setProperty('--timer-color', '#111111')
        root.style.setProperty('--button-color', '#111111')
        root.style.setProperty('--text-color', 'white')
        root.style.setProperty('--box-shadow', '#111111')
        root.style.setProperty('--input-disabled', '#111111')
        root.style.setProperty('--bg-color', 'white')

    }

}



function movetoNext(current, nextFieldID) {  
    if (current.value.length >= current.maxLength) {  
    document.getElementById(nextFieldID).focus();  
    }  
}

function onEnter(event)
	{     
	   var code = 0;
	   code = event.keyCode;
	   if (code == 13)
	      startTimer()
	}

function javascript_abort()
{
   throw new Error('This is not an error. This is just to abort javascript');
}
    
function startTimer(){

    
    let startTime = new Date().getTime();
    let input_minutes = document.getElementById('minutes_timer').value
    let double_point = document.getElementById('double_point').innerHTML
    let input_seconds = document.getElementById('seconds_timer').value
    let total_value = input_minutes + double_point + input_seconds
    let pattern = '^([0-9][0-9]):[0-5][0-9]$'
    if (total_value.match(pattern)){
        let minutes_to_milliseconds = input_minutes * 60 * 1000;
        let seconds_to_milliseconds = input_seconds * 1000
        let total_milliseconds = minutes_to_milliseconds + seconds_to_milliseconds
        let endtime = startTime + total_milliseconds

        if (!timerStarted){
            func = setInterval(function(){
                console.log(total_value)
            
           timeLeft = endtime - new Date().getTime()
            if (timeLeft > 0){
                let minutes = timeLeft / (1000 * 60);
                minutes = Math.floor(minutes)
                minutes = ('0' + minutes).slice(-2)
                let seconds = (timeLeft / 1000) % 60;
                seconds = Math.round(seconds)
                seconds = ('0' + seconds).slice(-2)
                if (seconds == 60){
    
                    seconds = '0' + 0
                    minutes++
                    if (minutes < 10){
                        minutes = '0' + minutes
                    }
                }
                
                minutes_timer.value = minutes
                seconds_timer.value = seconds
                
            } else {
                minutes_timer.value = '00'
                seconds_timer.value = '00'
                alarm.play()
            }
            
        }, 1000)
            
        timerStarted = true;
        if(timerStarted){
            swal("You have successfully started the timer", "", "success")
            document.getElementById('minutes_timer').disabled  = true;
            document.getElementById('seconds_timer').disabled  = true;
        }

        }
    } else {
        swal("Please enter the correct time format", "", "error");
    }
    
    

}

function stopTimer(){
    clearInterval(func)
    swal("The timer has been paused", "", "info")
    timerStarted = false
}

function resetTimer(){
    window.location.reload()
    minutes_timer.value = ''
    seconds_timer.value = ''
   


    

}
window.onload = function() {
    minutes_timer.value = ''
    seconds_timer.value = ''    
}


