
$(function() {
   
    var jsonfile = 'content.json?1';
    var jsoncontent;
    var ipsumType = "paragraph";

    $.getJSON(jsonfile, function(json) {

    if((json != null) || (( typeof json == 'string') && (json != ''))) {
            jsoncontent = json;
        }
    });

    $('#radio1').click(function() {
        $('#paragraph-settings').css('display','block');
        ipsumType = "paragraph";
    });

    $('#radio2').click(function() {
        $('#paragraph-settings').css('display','none');
        ipsumType = "lists";
    });


    //+ Jonas Raoni Soares Silva
    //@ http://jsfromhell.com/array/shuffle [v1.0]
    shuffle = function(o){ //v1.0
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };






    $('#gen').click(function() {

        stlitxt = "";
        noit = $('#noit').val();
        btag = "";
        etag = "";

        //generating text
        textFill = function(jsonItem) {
            stlitxt = stlitxt + btag + jsonItem + etag + "\r\n\r\n";
        };

        if (ipsumType == "paragraph") {
        
                
            shuffle(jsoncontent.item);

            
            borg = "";
            fborg = function(){
                if (borg != "") {
                    stlitxt = stlitxt + btag + borg + etag;
                }
            }

            if ($('#ht').is(':checked')) {
                btag = "<p>\r\n";
                etag = "\r\n</p>";
            }
             
            if ($('#borg').is(':checked')) {
                borg = jsoncontent.extra[1].paragraph;
            }
                
            if ($('#bw').is(':checked')) {
                
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

            if ($('#ht').is(':checked')) {
                btag = "<li>\r\n";
                etag = "\r\n</li>";

                stlitxt = "<ul>\r\n\r\n"

                for (i=0;i<noit;i++) {
                    textFill(jsoncontent.starfleet[i].model);
                }

                stlitxt = stlitxt + "</ul>"

            }

            else {
                for (i=0;i<noit;i++) {
                    textFill(jsoncontent.starfleet[i].model);
                }
 
            }

        }

        $('#stli').text(stlitxt);

    });

    $('#stli').focus(function() {
    $('#stli').select();
    });
    
  
    
});
