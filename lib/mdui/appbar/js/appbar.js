/**
 * =============================================================================
 * ************   Appbar   ************
 * =============================================================================
 * 滚动时自动隐藏应用栏
 * lavandula-appbar-scroll-hide
 * lavandula-appbar-scroll-toolbar-hide
 */

$(function () {
  // 滚动时隐藏应用栏
  lavandula.mutation('.lavandula-appbar-scroll-hide', function () {
    var $this = $(this);
    $this.data('lavandula.headroom', new lavandula.Headroom($this));
  });

  // 滚动时只隐藏应用栏中的工具栏
  lavandula.mutation('.lavandula-appbar-scroll-toolbar-hide', function () {
    var $this = $(this);
    var inst = new lavandula.Headroom($this, {
      pinnedClass: 'lavandula-headroom-pinned-toolbar',
      unpinnedClass: 'lavandula-headroom-unpinned-toolbar',
    });
    $this.data('lavandula.headroom', inst);
  });
});
