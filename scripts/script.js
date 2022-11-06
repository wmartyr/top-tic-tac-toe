const gameboard = (() => {
    var gameStarted = false;
    const gameArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var turn = "player1";

    const gameStart = () => {
        var playerChoice = player1.chooseToken();
        if (playerChoice === "X") {
            player2.setToken("O");
        } else {
            player2.setToken("X");
            turn = "player2";
        }
        const mainButton = document.querySelector(".main-button");
        mainButton.addEventListener("click", () => {
            if (!gameStarted) {
                playerChoice = player1.getToken();
                if (playerChoice === null) {
                    alert("Please make a choice");
                } else {
                    alert(`You chose ${playerChoice}`);
                    turn = initialTurn(playerChoice);
                    gameStarted = true;
                    clicked();
                };
            } else {
                boardReset();
                player1.reset();
                player2.reset();
                updateScoreboard(null);
                gameStarted = false;
            };
        });
    };

    // check when the tiles are clicked
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
                    winner = checkWin(playerChoice);
                    if (winner !== 0) {
                        alert(`${winner} wins game`);
                        boardReset();
                        updateScoreboard(playerChoice);
                    };
                }, 10);
            });
        });
    };

    // reset the game array and clear the board display
    const boardReset = () => {
        gameArray.forEach((element, index) => {
            gameArray[index] = 0;
        });

        const buttons = document.querySelectorAll(".tile");
        buttons.forEach((button) => {
            button.textContent = "";
        });
    };

    // check if a win condition exists
    const checkWin = (playerChoice) => {
        const win1 = gameArray.slice(0, 3).join("");
        const win2 = gameArray.slice(3, 6).join("");
        const win3 = gameArray.slice(6).join("");
        const win4 = gameArray[0] + gameArray[3] + gameArray[6];
        const win5 = gameArray[1] + gameArray[4] + gameArray[7];
        const win6 = gameArray[2] + gameArray[5] + gameArray[8];
        const win7 = gameArray[0] + gameArray[4] + gameArray[8];
        const win8 = gameArray[2] + gameArray[4] + gameArray[6];

        if ((win1 === "XXX" || win2 === "XXX" || win3 === "XXX" || win4 === "XXX" || win5 === "XXX" || win6 === "XXX" || win7 === "XXX" || win8 === "XXX") && (playerChoice === "X")) {
            player1.addScore();
            return "X";
        }
        if ((win1 === "OOO" || win2 === "OOO" || win3 === "OOO" || win4 === "OOO" || win5 === "OOO" || win6 === "OOO" || win7 === "OOO" || win8 === "OOO") && (playerChoice === "O")) {
            player1.addScore();
            return "O";
        }
        return 0;
    };

    // update the score display
    const updateScoreboard = (playerChoice) => {
        if (playerChoice === "X") {
            document.querySelector("#score-x").textContent = player1.getScore();
        } else if (playerChoice === "O") {
            document.querySelector("#score-o").textContent = player1.getScore();
        } else {
            document.querySelector("#score-x").textContent = "0";
            document.querySelector("#score-o").textContent = "0";
        }
    };

    // generate a random number for the computer move
    const randomAvailableTile = () => {
        var randInt;
        do {
            randInt = Math.floor(Math.random() * 9);
        } while (gameArray[randInt] !== 0)
        return randInt;
    };

    // since X always starts, return which player is X
    const initialTurn = (playerChoice) => {
        if (playerChoice === "X") {
            player2.setToken("O");
            return "player1";
        } else {
            player2.setToken("X");
            return "player2";
        }
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

    const setToken = (token) => {
        playerChoice = token;
    }

    const reset = () => {
        playerChoice = null;
        playerScore = 0;
    }

    return {
        chooseToken,
        getScore,
        addScore,
        getToken,
        setToken,
        reset,
    };

});

const player1 = Player();
const player2 = Player();
gameboard.gameStart();