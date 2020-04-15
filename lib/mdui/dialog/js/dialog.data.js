/**
 * =============================================================================
 * ************   Dialog DATA API   ************
 * =============================================================================
 */

$(function () {
  $document.on('click', '[lavandula-dialog]', function () {
    var $this = $(this);
    var options = parseOptions($this.attr('lavandula-dialog'));
    var selector = options.target;
    delete options.target;

    var $dialog = $(selector).eq(0);

    var inst = $dialog.data('lavandula.dialog');
    if (!inst) {
      inst = new lavandula.Dialog($dialog, options);
      $dialog.data('lavandula.dialog', inst);
    }

    inst.open();
  });
});
