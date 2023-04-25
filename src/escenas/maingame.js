import Character from '../objetos/character.js';

/**
 * Escena principal de juego.
 * @extends Phaser.Scene
 */
export default class Animation extends Phaser.Scene {
	
	constructor() {
		super({ key: 'maingame' });
	}
	
	preload(){
		// Cargamos el Tilemap (JSON)
		this.load.tilemapTiledJSON('tilemap', 'assets/Tilemap/mapanivel1pers.json');

		// Cargamos la imagen que compone el Tileset (Imagen con los tiles usados por el tilemap)
		this.load.image('patronesTilemap', 'assets/Tilemap/mytile.png');
		
		// Recurso para el personaje principal (imagen simple con un solo frame)
		this.load.image('character', 'assets/character.png');
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		// Objeto tilemap
		this.map = this.make.tilemap({ 
			key: 'tilemap', 
			tileWidth: 32, 
			tileHeight: 32 
		});
		
		// Objeto el tileset. 
		// addTilesetImage recibe la propiedad "name" del tileset a usar (ver .json, propiedad "tilesets":[... "name":"castillo32x32" ... ] como primer parámetro
		// y la imagen del tileset
		const tileset1 = this.map.addTilesetImage('myconjunto', 'patronesTilemap');
		
		// creamos las diferentes capas a través del tileset. El nombre de la capa debe aparecer en el .json del tilemap cargado
		this.groundLayer = this.map.createLayer('Cielo', tileset1);
		
		this.wallLayer = this.map.createLayer('Plataformas', tileset1);
		this.wallLayer.setCollision(2); // Los tiles de esta capa tienen colisiones

		

		//this.groundLayer.resizeWorld();
		//this.wallLayer.resizeWorld();
		
		this.mov = this.map.createFromObjects('Objetos', {name: 'player', classType: Character, key:"character"});
		let player = this.mov[0];

		


		// Ponemos la cámara principal de juego a seguir al jugador
		this.cameras.main.startFollow(player);
		
		// Decimos que capas tienen colision entre ellas
		this.physics.add.collider(player, this.wallLayer);

		

		/*
			Animación básica de la moneda con Tweens
		*/
			// Tween 
			/*
			let tween = this.tweens.add({
			    targets: coins,
			    scale: 0.8,
			    duration: 1000,
			    ease: 'Sine.easeInOut',
			    yoyo: true,
			    repeat: -1,
			    delay: 1000
			})*/

			// Tween Timeline
			/*
			let timeline = this.tweens.createTimeline({loop:-1});

			timeline.add({
				targets: coins,
			    scale: 0.8,
			    duration: 1000,
			    ease: 'Sine.easeInOut',
			    yoyo: true,
			    delay: 100
			});
			timeline.add({
				targets: coins,
				scaleX: 0,
			    duration: 500,
			    ease: 'Sine.easeInOut',
			    repeat: 0,
			    yoyo: true,
			    delay: 0,
			    repeat: 3,
			});
			timeline.play();
			*/
		
	}

	aux(){
		console.log("coin")
	}

	update(time, dt){

	}

}
