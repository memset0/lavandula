/**
 * =============================================================================
 * ************   Fab DATA API   ************
 * =============================================================================
 */

$(function () {
  // mouseenter 不冒泡，无法进行事件委托，这里用 mouseover 代替。
  // 不管是 click 、 mouseover 还是 touchstart ，都先初始化。

  $document.on('touchstart mousedown mouseover', '[lavandula-fab]', function (e) {
    var $this = $(this);

    var inst = $this.data('lavandula.fab');
    if (!inst) {
      var options = parseOptions($this.attr('lavandula-fab'));
      inst = new lavandula.Fab($this, options);
      $this.data('lavandula.fab', inst);
    }
  });
});
