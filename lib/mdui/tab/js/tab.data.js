/**
 * =============================================================================
 * ************   Tab 自定义属性 API   ************
 * =============================================================================
 */

$(function () {
  lavandula.mutation('[lavandula-tab]', function () {
    var $this = $(this);
    var inst = $this.data('lavandula.tab');
    if (!inst) {
      inst = new lavandula.Tab($this, parseOptions($this.attr('lavandula-tab')));
      $this.data('lavandula.tab', inst);
    }
  });
});
