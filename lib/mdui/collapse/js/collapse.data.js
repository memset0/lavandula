/**
 * =============================================================================
 * ************   Collapse 自定义属性   ************
 * =============================================================================
 */

$(function () {
  lavandula.mutation('[lavandula-collapse]', function () {
    var $target = $(this);

    var inst = $target.data('lavandula.collapse');
    if (!inst) {
      var options = parseOptions($target.attr('lavandula-collapse'));
      inst = new lavandula.Collapse($target, options);
      $target.data('lavandula.collapse', inst);
    }
  });
});
