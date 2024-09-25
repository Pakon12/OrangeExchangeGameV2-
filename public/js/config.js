const config = {
    type: Phaser.AUTO, // Automatically choose between WebGL or Canvas
    parent: 'game-container', // The game will be rendered inside this element
    scale: {
      mode: Phaser.Scale.RESIZE, // The game will be resized based on the parent element
      autoCenter: Phaser.Scale.CENTER_BOTH, // Center the game horizontally and vertically
      width: '100%', // The game will take up the full width of the parent
      height: '100%', // The game will take up the full height of the parent
    },
    physics: {
      default: 'arcade', // Using the Arcade Physics system
      arcade: {
        gravity: { y: 0 }, // No gravity as it's a top-down game
        debug: false // Turn off physics debugging (set true for debugging)
      }
    },
    scene: [LoaderScene, StartGame, GameScene ], // Array of scenes
  };
  
  const game = new Phaser.Game(config); // Initialize the Phaser game
  