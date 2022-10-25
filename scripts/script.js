const gameboard = (() => {
    const gameArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const clicked = (playerToken) => {
        const buttons = document.querySelectorAll(".tile");
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                alert(button.id);
                gameArray[button.id] = playerToken;
                updateTile(playerToken, button);
            });
        });
    };

    const updateTile = (player, button) => {
        
        if (player === "x") {
            button.textContent = "X";
        } else {
            button.textContent = "O";
        }
    }


    return {
        clicked,
    };

})();

gameboard.clicked("o");