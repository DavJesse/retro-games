var normalBricks = ["brick red", "brick orange", "brick yellow", "brick green", "brick blue"];
var hardBricks = ["brick steel", "brick chrome", "brick metallic"];
var lifeBricks = ["brick life-up"];
var crackedBricks = ["brick red svg-cracked", "brick yellow svg-cracked", "brick green svg-cracked", "brick orange svg-cracked", "brick blue svg-cracked"];

class Brick {
   #isBrickDestroyed;
   constructor(brickid, type, top, bottom, left, right, isbrickdestroyed = false, numberofhits = 2) {
      this.brickid = brickid;
      this.type = type;
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
      if (!hardBricks.includes(this.type)) {
         if (this.numberofhits > 0) {
            this.isBrickDestroyed = true;
            brick.classList.add("brick-destroyed");
         }
      } else {
         if (this.numberofhits >= 2) {
            this.isBrickDestroyed = true;
            brick.classList.add("brick-destroyed");
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
   var gameContainer = document.getElementById("game-container");
   if (!gameContainer) {
      console.error("Game container not found!");
      return;
   }

   var brickContainer = document.createElement("div");
   brickContainer.id = "brick-container";
   gameContainer.appendChild(brickContainer);

   if (level === 1) {
      createLevelOneBricks(brickContainer, 10, 2, 0, 35, [...normalBricks, ...lifeBricks, ...crackedBricks]);
   }
}

function createLevelOneBricks(brickContainer, maxCrackBricks, maxLifeBricks, maxhardbricks, maxBricks, Allbricks) {
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

      let brickDimensions = brickElement.getBoundingClientRect();
      brickPositions.push(new Brick(totalBricks, brickType, brickDimensions.top, brickDimensions.bottom, brickDimensions.left, brickDimensions.right, false));

      totalBricks++;
   }
}
console.log(brickPositions)