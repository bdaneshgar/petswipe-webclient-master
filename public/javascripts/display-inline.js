var divWidth = $("#span").width();
var text = $("#text");
var fontSize = 12;

while (text.width() > divWidth)
  text.css("font-size", fontSize -= 0.5);

text.css("display", "inline");