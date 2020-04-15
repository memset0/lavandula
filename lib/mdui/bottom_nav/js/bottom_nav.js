/**
 * =============================================================================
 * ************   Bottom navigation 底部导航栏   ************
 * =============================================================================
 */

(function () {

  // 切换导航项
  $document.on('click', '.lavandula-bottom-nav>a', function () {
    var $this = $(this);
    var $bottomNav = $this.parent();
    var isThis;
    $bottomNav.children('a').each(function (i, item) {
      isThis = $this.is(item);
      if (isThis) {
        componentEvent('change', 'bottomNav', null, $bottomNav, {
          index: i,
        });
      }

      $(item)[isThis ? 'addClass' : 'removeClass']('lavandula-bottom-nav-active');
    });
  });

  // 滚动时隐藏 lavandula-bottom-nav-scroll-hide
  lavandula.mutation('.lavandula-bottom-nav-scroll-hide', function () {
    var $this = $(this);
    var inst = new lavandula.Headroom($this, {
      pinnedClass: 'lavandula-headroom-pinned-down',
      unpinnedClass: 'lavandula-headroom-unpinned-down',
    });
    $this.data('lavandula.headroom', inst);
  });

})();
