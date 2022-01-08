the_feels_song="";
butter_song="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scoreRightWrist = 0;
song_name = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    the_feels_song = loadSound("thefeels.mp3");
    butter_song = loadSound("butter.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("red");
    stroke("#ff0000");

    song_name = the_feels_song.isPlaying();
    console.log(song_name);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        butter_song.stop();
        if(song_name == false){
            the_feels_song.play();
        }
        else{
            console.log("Song Name: The Feels");
            document.getElementById("song_name").innerHTML = "Song Name: The Feels";
        }
    }
}
song_name = butter_song.isPlaying();
console.log(song_name);

if(scoreleftWrist > 0.2){
    circle(leftWrist_x,leftWrist_y,20);
    the_feels_song.stop();
    if(song_name == false){
        butter_song.play();
    }
    else{
        console.log("Song Name: Butter");
        document.getElementById("song_name").innerHTML = "Song Name: Butter";
    }
}

function modelLoaded(){
    console.log("PoseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreleftWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}