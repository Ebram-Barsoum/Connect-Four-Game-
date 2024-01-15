'use strict'
export { game, current_player };
const current_player = document.getElementById('current-player');

let  game = {

    info : {
        currentPlayer: 'Red',
        boardHeight: 5,
        boardWidth: 6,
        
    },

    board : [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ],

    do :{
       
        print_board() {
            for (let i = 0; i <= game.info.boardHeight; i++){
                for (let j = 0; j <= game.info.boardWidth; j++){
                    const row = document.querySelector(`tr:nth-child(${i + 1})`);
                    const cell = row.querySelector(`td:nth-child(${j + 1}) button`);

                    if (game.board[i][j] === 'Red') {
                        cell.classList.add('custom-red');
                    }
                    else if(game.board[i][j] === 'Yellow'){
                        cell.classList.add('custom-yellow');
                    }
                    else {
                        cell.className = '';
                    }
                }
            }
        },

        drop_piece_to_bottom(column) {
           
            for (let i = game.info.boardHeight; i >= 0; i--){
                if (game.board[i][column] === 0) {
                    game.board[i][column] = game.info.currentPlayer;
                    return true;
                }
            }
            
            return false;
        },

        play_drop_sound() {
            const sound = document.createElement('audio');
            sound.src = '../audio/archivo.mp3';
        
            sound.play();
        },

        play_win_sound() {
            const sound = document.createElement('audio');
            sound.src = '../audio/archivo (1).mp3';
        
            sound.play();
        },
        play_gameOver_sound() {
            const sound = document.createElement('audio');
            sound.src = '../audio/negative_beeps-6008.mp3';
        
            sound.play();
        }
        ,
        change_player() {
            game.info.currentPlayer = (game.info.currentPlayer === 'Red') ? 'Yellow' : 'Red';
            current_player.innerText = game.info.currentPlayer;
        }
    },

    check: {
        is_game_over() {
            for (let i = 0; i <= game.info.boardHeight; i++){
                for (let j = 0; j <= game.info.boardWidth; j++){
                    if (!game.board[i][j]) return false;
                }
            }

            return true;
        },

        is_win_horizontally() {
            let connected = 1;
            for (let row = 0; row <= game.info.boardHeight; row++){
                for (let column = 0; column <= game.info.boardWidth - 3; column++){
                    
                    for (let index = column; index <= column + 2; index++){
                        if ((game.board[row][index] === game.board[row][index + 1])) {
                            if (game.board[row][index] != 0) {
                                connected++;
                            } 
                        }
                        else {
                            connected = 1;
                        }
                       
                    }
                    if (connected === 4) return true;
                    connected = 1;
                }
                
            }
           
            return false;
        },

        is_win_vertically() {
            let connected = 1;

            for (let column = 0; column <= game.info.boardWidth; column++){
                for (let row = 0; row <= game.info.boardHeight - 3; row++){

                    for (let index = row; index <= row + 2; index++){
                        if ((game.board[index][column] === game.board[index+1][column])) {
                            if (game.board[index][column] != 0) {
                                connected++;
                            } 
                        }
                        else {
                            connected = 1;
                        }
                    }

                    if (connected === 4) return true;
                    connected = 1;
                }
            }

            return false;
        },
        is_win_diagonal() {
            let connected = 1;

            for (let column = 0; column <= game.info.boardWidth - 3; column++){
                for (let row = 0; row <= game.info.boardHeight - 3; row++){

                    for (let index = 1; index <= 3; index++){
                        if ((game.board[row][column] === game.board[row+index][column+index])) {
                            if (game.board[row][column] != 0) {
                                connected++;
                            } 
                        }
                        else {
                            connected = 1;
                        }
                    }

                    if (connected === 4) return true;
                    connected = 1;
                }
            }

            for (let column = game.info.boardWidth; column >= game.info.boardWidth - 3; column--){
                for (let row = 0; row <= game.info.boardHeight - 3; row++){

                    for (let index = 1; index <= 3; index++){
                        if ((game.board[row][column] === game.board[row+index][column-index])) {
                            if (game.board[row][column] != 0) {
                                connected++;
                            } 
                        }
                        else {
                            connected = 1;
                        }
                    }

                    if (connected === 4) return true;
                    connected = 1;
                }
            }

            return false;
        }
    }
};




