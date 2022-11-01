const gameboard = (() => {
    var gameStarted = false;
    const gameArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var turn = "player";

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
                    clicked();
                };
            } else {
                boardReset();
                gameStarted = false;
            };
        });
    };

    const clicked = () => {
        alert("clicked");
        const buttons = document.querySelectorAll(".tile");
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const playerChoice = player1.getToken();
                if (gameArray[button.id - 1] === 0 && gameStarted) {
                    gameArray[button.id - 1] = playerChoice;
                    button.textContent = playerChoice;
                }
            });
        });
    };

    const boardReset = () => {
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
        alert("Reset token");
        playerChoice = null;
        playerScore = 0;
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