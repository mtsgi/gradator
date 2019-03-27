$( document ).ready( Load );

var grad = new Object();
var user = new Array();
var preset = new Array();
const stopbase = "<div class='colorstop' id='stopbase'><span>位置(%)</span><input step='1' type='number' min='0' max='100' class='point' value='0'><span>カラー</span><input type='text' class='colorname jscolor'></div>";

preset[0] = {"0":"16D5F7","100":"125CE6"}
preset[1] = {"0":"8A8A8A","48":"454545","52":"000000","100":"474747"}
preset[2] = {"0":"FF0000","20":"FFFF00","40":"00FF00","60":"00FFFF","80":"0000FF","100":"FF00FF"}
preset[3] = {"48":"21EB07","52":"11D100"};
preset[4] = {"0":"E0E0E0","100":"FFFFFF"};

function Load() {
    $(".point")[0].value = "0";
    $(".point")[1].value = "100";
    $(".colorname")[0].jscolor.fromString("16D5F7")
    $(".colorname")[1].jscolor.fromString("125CE6");
    update();
    $(document).on("change", "input", update);
    let cnt = 0;
    if( localStorage["gradator-preset"] ) user = JSON.parse( localStorage["gradator-preset"] );
    for( i of $(".preset") ){
        $(i).css("background", gradParse(preset[cnt]));
        cnt ++;
    }
    cnt = 0;
    for( i of $(".userpreset") ){
        $(i).css("background", gradParse(user[cnt]));
        cnt ++;
    }
}

function update(){
    grad = {};
    let num = $(".point").length;
    for( let i = 0; i < num; i++ ){
        let point = $(".point")[i].value;
        let color = $(".colorname")[i].value;
        grad[String(point)] = color;
    }
    $("#colorbox").css("background", gradParse(grad));
    $("#code").text("background : " + gradParse(grad) + ";");
}

function readPreset( _preset ){
    if( !_preset ){
        $("#done").text("セットされていません").show().fadeOut(800);
        return;
    }
    grad = _preset;
    $("#stops").html("");
    for( i in grad ){
        $("#stops").append("<div class='colorstop' id='stopbase'><span>位置(%)</span><input type='number' min='0' max='100' class='point' value='"+i+"'><span>カラー</span><input type='text' class='colorname jscolor' value='"+grad[i]+"'></div>");
        new jscolor( $(".colorname")[ $(".colorname").length-1 ] );
    }
    $("#colorbox").css("background", gradParse(grad));
    $("#code").text("background : " + gradParse(grad) + ";");
    $("#t2n").hide();
    $("#t2r").show();
    update();
}

function addStop(){
    $("#stops").append( stopbase );
    new jscolor( $(".colorname")[ $(".colorname").length-1 ] );
    update();
}

function copy2cb(){
    let _range = document.createRange();
    _range.selectNode( $("#code")[0] );
    let _selection = getSelection();
    _selection.removeAllRanges();
    _selection.addRange(_range);
    document.execCommand("copy");
    _selection.removeAllRanges();
    $("#done").text("コピーしました").show().fadeOut(800);
}

function addPreset(index){
    user[index] = grad;
    $("#u"+index).css("background", gradParse(grad));
    localStorage.setItem("gradator-preset", JSON.stringify(user) );
    $("#done").text(index+"にセットしました").show().fadeOut(800);
}

function gradParse( _obj ){
    var code = "linear-gradient(";
    for( i in _obj ){
        code += "#" + _obj[i] + " " + i + "%,";
    }
    code = code.substr( 0, code.length-1 ) + ")";
    return code;
}

function exportPresets(){
    $("#done").text("エクスポートできません").show().fadeOut(800);
}

function turn2Range(){
    for( let i=0; i<$(".point").length; i++ ){
        $(".point")[i].type = "range";
    }
    $("#t2r").hide();
    $("#t2n").show();
}

function turn2Number(){
    for( let i=0; i<$(".point").length; i++ ){
        $(".point")[i].type = "number";
    }
    $("#t2n").hide();
    $("#t2r").show();
}