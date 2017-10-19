const path = require('path');

//Credits: http://snipplr.com/view/36790/jscookies--my-simple-easy-pure-js-javascript-cookies-function/
var jsCookies = {
	get: function(c_name) {
		if (document.cookie.length > 0) {
			var c_start = document.cookie.indexOf(c_name + "=");
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1;
				var c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1) {
					c_end = document.cookie.length;
				}
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	},
	set: function(c_name, value, expiredays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : "; expires=" + exdate.toUTCString());
	}
};

var theme = {
  toggleDark: function(){
    document.body.classList.toggle('darkTheme');

    if(document.body.classList.contains('darkTheme')){
      document.querySelector('.toggleDark').checked = true;
      jsCookies.set("toggleDark","1",365);
    }else{
      document.querySelector('.toggleDark').checked = false;
      jsCookies.set("toggleDark","0",365);
    }
  },
  injectToggleDark: function(){
    //Create the html fragment for toggle
    var darkFrag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = `
      <paper-item role="checkbox" class="style-scope wb-settings" tabindex="0" aria-disabled="false" aria-checked="true">

          <div class="item-description style-scope wb-settings">
              <h2 class="style-scope wb-settings">Dark Theme</h2>
              <p class="style-scope wb-settings">Enable Dark Theme</p>
          </div>
          <paper-toggle-button tabindex="-1" class="style-scope wb-settings toggleDark" role="button" aria-pressed="true" style="touch-action: pan-y;" toggles="" aria-disabled="false" checked="" active=""></paper-toggle-button>
      </paper-item>
    `;
    while (temp.firstChild) {
        darkFrag.appendChild(temp.firstChild);
    }

    //inject toggle into dropdown style-scope wb-settings
    document.querySelector('#settingsComponent .content').appendChild(darkFrag);

    //check dark theme cookie
    if(jsCookies.get("toggleDark") == "1" ){
      theme.toggleDark();
    }
  }
}

module.exports = (Franz) => {
  const getMessages = function getMessages() {
    let count = 0;

    const elements = document.querySelectorAll('.unreadCount');
    for (let i = 0; i < elements.length; i += 1) {
      if (parseInt(elements[i].innerHTML, 10) !== 0) {
        count += 1;
      }
    }

    Franz.setBadge(count);
  };

  Franz.injectCSS(path.join(__dirname, 'service.css'));
  Franz.loop(getMessages);

  // inject dark theme toggle
  theme.injectToggleDark();

  //onclick update toggle and set theme
  document.querySelector('.toggleDark').onclick = function(e){
    theme.toggleDark();
  };
};
