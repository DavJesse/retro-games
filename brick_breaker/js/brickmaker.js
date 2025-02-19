


var randomClass=["brick red","brick orange","brick yellow","brick green","brick blue"]
export function MakebrickLv1(){
    var brickcontainer=document.createElement("div")
     brickcontainer.id="brick-container"
     document.getElementById("game-container").appendChild(brickcontainer)
         
        var brickclass=()=>{
         let x=Math.floor(Math.random()*randomClass.length)
            return   randomClass[x]
     }
     for (var i=0;i<35;i++){
        let brick=document.createElement("div")
         brick.setAttribute("class",brickclass())
         brickcontainer.appendChild(brick)
       console.log(brick.getBoundingClientRect())
      
     }
}