const gameboard = (() => {
    const gameArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    const gameStart = (playerToken) => {
        clicked(playerToken);
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
        if (player === "x") {
            button.textContent = "X";
        } else {
            button.textContent = "O";
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

gameboard.gameStart("o");