let fragmentSize = 500;
let img, total, grid, perLine, fragments;

class Fragment
{
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.w = width;
		this.h = height;
    this.deltaY = this.y;
    this.lastChange = 0;
    this.vel = random(0.09, 0.1);
  }

  setImage(img){
    this.img = img.get(this.x, this.y, this.w, this.h);
    this.y += random(this.h*2);
  }
  
  update(){
    let prevY = this.y;
    // if(this.y<-this.h*1.5)
    //   this.y = height;
    
    if(this.deltaY<prevY)
      this.lastChange = millis();		
    
    this.y-=this.vel*20;
  }
  
  draw(){
    this.deltaY += (this.y-this.deltaY)*this.vel;
    image(this.img, this.x, this.deltaY);
  }
}

function preload() {
	img = loadImage("./src/5.png");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noStroke();
  
  start();
}

function imgset(src){
  img = loadImage(src);
}

function start() {
  total = width/fragmentSize*height/fragmentSize;
  grid = pow(ceil(sqrt(total)), 2);
  perLine = ceil(sqrt(total));
  console.log(perLine, fragmentSize, total, grid)
  
  fragments = [];
  for(var i=0; i < total; i++){
		let x = i%perLine*fragmentSize;
		let y = floor(i/perLine)*fragmentSize;
    // console.log(x,y)
    fragments.push(new Fragment(x, y, fragmentSize, fragmentSize));
  }
  
  setImage();

}

function setImage(){
  // imgset(src)
  for(var i=0; i < fragments.length; i++){
    fragments[i].setImage(img);
  }
}

function draw() {
  background(255);
  
  //reorder array
  let newArray = [...fragments];
  for(var x = 0; x < fragments.length; x++){
    let tempValue = fragments[x];
    let tempIndex = x;
    for(let y = x+1; y < fragments.length; y++){
      if(newArray[x].lastChange > newArray [y].lastChange){
        let tempValue = newArray[y];
        newArray[y] = newArray[x];
        newArray[x] = tempValue;
      }
    }
  }
  fragments = newArray;
	
  //draw
  //image(img, 0, 0);
  for(var i=0; i < fragments.length; i++){
    fragments[i].update();
    fragments[i].draw();
  }
}

function mousePressed(){
  fragmentSize = round(random(5, 30)) * 10;
  start();
}