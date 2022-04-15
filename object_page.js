img="";
var state="";
object=[];

function addUser(){
    user_name=document.getElementById("user_input").value;
    localStorage.setItem("user_name", user_name);
    window.location="object_page.html";
}

function preload(){
    img= loadImage('bedroom.jpg');

}


function setup(){
    canvas=createCanvas(640 , 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";


}

function draw(){
    image(img, 0, 0, 640, 420);
    if(state != ""){
        for(i=0; i < object.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";

            fill("red");
            percent=floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + " % ", object[i].x + 10,  object[i].y + 10);
            noFill();
            stroke("red");
           rect( object[i].x,  object[i].y,  object[i].width,  object[i].height );

        }
    }
    
}

function modelLoaded(){
    console.log(" Model Loaded ! ");
    state="true";
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
if(error){
    console.log(error);
    
}

console.log(results);
object=results;

}