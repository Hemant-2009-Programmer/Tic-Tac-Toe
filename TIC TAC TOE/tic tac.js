
let tic = {
					myTeam:0,
					oppTeam:0
};

let boxes = document.querySelectorAll(".gamebtn");
let win = document.querySelector(".win1");
let score1 = document.querySelector(".team2");
let score2 = document.querySelector(".team3");
let oturn = document.querySelector(".o");
let xturn = document.querySelector(".x");
let turn = 1;
let count = 0;
let oxTurn = 0;

const winPatten = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

function loadPage()	
{
	if(localStorage.getItem("tic") == null)
	{
		localStorage.setItem("tic",JSON.stringify(tic));
	}	
	else
	{	
		let p1 = document.querySelector('.team2'); 
		let p2 = document.querySelector('.team3'); 
		let tic = JSON.parse(localStorage.getItem("tic"));

		p1.innerHTML = tic.myTeam;
		p2.innerHTML = tic.oppTeam;
		oturn.innerHTML = "O Turn";
	}
}

function startGame(box)
{
	if (turn == 1) 
	{
		box.style.color = '#F5004F';
		box.innerHTML = "O";
		xturn.innerHTML = "X Turn";
		oturn.innerHTML = "";
		turn = 0;
	} 
	else 
	{
		box.style.color = '#5755FE';
		box.innerHTML = "X";
		oturn.innerHTML = "O Turn";
		xturn.innerHTML = "";
		turn = 1;
	}
	
	box.disabled = true;
	count++;
	
	let check = checkWinner();
	
	if (count == 9 && check != true) 
		gameDraw();
}

function gameDraw()
{
	win.innerHTML = 'Game was a Draw.';
	xturn.innerHTML = "";
	oturn.innerHTML = "";
	disableBoxes();
}

function disableBoxes()
{
	for (let i=0;i<boxes.length;i++)
	{
		box = boxes[i];
		box.disabled = true;
	}
}

function enableBoxes()
{
	for (let i=0;i<boxes.length;i++)
	{
		box = boxes[i];
		box.disabled = false;
		box.innerHTML = "";
	}
}

function checkWinner()
{
	for (let i=0;i<winPatten.length;i++) 
	{
		let pattern = winPatten[i];
		let pos1 = boxes[pattern[0]].innerHTML;
		let pos2 = boxes[pattern[1]].innerHTML;
		let pos3 = boxes[pattern[2]].innerHTML;

		if (pos1 != "" && pos2 != "" && pos3 != "")
		{
			if (pos1 == pos2 && pos2 == pos3) 
			{
				if(pos1 == 'O')
				{
					let tic = JSON.parse(localStorage.getItem("tic"));
					tic.myTeam++;
					score1.innerHTML = tic.myTeam; 
					win.innerHTML = 'WINNER YOU';
					xturn.innerHTML = "";
					oturn.innerHTML = "";
					localStorage.setItem("tic",JSON.stringify(tic));
					disableBoxes();
					boxes[pattern[0]].style.color = '#000000';
					boxes[pattern[1]].style.color = '#000000';
					boxes[pattern[2]].style.color = '#000000';
				}
				else if(pos1 == 'X')
				{
					let tic = JSON.parse(localStorage.getItem("tic"));
					tic.oppTeam++;
					score2.innerHTML = tic.oppTeam; 
					win.innerHTML = 'WINNER OPPONENT';
					xturn.innerHTML = "";
					oturn.innerHTML = "";
					localStorage.setItem("tic",JSON.stringify(tic));
					disableBoxes();
					boxes[pattern[0]].style.color = '#000000';
					boxes[pattern[1]].style.color = '#000000';
					boxes[pattern[2]].style.color = '#000000';
				}
				return true;
			}
		}
	}
}


function resetGame()
{
	count = 0;
	if(oxTurn == 0)
	{
		xturn.innerHTML = "X Turn";
		oturn.innerHTML = "";
		win.innerHTML = "";
		oxTurn = 1;
		turn = 0;
	}
	else 
	{
		oturn.innerHTML = "O Turn";
		xturn.innerHTML = "";
		win.innerHTML = "";
		oxTurn = 0;
		turn = 1;
	}
	enableBoxes();
}
