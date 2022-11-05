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
                    // alert(`You chose ${playerChoice}`);
                    gameStarted = true;
                    clicked();
                };
            } else {
                boardReset();
                player1.resetToken();
                player1.resetScore();
                updateScore(null);
                gameStarted = false;
            };
        });
    };

    const clicked = () => {
        var winner = 0;
        const buttons = document.querySelectorAll(".tile");
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const playerChoice = player1.getToken();
                if (gameArray[button.id - 1] === 0 && gameStarted) {
                    gameArray[button.id - 1] = playerChoice;
                    button.textContent = playerChoice;
                };
                setTimeout(() => {
                    winner = checkWin();
                    if (winner !== 0) {
                        alert(`${winner} wins game`);
                        boardReset();
                        updateScore(playerChoice);
                    };
                }, 10);
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
    };

    const checkWin = () => {
        const win1 = gameArray.slice(0, 3).join("");
        const win2 = gameArray.slice(3, 6).join("");
        const win3 = gameArray.slice(6).join("");
        const win4 = gameArray[0] + gameArray[3] + gameArray[6];
        const win5 = gameArray[1] + gameArray[4] + gameArray[7];
        const win6 = gameArray[2] + gameArray[5] + gameArray[8];
        const win7 = gameArray[0] + gameArray[4] + gameArray[8];
        const win8 = gameArray[2] + gameArray[4] + gameArray[6];
        const playerChoice = player1.getToken();

        if (win1 === "XXX" || win2 === "XXX" || win3 === "XXX" || win4 === "XXX" || win5 === "XXX" || win6 === "XXX" || win7 === "XXX" || win8 === "XXX") {
            if (playerChoice === "X") {
                player1.addScore();
                return "X";
            }
        }
        if (win1 === "OOO" || win2 === "OOO" || win3 === "OOO" || win4 === "OOO" || win5 === "OOO" || win6 === "OOO" || win7 === "OOO" || win8 === "OOO") {
            if (playerChoice === "O") {
                player1.addScore();
                // alert(player1.getScore());
                return "O";
            }
        }
        return 0;
    };

    function updateScore(playerChoice) {
        if (playerChoice === "X") {
            document.querySelector("#score-x").textContent = player1.getScore();
        } else if (playerChoice === "O") {
            document.querySelector("#score-o").textContent = player1.getScore();
        } else {
            document.querySelector("#score-x").textContent = player1.getScore();
            document.querySelector("#score-o").textContent = player1.getScore();
        }

    }

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
    }

    const resetScore = () => {
        alert("Reset score");
        playerScore = 0;
    }

    return {
        chooseToken,
        getScore,
        addScore,
        getToken,
        resetToken,
        resetScore,
    };

});

const player1 = Player();
gameboard.gameStart();