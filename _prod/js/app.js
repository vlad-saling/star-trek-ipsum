!function(){var a,b="paragraph",c=new XMLHttpRequest;c.open("GET","content/content.json?",!0),c.onload=function(){c.status>=200&&c.status<400?(a=JSON.parse(c.responseText),(null!==a||"string"==typeof a&&""!==a)&&e()):console.log("Content file not available")},c.onerror=function(){},c.send(),document.getElementById("radio1").onclick=function(){document.getElementById("paragraph-settings").style.display="block",b="paragraph",document.getElementById("lorem-style").innerText="number of paragraphs"},document.getElementById("radio2").onclick=function(){document.getElementById("paragraph-settings").style.display="none",b="lists",document.getElementById("lorem-style").innerText="number of list items"};var d=function(a){for(var b,c,d=a.length;d;b=parseInt(Math.random()*d),c=a[--d],a[d]=a[b],a[b]=c);return a},e=function(){var c="",e=document.getElementById("noit").value,f="",g="",h=null,i=function(a){c=c+f+a+g+"\r\n\r\n"};if("paragraph"==b){d(a.item);var j="",k=function(){""!==j&&(c=c+f+j+g)};if(document.getElementById("ht").checked&&(f="<p>\r\n",g="\r\n</p>"),document.getElementById("borg").checked&&(j=a.extra[1].paragraph),document.getElementById("bw").checked)if(1==e)i(a.extra[0].paragraph),k();else{for(i(a.extra[0].paragraph),h=0;e-1>h;h++)i(a.item[h].paragraph);k()}else{for(h=0;e>h;h++)i(a.item[h].paragraph);k()}}else if(d(a.starfleet),document.getElementById("ht").checked){for(f="<li>\r\n",g="\r\n</li>",c="<ul>\r\n\r\n",h=0;e>h;h++)i(a.starfleet[h].model);c+="</ul>"}else for(h=0;e>h;h++)i(a.starfleet[h].model);document.getElementById("stli").innerText=c};document.getElementById("stli").onfocus=function(){document.getElementById("stli").select()},document.getElementById("gen").onclick=e}();