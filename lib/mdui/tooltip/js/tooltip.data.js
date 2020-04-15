/**
 * =============================================================================
 * ************   Tooltip DATA API   ************
 * =============================================================================
 */

$(function () {
  // mouseenter 不能冒泡，所以这里用 mouseover 代替
  $document.on('touchstart mouseover', '[lavandula-tooltip]', function () {
    var $this = $(this);

    var inst = $this.data('lavandula.tooltip');
    if (!inst) {
      var options = parseOptions($this.attr('lavandula-tooltip'));
      inst = new lavandula.Tooltip($this, options);
      $this.data('lavandula.tooltip', inst);
    }
  });
});
