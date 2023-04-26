
import Phaser from 'phaser'

export default class game extends Phaser.Scene {

	constructor(nivel) {
		super({ key:'game'});
        this.fondoJuego = undefined;
        this.valor = 0;
        this.height = 600;
        this.width = 600;
        
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


        this.load.tilemapTiledJSON('tilemap', 'assets/Tilemap/mapanivel1pers.json');
        this.load.image('patronesTilemap', 'assets/Tilemap/mytile.png');
        this.load.image('character', 'assets/Skins/mascleto.png');
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

        const tileset1 = this.map.addTilesetImage('myconjunto', 'patronesTilemap');

        // creamos las diferentes capas a través del tileset. El nombre de la capa debe aparecer en el .json del tilemap cargado
		this.groundLayer = this.map.createLayer('Cielo', tileset1);

        this.wallLayer = this.map.createLayer('Plataformas', tileset1);
        this.wallLayer.setCollision(2); // Los tiles de esta capa tienen colisiones

        //Marcador de puntuación
        this.scoreText = this.add.text(0, 0, 'Score: ' + this.score, {fontFamily: 'Arial', fontSize: '44px', color: '#000000'});

        //Se crea el personaje con sus propiedades
        //this.character = this.physics.add.sprite(360, 650, 'character');
   

    
    
        //Permitir obtener que teclas ha pulsado
        this.cursors = this.input.keyboard.createCursorKeys();
	}

    update() {
        var rotacionIzquierda = false;
       
    }

  
    
}
