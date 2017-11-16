//business logic
function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}

function Address(street, city, state, type) {
  this.street = street;
  this.city = city;
  this.state = state;
  this.type = type;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Address.prototype.fullAddress = function() {
  return this.street + ", " + this.city + " " + this.state + this.type;
}

// user interface logic
$(document).ready(function() {

  $("#add-address").click(function() {
      $("#new-addresses").append('<div class="additional">' +
                                  '<div class="new-address">' +
                                   '<div class="form-group">' +
                                     '<label for="new-street">Street</label>' +
                                     '<input type="text" class="form-control new-street">' +
                                   '</div>' +
                                   '<div class="form-group">' +
                                     '<label for="new-city">City</label>' +
                                     '<input type="text" class="form-control new-city">' +
                                   '</div>' +
                                   '<div class="form-group">' +
                                     '<label for="new-state">State</label>' +
                                     '<input type="text" class="form-control new-state">' +
                                   '</div>' +
                                   '<div class="radio">' +
                                    '<label>' +
                                    '<input type="radio" name="type" value="Work" checked>' +
                                    '</label>' +
                                  '</div>' +
                                  '<div class="radio">' +
                                   '<label>' +
                                   '<input type="radio" name="type" value="Home">' +
                                   '</label>' +
                                 '</div>' +
                                 '<div class="radio">' +
                                  '<label>' +
                                  '<input type="radio" name="type" value="Other">' +
                                  '</label>' +
                                '</div>'
                            );
    });


    $("form#new-contact").submit(function(event) {
      event.preventDefault();

      var inputtedFirstName = $("input#new-first-name").val();
      var inputtedLastName = $("input#new-last-name").val();
      var inputtedStreet = $("input#street").val();
      var inputtedCity = $("input#city").val();
      var inputtedState = $("input#state").val();
      var inputtedType = $("input#type").val();

      var newContact = new Contact(inputtedFirstName, inputtedLastName);

      if (inputtedStreet === undefined) {
        $(".additional").hide();
        console.log("this");
      } else {
        console.log(inputtedStreet);
      }

      $(".new-address").each(function() {
        var inputtedStreet = $(this).find("input.new-street").val();
        var inputtedCity = $(this).find("input.new-city").val();
        var inputtedState = $(this).find("input.new-state").val();
        var inputtedType = $(this).find("input.type").val();
        var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, inputtedType);
        newContact.addresses.push(newAddress);
      });


    //console.log(newContact);

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        //console.log(address);
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");

      });
    });

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input.street").val("");
    $("input.city").val("");
    $("input.state").val("");
    $("input.type").val("");
  });
});
