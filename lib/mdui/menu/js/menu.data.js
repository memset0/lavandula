/**
 * =============================================================================
 * ************   Menu 自定义属性 API   ************
 * =============================================================================
 */

$(function () {
  $document.on('click', '[lavandula-menu]', function () {
    var $this = $(this);

    var inst = $this.data('lavandula.menu');
    if (!inst) {
      var options = parseOptions($this.attr('lavandula-menu'));
      var menuSelector = options.target;
      delete options.target;

      inst = new lavandula.Menu($this, menuSelector, options);
      $this.data('lavandula.menu', inst);

      inst.toggle();
    }
  });
});
