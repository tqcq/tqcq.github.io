var options;$.prototype.justifiedGallery&&(options={rowHeight:140,margins:4,lastRow:"justify"},$(".article-gallery").justifiedGallery(options)),$(document).ready((function(){if($("#header > #nav > ul > .icon").click((function(){$("#header > #nav > ul").toggleClass("responsive")})),$(".post").length){var o,e=$("#menu"),i=$("#menu > #nav"),t=$("#menu-icon, #menu-icon-tablet");500<=$(document).width()&&(e.show(),t.addClass("active")),$(window).on("resize",(function(){500<=$(document).width()?i.show():i.hide()})),t.click((function(){return e.is(":hidden")?(e.show(),t.addClass("active")):(e.hide(),t.removeClass("active")),!1}));e.length&&$(window).on("scroll",(function(){var o=(article=$("body > div.content.index.py4 > article")).offset().top+scrollY;!i.is(":visible")&&o<80?i.show():i.is(":visible")&&100<o&&i.hide(),!$("#menu-icon").is(":visible")&&o<80?($("#menu-icon-tablet").show(),$("#top-icon-tablet").hide()):!$("#menu-icon").is(":visible")&&100<o&&($("#menu-icon-tablet").hide(),$("#top-icon-tablet").show())})),$("#footer-post").length&&(o=0,$(window).on("scroll",(function(){var e=$(window).scrollTop();o<e?$("#footer-post").hide():$("#footer-post").show(),o=e,$("#nav-footer").hide(),$("#toc-footer").hide(),$("#share-footer").hide(),e<100?$("#actions-footer > #top").hide():80<e&&$("#actions-footer > #top").show()})))}}));