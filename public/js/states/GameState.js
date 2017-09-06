var GameState = {


  create: function(){

    //Static
    this.background = this.game.add.sprite(0, 0, 'background');

    const title = game.add.text(this.game.width/2, 20, 'SPACE INVADERS', {fill: '#00FF00', font: '30px Press Start 2P'})
    title.anchor.setTo(0.5, 0);
    title.visible = true;

    var style = {
      font: '20px Press Start 2P',
      fill: '#fff'
    }
    this.game.add.text( 10, 10, 'Score:', style)
    this.publicScore = this.game.add.text( 150, 10, '', style)
    this.publicScore.visible = true;

    //Invaders
    var invadersData = [
      {Key: 'ship', audio: 'shipSound'},
      {Key: 'ship', audio: 'shipSound'},
      {Key: 'ship', audio: 'shipSound'},
      {Key: 'ship', audio: 'shipSound'},
      {Key: 'ship', audio: 'shipSound'},
      {Key: 'ship', audio: 'shipSound'},
      {Key: 'ship', audio: 'shipSound'},
      {Key: 'ship', audio: 'shipSound'},
      {Key: 'ship', audio: 'shipSound'}
    ]

    this.invaders = this.game.add.group();

    let self = this;
    let invader;

    invadersData.forEach((element, index) => {
      invader = self.invaders.create(70 + index * 90, 70, 'ship');
      invader.anchor.setTo(0.5, 0);
      invader.inputEnabled = true;
      invader.events.onInputDown.add(self.animateInvader, self)
      invader.animations.add('animate', [0, 1], 1.5, true);
      invader.customParams = {sound: self.game.add.audio('shipSound'), points: 10};
    })

    //Hero
    this.hero = this.game.add.sprite(this.game.world.centerX, 700, 'hero')
    this.hero.customParams = {direction: 1, score: 0 }
    this.hero.anchor.setTo(0.5, 1);
    this.hero.inputEnabled = true;
    this.hero.input.enableDrag();
    //this.hero.events.onInputDown.add(this.move, this)
  },

  update: () => {
  },

  animateInvader: (sprite, event) => {
    sprite.play('animate')
    //sprite.customParams.sound.play();
    //sprite.alpha = 0.4;
    if (this.isMoving){
      return false
    }
    this.isMoving = true;

    let currentInvader = sprite
    console.log('this', currentInvader)
    let newInvaderMovement = this.game.add.tween(currentInvader)
    newInvaderMovement.to({y: sprite.world.y+45}, 1000)
    newInvaderMovement.onComplete.add(() => this.isMoving = false)
    newInvaderMovement.start()
    console.log('this', sprite.world.y)


  },

  refreshScore: () => {
    this.publicScore.text = this.hero.customParams.score
  },

  gameOver: () => {
    //this.game.state.restart();
    this.state.start('HomeState', true, false, 'GAME OVER')
  }

};