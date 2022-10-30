const gameboard = (() => {
    var gameStarted = false;
    const gameArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    const gameStart = () => {
        var playerChoice = player1.chooseToken();
        const mainButton = document.querySelector(".main-button");
        mainButton.addEventListener("click", () => {
            if (!gameStarted) {
                playerChoice = player1.getToken();
                if (playerChoice === null) {
                    alert("Please make a choice");
                } else {
                    alert(`You chose ${playerChoice}`);
                    gameStarted = true;
                    clicked(playerChoice);
                };
            } else {
                boardReset();
            };
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

    const clicked = (playerChoice) => {
        const buttons = document.querySelectorAll(".tile");
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                if (gameArray[button.id - 1] === 0) {
                    gameArray[button.id - 1] = playerChoice;
                    updateTile(playerChoice, button);
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
        alert("Board reset");
        gameArray.forEach((element, index) => {
            gameArray[index] = 0;
        });
        const buttons = document.querySelectorAll(".tile");
        buttons.forEach((button) => {
            button.textContent = "";
        });
        player1.resetToken();
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

    const resetToken = () => {
        playerChoice = null;
    }

    return {
        chooseToken,
        getScore,
        addScore,
        getToken,
        resetToken,
    };

});

const player1 = Player();
// alert(player1.token());
// gameboard.gameStart(player1.token());
gameboard.gameStart();