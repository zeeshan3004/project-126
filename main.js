song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
song1_status="";
song2_status="";
score_leftwrist=0;
score_rightwrist=0;

function preload(){
song1=loadSound("music.mp3");
song2=loadSound("music2.mp3");
}


function draw(){
image(video,0,0,600,500);
song1_status=song1.isPlaying();
fill("#FF0000");
stroke("#FF0000");
if(score_rightwrist>0.2){
    circle(rightWristX,rightWristY,20);
    song2.stop();
    if(song1_status==false){
        song1.play();
        document.getElementById("song").innerHTML="Playing Harry Potter Theme Song";
    }
}

if(score_leftwrist>0.2){
    circle(leftWristX,leftWristY,20);
    song1.stop();
    if(song2_status==false){
        song2.play();
        document.getElementById("song").innerHTML="Playing Peter Pan Song";
    }
}

}


function setup(){
canvas=createCanvas(600,500);
canvas.position(800,300);
video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video, modelLoaded);
poseNet.on("pose",gotPoses);
}


function play(){
song1.play();
song1.rate(1);
song1.setVolume(1);
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);

        score_leftwrist=results[0].pose.keypoints[9].score;
        console.log("score_leftwrist = "+score_leftwrist);
        
        score_rightwrist=results[0].pose.keypoints[10].score;
        console.log("score_rightwrist = "+score_rightwrist);


        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY);

        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY);
    }

}