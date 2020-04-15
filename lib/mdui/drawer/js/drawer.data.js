/**
 * =============================================================================
 * ************   Drawer 自定义属性 API   ************
 * =============================================================================
 */

$(function () {
  lavandula.mutation('[lavandula-drawer]', function () {
    var $this = $(this);
    var options = parseOptions($this.attr('lavandula-drawer'));
    var selector = options.target;
    delete options.target;

    var $drawer = $(selector).eq(0);

    var inst = $drawer.data('lavandula.drawer');
    if (!inst) {
      inst = new lavandula.Drawer($drawer, options);
      $drawer.data('lavandula.drawer', inst);
    }

    $this.on('click', function () {
      inst.toggle();
    });

  });
});
