//Расчёт разницы стоимости для корня
(function () {
	var t1List = [0, 0, 1, 1, 0, 0];
	var t2List = [0, 1, 0, 1, 0, 1];
	var t3List = [0, 0, 0, 0, 1, 1];
	var tAllList = [t1List, t2List, t3List]; 
	var costList = [5, 4, 9];
	var pList = [0.1, 0.1, 0.025, 0.025, 0.5, 0.2];
	//
	var counter = function() {
		count = 1;
		//
		return function() {
			return count++;
		}
	}();
	//
	function CoutBranch(indexCT, rightP, leftP) {
		var rightBranch = indexCT * rightP;
		var leftBranch = indexCT * leftP;
		console.log("Coat sum: " + (rightBranch + leftBranch));
		return Math.abs(rightBranch - leftBranch);
	}
	//
	function TestCout() {
		for(var i = 0; i < tAllList.length; i++) {
			var rP = 0.0;
			var lP = 0.0;
			//
			for(var k = 0; k < tAllList[i].length; k++) {
				if(tAllList[i][k] == 0) {
					lP += pList[k];
				} else if(tAllList[i][k] == 1) {
					rP += pList[k];
				}
			}
			//
			console.log(("T" + i + " ") + CoutBranch(costList[i], lP, rP));
		}
	} TestCout();
}());