function toggleOverflowTabMenu(){overflowMenu.setAttribute("data-state","closed"===overflowMenu.getAttribute("data-state")?"open":"closed")}function showTab(e){if(document.querySelector("#"+e)){var t=document.querySelector('.tabs .tab-value[data-state="active"]');t.setAttribute("data-state","inactive");document.querySelector("#"+e).setAttribute("data-state","active");document.querySelector('.tabs #overflow-menu ol li[data-state="active"]').setAttribute("data-state","inactive");document.querySelector("#overflow-"+e).setAttribute("data-state","active");document.querySelector("#article-"+t.id).setAttribute("data-state","inactive");document.querySelector("#article-"+e).setAttribute("data-state","active");var a=$("#tab-marker").offset().top;$("html, body").animate({scrollTop:a},200),window.history&&history.pushState&&history.replaceState("","","?tab="+e)}}function tabClick(e){e=e||window.event,showTab((e.target||e.srcElement).id)}function overflowTabClick(e){e=e||window.event,showTab((e.target||e.srcElement).id.substring(9)),toggleOverflowTabMenu()}function faqClick(e){e=e||window.event;var t=e.currentTarget,a=t.parentElement;"collapsed"===a.getAttribute("data-state")?($(a).animate({height:$(a).get(0).scrollHeight},300,function(){$(this).height("auto")}),a.setAttribute("data-state","expanded")):($(a).animate({height:"6.5rem"},300),a.setAttribute("data-state","collapsed"))}function featuresButtonClick(){showTab("features")}function bodyScroll(){var e=void 0!==window.pageYOffset?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop,t=$(".tabs").offset().top-e;e<=$("#tab-marker").offset().top+1?($(".tabs").removeClass("tabs-fixed"),$("#tab-marker").css("height","0")):t<=1&&($(".tabs").addClass("tabs-fixed"),$("#tab-marker").css("height","3.921rem"))}function toggleModal(){document.getElementsByTagName("body")[0].classList.toggle("no-scroll"),"closed"===modal.getAttribute("data-state")?$(".modal").fadeIn(300,function(){modal.setAttribute("data-state","open"),overlay.setAttribute("data-state","open")}):$(".modal").fadeOut(300,function(){modal.setAttribute("data-state","closed"),overlay.setAttribute("data-state","closed")})}var overflowButton=document.querySelector("#overflow-menu #overflow-button"),overflowMenu=document.querySelector("#overflow-menu > ol");overflowButton.addEventListener("click",toggleOverflowTabMenu);for(var tabLinks=document.querySelectorAll(".tabs .tab-value"),i=0;i<tabLinks.length;i++)tabLinks[i].addEventListener("click",tabClick);for(var overflowTabLinks=document.querySelectorAll(".tabs #overflow-menu ol li"),i=0;i<overflowTabLinks.length;i++)overflowTabLinks[i].addEventListener("click",overflowTabClick);for(var faqs=document.querySelectorAll("main #article-faq .faq .question"),i=0;i<faqs.length;i++)faqs[i].addEventListener("click",faqClick);setTimeout(function(){for(var e=document.querySelectorAll("#bg-icons > .bg-icon-wrapper"),t=0;t<e.length;t++)e[t].className+=" show";document.querySelector("#banner #app-icon").className+=" show",document.querySelector("#banner h1").className+=" show",document.querySelector("#banner .attributes").className+=" show",document.querySelector("#banner .button-container").className+=" show"},500);var featuresButton=document.querySelector("#article-1-section-2 #features-link");featuresButton.addEventListener("click",featuresButtonClick),window.addEventListener("scroll",bodyScroll);var closeButton=document.querySelector(".modal-container > svg"),useCaseText=document.querySelector("main #article-use-cases .use-case .example"),modal=document.querySelector(".modal-container"),overlay=document.querySelector(".modal-overlay");useCaseText.addEventListener("click",toggleModal),closeButton.addEventListener("click",toggleModal),overlay.addEventListener("click",toggleModal),document.addEventListener("DOMContentLoaded",function(){var e={};window.location.href.replace(new RegExp("([^?=&]+)(=([^&]*))?","g"),function(t,a,o,r){e[a]=r}),e.tab&&showTab(e.tab)},!1);