$(document).ready(function() {
    console.log("document ready")
    $.ajax({
        url: "http://ride.nickhs.com/data"
    }).done(function(data) {
        console.log(data)
        loadFromJson(data)
    });
});

$(".person-destroy").live({
    click: function() {
        console.log($(this).prev().text())
        var val = $(this).prev().text()
        var cont = $(this)

        $.ajax({
            url: "http://ride.nickhs.com/delete/"+val
        }).done(function(data) {
            console.log(data);
            cont.parent().remove();
            var x = parseInt($(".number").text());
            $(".number").text(x-1);
        });
    }
});

$("#new-person").keypress(function (e) {
    if (e.keyCode == 13) {
        var val = $(this).val();
        console.log(val);
        var jqxhr = $.ajax({
            url: "http://ride.nickhs.com/data",
            type: "POST",
            data: val,
        }).done(function (data) {
            console.log(data);
            $("#person-list").append(itemTemplate(val));
            $("#new-person").val("");
            var x = parseInt($(".number").text());
            $(".number").text(x+1);
        });
    }
});

function loadFromJson(json) {
    console.log("adding json");
    var personCount = 0
    for (var key in json) {
        $("#person-list").append(itemTemplate(json[key]));
        personCount = personCount+1;
    }
    $(".number").text(personCount);
    console.log("done!");
}

function itemTemplate(val) {
    var html = "<li> <div>"+val+"</div><span class=\"person-destroy\"></span></li>"
    return html
}
