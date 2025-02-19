var Normalbricks = ["brick red", "brick orange", "brick yellow", "brick green", "brick blue"]
var Hardbrick = ["brick steel cracked", "brick iron", "brick titanium", "brick platinum", "brick steel", "brick chrome", "brick metallic"]
var lifebrick = ["brick life-up"]
var crackedbrick = ["brick yellow cracked", "brick red svg-cracked", "brick yellow svg-cracked", "brick green svg-cracked", "brick orange svg-cracked", "brick blue svg-cracked"]
var explosivebrick = ["brick explosive"]

var getbrick = (bricks) => {
   let x = Math.floor(Math.random() * bricks.length)
   console.log(typeof bricks[x])
   return bricks[x]
}
export function Makebrick(level = 1) {
   var brickcontainer = document.createElement("div")
   brickcontainer.id = "brick-container"
   document.getElementById("game-container").appendChild(brickcontainer)

   if (level == 1) {
       level1(brickcontainer)
   }
}
function level1(brickcontainer) {
   let bricks = [...Normalbricks, crackedbrick, lifebrick]
   
   let NumberOfBricks=1
   let numberOfbricklife=0;
    while (NumberOfBricks<=35) {
      let bricktype=getbrick(bricks)
      if (bricktype == lifebrick[0]){
         numberOfbricklife++
         console.log(typeof bricktype)
      }
       if (numberOfbricklife>3 && bricktype === lifebrick[0] ){
              continue
       }else{
         let brick = document.createElement("div")
         brick.setAttribute("class",bricktype)
         brickcontainer.appendChild(brick)
        NumberOfBricks++
       }

    }

   return bricks

}
class Brick {
   constructor(parameters) {

   }
}
