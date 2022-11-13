const gameboard = (() => {
    let gameStarted = false;
    let gameArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let startingPlayer = "player1";
    let turnCount = 0;
    let player1Choice;
    let player2Choice;
    let winner = 0;

    const gameStart = () => {
        const mainButton = document.querySelector(".main-button");
        mainButton.textContent = "CHOOSE TOKEN";
        player1.chooseToken(gameStarted);
        clicked();
        mainButton.addEventListener("mouseup", () => {
            if (!gameStarted) {
                player1Choice = player1.getToken();
                if (player1Choice === null) {
                    popUp("Please choose a token");
                } else {
                    startingPlayer = initialTurn(player1Choice);
                    player2Choice = player2.getToken();
                    gameStarted = true;
                    mainButton.textContent = "RESTART";
                    if (startingPlayer === "player2") {
                        player2Move();
                    }
                };
            } else {
                boardReset();
                player1.reset();
                player2.reset();
                updateScoreboard(null);
                turnCount = 0;
                gameStarted = false;
                mainButton.textContent = "CHOOSE TOKEN";
            };
        });
    };

    // check when the tiles are clicked
    const clicked = () => {
        winner = 0;
        const buttons = document.querySelectorAll(".tile");

        buttons.forEach((button) => {
            button.addEventListener("mouseup", () => {
                // const player1Choice = player1.getToken();
                const clickedTile = button.id.substring(4);
                // check if button has been clicked and update if not
                if (gameStarted) {
                    if (gameArray[clickedTile] === 0) {
                        gameArray[clickedTile] = player1Choice;
                        button.textContent = player1Choice;
                        turnCount++;
                    };
                    setTimeout(() => {
                        winner = checkWin(player1Choice);
                        if (winner !== 0) {
                            winAction(winner, player1Choice);
                        } else {
                            if (turnCount === 9) {
                                drawAction();
                            } else {
                                player2Move();
                            }
                        };
                    }, 10);
                }
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

    // check if a win condition exists, adds to the player's score, and returns X, O, or 0
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
            player2.addScore();
            return "O";
        }
        return 0;
    };

    const winAction = (winner, playerChoice) => {
        popUp(`${winner} wins game`);
        setTimeout(() => {
            boardReset();
            updateScoreboard(playerChoice);
            turnCount = 0;
            if (startingPlayer === "player2") {
                player2Move();
            }
        }, 1500);
    };

    const drawAction = () => {
        popUp("Draw");
        setTimeout(() => {
            boardReset();
            turnCount = 0;
            if (startingPlayer === "player2") {
                player2Move();
            }
        }, 1500);
    };

    // update the score display of the winner playerChoice
    const updateScoreboard = (playerChoice) => {
        if (playerChoice === "X") {
            document.querySelector("#score-x").textContent = player1.getScore();
        } else if (playerChoice === "O") {
            document.querySelector("#score-o").textContent = player2.getScore();
        } else {
            document.querySelector("#score-x").textContent = "0";
            document.querySelector("#score-o").textContent = "0";
        }
    };

    // generate a random number based on the available numbers for the computer move
    const randomAvailableTile = () => {
        var randInt;
        do {
            randInt = Math.floor(Math.random() * 9);
        } while (gameArray[randInt] !== 0)
        return randInt;
    };

    // since X always starts, return which player is X, and set the other player's token
    const initialTurn = (playerChoice) => {
        if (playerChoice === "X") {
            player2.setToken("O");
            return "player1";
        } else {
            player2.setToken("X");
            return "player2";
        }
    };

    // player 2 random actions 
    const player2Move = () => {
        const randomTile = randomAvailableTile();
        const buttonId = "#tile" + randomTile.toString();
        const tile = document.querySelector(buttonId);
        gameArray[randomTile] = player2Choice;
        tile.textContent = player2Choice;
        turnCount++;
        setTimeout(() => {
            winner = checkWin(player2Choice);
            if (winner !== 0) {
                winAction(winner, player2Choice);
            } else {
                if (turnCount === 9) {
                    drawAction();
                }
            };
        }, 10);
    };

    const popUp = (message) => {
        const modal = document.querySelector(".modal-background");
        const messageLine = document.querySelector("#message-line");
        modal.style.display = "block";
        messageLine.textContent = message;
        setTimeout(() => {
            modal.style.display = "none";
        }, 1500);
    };

    return {
        gameStart,
    };
})();

const Player = (() => {
    var playerScore = 0;
    var playerChoice = null;
    const playerTokens = document.querySelectorAll(".player-token");
    const xButton = document.querySelector("#X");
    const oButton = document.querySelector("#O");
    const mainButton = document.querySelector(".main-button");

    const chooseToken = (gameStarted) => {
        playerTokens.forEach((playerToken) => {
            playerToken.addEventListener("mouseup", () => {
                if (playerChoice !== null && playerChoice !== playerToken.id) {
                    if (playerChoice === "X") {
                        xButton.classList.remove("chosen-token");
                    } else {
                        oButton.classList.remove("chosen-token");
                    }
                }
                playerChoice = playerToken.id;
                if (!gameStarted) {
                    playerToken.classList.add("chosen-token");
                }
                mainButton.textContent = "START";
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
        const token = document.querySelector("#" + playerChoice);
        token.classList.remove("chosen-token");
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