
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
        //this.wallLayer.setCollision(2); // Los tiles de esta capa tienen colisiones

        //Marcador de puntuación
        this.scoreText = this.add.text(0, 0, 'Score: ' + this.score, {fontFamily: 'Arial', fontSize: '44px', color: '#000000'});

        //Se crea el personaje con sus propiedades
        this.mov = this.map.createFromObjects('Objetos', {name: 'player', classType: Character, key:this.selectedCharacter.image});
		let player = this.mov[0];
        player.setScale(0.2);


        // Creación de plataformas

        this.platforms = this.map.createFromObjects('Plataformas', {name: 'Plataforma', key: 'plataformax'});
        let plataformas = this.platforms[0];




        /*let platforms = this.map.createFromObjects('Plataformas', {name: "Plataforma", key: 'plataformax' });
		
		let platformGroup = this.add.group();
		platformGroup.addMultiple(platforms)
		platforms.forEach(obj => {
			this.physics.add.existing(obj);
            this.physics.world.gravity.set(0);
            this.physics.add.collider(player, obj, (player, obj) => {
                this.mov[0].body.setVelocityY(-500);
            });
		});*/

        


        //this.physics.add.collider(player,platformGroup);

        // Nueva función de seguir al jugador
        this.cameras.main.setFollowOffset(100,0);
        this.cameras.main.startFollow(player,false,0,1);


    
    
        //Permitir obtener que teclas ha pulsado
        this.cursors = this.input.keyboard.createCursorKeys();
	}

    update() {
        var rotacionIzquierda = false;
        /*if(this.EscKey.isDown){
            alert("Se ha pulsado el boton Escape");

        }*/
       
    }

  
    
}
