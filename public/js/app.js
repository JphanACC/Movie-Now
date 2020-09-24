const $ticketQty = $(".ticketQty");

const updatePrice = function() {
    const $totalPrice = $("#totalPrice");
    const $adultQty = Number($("#adultQty").val());
    const $childQty = Number($("#childQty").val());
    const total = $adultQty+ $childQty;
    $totalPrice.text(`Total Price: $${total}`); 
};

$ticketQty.on("change", updatePrice);