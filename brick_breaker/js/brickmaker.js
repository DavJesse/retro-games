import { OnBallHitBrick} from "./life.js"
import domCache from "../../game_loader.js";

var normalBricks = ["brick red", "brick orange", "brick yellow", "brick green", "brick blue"];
var hardBricks = ["brick steel", "brick chrome", "brick metallic"];
var lifeBricks = ["brick life-up"];
//var crackedBricks = ["brick red svg-cracked", "brick yellow svg-cracked", "brick green svg-cracked", "brick orange svg-cracked", "brick blue svg-cracked"];

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
         if (this.bricktype === "hit red"){
            brick.classList.remove("hit");
            brick.classList.remove("red")

         }
         brick.classList.add("brick-destroyed");

         let scoreElement = domCache.getScoreBoardElements("score");
         if (!scoreElement) return;

         let currentScore = parseInt(scoreElement.textContent) || 0;
         let points = 0;
           
         if (normalBricks.includes(this.bricktype)) {
            points = 50;
         } else if (hardBricks.includes(this.bricktype)) {
            points = 100;
         }

         scoreElement.textContent = currentScore + points;
      }
   }
   OnBallhitHardBrick(){
      if(hardBricks.includes(this.bricktype)){
         if(this.numberofhits == 1){
            let bricks = document.getElementById(this.brickid);

            // Add the hit class which triggers the animation
              bricks.classList.add('hit');
              let brickclass=this.bricktype.split(" ")
              bricks.classList.remove(brickclass[1])
              bricks.classList.add("red")
              this.bricktype="hit red"

         }
      }
   }

}

export var brickPositions = [];

var getRandomBrick = (brickList) => {
   let randomIndex = Math.floor(Math.random() * brickList.length);
   return brickList[randomIndex];
};

export function generateBricks(level = 1) {
 
  // var brickContainer = domCache.getbrickElement("BrickContainer");
   
  
   var NumberOfLifeBreaks=(()=>{
             let remaininglives=parseInt(document.getElementById("lives").textContent)
             if (remaininglives >= 3){
               return 0
             }

             return level >= 1 && level <= 3 ? Math.floor(Math.random()*5) : Math.floor(Math.random()*2)
       
   })();

   if (level === 1) {
      createBricks(NumberOfLifeBreaks, 0, 35, [...normalBricks, ...lifeBricks]);
   }else if (level === 2){
      createBricks(NumberOfLifeBreaks,10,35,[...normalBricks,...lifeBricks,...hardBricks])
   }else if(level === 3){
      createBricks(brickContainer,NumberOfLifeBreaks,15,35,[...lifeBricks,...normalBricks,...hardBricks])
   }else if(level === 4){
      createBricks(brickContainer,NumberOfLifeBreaks,18,35,[...lifeBricks,...hardBricks,...normalBricks])
   }else{
      createBricks(brickContainer,NumberOfLifeBreaks,24,35,[...lifeBricks,...hardBricks,...normalBricks])
   }
}


function createBricks(maxLifeBricks, maxhardbricks, maxBricks, Allbricks) {
   let totalBricks = 0;
   let lifeBrickCount = 0;
   let hardbrickCount = 0;
   let bricks=domCache.getbrickElement("bricks")[0];
   let brickdim=domCache.getbrickElement("bricks")[1];

   function createNextBrick() {
       if (totalBricks >= maxBricks) return; 

       let brickType = getRandomBrick(Allbricks);

       if (brickType === lifeBricks[0] && lifeBrickCount >= maxLifeBricks) {
           requestAnimationFrame(createNextBrick);
           return;
       }
       if (brickType === lifeBricks[0]) lifeBrickCount++;

       if (hardBricks.includes(brickType) && hardbrickCount >= maxhardbricks) {
           requestAnimationFrame(createNextBrick);
           return;
       }
       if (hardBricks.includes(brickType)) hardbrickCount++;

       let brickElement = bricks[totalBricks];
       brickElement.setAttribute("class", brickType);
       brickElement.style.display="block";

       let maxnumberofhit = hardBricks.includes(brickType) ? 2 : 1;

       //let brickDimensions = brickElement.getBoundingClientRect();
       //console.log("left:",parseInt(brickDimensions.left))
      // console.log("right:",parseInt(brickDimensions.right))
    
       brickPositions.push(new Brick(
           brickElement.id, 
           brickType, 
           brickdim[totalBricks].top, 
           brickdim[totalBricks].bottom, 
           brickdim[totalBricks].left, 
           brickdim[totalBricks].right, 
           false, 
           maxnumberofhit
       ));

       totalBricks++;
       requestAnimationFrame(createNextBrick);
   }

   requestAnimationFrame(createNextBrick);
}
