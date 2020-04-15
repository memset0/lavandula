/**
 * =============================================================================
 * ************   Expansion panel 自定义属性   ************
 * =============================================================================
 */

$(function () {
  lavandula.mutation('[lavandula-panel]', function () {
    var $target = $(this);

    var inst = $target.data('lavandula.panel');
    if (!inst) {
      var options = parseOptions($target.attr('lavandula-panel'));
      inst = new lavandula.Panel($target, options);
      $target.data('lavandula.panel', inst);
    }
  });
});
