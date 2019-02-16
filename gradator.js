$( document ).ready( Load );

var grad = new Object();
var preset = new Array();
const stopbase = "<div class='colorstop' id='stopbase'><span>位置(%)</span><input type='number' min='0' max='100' class='point' value='0'><span>カラー</span><input type='text' class='colorname jscolor'></div>";

preset[1] = {
    0: "16D5F7",
    100: "125CE6"
}

function Load() {
    $(".point")[0].value = "0";
    $(".point")[1].value = "100";
    $(".colorname")[0].jscolor.fromString("16D5F7")
    $(".colorname")[1].jscolor.fromString("125CE6");
    update();
    $(document).on("change", "input", update);
    let cnt = 0;
    for( i of $(".preset") ){
        preset[0] = JSON.parse( localStorage["gradator-preset"] );
        $(i).css("background", gradParse(preset[cnt]));
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
    console.log(_preset);
    grad = _preset;
    $("#stops").html("");
    for( i in grad ){
        $("#stops").append("<div class='colorstop' id='stopbase'><span>位置(%)</span><input type='number' min='0' max='100' class='point' value='"+i+"'><span>カラー</span><input type='text' class='colorname jscolor' value='"+grad[i]+"'></div>");
        new jscolor( $(".colorname")[ $(".colorname").length-1 ] );
    }
    $("#colorbox").css("background", gradParse(grad));
    $("#code").text("background : " + gradParse(grad) + ";");
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
    $("#done").show().fadeOut(800);
}

function addPreset(){
    localStorage.setItem("gradator-preset", JSON.stringify(grad));
    preset[0] = JSON.parse( localStorage["gradator-preset"] );
    var code = "linear-gradient(";
    for( i in preset[0] ){
        code += "#" + preset[0][i] + " " + i + "%,";
    }
    code = code.substr( 0, code.length-1 ) + ")";
    $("#p0").css("background", code);
}

function gradParse( _obj ){
    var code = "linear-gradient(";
    for( i in _obj ){
        code += "#" + _obj[i] + " " + i + "%,";
    }
    code = code.substr( 0, code.length-1 ) + ")";
    return code;
}