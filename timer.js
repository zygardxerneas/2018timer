var normalelapse = 100;
var nextelapse = normalelapse;
var counter;
var startTime;
var start = clock.innerText+":00";
var finish = "00:00:00";
var timer = null;
// ��ʼ����
function run() {
    startB.disabled = true;
    endB.disabled = false;
    counter = 0;
// ��ʼ����ʼʱ��
    startTime = new Date().valueOf();
// nextelapse�Ƕ�ʱʱ��, ��ʼʱΪ100����
// ע��setInterval����: ʱ����ȥnextelapse(����)��, onTimer�ſ�ʼִ��
    timer = window.setInterval("onTimer()", nextelapse);
}
// ֹͣ����
function stop() {
    startB.disabled = false;
    endB.disabled = true;
    window.clearTimeout(timer);
}
window.onload = function() {
    endB.disabled = true;
}
// ����ʱ����
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
// �����һ�εĶ�ʱ��
    window.clearInterval(timer);
// ��У��ϵͳʱ��õ�ʱ���, ���ɴ˵õ��´����������¶�ʱ����ʱ��nextelapse
    counter++;
    var counterSecs = counter * 100;
    var elapseSecs = new Date().valueOf() - startTime;
    var diffSecs = counterSecs - elapseSecs;
    nextelapse = normalelapse + diffSecs;
    diff.value = counterSecs + "-" + elapseSecs + "=" + diffSecs;
    next.value = "nextelapse = " + nextelapse;
    if (nextelapse < 0) nextelapse = 0;
// �����µĶ�ʱ�� <img id="container-bg" src="beijing2.png" width="100%" height="100%" />
    timer = window.setInterval("onTimer()", nextelapse);
}