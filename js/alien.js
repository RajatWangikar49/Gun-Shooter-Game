class alien{

	constructor(x, y, width, height){

		this.image = loadImage("./images/Alien.png");

		var options = {
			isStatic : false, 
		}

		this.body = Bodies.rectangle(x, y, width, height, options);
		World.add(world, this.body);
		this.width = width;
		this.height = height;

	}

	display(){
        
        imageMode(CENTER);
        fill("white");
		image(this.image, this.body.position.x, this.body.position.y, 30, 30);

	}
	
}