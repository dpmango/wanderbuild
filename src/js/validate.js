$(document).ready(function(){

  // jQuery validate plugin
  // https://jqueryvalidation.org


  // GENERIC FUNCTIONS
  ////////////////////

  var validateErrorPlacement = function(error, element) {
    error.addClass('callback__validate');
    error.appendTo(element).closest('form');
  }
  var validateHighlight = function(element) {
    $(element).addClass("is-error");
  }
  var validateUnhighlight = function(element) {
    $(element).removeClass("is-error");
  }
  var validateSubmitHandler = function(form) {
    $(form).addClass('loading');
    $.ajax({
      type: "POST",
      url: $(form).attr('action'),
      data: $(form).serialize(),
      success: function(response) {
        $(form).removeClass('loading');
        var data = $.parseJSON(response);
        if (data.status == 'success') {
          // do something I can't test
        } else {
            $(form).find('[data-error]').html(data.message).show();
        }
      }
    });
  }

  // Callback form
  $('[js-validate-callbackForm]').validate({
    errorPlacement: validateErrorPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: function(form) {
    },
    rules: {
      name: {
        required: true
      },
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: {
        required: "Пожалуйста заполните это поле"
      },
      email: {
          required: "Пожалуйста заполните это поле",
          email: "Неправильный формат email"
      }
    }
  });
});
