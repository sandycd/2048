

var board=new Array();
var score=0;

var startX=0;
var startY=0;
var endX=0;
var endY=0;

var hasCoflicted=new Array();
$(document).ready(function(){
	prepareForMoblie();
	newgame();
	});
function prepareForMoblie(){
	
	if(documentWidth>500){
		gridContainerWidth=500;
		cellSpace=20;
		cellSideLength=100;
		}
	$('#grid-container').css('width',gridContainerWidth-2*cellSpace);
	$('#grid-container').css('height',gridContainerWidth-2*cellSpace);
	$('#grid-container').css('padding',cellSpace);
	$('#grid-container').css('border-radius',0.02*gridContainerWidth);
    
	$('.grid-cell').css('width',cellSideLength);
	$('.grid-cell').css('height',cellSideLength);
	$('.grid-cell').css('border-radius',0.02*cellSideLength);
   
	}

function newgame(){
	//初始化棋盘格
	init();
	//在棋盘上生成两个随机数
	generateOneNumber();
    generateOneNumber();
	}
function init(){
	for (var i=0;i<4;i++)
	 for(var j=0;j<4;j++)
	 {
		 var gridcell=$('#grid-cell-'+i+'-'+j); 	
		 gridcell.css('top',getPosTop(i,j));
		 gridcell.css('left',getPosLeft(i,j));
	 }
	 	for (var i=0;i<4;i++)
	 {
		 board[i]=new Array();
		 hasCoflicted[i]=new Array();
		 for(var j=0;j<4;j++){
			 board[i][j]=0;
			 hasCoflicted[i][j]=false;
			  }
	 }
	 updateBoardView();
	 score=0;
}

function updateBoardView(){
	$(".number-cell").remove();
	for(var i=0;i<4;i++)
	 for(var j=0;j<4;j++)
	 {
		
		 $("#grid-container").append( '<div class="number-cell" id="number-cell-'+i+'-'+j+'" ></div>');
		 var thenumberCell=$('#number-cell-'+i+'-'+j);
		 
	if(board[i][j]==0){
		    thenumberCell.css('width','0px');
			thenumberCell.css('height','0px');
			thenumberCell.css('top',getPosTop(i,j)+0.5*cellSideLength);
			thenumberCell.css('left',getPosLeft(i,j)+0.5*cellSideLength);
		}	 
    else{
			thenumberCell.css('width',cellSideLength);
			thenumberCell.css('height',cellSideLength);
			thenumberCell.css('top',getPosTop(i,j));
			thenumberCell.css('left',getPosLeft(i,j));
			thenumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
			thenumberCell.css('color',getNumberColor(board[i][j]));
			thenumberCell.text(board[i][j]);
		}	
		
		 hasCoflicted[i][j]=false;
	}	
	 $('.number-cell').css('line-height',cellSideLength+'px');
	 $('.number-cell').css('font-size',0.6*cellSideLength+'px');
}

function generateOneNumber(){

    if( nospace( board ) )
        return false;

    //随机一个位置
    var randx = parseInt( Math.floor( Math.random()  * 4 ) );
    var randy = parseInt( Math.floor( Math.random()  * 4 ) );

     var count=0; 
     var temporary=new Array();
     for(var i=0;i<4;i++) 
      for(var j=0;j<4;j++) { 
       if(board[i][j]==0) {
	   temporary[count]=i*4+j; count++;
	    } } 
		var pos= parseInt( Math.floor( Math.random() * count ) );
		 randx=Math.floor(temporary[pos]/4); 
		 randy=Math.floor(temporary[pos]%4);

    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation( randx , randy , randNumber );

    return true;
}


document.addEventListener('touchstart',function(event){
	startX=event.touches[0].pageX;
	startY=event.touches[0].pageY;
	});

document.addEventListener('touchmove',function(event){
		event.preventDefault();
	});

document.addEventListener('touchend',function(event){
	endX=event.changedTouches[0].pageX;
	endY=event.changedTouches[0].pageY;
	
	var deltaX=endX-startX;
	var deltaY=endY-startY;
	
	if(Math.abs(deltaX)<0.3*documentWidth&&Math.abs(deltaY)<0.3*documentWidth){
		 return;
		}
	if(Math.abs(endX-startX)>Math.abs(endY-startY)){
		//x
		if(deltaX>0){
			   if(moveright()){
			 setTimeout("generateOneNumber()",210);
			 setTimeout("isgameover()",300);}
			}
			else{			
				if(moveleft()){
			   setTimeout("generateOneNumber()",210);
			   setTimeout("isgameover()",300);}  
			}
		}
	else{
		//y
			if(deltaY<0){
			    if(moveup()){
			    setTimeout("generateOneNumber()",210);
				 setTimeout("isgameover()",300);}
				
				}
				else{
					if(movedown()){
			    setTimeout("generateOneNumber()",210);
				 setTimeout("isgameover()",300);}
					}
				
		}
	
	
	});

$(document).keydown(function(event){

	switch (event.keyCode){
		
		case 37://left
			event.preventDefault();
		if(moveleft()){
			   setTimeout("generateOneNumber()",210);
				 setTimeout("isgameover()",300);
			}
		break;
		case 38://up
			event.preventDefault();
		if(moveup()){
			    setTimeout("generateOneNumber()",210);
				 setTimeout("isgameover()",300);
			}
		break;
		case 39://right
			event.preventDefault();
		if(moveright()){
			 setTimeout("generateOneNumber()",210);
				 setTimeout("isgameover()",300);
			}
		break;
		case 40://down
			event.preventDefault();
		if(movedown()){
			    setTimeout("generateOneNumber()",210);
				 setTimeout("isgameover()",300);
			}
		break;
		default :
		break;
		
		
	}	
});

function isgameover(){
	if(nospace(board)&&nomove(board)){
		gameover();
		}
	}
function gameover(){
	alert("gameover!");
	
	}	
function nomove(board){
	if(canMoveLeft(board)||
	canMoveRight(board)||
	canMoveUp(board)||
	canMoveDown(board))
	return false;
return true;
	}

function moveleft(){
	if(!canMoveLeft(board))
		return false;
		
		
		//moveleft
		for(var i=0;i<4;i++)
		 for(var j=1;j<4;j++){
			 if(board[i][j]!=0){
				 for(var k=0;k<j;k++){
				 if(board[i][k]==0&&noBlockHorizontal(i,k,j,board)){
					 //move
					 showMoveAnimation(i,j,i,k);
					 board[i][k]=board[i][j];
					 board[i][j]=0;
					 continue;
					 }
				    else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)&&!hasCoflicted[i][k]){
					             //move
					 showMoveAnimation(i,j,i,k);
					 board[i][k]+=board[i][j];
					 board[i][j]=0;
					 score+=board[i][k]; 
					 updatescore(score);
					 hasCoflicted[i][k]=true;
								 //add
					 continue;
					 }
				 }
			}
		}
		setTimeout("updateBoardView()",200);
	return true;	
}
function moveright(){
	if(!canMoveRight(board))
		return false;
		
		
		//moveright
		for(var i=0;i<4;i++)
		 for(var j=2;j>=0;j--){
			 if(board[i][j]!=0){
				 for(var k=3;k>j;k--){
				 if(board[i][k]==0&&noBlockHorizontal(i,j,k,board)){
					 //move
					 showMoveAnimation(i,j,i,k);
					 board[i][k]=board[i][j];
					 board[i][j]=0;
					 continue;
					 }
				    else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)&&!hasCoflicted[i][k]){
					             //move
					 showMoveAnimation(i,j,i,k);
					 board[i][k]+=board[i][j];
					 board[i][j]=0; 
					 score+=board[i][k]; 
					 updatescore(score);
					 hasCoflicted[i][k]=true;
								 //add
					 continue;
					 }
				 }
			}
		}
		setTimeout("updateBoardView()",200);
	return true;	
}

function moveup(){
	if(!canMoveUp(board))
		return false;
		
		
		//moveup
		for(var j=0;j<4;j++)
		for(var i=1;i<4;i++){
			 if(board[i][j]!=0){
				 for(var k=0;k<i;k++){
				 if(board[k][j]==0&&noBlockVertical(j,k,i,board)){
					 //move
					 showMoveAnimation(i,j,k,j);
					 board[k][j]=board[i][j];
					 board[i][j]=0;
					 continue;
					 }
				    else if(board[k][j]==board[i][j]&&noBlockVertical(j,k,i,board)&&!hasCoflicted[k][j]){
					             //move
					 showMoveAnimation(i,j,k,j);
					 board[k][j]+=board[i][j];
					 board[i][j]=0; 
					 score+=board[k][j]; 
					 updatescore(score);
					 hasCoflicted[k][j]=true;
								 //add
					 continue;
					 }
				 }
			}
		}
		setTimeout("updateBoardView()",200);
	return true;	
}

function movedown(){
	if(!canMoveDown(board))
		return false;
		
		
		//moveright
		for(var j=0;j<4;j++)
		for(var i=2;i>=0;i--){
			 if(board[i][j]!=0){
				 for(var k=3;k>i;k--){
				 if(board[k][j]==0&&noBlockVertical(j,i,k,board)){
					 //move
					 showMoveAnimation(i,j,k,j);
					 board[k][j]=board[i][j];
					 board[i][j]=0;
					 continue;
					 }
				    else if(board[k][j]==board[i][j]&&noBlockVertical(j,i,k,board)&&!hasCoflicted[k][j]){
					             //move
					 showMoveAnimation(i,j,k,j);
					 board[k][j]+=board[i][j];
					 board[i][j]=0; 
					 score+=board[k][j]; 
					 updatescore(score);
					 hasCoflicted[k][j]=true;
								 //add
					 continue;
					 }
				 }
			}
		}
		setTimeout("updateBoardView()",200);
	return true;	
}