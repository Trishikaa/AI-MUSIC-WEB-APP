song1="";
song2="";

song1_status="";
song2_status="";

scoreRightWrist=0;
scoreLeftWrist=0;

rightWristX=0;
rightWristY=0;

leftWristX=0;
leftWristY=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.length>0)
    {
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score;

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
    }

}

function draw(){
image(video,0,0,600,500);

song1_status= song1.isPlaying();
song2_status= song2.isPlaying();

fill();
stroke();

if(scoreRightWrist>0.2)
{
    circle(rightWristX,rightWristY,20);

    song2.stop();

    if(song1_status==false)
    {
        song1.play()
        document.getElementById("song").innerHTML="Playing : Song 1";
    }
}

if(scoreLeftWrist>0.2)
{
    circle(leftWristX,leftWristY,20);

    song1.stop();

    if(song2_status==false)
    {
        song2.play()
        document.getElementById("song").innerHTML="Playing : Song 2";
    }
}
}



function preload()
{
    song1=loadSound("music.mp3");
    song2=loadSound("song.mp3");
}

function play()
    {
        song.play();
        song.setVolume(1);
        song.rate(1);
    }
