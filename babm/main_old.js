var listValueNodes = [17, 16, 4, 2, 13, 15, 12, 19, 5, 10];
//
var counter = function() {
	count = 1;
	//
	return function() {
		return count++;
	}
}();
//
function Node(valueArg) {
	this.number = counter();
	this.value = valueArg;
	this.parent = null;
	this.leftChild = null;
	this.rightChild = null;
}
//
var firstNode = new Node(8, null);
var allNode = [firstNode];
//
function Add(node) {
	var tmp = firstNode;
	for(var i = 0; ; i++) {
		if(node.value < tmp.value) {
			if(tmp.leftChild != null) {
				tmp = tmp.leftChild;
			} else {
				tmp.leftChild = node;
				tmp.leftChild.parent = tmp;
				return allNode[allNode.length] = node;
			}
		} else if(node.value >= tmp.value) {
			if(tmp.rightChild != null) {
				tmp = tmp.rightChild;
			} else {
				tmp.rightChild = node;
				tmp.rightChild.parent = tmp;
				return allNode[allNode.length] = node;
			}
		}
	}
}
//
function SearchNode(value) {
	var tmp = firstNode;
	while(true) {
		if(value < tmp.value) {
			if(tmp.leftChild != null) {
				tmp = tmp.leftChild;
			}
			//
			if(value == tmp.value) {
				return tmp;
			} else if(tmp.leftChild == null) {
				return null;
			}
		} else if(value >= tmp.value) {
			if(tmp.rightChild != null) {
				tmp = tmp.rightChild;
			}
			//
			if(value == tmp.value) {
				return tmp;
			} else if(tmp.rightChild == null) {
				return null;
			}
		}
	}
}
//
function MaxNode() {
	var tmp = firstNode;
	for(var i = 0; ; i++) {
		if(tmp.rightChild != null) {
			tmp = tmp.rightChild;
		} else {
			return tmp;
		}
	}
}
//
function Delete(number) {
	var deletingNode = SearchNode(number);
	var tmp = SearchNode(number);
	//
	if(firstNode.value == number) {
		tmp = firstNode.rightChild;
		//
		while(tmp.leftChild != null) {
			tmp = tmp.leftChild;
		}
		//
		firstNode.value = tmp.value;
		tmp.parent.leftChild = null;
		tmp.parent.rightChild = tmp.rightChild;
		return firstNode;
	} else if(tmp != null) {
		if(tmp.rightChild != null) {
			tmp = tmp.rightChild;
			while(true) {
				if(tmp.leftChild != null) {
					tmp = tmp.leftChild;
				} else if(tmp.leftChild == null && tmp.rightChild != null) {
					tmp = tmp.rightChild;
				} else {
					deletingNode.value = tmp.value;
					if(deletingNode.leftChild.value == tmp.value) {
						deletingNode.leftChild = null;
						break;
					} else if(deletingNode.rightChild.value == tmp.value) {
						deletingNode.rightChild = null;
						break;
					}
				}
			}
			//
			return firstNode;
		} else if(tmp.leftChild != null && tmp.rightChild == null) {
			tmp = tmp.leftChild;
			while(true) {
				if(tmp.leftChild != null) {
					tmp = tmp.leftChild;
				} else if(tmp.leftChild == null && tmp.rightChild != null) {
					tmp = tmp.rightChild;
				} else {
					deletingNode.value = tmp.value;
					tmp.parent.leftChild = null;
					break;
				}
			}
		} else if(tmp.leftChild == null && tmp.rightChild == null) {
			if(tmp.parent.leftChild.value == tmp.value) {
				tmp.parent.leftChild = null;
			} else if(tmp.parent.rightChild.value == tmp.value) {
				tmp.parent.rightChild = null;
			}
			//
			tmp.parent = null;
		}
	} else {
		return "failed to remove :(";
	}
}
//
function Detour() {
	var arrayValueNodes = [];
	//
	function ReverseBypass(node) {
		var tmp = node;
		while(tmp.parent != firstNode) {
			arrayValueNodes[arrayValueNodes.length] = tmp.value;
			tmp = tmp.parent;
			//
			if(tmp.rightChild != null) {
				arrayValueNodes[arrayValueNodes.length] = tmp.
														  rightChild.
														  value;
				if(tmp.rightChild.leftChild != null) {
					var tmpDeep = tmp.rightChild;
					//
					while(tmpDeep.leftChild != null) {
						arrayValueNodes[arrayValueNodes.length] = tmpDeep.value;
						arrayValueNodes[arrayValueNodes.length] = tmp.value;
						tmpDeep = tmpDeep.leftChild;
					}
				}
			}
		}
		arrayValueNodes[arrayValueNodes.length] = tmp.value;
	}
	//
	ReverseBypass(function() {
		var tmp = firstNode;
		for(var i = 0; ; i++) {
			if(tmp.leftChild != null) {
				tmp = tmp.leftChild;
			} else {
				return tmp; 
			}
		}
	}());
	//
	ReverseBypass(function() {
		var tmp = firstNode.rightChild;
		for(var i = 0; ; i++) {
			if(tmp.leftChild != null) {
				tmp = tmp.leftChild;
			} else {
				return tmp; 
			}
		}
	}());
	//
	arrayValueNodes[arrayValueNodes.length] = firstNode.value;
	return arrayValueNodes;
}
//
for(var i = 0; i < listValueNodes.length; i++) {
	Add(new Node(listValueNodes[i]));
}
//
console.log(allNode);
console.log(firstNode);