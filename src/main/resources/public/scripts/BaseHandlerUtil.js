var BaseHandlerUtil = {
	init : function() {
		$(document).delegate('#textbox', 'keydown', function(e) { 
			  var keyCode = e.keyCode || e.which; 

			  if (keyCode == 9) { 
			    e.preventDefault(); 
			    var start = $(this).get(0).selectionStart;
			    var end = $(this).get(0).selectionEnd;

			    // set textarea value to: text before caret + tab + text after caret
			    $(this).val($(this).val().substring(0, start)
			                + "\t"
			                + $(this).val().substring(end));

			    // put caret at right position again
			    $(this).get(0).selectionStart = 
			    $(this).get(0).selectionEnd = start + 1;
			  } 
			});
	},
	onClick : function() {
//		d3.selectAll("p").style("color", "#" + BaseHandlerUtil.getRandomColor());
	},
	getRandomColor : function() {
		var colorCode = "";
		for (var index = 0; index < 6; index++) {
			rand = Math.floor(Math.random() * 10);
			colorCode = rand + colorCode;
		}
		return colorCode;
	},
	clickButtonFn : function() {
		new Ajax.Request('/hello', {
			method : 'get',
			onSuccess : function(transport) {
				var response = transport.responseText || "no response text";
				console.log(response);
			},
			onFailure : function() {
				console.log('Something went wrong...');
			}
		});

	},

	saveSandbox : function() {

		BaseHandlerUtil.saveSandbox();
	},
	runSandbox : function() {
		try {

			var html = document.getElementById('htmlText').value;
			var css = document.getElementById('cssText').value;
			var js = document.getElementById('jsText').value;

			console.log("HTML ", html);
			console.log("CSS ", css);
			console.log("JS ", js);

			var cssBuffer = " <style> " + css + " </style> ";
			var jsBuffer = " <script type=\"text/javascript\"> " + js + " </script> ";

			var buffer = "";
			buffer = "<div> " + cssBuffer + jsBuffer + html + " </div> ";
			console.log(buffer);
			try {
				evalJS = eval(js);
			} catch (err) {
				alert("Error JS block " + err);
			}

			document.getElementById('renderDiv').innerHTML = buffer;
		} catch (e) {
			alert(e);
			console.log(e);
		}
	}
};

BaseHandlerUtil.init();