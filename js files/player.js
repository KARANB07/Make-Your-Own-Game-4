class Player {
    constructor(){
      this.index = null;
      //this.positionX = 0;
      //this.positionY = 0;
      this.positionX=200;
      this.positionY=200;
      this.name = null;
    }
  
    getCount(){
      var playerCountRef = database.ref('playerCount');
      playerCountRef.on("value",(data)=>{
        playerCount = data.val();
      })
    }
  
    updateCount(count){
      database.ref('/').update({
        playerCount: count
      }); 
    }
  
    update(){
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).set({
        name:this.name,
        positionX:this.positionX,
        positionY:this.positionY
      });
    }
  
    static getPlayerInfo(){
      var playerInfoRef = database.ref('players');
      playerInfoRef.on("value",(data)=>{
        allPlayers = data.val();
        console.log(allPlayers)
      })
    }
  }
  