import { OnBallHitBrick} from "./life.js"

var normalBricks = ["brick red", "brick orange", "brick yellow", "brick green", "brick blue"];
var hardBricks = ["brick steel", "brick chrome", "brick metallic"];
var lifeBricks = ["brick life-up"];
var crackedBricks = ["brick red svg-cracked", "brick yellow svg-cracked", "brick green svg-cracked", "brick orange svg-cracked", "brick blue svg-cracked"];

class Brick {
   #isBrickDestroyed;
   constructor(brickid,bricktype, top, bottom, left, right, isbrickdestroyed = false, numberofhits = 1) {
      this.brickid = brickid;
      this.bricktype=bricktype;
      this.top = top;
      this.bottom = bottom;
      this.left = left;
      this.right = right;
      this.#isBrickDestroyed = isbrickdestroyed;
      this.numberofhits = numberofhits;
   }

   get isBrickDestroyed() {
      return this.#isBrickDestroyed;
   }

   set isBrickDestroyed(value) {
      this.#isBrickDestroyed = value;
   }

   Destroy() {
      let brick = document.getElementById(this.brickid);

      if (!brick) return;

      if (this.numberofhits === 0) {
         this.isBrickDestroyed = true;

         if(lifeBricks.includes(this.bricktype)){
           OnBallHitBrick(document.getElementById(this.brickid))
         }



         brick.classList.add("brick-destroyed");

         let scoreElement = document.getElementById("scores");
         if (!scoreElement) return;

         let currentScore = parseInt(scoreElement.textContent) || 0;
         let points = 0;
           
         if (normalBricks.includes(this.bricktype)) {
            points = 50;
         } else if (hardBricks.includes(this.bricktype)) {
            points = 100;
         } else if (crackedBricks.includes(this.bricktype)) {
            points = 25;
         }

         scoreElement.textContent = currentScore + points;
      }
   }

}

export var brickPositions = [];

var getRandomBrick = (brickList) => {
   let randomIndex = Math.floor(Math.random() * brickList.length);
   return brickList[randomIndex];
};

export function generateBricks(level = 1) {
   var brickWrapper = document.getElementById("brick-wrapper");
   if (!brickWrapper) {
      console.error("Game container not found!");
      return;
   }

   var brickContainer = document.createElement("div");
   brickContainer.id = "brick-container";
   brickWrapper.appendChild(brickContainer);

   if (level === 1) {
      createBricks(brickContainer, 10, 1, 0, 35, [...normalBricks, ...lifeBricks, ...crackedBricks]);
   }else if (level === 2){
      createBricks(brickContainer,10,2,8,35,[...normalBricks,...lifeBricks,...crackedBricks,...hardBricks])
   }else if(level === 3){
      createBricks(brickContainer,10,3,10,35,[...lifeBricks,...normalBricks,crackedBricks,...hardBricks])
   }else if(level === 4){
      createBricks(brickContainer,10,3,12,35,[...lifeBricks,...hardBricks,...crackedBricks,...normalBricks])
   }else{
      createBricks(brickContainer,9,3,15,35,[...lifeBricks,...hardBricks,...normalBricks,...crackedBricks])
   }
}

function createBricks(brickContainer, maxCrackBricks, maxLifeBricks, maxhardbricks, maxBricks, Allbricks) {
   let totalBricks = 0;
   let lifeBrickCount = 0;
   let crackedBrickscount = 0;
   let hardbrickCount = 0;


   while (totalBricks < maxBricks) {
      let brickType = getRandomBrick(Allbricks);

      if (brickType === lifeBricks[0]) {
         if (lifeBrickCount >= maxLifeBricks) continue;
         lifeBrickCount++;
      }
      if (crackedBricks.includes(brickType)) {
         if (crackedBrickscount >= maxCrackBricks) continue;
         crackedBrickscount++
      }
         
      if (hardBricks.includes(brickType)) {
         if (hardbrickCount >= maxhardbricks) continue;
         hardbrickCount++
      }
      let brickElement = document.createElement("div");
      brickElement.setAttribute("class", brickType);
      brickElement.setAttribute("id", totalBricks)
      brickContainer.appendChild(brickElement);
      var maxnumberofhit;
      if(hardBricks.includes(brickType)){
         maxnumberofhit=2
      }else{
         maxnumberofhit=1
      }

      let brickDimensions = brickElement.getBoundingClientRect();
      brickPositions.push(new Brick(totalBricks,brickType,parseInt(brickDimensions.top), parseInt(brickDimensions.bottom), parseInt(brickDimensions.left), parseInt(brickDimensions.right), false,maxnumberofhit));

      totalBricks++;
   }
   // console.log(brickPositions)
}