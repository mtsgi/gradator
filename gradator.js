$( document ).ready( Load );

var grad = new Object();
var preset = new Array();
const stopbase = "<div class='colorstop' id='stopbase'><span>位置(%)</span><input type='number' min='0' max='100' class='point' value='0'><span>カラー</span><input type='text' class='colorname jscolor'></div>";

function Load() {
    $(".point")[0].value = "0";
    $(".point")[1].value = "100";
    $(".colorname")[0].jscolor.fromString("16D5F7")
    $(".colorname")[1].jscolor.fromString("125CE6");
    update();
    $(document).on("change", "input", update);
    if( localStorage["gradator-preset"] ){
        preset[0] = JSON.parse( localStorage["gradator-preset"] );
        var code = "linear-gradient(";
        for( i in preset[0] ){
            code += "#" + preset[0][i] + " " + i + "%,";
        }
        code = code.substr( 0, code.length-1 ) + ")";
        $("#p0").css("background", code);
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
    var code = "linear-gradient(";
    for( i in grad ){
        code += "#" + grad[i] + " " + i + "%,";
    }
    code = code.substr( 0, code.length-1 ) + ")";
    $("#colorbox").css("background", code);
    $("#code").text("background : " + code + ";");
}

function readPreset( _preset ){
    console.log(_preset);
    grad = _preset;
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