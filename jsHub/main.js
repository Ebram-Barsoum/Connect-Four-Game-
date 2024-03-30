'use strict'
import { game, current_player } from './game.js'
const playSound = '../audio/play.mp3';
const winSound = '../audio/win.mp3';
const gameOverSound = '../audio/gameOver.mp3';

const popupMsg = document.getElementById('msg'),
    layout = document.getElementById('layout');

function reset_game() {
    game.board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ];
    game.do.print_board();
}

(function set_board_id() {
    for (let i = 0; i <= game.info.boardHeight; i++) {
        for (let j = 0; j <= game.info.boardWidth; j++) {
            const row = document.querySelector(`tr:nth-child(${i + 1})`);
            const cell = row.querySelector(`td:nth-child(${j + 1}) button`);

            cell.setAttribute('id', `${i}-${j}`)

        }
    }
})();

(function set_current_player() {
    current_player.innerText = game.info.currentPlayer;
})();

function show_popUp(msg) {
    popupMsg.innerText = msg;
    layout.classList.replace('d-none', 'd-block');
}

function hide_popUp() {
    msg.innerText = "";
    layout.classList.replace('d-block', 'd-none');
}

const buttons = document.querySelectorAll('button');
for (let button of buttons) {
    button.addEventListener('click', (e) => {


        const [, pos_y] = e.target.getAttribute('id').split('-');

        if (game.do.drop_piece_to_bottom(pos_y)) {
            game.do.play_sound(playSound);
            game.do.print_board();

            if (game.check.is_win_horizontally() || game.check.is_win_vertically() || game.check.is_win_diagonal()) {
                game.do.play_sound(winSound);
                const msg = `${game.info.currentPlayer} Won`;
                show_popUp(msg);
            }
            else if (game.check.is_game_over()) {
                const msg = 'The Game Is Over !';
                show_popUp(msg);
                game.do.play_sound(gameOverSound);
            }
            game.do.change_player();
        }
    });

}

const newGame_btn = document.getElementById('newGame-btn');
newGame_btn.addEventListener('click', () => {
    reset_game();
    hide_popUp();
})


