function tabClick(t){t=t||window.event;var e=document.querySelector('.tabs li[data-state="active"]');e.setAttribute("data-state","inactive");var a=t.target||t.srcElement;a.setAttribute("data-state","active");var r=document.querySelector("#article"+e.id.substring(3)),o=document.querySelector("#article"+a.id.substring(3));r.setAttribute("data-state","inactive"),o.setAttribute("data-state","active"),$("html, body").animate({scrollTop:scrollTopReset},200)}function faqClick(t){t=t||window.event;var e=t.currentTarget,a=e.parentElement;"collapsed"===a.getAttribute("data-state")?($(a).animate({height:$(a).get(0).scrollHeight},300,function(){$(this).height("auto")}),a.setAttribute("data-state","expanded")):($(a).animate({height:"6rem"},300),a.setAttribute("data-state","collapsed"))}function featuresButtonClick(){document.querySelector(".tabs #tab-1").setAttribute("data-state","inactive"),document.querySelector("#article-1").setAttribute("data-state","inactive"),document.querySelector(".tabs #tab-2").setAttribute("data-state","active"),document.querySelector("#article-2").setAttribute("data-state","active"),$("html, body").animate({scrollTop:scrollTopReset},200)}function bodyScroll(){var t=void 0!==window.pageYOffset?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop,e=$(".tabs").offset().top-t;t<=scrollTopReset+1?($(".tabs").removeClass("tabs-fixed"),$("#banner").css("margin-bottom","0")):e<=1&&($(".tabs").addClass("tabs-fixed"),$("#banner").css("margin-bottom","3.921rem"))}for(var scrollTopReset=726,tabLinks=document.querySelectorAll(".tabs li"),i=0;i<tabLinks.length;i++)tabLinks[i].addEventListener("click",tabClick);for(var faqs=document.querySelectorAll("main #article-3 .faq .question"),i=0;i<faqs.length;i++)faqs[i].addEventListener("click",faqClick);setTimeout(function(){for(var t=document.querySelectorAll("#bg-icons > .bg-icon-wrapper"),e=0;e<t.length;e++)t[e].className+=" show";document.querySelector("#banner #app-icon").className+=" show",document.querySelector("#banner h1").className+=" show",document.querySelector("#banner .attributes").className+=" show",document.querySelector("#banner .button-container").className+=" show"},500);var featuresButton=document.querySelector("#article-1-section-2 #features-link");featuresButton.addEventListener("click",featuresButtonClick),window.addEventListener("scroll",bodyScroll);