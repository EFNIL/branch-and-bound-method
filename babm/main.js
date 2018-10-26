(function () {
	var inputMatrix = [[0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0], 
						[0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0], 
						[0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1], 
						[0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0]]; 
	var costTList = [4, 6, 8, 3];
	var probabilityYList = [0.083, 0.096, 0.12, 0.09, 0.076, 0.07, 0.1, 0.05, 0.07, 0.093, 0.075, 0.077];
	//
	// var inputMatrix = [[0, 0, 1, 1, 0, 0], 
	// 				[0, 1, 0, 1, 0, 1], 
	// 				[0, 0, 0, 0, 1, 1]];
	// var costTList = [5, 4, 9];
	// var probabilityYList = [0.1, 0.1, 0.025, 0.025, 0.5, 0.2];
	//
	function CheckTable() {
		var l = inputMatrix[0].length;
		for(var i = 0; i < inputMatrix.length; i++) {
			if(l != inputMatrix[i].length) {
				throw new Error("Different length Y");
			}
		}
		//
		if(l != probabilityYList.length) {
			throw new Error("Different length probability");
		}
		//
		if(inputMatrix.length != costTList.length) {
			throw new Error("The length of the cost does not match the quantity T");
		}
	} CheckTable();
	//
	function TestMinimumT() {
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
			for(var i = 0; i < inputMatrix.length; i++) {
				var rP = 0.0;
				var lP = 0.0;
				//
				for(var k = 0; k < inputMatrix[i].length; k++) {
					if(inputMatrix[i][k] == 0) {
						lP += probabilityYList[k];
					} else if(inputMatrix[i][k] == 1) {
						rP += probabilityYList[k];
					}
				}
				//
				if(minT > CoutBranch(costTList[i], lP, rP)) {
					minT = CoutBranch(costTList[i], lP, rP);
					indexMinT = i;
				}
				tNode[i].deltaCoat = CoutBranch(costTList[i], lP, rP);
				console.log(("T" + (i + 1) + " ") + CoutBranch(costTList[i], lP, rP));
			}
			console.log("Min T: " + (indexMinT + 1) + "     |" + minT);
		} TestCout();
	}
	//
	var counterT = function() {
		count = 1;
		//
		return function() {
			return count++;
		}
	}();
	//
	var counterY = function() {
		count = 1;
		//
		return function() {
			return count++;
		}
	}();
	//
	function NodeT() {
		this.number = counterT();
		this.name = "T" + this.number;
		this.deltaCoat = 0.0;
		this.parent = null;
		this.leftChild = [];
		this.rightChild = [];
	}
	//
	function NodeY() {
		this.number = counterY();
		this.name = "Y" + this.number;
		this.deltaCoat = 0.0;
		this.parent = null;
		this.leftChild = [];
		this.rightChild = [];
	}
	//
	function AddNodeT(node) {
		for(var i = 0; i < inputMatrix.length; i++) {
			tNode[i] = new NodeT();
		}
	}
	//
	var tNode = [];
	AddNodeT();
	TestMinimumT();
	tNode.sort(function(a, b) { return a.deltaCoat - b.deltaCoat; });
	//
	root = tNode[0];
	console.log(tNode);
	for(var i = 0; i < inputMatrix[root.number - 1].length; i++) {
		if(inputMatrix[root.number - 1][i] == 0) {
			root.leftChild[root.leftChild.length] = new NodeY();
		} else if(inputMatrix[root.number - 1][i] == 1) {
			root.rightChild[root.rightChild.length] = new NodeY();
		} 
	}
	//
	console.log(root);
}());