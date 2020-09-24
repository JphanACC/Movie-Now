// const theatreSelect = $('.option')

// const changeTheatre = function(e) {
//     const option = e.target.id;
//     console.log(option);
// }

// theatreSelect.on("select", changeTheatre);
console.log("app.js");

const $ticketQty = $(".ticketQty");

const updatePrice = function() {
    const $totalPrice = $("#totalPrice");
    const $adultQty = Number($("#adultQty").val());
    const $childQty = Number($("#childQty").val());
    const total = $adultQty+ $childQty;
    $totalPrice.text(total); 
};

$ticketQty.on("change", updatePrice);