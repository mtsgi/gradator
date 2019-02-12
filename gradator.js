$( document ).ready( Load );

var grad = new Object();
const stopbase = "<div class='colorstop' id='stopbase'><span>位置(%)</span><input type='number' class='point' value='0'><span>カラー</span><input type='text' class='colorname jscolor' onchange='update()'></div>";

function Load() {
    $(".point")[0].value = "0";
    $(".point")[1].value = "100";
    $(".colorname")[0].jscolor.fromString("16D5F7")
    $(".colorname")[1].jscolor.fromString("125CE6");
    update();
}

function update(){
    grad = {};
    let num = $(".point").length;
    for( let i = 0; i < num; i++ ){
        let point = $(".point")[i].value;
        let color = $(".colorname")[i].value;
        grad[String(point)] = color;
    }
    console.log(grad);
    var code = "linear-gradient(";
    for( i in grad ){
        code += "#" + grad[i] + " " + i + "%,";
    }
    code = code.substr( 0, code.length-1 ) + ")";
    $("#colorbox").css("background", code);
    $("#code").text("background : " + code + ";");
}
function addStop(){
    $("#stops").append( stopbase );
    new jscolor( $(".colorname")[ $(".colorname").length-1 ] );
    update();
}