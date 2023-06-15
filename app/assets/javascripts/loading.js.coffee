$ ->
  $(document).ajaxStart ->
    $('body').addClass('wait')
  $(document).ajaxComplete ->
    $('body').removeClass('wait')
  $('.alert').delay(4000).fadeOut('slow');
