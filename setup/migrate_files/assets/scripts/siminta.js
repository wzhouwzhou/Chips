/* ====================================
 Free To Use For Personal And Commercial Usage
Author: http://binarytheme.com
 Share Us if You Like our work 
 Enjoy Our Codes For Free always.
======================================*/

$(() => {
  // Tooltip demo
  $('.tooltip-demo').tooltip({
    selector: '[data-toggle=tooltip]',
    container: 'body',
  });

  // Popover demo
  $('[data-toggle=popover]')
    .popover();
  // /calling side menu

  $('#side-menu').metisMenu();

  // /pace function for showing progress

  function load(time) {
    var x = new XMLHttpRequest();
    x.open('GET', `${time}`, true);
    x.send();
  }

  load(20);
  load(100);
  load(500);
  load(2000);
  load(3000);
  setTimeout(() => {
    Pace.ignore(() => {
      load(3100);
    });
  }, 4000);

  Pace.on('hide', () => {
    console.log('done');
  });
  paceOptions = {
    elements: true,
  };
});

// Loads the correct sidebar on window load, collapses the sidebar on window resize.
$(() => {
  $(window).bind('load resize', function() {
    console.log($(this).width());
    if ($(this).width() < 768) {
      $('div.sidebar-collapse').addClass('collapse');
    } else {
      $('div.sidebar-collapse').removeClass('collapse');
    }
  });
});
