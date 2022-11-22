var counter = 1;
var limit = 50;

function addInput(divName) {
    if (counter === limit) {                                                        // limit the maximum amount of rows
          alert("You have reached the limit of adding " + counter + " inputs");
    } else {                                                                        // insert row to extend form
        var newdiv = document.createElement("div");
        newdiv.innerHTML = '<div class="variantDiv"><label for="size" class="title">尺寸</label><select class="select_table" name="size" required="required"><option>S</option><option>M</option><option>L</option><option>XL</option></select><label for="color" class="title">顏色</label><input type="text" name="color" required="required"><label for="number" class="title">數量</label><input type="number"  name="amounts" required="required"></div>';
        document.getElementById(divName).appendChild(newdiv);
        counter++;
    }
}

