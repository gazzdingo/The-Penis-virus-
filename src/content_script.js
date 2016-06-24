// var script = document.createElement('script');
// script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);

var mainLoopId = setInterval(function(){
    // Do your update stuff...
    walk(document.body);

}, 40);

var nodesWalked = [];


function walk(node)
{
	// I stole this function from here:
	// http://is.gd/mwZp7E

	var child, next;

	switch ( node.nodeType )
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child )
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
      // Don't rewalk a text node as shuffling becomes constant due to loop
      if(nodesWalked.indexOf(node) == -1){
         nodesWalked.push(node);
			   handleText(node);
      }
			break;
	}
}
//shuffles internal characters not including the first and last letter
String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 2; i > 1; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        if(j == n -1) {
           j == n - 2;
        }
        if(j == 0) {
           j = 1;
        }
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}
//Shuffles each word seperately
var ll = 0;
String.prototype.SplitShuffle = function () {
    var a = this.split(" "),
        n = a.length;
    for (var i = 0; i < n; i++) {
      if(ll == 30) {
        ll = 0
        a[i] = a[i].shuffle();
      }
      ll++;
    }
    return a.join(" ");
}


function handleText(textNode)
{
	var v = textNode.nodeValue;

	v = v.replace(/(the[\s]*)\S+\b/gi, "$1penis");
  v = v.replace(/delete/gi, "alt-f4");

  v = v.SplitShuffle();

	textNode.nodeValue = v;
}
