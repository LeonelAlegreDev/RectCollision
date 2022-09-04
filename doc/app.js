window.addEventListener('load', () => {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = 1280;
   canvas.height = 720;

    class Game{
        constructor (width, height){
            this.width = width;
            this.height = height;

            this.rects = [];         
        }

        update(deltaTime){
            this.rects.forEach(rect => {
                rect.update(context);
            });
            this.checkCollision();
        }
        draw(context){
            this.rects.forEach(rect => {
                rect.draw(context);
            });
        }
        createRects(){
            let numberOfRects = 20;
            for(let i = 0; i < numberOfRects; i++){
                this.rects.push(new Square(game, Math.random() * (0, this.width - 50), Math.random() * (0, this.height - 50)));
            }         
        }
        checkCollision(){
            let obj1;
            let obj2;

            this.rects.forEach(rect => {
                rect.isColliding = false;
            });
            
            for(let i = 0; i < this.rects.length; i++){
                obj1 = this.rects[i];
                for(let j = i + 1; j < this.rects.length; j++){
                    obj2 = this.rects[j];

                    if(rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)){
                        
                        obj1.isColliding = true;
                        obj2.isColliding = true;                
                    }
                } 
            }
        }
        
    }
    class Square{
        constructor(game, x, y){
            this.game = game;
            this.width = 50;
            this.height = 50;
            this.x = x;
            this.y = y;

            this.xVelocity = Math.random() * (-4, 4);
            this.yVelocity = Math.random() * (-4, 4);

            this.isColliding = false;
        }

        draw(context){
            // Draw a simple square
            if(this.isColliding) context.fillStyle = '#0F3B21';
            else context.fillStyle = '#207A46';

            context.fillRect(this.x, this.y, this.width, this.height);
        }

        update(){
            // Move with set velocity
            this.x += this.xVelocity;
            this.y += this.yVelocity;

            if(this.x > this.game.width - this.width || this.x < 0){
                this.xVelocity = -this.xVelocity;
            }
            if(this.y > this.game.height - this.height || this.y < 0){
                this.yVelocity = -this.yVelocity;
            }
        }
    }

    const game = new Game(canvas.width, canvas.height);
    game.createRects();
    let lastTime = 0;
    //animate loop
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        context.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(context);
        requestAnimationFrame(animate);
    }
    animate(0);
});

function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    // Check x and y for overlap
    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
        return false;
    }
    return true;
}
