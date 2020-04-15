/**
 * =============================================================================
 * ************   Headroom 自定义属性 API   ************
 * =============================================================================
 */

$(function () {
  lavandula.mutation('[lavandula-headroom]', function () {
    var $this = $(this);
    var options = parseOptions($this.attr('lavandula-headroom'));

    var inst = $this.data('lavandula.headroom');
    if (!inst) {
      inst = new lavandula.Headroom($this, options);
      $this.data('lavandula.headroom', inst);
    }
  });
});
