(function() {

    var jsoncontent;
    var ipsumType = 'paragraph';
    
    
    var request = new XMLHttpRequest();
    request.open('GET', 'content/content.json?', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            jsoncontent = JSON.parse(request.responseText);
            
            if((jsoncontent !== null) || (( typeof jsoncontent == 'string') && (jsoncontent !== ''))) {
                generate();
            }
        } 
        else {
            // We reached our target server, but it returned an error
            console.log('Content file not available')
        }
    };

    request.onerror = function() {
    // There was a connection error of some sort
    };

    request.send();
    
    
    

    document.getElementById('radio1').onclick = function () {
        document.getElementById('paragraph-settings').style.display = 'block';
        ipsumType = 'paragraph';
        document.getElementById('lorem-style').innerText = 'number of paragraphs';
    };
    
    
    document.getElementById('radio2').onclick = function () {
        document.getElementById('paragraph-settings').style.display = 'none';
        ipsumType = 'lists';
        document.getElementById('lorem-style').innerText = 'number of list items';
    };
    
   

    //+ Jonas Raoni Soares Silva
    //@ http://jsfromhell.com/array/shuffle [v1.0]
    var shuffle = function(o){ //v1.0
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), 
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };



    var generate = function() {

        var stlitxt = '';
        var noit = document.getElementById('noit').value;
        var btag = '';
        var etag = '';
        var i = null;

        //generating text
        var textFill = function(jsonItem) {
            stlitxt = stlitxt + btag + jsonItem + etag + '\r\n\r\n';
        };

        if (ipsumType == 'paragraph') {
        
                
            shuffle(jsoncontent.item);

            
            var borg = '';
            var fborg = function(){
                if (borg !== '') {
                    stlitxt = stlitxt + btag + borg + etag;
                }
            };

            if (document.getElementById('ht').checked) {
                btag = '<p>\r\n';
                etag = '\r\n</p>';
            }
             
            if (document.getElementById('borg').checked) {
                borg = jsoncontent.extra[1].paragraph;
            }
                
            if (document.getElementById('bw').checked) {
                
                if (noit == 1) { 
                    textFill(jsoncontent.extra[0].paragraph);
                     
                    fborg();
                }
                
                else {
                    textFill(jsoncontent.extra[0].paragraph);
                  
                    for (i=0;i<noit-1;i++) {
                        textFill(jsoncontent.item[i].paragraph);
                    }

                    fborg();
                }
                    
            }
            
            else {
                    
                for (i=0;i<noit;i++) {
                    textFill(jsoncontent.item[i].paragraph);
                }

                fborg();
            }
        
        }

        else {
     
            shuffle(jsoncontent.starfleet);

            if (document.getElementById('ht').checked) {
                btag = '<li>\r\n';
                etag = '\r\n</li>';

                stlitxt = '<ul>\r\n\r\n';

                for (i=0;i<noit;i++) {
                    textFill(jsoncontent.starfleet[i].model);
                }

                stlitxt = stlitxt + '</ul>';

            }

            else {
                for (i=0;i<noit;i++) {
                    textFill(jsoncontent.starfleet[i].model);
                }
 
            }

        }
        
        document.getElementById('stli').innerHTML = stlitxt;


    };


    document.getElementById('stli').onfocus = function() {
        document.getElementById('stli').select();
    }


    
    
    
    document.getElementById('gen').onclick = generate;


    
  
    
})();


