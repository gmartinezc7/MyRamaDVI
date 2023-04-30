
import Phaser from 'phaser'
import Character from './character.js';

export default class game extends Phaser.Scene {

	constructor(nivel) {
		super({ key:'game'});
        this.fondoJuego = undefined;
        this.valor = 0;
        this.height = 600;
        this.width = 600;

        //this.EscKey = this.scene.input.keyboard.addKey('Esc'); //arriba
        
        //this.nivel = nivel;
        //this.nivel= this.scene.settings.data;
	}
    init() {
        if(!this.registry.get('selectedCharacter')){
            this.registry.set('selectedCharacter', {image : 'character'})
        }
        this.selectedCharacter = this.registry.get('selectedCharacter');
    }

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){


        this.load.tilemapTiledJSON('tilemap', 'assets/Tilemap/mapa_lvl1_v2.json');
        this.load.image('patronesTilemap', 'assets/Tilemap/mapa_continuo_lvl1.png');
        this.load.image('character', 'assets/Skins/mascleto.png');
        this.load.image('plataformax','assets/plataforma1.png');
        this.load.image('estrellaluz','assets/estrellaluz.png');
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
        this.score = 0;
        var espacioPulsado = false;

        this.map = this.make.tilemap({ 
			key: 'tilemap', 
			tileWidth: 32, 
			tileHeight: 32 
		});

        const tileset1 = this.map.addTilesetImage('mapa_continuo_lvl1', 'patronesTilemap');

        // creamos las diferentes capas a través del tileset. El nombre de la capa debe aparecer en el .json del tilemap cargado
        this.wallLayer = this.map.createLayer('Plataformas', tileset1);
		this.groundLayer = this.map.createLayer('Capa1', tileset1);

        //this.cloudLayer = this.map.createLayer('Capa2', tileset1);

        this.wallLayer = this.map.createLayer('Plataformas', tileset1);

        this.esferasLayer = this.map.createLayer('Esferas', tileset1);
        //this.wallLayer.setCollision(2); // Los tiles de esta capa tienen colisiones

        //Marcador de puntuación
        this.scoreText = this.add.text(0, 0, 'Score: ' + this.score, {fontFamily: 'Arial', fontSize: '44px', color: '#000000'});
        this.scoreText.setScrollFactor(0,0);
        this.scoreText.setDepth(5);

        //Se crea el personaje con sus propiedades
        this.mov = this.map.createFromObjects('Objetos', {name: 'player', classType: Character, key:this.selectedCharacter.image});
		this.player = this.mov[0];
        //this.player.body.position.x;
        this.player.setScale(0.2);

        //this.physics.world.enable(this.player);

        // Creamos los objetos a través de la capa de objetos del tilemap y la imagen o la clase que queramos
		let plataformas = this.map.createFromObjects('Plataformas', {name: "Plataforma", key: 'plataformax' });
		
		this.platGroup = this.add.group();
		this.platGroup.addMultiple(plataformas)
		plataformas.forEach(obj => {
			this.physics.add.existing(obj);
            obj.body.allowGravity = false;      
            obj.body.immovable = true;   
		});

        this.physics.add.collider(this.player, this.platGroup, this.handlePlayerOnPlatform, null, this);

        this.platGroup.children.iterate(function (plataforma){
            plataforma.body.checkCollision.up = true;
            plataforma.body.checkCollision.left = false;
            plataforma.body.checkCollision.right = false;
            plataforma.body.checkCollision.down = false;
            plataforma.body.allowGravity = false;
        });



        let esferas = this.map.createFromObjects('Esferas', {name: "Esfera", key: 'estrellaluz' });
		
		this.esfGroup = this.add.group();
		this.esfGroup.addMultiple(esferas)
		esferas.forEach(obj => {
			this.physics.add.existing(obj);
            obj.body.allowGravity = false;      
            obj.body.immovable = true;
		});

        this.physics.add.overlap(this.player, this.esfGroup, this.handlePlayerCollisionEsfera, null, this);


        // Nueva función de seguir al jugador
        this.cameras.main.setFollowOffset(100,0);
        this.cameras.main.startFollow(this.player,false,0,1);


    
    
        //Permitir obtener que teclas ha pulsado
        this.cursors = this.input.keyboard.createCursorKeys();
	}

    update() {

        let actualSpeed;

        // CODIGO PARA LIMITES LATERALES

        if (this.player.body.position.x > 660){
            actualSpeed = -(Math.abs(this.player.body.velocity.x));
            this.player.body.velocity.x=actualSpeed;
        }

        if (this.player.body.position.x < -40 ){
            actualSpeed = Math.abs(this.player.body.velocity.x);
            this.player.body.velocity.x=actualSpeed;
        }


        if (this.player.body.position.y > this.alturalimite+300){
            this.scene.start('escenaFinal',{numero : 0}); 

        }
        // CONDICION DE FIN DE JUEGO : DERROTA
        
        if (this.player.body.position.y < 1400){
            this.cameras.main.stopFollow();
        }

        if(this.player.body.position.y > 14000.963194700037){
            this.cameras.main.stopFollow();
            this.scene.start('escenaFinal',{numero : 0}); 
        }
        if (this.player.body.position.y < 1100){
            this.scene.start('escenaFinal',{numero : 1}); 
        }
      
       
    }

    handlePlayerOnPlatform(player, platform) {

        this.alturalimite = this.player.body.position.y;

        const playerBottom = player.body.y + player.body.height;
        const platformTop = platform.body.y;

        if (playerBottom <= platformTop + 5) { // el jugador está encima de la plataforma
          player.body.velocity.y = -500; // impulsa al jugador hacia arriba
        }
    }
    
    handlePlayerCollisionEsfera(player, esfera){
        this.score += 100;
        this.scoreText.setText('Score: ' + this.score);
        esfera.body.visible = false;
        esfera.destroy();    
    }

    
}
