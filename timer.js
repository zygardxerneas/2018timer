var normalelapse = 100;
var isQ_A=0;
var isFiveSecond=0;
var isOneMinute=0;
var oneMinuteFile="mp3/1m.mp3";
var fiveMinuteFile="mp3/5s.mp3";
var groupi=0;
var groupNum=['040156','026161','031156','051156','144152','081161','015151'];
var questionNum=[0,1,2,3,4,3,1];
var questions=['一个优秀的团日活动，能在增进支部凝聚力的同时，优化支部组织结构，提升支部成员的整体素质，创造社会价值。这极大地考验了团干部的组织沟通以及协调能力。请结合你们支部的一个团日活动谈谈在活动过程中遇到的困难以及解决措施。',
                '团支部是团的最基层组织，是团的全部工作的基础和显示终端。校团委积极促进基层团组织建设，请分析你们支部在过去团支部建设中存在的问题，并说明将采取哪些措施进一步建设好你们团支部？',
                '2017年共青团中央3号文件指出：按照全面从严治党要求，共青团全团大力推进从严治团，使共青团充分发挥党的助手和后备军作用，你是如何理解助手和后备军的含义的，如果你们光荣地当选为国旗团支部，将如何起到表率作用？',
                '深入学习习近平总书记系列重要讲话精神，切实增强团员的先进性和光荣感，让团员更像团员，以良好风貌和积极作为迎接党的十九大胜利召开，团中央开展“学习总书记讲话，做合格共青团员”教育实践活动。结合本班特色，谈谈如何开展“学习总书记讲话，做合格共青员”教育实践活动。',
                '2017年共青团中央5号文件指出：开展好“三会两制一课”,对于教育引导团员，增强政治意识、大局意识、核心意识、看齐意识,更加紧密地团结在以习近平同志为核心的党中央周围, 具有重要意义。请谈谈对以上四个意识的理解？'];
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
    if (isQ_A==0) clock.innerText="08:00";
    else clock.innerText="02:00"
    start = clock.innerText+":00";
    counter=0;
    timer = null;
    isOneMinute=0;
    isFiveSecond=0;
}
function nextGroup() {
    document.getElementById('onShow').style.display='block';
    document.getElementById('readyShow').style.display='block';
    isQ_A=0;
    document.getElementById("question").style.display='none';
    document.getElementById('q&aB').value='Q&A';
    reset();
    lastGroupB.disabled=false;
    nextGroupB.disabled=false;
    groupi++;
    if(groupi<6)
    {
        document.getElementById('groupNum').innerText=groupNum[groupi];
        document.getElementById('readyGroupNum').innerText = groupNum[groupi + 1];
    }
    else
        if (groupi=6)
        {
            document.getElementById('groupNum').innerText=groupNum[groupi];
            document.getElementById("readyShow").style.visibility='hidden';
        }
    if (groupi<=0) lastGroupB.disabled=true;
    if (groupi>=6) nextGroupB.disabled=true;
}
function lastGroup() {
    document.getElementById('onShow').style.display='block';
    document.getElementById('readyShow').style.display='block';
    isQ_A=0;
    document.getElementById("question").style.display='none';
    document.getElementById('q&aB').value='Q&A';
    reset();
    lastGroupB.disabled=false;
    nextGroupB.disabled=false;
    groupi--;
    if(groupi<6)
    {
        document.getElementById('groupNum').innerText=groupNum[groupi];
        document.getElementById('readyGroupNum').innerText = groupNum[groupi + 1];
    }
    else
    if (groupi==6)
    {
        document.getElementById('groupNum').innerText=groupNum[groupi];
        document.getElementById("readyShow").style.display='none';
    }
    if (groupi<=0) lastGroupB.disabled=true;
    if (groupi>=6) nextGroupB.disabled=true;
}
function Q_A()
{
    if (isQ_A==0)
    {
        isQ_A=1;
        document.getElementById('question').innerHTML=questions[questionNum[groupi]];
        document.getElementById("question").style.display='block';
        document.getElementById('q&aB').value='Show';
        document.getElementById('onShow').style.display='none';
        document.getElementById('readyShow').style.display='none';
    }
    else
    {
        isQ_A=0;
        document.getElementById("question").style.display='none';
        document.getElementById('q&aB').value='Q&A';
        document.getElementById('onShow').style.display='block';
        document.getElementById('readyShow').style.display='block';
    }
    reset();
}