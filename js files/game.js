class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      pLAYER1 = createSprite(random(0,900),random(0,900));
      pLAYER1.addImage("player01",car1_img);
      pLAYER1.scale=0.5
      pLAYER2 = createSprite(random(0,900),random(0,900));
      pLAYER2.addImage("player02",car1_img);
      pLAYER2.scale=0.5
      pLAYER3 = createSprite(random(0,900),random(0,900));
      pLAYER3.addImage("player03",car1_img);
      pLAYER3.scale=0.5
      pLAYER4 = createSprite(random(0,900),random(0,900));
      pLAYER4.addImage("player04",car1_img);
      pLAYER4.scale=0.5
      cave=createSprite(random(0,400),random(0,400))
      pLAYERS = [pLAYER1, pLAYER2, pLAYER3, pLAYER4];
      //car1=createSprite(random(0,displayWidth),random(0,displayHeight))
      car1=createSprite(200,200,50,50)
      car1.addImage("image",carImg);
      car1.scale=0.5;
      car2=createSprite(random(0,displayWidth),random(0,displayHeight))
      car2.addImage("image",carImg);
      car2.scale=0.5;
    }
  
    play(){
      form.hide();
      
      Player.getPlayerInfo();
      //player.getcarsAtEnd();
      
      if(allPlayers !== undefined){
        image(bkg,0,0,2000,2000);
        //image(bkg, 0,-displayHeight*4,800, 900);
        //pLAYER1.depth=pLAYER1.depth+1;
        //pLAYER2.depth=pLAYER2.depth+1;
        //pLAYER3.depth=pLAYER3.depth+1;
        //pLAYER4.depth=pLAYER4.depth+1;
        
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var x = 175 ;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          x = allPlayers[plr].positionX;
          //use data form the database to display the cars in y direction
          y = displayHeight - allPlayers[plr].positionY;
          pLAYERS[index-1].x = x;
          pLAYERS[index-1].y = y;
          if(pLAYERS[index-1].isTouching(car1)){
            player.positionX=300
            //pLAYERS[index-1].positionX=300;
          }
          console.log(index-1)
          car1.debug=true
          pLAYERS[index-1].debug=true
          pLAYERS[index-1].setCollider("rectangle",0,0,50,50);
         // console.log(index, player.index)
  
         
          if (index === player.index){
            stroke(10);
            fill("red");
            ellipse(pLAYERS[index-1].x,pLAYERS[index-1].y,60,60);
            pLAYERS[index - 1].shapeColor = "red";
            //camera.position.x = displayWidth/2;
            camera.position.x = pLAYERS[index-1].x;
            camera.position.y = pLAYERS[index-1].y;
            console.log(plr)

          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.positionY +=10
        player.update();
      }
      if(keyIsDown(LEFT_ARROW) && player.index !== null){
        player.positionX -=10
        player.update();
      }
  
      if(keyIsDown(RIGHT_ARROW) && player.index !== null){
        player.positionX=player.positionX+10
        player.update();
      }
  
      if(keyIsDown(DOWN_ARROW) && player.index !== null){
        player.positionY -=10
        player.update();
      }
  
  
      if(player.distance > 5300){
        gameState = 2;
        player.rank+=1
        Player.updatecarsAtEnd(player.rank);
      }
     
      drawSprites();
    }
  
    end(){
      console.log("Game Ended");
      console.log(player.rank)
    }
  }
  