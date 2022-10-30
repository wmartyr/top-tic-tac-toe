const gameboard = (() => {
    var playerChoice;
    // const player1 = Player();
    var gameStarted = false;
    const gameArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    const gameStart = () => {
        player1.chooseToken();
        // choosePlayer();
        const mainButton = document.querySelector(".main-button");
        mainButton.addEventListener("click", () => {
            playerChoice = player1.getToken();
            if (playerChoice === null) {
                alert("Please make a choice");
            } else {
                alert(`You chose ${playerChoice}`);
            };
            // alert(playerToken);
            // clicked(playerToken);
        });
    };

    const choosePlayer = () => {
        // const playerChoice = "x";
        // const playerTokens = document.querySelectorAll(".player-token");

        // playerTokens.forEach((playerToken) => {
        //     playerToken.addEventListener("click", () => {
        //         playerChoice = playerToken.id;
        //         // gameboard.gameStart(playerChoice);
        //         // return playerToken.id;
        //         alert(playerChoice);
        //     });
        // });
    };

    const clicked = (playerToken) => {
        const buttons = document.querySelectorAll(".tile");
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                if (gameArray[button.id] === 0) {
                    gameArray[button.id] = playerToken;
                    updateTile(playerToken, button);
                }
            });
        });
    };

    const updateTile = (player, button) => {
        if (player === "o") {
            button.textContent = "O";
        } else {
            button.textContent = "X";
        }
    };

    const boardReset = () => {
        gameArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        const buttons = document.querySelectorAll(".tile");
        buttons.forEach((button) => {
            button.textContent = "";
        });
    };

    return {
        gameStart,
    };

})();

const Player = (() => {
    var playerScore = 0;
    var playerChoice = null;
    const playerTokens = document.querySelectorAll(".player-token");

    const chooseToken = () => {
        playerTokens.forEach((playerToken) => {
            playerToken.addEventListener("click", () => {
                playerChoice = playerToken.id;
                // gameboard.gameStart(playerChoice);
                // return playerToken.id;
                // alert(playerChoice);
            });
        });

    }

    const getScore = () => {
        return playerScore;
    };

    const addScore = () => {
        playerScore++;
    };

    const getToken = () => {
        return playerChoice;
    };

    return {
        chooseToken,
        getScore,
        addScore,
        getToken,
    };

});

const player1 = Player();
// alert(player1.token());
// gameboard.gameStart(player1.token());
gameboard.gameStart();