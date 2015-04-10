$(function() {

    var jsonfile = 'content/content.json?1';
    var jsoncontent;
    var ipsumType = 'paragraph';

    $.getJSON(jsonfile, function(json) {
        if((json !== null) || (( typeof json == 'string') && (json !== ''))) {
            jsoncontent = json;
            generate();
        }
    });

    $('#radio1').click(function() {
        $('#paragraph-settings').css('display','block');
        ipsumType = 'paragraph';
        $('#lorem-style').text('number of paragraphs');
    });

    $('#radio2').click(function() {
        $('#paragraph-settings').css('display','none');
        ipsumType = 'lists';
         $('#lorem-style').text('number of list items');
    });


    //+ Jonas Raoni Soares Silva
    //@ http://jsfromhell.com/array/shuffle [v1.0]
    var shuffle = function(o){ //v1.0
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), 
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };



    var generate = function() {

        var stlitxt = '';
        var noit = $('#noit').val();
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

            if ($('#ht').is(':checked')) {
                btag = '<p>\r\n';
                etag = '\r\n</p>';
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

        $('#stli').text(stlitxt);

    };


    $('#stli').focus(function() {
        $('#stli').select();
    });


    $('#gen').click(generate); 


    
  
    
});


