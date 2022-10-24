const gameboard = (() => {
    const gameArray = [];
    var clicked = () => {
        const buttons = document.querySelectorAll(".tile");
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                alert(button.id);
            });
        });
    };

    return {
        clicked,
    };

})();

gameboard.clicked();