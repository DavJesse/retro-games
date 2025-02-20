var normalBricks = ["brick red", "brick orange", "brick yellow", "brick green", "brick blue"];
var hardBricks = ["brick steel cracked", "brick iron", "brick titanium", "brick platinum", "brick steel", "brick chrome", "brick metallic"];
var lifeBricks = ["brick life-up"];
var crackedBricks = ["brick red svg-cracked", "brick yellow svg-cracked", "brick green svg-cracked", "brick orange svg-cracked", "brick blue svg-cracked"];
var explosiveBricks = ["brick explosive"];

class Brick {
   constructor(brickid,type, top, bottom, left, right,isbreakdestroyed,opacity=1) {
      this.brickid=brickid;
      this.type = type;
      this.top = top;
      this.bottom = bottom;
      this.left = left;
      this.right = right;
      this.opacity=opacity
      this.isbreakdestroyed=isbreakdestroyed;
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
      createLevelOneBricks(brickContainer);
   }
}

function createLevelOneBricks(brickContainer) {
   let brickTypes = [...normalBricks, ...crackedBricks, lifeBricks[0]];
   let totalBricks = 0;
   let lifeBrickCount = 0;
   let  crackedBrickscount=0;
   const maxCrackBricks=5;
   const maxLifeBricks = 3;
   const maxBricks = 35;

   while (totalBricks < maxBricks) {
      let brickType = getRandomBrick(brickTypes);

      if (brickType === lifeBricks[0]) {
         if (lifeBrickCount >= maxLifeBricks) continue;
         lifeBrickCount++;
      }
      if(crackedBricks.includes(brickType)){
         if(crackedBrickscount>=maxCrackBricks)continue;
            crackedBrickscount++
      }

      let brickElement = document.createElement("div");
      brickElement.setAttribute("class", brickType);
      brickElement.setAttribute("id",totalBricks)
      brickContainer.appendChild(brickElement);

      let brickDimensions = brickElement.getBoundingClientRect();
      brickPositions.push(new Brick(totalBricks,brickType, brickDimensions.top, brickDimensions.bottom, brickDimensions.left, brickDimensions.right,false));

      totalBricks++;
   }

   return brickTypes;
}
console.log(brickPositions)