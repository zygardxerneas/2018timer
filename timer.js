var normalelapse = 100;
var isFiveSecond=0;
var isOneMinute=0;
var oneMinuteFile="mp3/1m.mp3";
var fiveMinuteFile="mp3/5s.mp3";
var groupi=0;
var groupNum=['43A162','040156','261151','070163',
    '051156','06A152','015151','192151',
    '160165','615161','031156','134161',
    '081161','144152','15级茅以升','026161','100161&100162'];
var nextelapse = normalelapse;
var counter;
var startTime;
var start = "08:00:00";
var finish = "00:00:00";
var timer = null;


function run() {
    startB.disabled = true;
    endB.disabled = false;
    counter = 0;
    startTime = new Date().valueOf();
    timer = window.setInterval("onTimer()", nextelapse);
}
function stop() {
    startB.disabled = false;
    endB.disabled = true;
    window.clearTimeout(timer);
}
window.onload = function() {
    endB.disabled = true;
}
function onTimer()
{
    if (start == finish)
    {
        window.clearInterval(timer);

        return;
    }
    var hms = new String(start).split(":");
    var ms = new Number(hms[2]);
    var s = new Number(hms[1]);
    var m = new Number(hms[0]);
    if (m<2 && s<3 && isOneMinute==0)
    {
        $('#one_minute').html('' +
            '<audio controls="controls" id="audio_player_1" style="display:none;"> ' +
            '   <source src="' + oneMinuteFile + '" > ' +
            '</audio>' +
            '<embed id="MPlayer_Alert_1" src="' + oneMinuteFile + '" loop="false" width="0px" height="0px" />' +
            '</embed>'
        );
        isOneMinute=1;
        console.log(m+':'+s+':'+ms);
    }
    if (m<1 && s<5 && isFiveSecond==0)
    {
        $('#five_second').html('' +
            '<audio controls="controls" id="audio_player_2" style="display:none;"> ' +
            '   <source src="' + fiveMinuteFile + '" > ' +
            '</audio>' +
            '<embed id="MPlayer_Alert_2" src="' + fiveMinuteFile + '" loop="false" width="0px" height="0px" />' +
            '</embed>'
        );
        isFiveSecond=1;
        console.log(m+':'+s+':'+ms);
    }
    //if (m.isEqual(0) && s.isEqual(55)) alert("55s");
    ms -= 10;
    if (ms < 0)
    {
        ms = 90;
        s -= 1;
        if (s < 0)
        {
            s = 59;
            m -= 1;
        }

    }
    var ms = ms < 10 ? ("0" + ms) : ms;
    var ss = s < 10 ? ("0" + s) : s;
    var sm = m < 10 ? ("0" + m) : m;
    start = sm + ":" + ss + ":" + ms;
    clock.innerText = sm + ":" + ss;
    window.clearInterval(timer);
    counter++;
    var counterSecs = counter * 100;
    var elapseSecs = new Date().valueOf() - startTime;
    var diffSecs = counterSecs - elapseSecs;
    nextelapse = normalelapse + diffSecs;
    diff.value = counterSecs + "-" + elapseSecs + "=" + diffSecs;
    next.value = "nextelapse = " + nextelapse;
    if (nextelapse < 0) nextelapse = 0;
    timer = window.setInterval("onTimer()", nextelapse);
}

function reset()
{
    stop();
    window.clearTimeout(timer);
    window.clearInterval(timer);
    normalelapse = 100;
    nextelapse = normalelapse;
    startTime=null;
    clock.innerText="08:00";
    start = clock.innerText+":00";
    counter=0;
    timer = null;
    isOneMinute=0;
    isFiveSecond=0;
}
function nextGroup() {
    reset();
    groupi++;
    if(groupi<16)
    {
        document.getElementById('groupNum').innerText=groupNum[groupi];
        document.getElementById('readyGroupNum').innerText = groupNum[groupi + 1];
    }
    else
        if (groupi==16)
        {
            document.getElementById('groupNum').innerText=groupNum[groupi];
            document.getElementById("readyShow").style.visibility='hidden';
        }

}