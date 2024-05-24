$(document).ready(function(){

	$('html').removeClass('no-js');
	// $('.accesskey').find('a[accesskey="U"]').focus();
	// $('.goCenter').focus();
	
	var _window = $( window ),
		ww = _window.width(),
		wh = _window.height(),
		_body = $('body'),
		_webHeader = $('.header');


	//字級
	// var fontSize = $('.fontSize'),
	// 	fontSizeA = fontSize.find('button'),	 	
	// 	fontH1 = fontSizeA.outerHeight(true),
	// 	fontH2 = fontH1*3;

	// 	console.log(fontSizeA[0]);

	// fontSize.height(fontH1);

	// fontSizeA.focus(function(){
	// 	fontSizeA.css('display','block');
	// 	fontSizeA.first().focusin();
	// 	fontSize.height(fontH2);
	// 	$(this).keyup(function(e){
	// 		if(e.which == 13){
	// 			$(this).addClass('here keyup').siblings().removeClass('here keyup');
	// 		}
	// 	});
	// });
	
	// fontSize.hover(
	// 	function(){
	// 		fontSize.height(fontH2);
	// 		fontSizeA.css('display','block');
	// 		fontSizeA.click(function(){
	// 				$(this).addClass('here').siblings().removeClass('here');
	// 			});
	// 		},
	// 	function(){
	// 		fontSize.height(fontH1);
	// 		fontSizeA.not('.here').css('display','none');
	// 	}
	// );

	// fontSize.nextAll().find('a').focus(function(){
	// 	fontSize.height(fontH1);
	// 	fontSizeA.removeClass('keyup').not('.here').css('display','none');
	// });

	//字級 20190925 修改
	var _fontSize = $('.fontSize');
	var _fsHeader = _fontSize.find('span');
	var _fsOptBtn = _fontSize.find('button');
	var fspeed = 160;
	_fsHeader.append('<a href="javascript:;">' + _fontSize.find('.here').text() + '</a>');
	var _fsOptions = _fsOptBtn.wrapAll('<div class="fsOptions" />');
	_fsOptions.hide();
	_fontSize.hover(
		function(){_fsOptions.stop().slideDown(fspeed);},
		function(){_fsOptions.stop().slideUp(fspeed);}
	)
	_fsOptBtn.click(function(){
		$(this).addClass('here').siblings().removeClass('here');
		_fsHeader.find('a').text($(this).text());
		_fsOptions.stop().slideUp(fspeed);
	})
	_fsHeader.find('a').focus(function(){
		_fsOptions.stop().slideDown(fspeed);
	})
	_fsOptBtn.last().focusout(function(event){
		_fsOptions.stop().slideUp(fspeed);
	})




	//固定版頭
	var hh= _webHeader.outerHeight(true);
	
	// _window.scroll(function() {
	// 	if ($(this).scrollTop() > 0 ){
	// 		_webHeader.addClass('fixed');
	// 		_body.offset({top:hh});
	// 	} else {
	// 		_webHeader.removeClass('fixed');
	// 		_body.offset({top:0});
	// 	}
	// });

	//快速鍵定位點
	var _aKey = $('a.accesskey'),
		aF_Top = $('.footer').offset().top-hh;

	_aKey.slice(0,2).focus(function(){
		_window.scrollTop(0);
	});
	_aKey.eq(2).focus(function(){
		_window.scrollTop(aF_Top);
	});

	$('a.goCenter').keydown(function(e){
		if(e.which == 13) { 
			_window.scrollTop(-1*hh);
			_aKey.eq(1).focus();
		}
	});

	//顯示行動版查詢
	$('.searchCtrl').click(function(e){
		$('.search').slideToggle('fast');
		$('.searchCtrl').toggleClass('close');
		e.preventDefault();
	});
	
	//header 選單 , side bar 選單
	var _menu = $('.header .menu , .header .menu2p'),
			_megaMenu = $('.header .megaMenu>ul');

	_menu.find('li').has('ul').addClass('hasChild');
	_megaMenu.find('li').has('ul').addClass('hasChild');

	var liHasChild = _menu.find('li.hasChild'),
			subMenuWidth = liHasChild.first().children('ul').outerWidth();

	//複製所需區塊到.sidebar
  var _sidebar = $('.sidebar');
  _menu.clone().prependTo(_sidebar);
	_megaMenu.parent().clone().prependTo(_sidebar);

	$( '<ul class="navigation"></ul>' ).prependTo(_sidebar);
	$('.header .navigation').find('li:contains(兒童版), li:contains(English)').clone().prependTo('.sidebar .navigation');

	_sidebar.find('.megaMenu').addClass('menu');
	_sidebar.find('.menu2p').addClass('menu').removeClass('menu2p');
	_sidebar.find('.menu').find('li.hasChild>a').attr("href", "#");
	_sidebar.find('.menu').find('li.hasChild>a').click(function(){
		$(this).next().slideToggle();
		$(this).parent().toggleClass('closeThis');
	});

	//兩段式選單
	var _menu2p = $('.header .menu2p'),
			_liTopLevel = _menu2p.children('ul').children('li'),
			topLiLength = _liTopLevel.length,
			_menuMoreCtrl = $('.menuMoreCtrl');

	if ( topLiLength > 6) {
		var hiddenMenu = _liTopLevel.slice(5).hide();
		_menu2p.after('<div class="menuMore"><ul></ul></div>');
		$('.menuMore>ul').append(hiddenMenu);
	} else {
		_menuMoreCtrl.hide();
	}

	var menuMore = $('.menuMore');
	menuMore.css('top','hh');
	_menuMoreCtrl.mouseover(
		function(){menuMore.stop().slideDown('fast');}
	)
	_menuMoreCtrl.click(
		function(){menuMore.stop().slideToggle('fast');}
	)
	_menuMoreCtrl.focus(
		function(){menuMore.stop().slideToggle('fast');}
	)	
	$(menuMore).mouseleave(
		function(){menuMore.stop().fadeOut('fast');}
	)
	$(menuMore).find('li:last>a').focusout(
		function(){menuMore.stop().fadeOut('fast');}
	)

	liHasChild.hover(
		function(){
			var _showing = $(this).children('ul');
			_showing.stop().fadeIn(200);
			showingMenu(_showing);
		},
		function(){$(this).children('ul').stop().fadeOut(200);}
	);

	liHasChild.keyup(
		function(){
			var _showing = $(this).children('ul');
			_showing.show();
			showingMenu(_showing);
			$(this).siblings().focus(function(){$(this).hide();});
	});

	function showingMenu(_showing){
		var  showingOffset = _showing.offset().left;
		if (showingOffset+subMenuWidth > ww) {
			_showing.css({left: -1*subMenuWidth+5, top:5});
		}
	}

	_menu.find('li').keyup(	
		function(){$(this).siblings().children('ul').hide();}
	);
	_menu.find('li:last>a').focusout(
		function(){_menu.find('li ul').hide();}
	);


	//巨型選單 megaMenu
	_megaMenu.children('li.hasChild').hover(
		function(){$(this).children().stop().fadeIn(200);},
		function(){$(this).children('ul').stop().fadeOut(200);}
	);
	_megaMenu.children('li.hasChild').keyup(
		function(){
			$(this).children().show();
			$(this).siblings().focus(function(){
				$(this).hide()
			});
		});
	_megaMenu.children('li').keyup(	
		function(){
			$(this).siblings().children('ul').hide();
		});
	$('.header .megaMenu li:last>a').focusout(
	function(){
		$('.header .megaMenu li ul').hide();
	})

	//產生遮罩
	$( '.main' ).append( '<div class="overlay"></div>' );
  var _overlay = $('.overlay');

	//隱藏式側欄
  function showSidebar(){
      _sidebar.css({'margin-left':0,'transition':'.5s'});
      _overlay.show(0, function(){
          _overlay.fadeTo('500', 0.5);
      });   
  }
  function hideSidebar(){
      _sidebar.css('margin-left', _sidebar.width() * -1 + 'px');
      _overlay.fadeTo('500', 0, function(){
          _overlay.hide();
      });
  }

  var _sidebarClose = $('.sidebarClose'),
  		_sidebarCtrl = $('.sidebarCtrl');	
	_overlay.parent().css('min-height', 'inherit');

  _sidebar.css('margin-left', _sidebar.width() * -1 + 'px');
  _sidebarCtrl.click(function() {				
      if (_overlay.is(':visible')) {
          hideSidebar();
      } else {
          showSidebar();
      }
  });
  _overlay.add(_sidebarClose).click(function() {
      hideSidebar();
  });





	//公版頁籤
	var tabIndex = 0;
	$('.tabContainer > section').css('position', 'absolute').hide();
	$('.tabContainer').click(function() {
		$(this).siblings().removeClass('here').find('section').hide();
		$(this).addClass('here').find('section').show();
	});
	$('.tabContainer>h2>a').focus(function() {
		$(this).parents('.tabContainer').siblings().removeClass('here').find('section').hide();
		$(this).parents('.tabContainer').addClass('here').find('section').show();
	});

	$('.news').find(".tabContainer:eq(0)").click();

	//民政局頁籤
	$('.tabs').find('.active').next('.tabContent').show();
	
	var tabItemHeight = $('.tabs>h1>a').outerHeight();

	$('.tabSet').each(function(){
		var tabWidth = $(this).width();
		var tabContentHeight = $(this).find('.active').next('.tabContent').innerHeight();
		var tabItemLength = $(this).find('.tabContent').length;
		var exh1 = tabItemHeight * (tabItemLength-1);

		if (ww > 700) {
			$(this).find('.tabs>h1>a').outerWidth( tabWidth / tabItemLength );
			$(this).find('.tabContent').css('top' , tabItemHeight );
			} else {
				$(this).find('.tabs>h1>a').outerWidth( tabWidth );
				$(this).height( tabContentHeight + exh1);
			}

		$('.tabs>h1>a').focus(tabs);
		$('.tabs>h1>a').click(tabs);
	
	});
	
	function tabs(){
		var _tabH1 = $(this).parent('h1');
		var _tabContent = $(this).parent('h1').next('.tabContent');
		var tabNumber = $(this).parents('.tabSet').find('.tabContent').length;
		var tabContentHeight = _tabContent.innerHeight();

		_tabH1.siblings().removeClass('active');
		_tabH1.addClass('active');

		if (ww < 700) {
			_tabContent.parents('.tabSet').height(tabContentHeight + tabItemHeight*(tabNumber-1));
			}
		else if ( ww < 1000) {
			$(this).parents('.tabSet').height(tabContentHeight + tabItemHeight);
		} 
		return false;
	}


	
	//gotop
	_goTop = $('.goTop');
	_goTop.click(function(e){
		$("html,body").stop(true,false).animate({scrollTop:0},700, function(){
			$(".goCenter").focus();
		});
		e.preventDefault();	
	});
	$(window).scroll(function() {
		if ( $(this).scrollTop() > 250){
			_goTop.fadeIn("fast");
		} else {
			_goTop.stop().fadeOut("fast");
		}
	});

	// // Fatfooter, qrCode 開合
	// $(function(){
	// 	$('.fatfootCtrl').click(function(){
	// 		$(this).toggleClass('close');
	// 		$('.qrcode').slideToggle();
	// 		$('footer>nav>ul>li>ul').slideToggle(function(){
	// 			$(this).toggleClass('close');
	// 		});
	// 	});
	// });

  // ---------- 2024/5 無障礙修改 ---------- //
	// Fatfooter, qrCode 開合 
	var _footer = $('footer.footer');
	var _fatfootCtrlBtn = _footer.find('button.btn-fatfooter');
	var _footerNav = _footer.find('nav>ul>li>ul');
	var _footerQrcode = _footer.find('.qrcode');

	_fatfootCtrlBtn.text('控制按鈕');

	if (_footerNav.first().is(':visible')) {
		_fatfootCtrlBtn.removeClass('close').attr('aria-expanded', true);
	} else {
		_fatfootCtrlBtn.addClass('close').attr('aria-expanded', false);
	}

	_fatfootCtrlBtn.click(function () {
		if (_footerNav.first().is(':visible')) {
			_footerNav.add(_footerQrcode).stop().slideUp(400);
			_fatfootCtrlBtn.addClass('close').attr('aria-expanded', false);
		} else {
			_footerNav.add(_footerQrcode).stop().slideDown(400);
			_fatfootCtrlBtn.removeClass('close').attr('aria-expanded', true);
		}
	})


	// ---------- 2024/5 無障礙修改 ---------- //
	// 分頁顯示筆數 select 元件加 aria-label 屬性（2024 無障礙修改）
	$('.page').find('select').attr('aria-label', '每頁顯示筆數');

	// ---------- 2024/5 無障礙修改 ---------- //
	// .searchDv input, select 加 aria-label 屬性
	var _searchTb = $('.searchDv').find('table.searchLayout');
	var _searchLabelTd = _searchTb.find('td:first-child');
	_searchLabelTd.each( function(){
		$(this).next('td').children('input, select').attr('aria-label', _this.text());
	})

	// 日期範圍
	var _dateRange = _searchTb.find(".dateRange2");
	_dateRange.find('input:first-child').attr('aria-label', '開始日期');
	_dateRange.find('input:last-child').attr('aria-label', '結束日期');


	//相簿輪播
	$('.albumSlide').each(function(){

		var _slide = $(this),
				_showBox = _slide.find('.box'),
				_slideItem = _showBox.find('li'),
				count = _slideItem.length,
				imgWidth = _showBox.width(),
				_dots = '',
				_arrowLeft = _slide.find('.arbtn.left'),
				_arrowRight = _slide.find('.arbtn.right'),
				speed = 1000,
				timer = 4000,
				tt = setInterval(autoSlide, timer);

		_showBox.height(imgWidth);
		_slideItem.width(imgWidth).height(imgWidth);
		_slideItem.find('img').width(imgWidth).height(imgWidth);

		_slide.find('.dots').append('<ul></ul>');
		for(var i=0; i<count; i++){
			_dots = _dots +'<li></li>';
		};
		_slide.find('.dots>ul').append(_dots).children('li').first().addClass('active');

		_slideItem.not(':first').css('left' , imgWidth);

		var index = 0, i1 = 0, i2;
		_arrowRight.click(function(){
			i1 = index % count;
			i2 = (index+1) % count;
			photoSlide();
			index++;
		});
		_arrowLeft.click(function(){
			i1 = index % count;
			i2 = (index-1) % count;
			photoSlideRev();
			index = i2;
		});

		function autoSlide(){
			i1 = index % count;
			i2 = (index+1) % count;
			photoSlide();
			index++;
		}

		_slideItem.find('a').focus(function(){
			$(this).parent().siblings().css('left', imgWidth);
			clearInterval(tt);
			$(this).parent().css({left:0});
			i2 = $(this).parent().index();
			dotActive(i2);
		});
		_slideItem.find('a').blur(function(){
			tt = setInterval(autoSlide, timer);
			index = $(this).parent().index();
		});
		_slide.hover(
			function(){ clearInterval(tt);},
			function(){	tt = setInterval(autoSlide, timer);}
		);

		function photoSlide(){
			_slideItem.eq(i1).stop(true,true).animate({left:imgWidth * -1} , speed,
				function(){
					$(this).css('left', imgWidth)
				});
			_slideItem.eq(i2).stop(true,true).animate({left:0} , speed, dotActive);
		}
		function photoSlideRev(){
			_slideItem.eq(i2).css('left', imgWidth * -1).stop().animate({left:0}, speed, dotActive);
			_slideItem.eq(i1).stop(true,true).animate({left:imgWidth} , speed);
		}
		function dotActive(){
			 _slide.find('.dots li').removeClass('active').eq(i2).addClass('active');
		}
	});


	// 小廣告輪播，水平
	$('.adBlockH').each(function(){

		var _adSlide = $(this),
				_showBox = _adSlide.find('.adSlide'),
				_adSlideItem = _showBox.find('li'),
				_adSlideGroup = _adSlideItem.parent(),
				itemWidth = _adSlideItem.outerWidth(true),
				count = _adSlideItem.length,
				_arrowLeft = _adSlide.find('.arbtn.left'),
				_arrowRight = _adSlide.find('.arbtn.right'),
				_pauseArea = _adSlideGroup.add(_arrowLeft).add(_arrowRight),
				speed = 600,
				timer = 4000,
				autoAdSlide ;				

		_arrowLeft.add(_arrowRight).css('top', _showBox.position().top + _showBox.innerHeight()*.5);
		_adSlideGroup.width(itemWidth*count);

		var slideTotalWidth = _adSlideGroup.width() + _arrowLeft.width()*2;

		if( slideTotalWidth > $('.center').width()){
			autoAdSlide = setInterval(slideForward, timer);

			var i = 0;
			_arrowRight.click(function(){
				slideForward();
			});
			_arrowLeft.click(function(){
				i = (i-1)%count;
				_adSlideItem.eq(i).prependTo(_adSlideGroup);
				_adSlideGroup.css('left', -1*itemWidth );
				_adSlideGroup.stop().animate({'left': 0}, speed);
			});
			_pauseArea.hover(
				function(){ clearInterval(autoAdSlide);},
				function(){	autoAdSlide = setInterval(slideForward, timer);}
			);
			
			var tabCode, ix=0;

			_adSlideItem.find('a').focus(function(){
				clearInterval(autoAdSlide);
				_pauseArea.off("mouseenter mouseleave");
			});
			_adSlideItem.find('a').blur(function(){
				slideRestart();
			});

			_adSlideItem.find('a').keydown(function(event){
				clearInterval(autoAdSlide);
				_pauseArea.off("mouseenter mouseleave");

				ix = $(this).parent('li').index();
				tabCode = event.which || event.keyCode;

				if(event.shiftKey==0 && tabCode==9){
					_adSlideGroup.css('right','auto').stop(true,true).animate({'left': -1*ix*itemWidth});
					if(ix==count-1){
						_adSlideGroup.removeAttr('style').css('width' , itemWidth*count);
						slideRestart();
					}
				}
				if(event.shiftKey==1 && tabCode==9){
					_adSlideGroup.css({'left':'auto', 'right':(ix-count)*itemWidth });
					if(ix == 0){
						_adSlideGroup.removeAttr('style').css('width' , itemWidth*count);
						slideRestart();
					}
				}
			});
		} else {
			_adSlideGroup.css({'position':'static','margin-left':'auto','margin-right':'auto'});
			_arrowLeft.add(_arrowRight).hide();
		}

		function slideForward(){
			_adSlideGroup.stop(true,false).animate({'left': -1*itemWidth}, speed, 
			function(){
				_adSlideItem.eq(i).appendTo(_adSlideGroup);
				_adSlideGroup.css('left',0);
				i = (i+1)%count;
			});			
		}
		function slideRestart(){
			autoAdSlide = setInterval(slideForward, timer);
			_pauseArea.hover(
				function(){ clearInterval(autoAdSlide);},
				function(){	autoAdSlide = setInterval(slideForward, timer);}
			);			
		}		
	});
	


	// 資料大類開合
	if(ww<=800){
		var _category = $('.category'),
				_cateList = _category.find('ul');
		_category.find('.here a').clone().insertBefore(_cateList).addClass('here');
		_category.append('<button class="cateCtrl"></button>');
		var _cateCtrl = _category.find('.cateCtrl'),
				_cateHere = _category.find('a.here');

		_cateCtrl.add(_cateHere).click(function(){
			_cateCtrl.toggleClass('close');
			_cateList.add(_cateHere).slideToggle();
		});
		_cateList.find('li>a').click(function(){
			_cateList.find('.here').removeClass('here');
			$(this).parent('li').addClass('here');
			_cateHere.text($(this).text());
			if(_cateList.is(':visible')){
				_cateList.slideUp();
				_cateHere.slideDown()};
				_cateCtrl.removeClass('close');
		});
	}

	
	// 影片縮圖寬高
	vh = $('.thumbnail.videos .image>img').width() *.67;
	$('.thumbnail.videos .image>img').css('height' , vh);
	$('.thumbnail.videos .play').css('height' , vh);

	//首頁大圖輪播參數
	$('.adloop').slick({
		accessibility:true,
		focusOnSelect: false,
		autoplay:true,
		dots:true,
		autoplaySpeed: 4000,
		speed: 700
	});
	//首頁大圖輪播下方dot tab移動時,無障礙人工檢測要求,按enter鍵需能直接連結圖檔網址
	$( ".slick-dots li button" ).keypress(function(e) {
			var txt = $(e.target).text();
			var achr = $(".slick-slide[data-slick-index="+txt+"] a");
			window.open(achr.attr('href'));
	}); 	

	//拍片景點
	var _photoThumb = $('.photoThumb').find('li'),
			_photoShow = $('.photoShow').find('li'),
			photoCount = _photoThumb.length,
			duration = 4500,
			tt = setInterval(autoShow, duration);

	_photoThumb.first().addClass('active');
	_photoShow.first().show();

	$('.photoShow').after('<div class="ppause" title="暫停／繼續"></div>');
	var ppCtrl = $('.ppause');
	if(ww <= 600){
		var hini = _photoShow.first().height();
		$('.photoShow').height(hini);
		
		ppCtrl.click(function(){
			$(this).toggleClass('pplay')
			if (ppCtrl.hasClass('pplay')) {
				clearInterval(tt);
			} else {
				tt = setInterval(autoShow, duration);
			}
		})
	};

	_photoShow.append('<span class="photoCount"></span>');
	$('.photoShow').append('<div class="btn prev" title="上一張"></div><div class="btn next" title="下一張"></div>');

	for(n=1; n<=photoCount; n++){
		_photoShow.eq(n-1).find('.photoCount').text( n + '/' + photoCount);
	}

	var i = 0;
	var _btnNext = $('.photoShow').find('.next'),
		_btnPrev = $('.photoShow').find('.prev');

	_btnNext.click(function(){i = (i+1) % photoCount;showPhoto();});
	_btnPrev.click(function(){i = (i-1) % photoCount;showPhoto();});

	_photoThumb.find('a').click(function(e){
		i = $(this).parent('li').index();
		showPhoto();
		e.preventDefault();
	});
	_photoThumb.find('a').focus(function(){
		clearInterval(tt);
		i = $(this).parent('li').index();
		showPhoto();
		// console.log(_body.offset());
		_body.offset({top:-1*(hh+$('.friendly').outerHeight())});
	});

	_photoThumb.last().focusout(function(){
        tt = setInterval(autoShow, duration);
    });

    _photoShow.find('a').focus(function(e){
    	$('this').add(_photoShow).blur();
    	_photoThumb.first().find('a').focus();
    });

	$('.photoShow, .photoThumb li').hover(
		function(){clearInterval(tt);},
		function(){
			if ( !(ppCtrl.hasClass('pplay')) ) {
				tt = setInterval(autoShow, duration);
			}
		}
	);
	function autoShow(){
		i = (i+1) % photoCount;
		showPhoto();
	}
	function showPhoto(){
		_photoThumb.eq(i).addClass('active').siblings().removeClass('active');
		_photoShow.eq(i).fadeIn().siblings().fadeOut();
		if(ww <= 600){
			var	photoHeight = _photoShow.eq(i).height();
			$('.photoShow').animate({height:photoHeight});
		}
	}


	//照片內容頁參數
	$('.photoSlide').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  dots: false,
	  arrows: false,
	  fade: false,
	  asNavFor: '.slider-nav'
	});
	$('.photoNav').slick({
	  slidesToShow: 5,
	  slidesToScroll: 1,
	  asNavFor: '.photoSlide',
	  dots: false,
	  centerMode: false,
	  focusOnSelect: true
	  });


	//分享
	var _share = $('.share');
	$('.shareThis').click(function(){
		_share.show();
		overlay.show().fadeTo('300', 0.5);
	});

	var svt;
	_share.append('<span class="after">《</span>');
	_share.find('.after').hide();
	_share.find('span').wrap('<a href="#"></a>');

	function miniShare(){
		_share.stop(true, true).animate({ width:"1.1em"}, 600).find('ul').stop(true, true).slideUp(600, function(){
			_share.find('.after').show(200);
		});
	}
	function showShare(){
		_share.find('.after').hide();
		_share.stop(true, true).animate({ width:"48px"},300).find('ul').stop(true, true).slideDown(300);
	}
	if (ww > 1000) {
		svt = setTimeout(miniShare , 2000);		
		_share.hover(showShare,miniShare);
		_share.children('a').focusin(showShare);
		_share.find('li').last().children('a').focusout(miniShare);
	}
	if (ww <= 1000) {
		clearTimeout(svt);
		_share.find('ul').append( '<li class="close">離開</li>' );
		_share.find('li').click(function(){
			_share.hide();
			_overlay.fadeTo('300', 0, function(){$(this).hide();});
		});
		_overlay.click(function() {
			_share.hide();
		});
	}


  //彈出訊息
	$('.popMessage').before('<div class="popMask"></div>');
	$('.popMask, .popMessage').show();
	$('.popMask, .closePop').click(function(){
		$('.popMask, .popMessage, .closePop').hide(300);
		// $('.accesskey').find('a[accesskey="U"]').focus();
	})
	$('.closePop').focus(function(){
		$('.popMask, .popMessage, .closePop').hide(300);
	})

	
  	//機關通訊錄：機關階層
	$('.orgTree>ul>li:has(ul)').addClass('hasChild');
	$('.orgTree li.hasChild>ul').before('<span><a title="按enter展開下層單位" href="#">展開</a></span>');
	$('.orgTree li.hasChild').children('span').click(function(){
		$(this).siblings('ul').slideToggle();
		$(this).toggleClass('close');
	});
	$('.orgTree>ul').append('<li></li>');

	if (ww <= 680 ) {
		$('.list, .thumbnail').jscroll({
			contentSelector: '.list, .thumbnail'
		});
	}

	//checkbox and radio redesign
  $('.optionGp').each(function(){
    var _optionGp = $(this),
        _radioOption = _optionGp.find('input[type="radio"]'),
        _checkOption = _optionGp.find('input[type="checkbox"]');

    _optionGp.has(_radioOption).addClass('single');
    _optionGp.has(_checkOption).addClass('multi');
    _optionGp.find('input[checked]').parent().addClass('isSelected');

    _radioOption.click(function(){
    	_radioOption.removeAttr('checked').parent().removeClass('isSelected');
      $(this).attr('checked','checked').parent().addClass('isSelected');
    });
    _radioOption.add(_checkOption).focus(function(){
    	$(this).parent().css('border-color','#ffc');
    })
    _radioOption.add(_checkOption).focusout(function(){
    	$(this).parent().css('border-color','transparent');
    })


    _checkOption.click(function(){
      if( $(this).parent().hasClass('isSelected') ){
        $(this).removeAttr('checked').parent().removeClass('isSelected');
      } else {
        $(this).attr('checked','checked').parent().addClass('isSelected');
      }
    });
  })






	rwdTable();
	
});
