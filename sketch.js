//Create variables here
var foodS, foodStock, dog, happyDog, database

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png")
  dogHappy = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);

  database=firebase.database()
  var foodStock=database.ref("foodS");
  foodStock.on("value", readStock);

  dog = createSprite(250, 350)
  dog.scale=0.25
  dog.addImage (dogImg) 

}


function draw() {  
background (46, 139, 87)
  //add styles here
if (foodStock!==undefined) {
  if (keyWentDown(UP_ARROW)) {
    dog.addImage(dogHappy)
    writeStock(foodStock)
    }
    if (keyWentUp(UP_ARROW)){
  dog.addImage (dogImg) 
    }
  }
  drawSprites();
  textSize(15)
  text ("press up arrow to feed the dog milk", 20, 30)
  stroke("black");
  fill ("brown")

  text ("food Stock:" + foodStock, 340, 70)

  stroke("black");
  fill ("brown")
  
}

function readStock (data) {
  foodStock=data.val();
}
function writeStock (num) {
  if (num<=0){
    num=0;
  }
  else{
    num=num-1
  }
  database.ref("/").update({
    foodS:num
  })
}