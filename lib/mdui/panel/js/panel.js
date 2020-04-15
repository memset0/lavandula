/**
 * =============================================================================
 * ************   Expansion panel 可扩展面板   ************
 * =============================================================================
 */

lavandula.Panel = (function () {

  function Panel(selector, opts) {
    return new CollapsePrivate(selector, opts, 'panel');
  }

  return Panel;

})();
