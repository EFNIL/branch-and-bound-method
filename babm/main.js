var inputMatrix1 = [[0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0], 
					[0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0], 
					[0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1], 
					[0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0]]; 
var costTList1 = [4, 6, 8, 3];
var probabilityYList1 = [0.083, 0.096, 0.12, 0.09, 0.076, 0.07, 0.1, 0.05, 0.07, 0.093, 0.075, 0.077];
//
var inputMatrix2 = [[0, 0, 1, 1, 0, 0], 
				[0, 1, 0, 1, 0, 1], 
				[0, 0, 0, 0, 1, 1]];
var costTList2 = [5, 4, 9];
var probabilityYList2 = [0.1, 0.1, 0.025, 0.025, 0.5, 0.2];
//
BranchBoundMethod(inputMatrix2, costTList2, probabilityYList2);
BranchBoundMethod(inputMatrix1, costTList1, probabilityYList1);
//
//
function BranchBoundMethod(inputMatrix, costTList, probabilityYList) {
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
	function NodeT(indexTable, coatT) {
		this.indexTable = indexTable;
		this.name = "T" + (this.indexTable + 1);
		this.deltaCoat = coatT;
	}
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
				tNode[i] = new NodeT(i, CoutBranch(costTList[i], lP, rP));
			}
		} TestCout();
	}
	//
	var tNode = [];
	TestMinimumT();
	tNode.sort(function(a, b) { return a.deltaCoat - b.deltaCoat; });
	console.log(tNode);
	//
	function Node(coatT) {
		this.indexTable = null;
		this.indexSortT = null;
		this.deltaCoat = coatT;
		this.name = null;
		//
		this.parent = null;
		this.allY = null;
		this.leftChild = null;
		this.leftY = [];
		this.rightChild = null;
		this.rightY = [];
	}
	//
	function CreateTree() {
		var coatYListText = [];
		var coatY = [];
		var root = new Node(tNode[0].deltaCoat);
		root.indexTable = tNode[0].indexTable;
		root.indexSortT = 0;
		root.name = "T" + (root.indexTable + 1);
		//
		var listNode = [root];
		for(var i = 0; i < listNode.length; i++) {
			if(i == 0) {
				for(var k = 0; k < inputMatrix[listNode[0].indexTable].length; k++) {
					if(inputMatrix[listNode[0].indexTable][k] == 0) {
						listNode[0].leftY[listNode[0].leftY.length] = k;
					} else if(inputMatrix[listNode[0].indexTable][k] == 1) {
						listNode[0].rightY[listNode[0].rightY.length] = k;
					}
				}
			} else {
				for(var a = 0; a < listNode[i].allY.length; a++) {
					if(inputMatrix[listNode[i].indexTable][listNode[i].allY[a]] == 0) {
						listNode[i].leftY[listNode[i].leftY.length] = listNode[i].allY[a];
					} else if(inputMatrix[listNode[i].indexTable][listNode[i].allY[a]] == 1) {
						listNode[i].rightY[listNode[i].rightY.length] = listNode[i].allY[a];
					}
				}
			}
			//
			if(listNode[i].leftY.length > 1) {
				var tempNode = new Node();
				tempNode.parent = listNode[i];
				tempNode.indexSortT = tempNode.parent.indexSortT + 1;
				tempNode.indexTable = tNode[tempNode.indexSortT].indexTable;
				tempNode.name = tNode[tempNode.indexSortT].name;
				tempNode.parent.leftChild = tempNode;
				tempNode.allY = tempNode.parent.leftY;
				tempNode.deltaCoat = tNode[tempNode.indexSortT].deltaCoat + 
													tempNode.parent.deltaCoat;
				listNode[listNode.length] = tempNode;
			} else {
				coatYListText[coatYListText.length]  = ("Y" + (listNode[i].leftY[0] + 1) + " | ") + 
							probabilityYList[listNode[i].leftY[0]] * listNode[i].deltaCoat;
				coatY[coatY.length]  = 
						probabilityYList[listNode[i].leftY[0]] * listNode[i].deltaCoat;
			}
			//
			if(listNode[i].rightY.length > 1) {
				var tempNode = new Node();
				tempNode.parent = listNode[i];
				tempNode.indexSortT = tempNode.parent.indexSortT + 1;
				tempNode.indexTable = tNode[tempNode.indexSortT].indexTable;
				tempNode.name = tNode[tempNode.indexSortT].name;
				tempNode.parent.rightChild = tempNode;
				tempNode.allY = tempNode.parent.rightY;
				tempNode.deltaCoat = tNode[tempNode.indexSortT].deltaCoat + 
													tempNode.parent.deltaCoat;
				listNode[listNode.length] = tempNode;
			} else {
				coatYListText[coatYListText.length]  = ("Y" + (listNode[i].rightY[0] + 1) + " | ") + 
							probabilityYList[listNode[i].rightY[0]] * listNode[i].deltaCoat;
				coatY[coatY.length]  = 
						probabilityYList[listNode[i].rightY[0]] * listNode[i].deltaCoat;
			}
		}
		//
		function CalculateCoatTree() {
			var result = 0;
			for(var i = 0; i < coatY.length; i++)
				result += coatY[i];
			return result;
		}
		//
		console.log(root);
		console.log(coatYListText);
		console.log(coatY);
		console.log(CalculateCoatTree());
		console.log("\n\n\n\n")
	} CreateTree();
}