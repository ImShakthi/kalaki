var BaseHandlerUtil = {
	init : function() {
		console.log("init....");
		try{
			$(document).ready(function() {
				
				$('textarea').each(function(i, block) {
				    hljs.highlightBlock(block);
				  });
				
				
				$("textarea").keydown(function(e) {
				    if(e.keyCode === 9) { // tab was pressed
				        // get caret position/selection
				        var start = this.selectionStart;
				            end = this.selectionEnd;

				        var $this = $(this);

				        // set textarea value to: text before caret + tab + text after caret
				        $this.val($this.val().substring(0, start)
				                    + "\t"
				                    + $this.val().substring(end));

				        // put caret at right position again
				        this.selectionStart = this.selectionEnd = start + 1;

				        // prevent the focus lose
				        return false;
				    }
				});
			});
		} catch(e){
			alert("Error in adding listen" + e);
			console.log("Error in adding listen", e);
		}
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

			try {
				evalJS = eval(js);
			} catch (err) {
				alert("Error JS block " + err);
			}

			var params = {};
			params.css = css;
			params.js = js;
			params.html = html;

			BaseHandlerUtil.appendToHead(params);
			BaseHandlerUtil.appendToBody(params);

		} catch (e) {
			alert(e);
			console.log(e);
		}
	},

	appendToHead : function(params) {
		try {
			var renderDiv = document.getElementById("renderDiv");
			var renderDOM = (renderDiv.contentDocument || renderDiv.contentWindow);

			var head = renderDOM.head || renderDOM.getElementsByTagName('head')[0];

			head.innerHTML = "";

			var meta = document.createElement('meta');
			meta['httpEquiv'] = 'Content-Type';
			head.appendChild(meta);

			var style = document.createElement('style');
			style.type = 'text/css';
			var css = params.css;
			if (style.styleSheet) {
				style.styleSheet.cssText = css;
			} else {
				style.appendChild(document.createTextNode(css));
			}
			head.appendChild(style);

			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.textContent = params.js;
			head.appendChild(script);

		} catch (e) {
			alert(e);
			console.log(e);
		}
	},
	appendToBody : function(params) {
		try {
			var renderDiv = document.getElementById("renderDiv");
			var renderDOM = (renderDiv.contentDocument || renderDiv.contentWindow);

			var body = renderDOM.body || renderDOM.getElementsByTagName('body')[0];

			body.innerHTML = "";

			var div = document.createElement('div');
			div.id = 'mainDiv';
			div.innerHTML = params.html;
			body.appendChild(div);

		} catch (e) {
			alert(e);
			console.log(e);
		}
	}
};

BaseHandlerUtil.init();