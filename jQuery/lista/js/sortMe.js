/*
By http://jquery-manual.blogspot.com Copyright © 2013
*/

$.fn.sortMe = function(type, options)
{
var defaults = {
reverse : false
}

var options = $.extend(defaults, options);

var row = new Array();
this.each(function(i){
row[i] = $(this).text();
});

if (type == "number")
{
row.sort(function (a,b){return a-b;});
}
else if(type == "letter")
{
function case_insensitive_comp(strA, strB) {
    return strA.toLowerCase().localeCompare(strB.toLowerCase());
}
row.sort( case_insensitive_comp );
}
else if (type == "both")
{
function natSort(as, bs){
    var a, b, a1, b1, i= 0, L, rx=  /(\d+)|(\D+)/g, rd=  /\d/;
    if(isFinite(as) && isFinite(bs)) return as - bs;
    a= String(as).toLowerCase();
    b= String(bs).toLowerCase();
    if(a=== b) return 0;
    if(!(rd.test(a) && rd.test(b))) return a> b? 1: -1;
    a= a.match(rx);
    b= b.match(rx);
    L= a.length> b.length? b.length: a.length;
    while(i < L){
        a1= a[i];
        b1= b[i++];
        if(a1!== b1){
            if(isFinite(a1) && isFinite(b1)){
                if(a1.charAt(0)=== "0") a1= "." + a1;
                if(b1.charAt(0)=== "0") b1= "." + b1;
                return a1 - b1;
            }
            else return a1> b1? 1: -1;
        }
    }
    return a.length - b.length;
}
row.sort( natSort );
}
else
{
row.sort();
}

if (defaults.reverse == true)
{
row.reverse();
}

this.each(function(index){
$(this).text(row[index]);
});

};