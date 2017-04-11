
function showNumberWithAnimation( i,j,randNumber){
	
	var numbercell=$('#number-cell-'+i+"-"+j);
	
	numbercell.css('background-color',getNumberBackgroundColor(randNumber));
	numbercell.css('color',getNumberColor(randNumber));
	numbercell.text(randNumber);
	
	numbercell.animate({
		width:cellSideLength,
		height:cellSideLength,
		top:getPosTop(i,j),
		left:getPosLeft(i,j),
	},50);
	}

function showMoveAnimation(fromx,fromy,tox,toy){
	var numbercell=$('#number-cell-'+fromx+'-'+fromy)
	  numbercell.animate({
		  top:getPosTop(tox,toy),
		  left:getPosLeft(tox,toy)
		  },200);
	}