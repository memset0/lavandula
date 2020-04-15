/**
 * =============================================================================
 * ************   Select 下拉选择   ************
 * =============================================================================
 */

$(function () {
  lavandula.mutation('[lavandula-select]', function () {
    var $this = $(this);
    var inst = $this.data('lavandula.select');
    if (!inst) {
      inst = new lavandula.Select($this, parseOptions($this.attr('lavandula-select')));
      $this.data('lavandula.select', inst);
    }
  });
});
