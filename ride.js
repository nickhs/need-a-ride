$(document).ready(function() {
    console.log("document ready")
    var res = $.ajax({
        url: "http://localhost:5000/data"
    }).done(function(data) {
        console.log(data)
        loadFromJson(data)
    });
});

$("#new-person").keypress(function (e) {
    if (e.keyCode == 13) {
        var val = $(this).val();
        console.log(val);
        var jqxhr = $.ajax({
            url: "http://localhost:5000/data",
            type: "POST",
            data: val,
        }).done(function (data) {
            console.log(data);
            $("#person-list").append("<li class=\"person\">"+val+"</li>");
            $("#new-person").val("");
            
        });
    }
});

function loadFromJson(json) {
    console.log("adding json");
    var personCount = 0
    for (var key in json) {
        $("#person-list").append("<li class=\"person\">"+json[key]+"</li>");
        personCount = personCount+1;
    }
    $(".number").text(personCount);
    console.log("done!");
}
