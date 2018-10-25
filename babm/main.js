//Расчёт разницы стоимости для корня
(function () {
	var t1List = [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0];
	var t2List = [0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0];
	var t3List = [0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1];
	var t4List = [0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0];
	var tAllList = [t1List, t2List, t3List, t4List]; 
	var costList = [4, 6, 8, 3];
	var pList = [0.083, 0.096, 0.12, 0.09, 0.076, 0.07, 0.1, 0.05, 0.07, 0.093, 0.075, 0.077];
	//
	function CoutBranch(indexCT, rightP, leftP) {
		var rightBranch = indexCT * rightP;
		var leftBranch = indexCT * leftP;
		return Math.abs(rightBranch - leftBranch);
	}
	//
	function TestCout() {
		var minT = Infinity;
		var indexMinT = undefined;
		//
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
			if(minT > CoutBranch(costList[i], lP, rP)) {
				minT = CoutBranch(costList[i], lP, rP);
				indexMinT = i;
			}
			console.log(("T" + (i + 1) + " ") + CoutBranch(costList[i], lP, rP));
		}
		console.log("Min T: " + (indexMinT + 1) + "     |" + minT);
	} TestCout();
}());