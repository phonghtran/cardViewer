var mplsIsAwesome04 = function(){
	var currentCardID = 0,
		cardListHeight,
		cardListContainerHeight,
		cardCount = cards.data.length - 1,
		headerHeight = $('header').height();

	$(document).ready(function(){
		var $cardList = $('#cardList'),
			$mainContent = $('#mainContent');

		

		for (x in cards.data){
			$cardList.append(constructMenuItem(x));
			$mainContent.append(constructCard(x));
		}

		bindEvents();

		$('.cardSelectItem').eq(0).addClass('active');
	});

	function highlightCurrentCard(){
		$('.cardSelectItem').removeClass('active').eq(currentCardID).addClass('active');
	};

	function bindEvents(callback){
		$(window).scroll(function(){
			var scrollPos = $(this).scrollTop(),
				prevCardID = currentCardID;

			$('.card').each(function(){
				var $this = $(this);
				if ($this.offset().top - 100 > scrollPos) return false;

				currentCardID = $this.index();
			});

			highlightCurrentCard();
			
			if (prevCardID != currentCardID){
				$('#cardListContainer').stop().animate({
					scrollTop: (cardListHeight - cardListContainerHeight) * (currentCardID / cardCount)
				});
			}
		}).keyup(function(e){
			if (e.which == 37) $('#upArrow').click();
			if (e.which == 39) $('#downArrow').click();
			if (e.which == 77) $('#toggleCardList').click();
		}).resize(function(){
			cardListHeight = $('#cardList').height();
			cardListContainerHeight = $('#cardListContainer').height();

			if ($('html').hasClass('no-touch')) {
				$('.cardImage').height($(this).height() - headerHeight);
			} else {
				$('.cardImage').height('auto');
			}
		}).resize();


		$('#cardList').on('click', '.cardSelectItem', function(){
			var $this = $(this);
			currentCardID = $this.index();

			$('body').stop().animate({
				scrollTop: $('.card').eq(currentCardID).position().top
			});
		});

		$('header').on('click', function(){
			$(this).toggleClass('active');
		});

		$('#upArrow').on('click', function(){
			if (--currentCardID < 0) currentCardID = cardCount;

			$('.cardSelectItem').eq(currentCardID).click();
		});

		$('#downArrow').on('click', function(){
			if (++currentCardID > cardCount) currentCardID = 0;

			$('.cardSelectItem').eq(currentCardID).click();
		});

		$('#toggleCardList').on('click', function(){
			$('body').toggleClass('active');
		});
		// callback
		if (callback) callback();
	}

	function constructMenuItem(cardNum){
		return '<li id="cardSelectItem'+cardNum+'" class="cardSelectItem">' + cards.data[cardNum].title + '</li>'
	}
	function constructCard(cardNum){
		return '<li id="card'+cardNum+'" class="card clearfix"><img class="cardImage" src="'+cards.data[cardNum].img+'" /><div class="cardCopy"><h2>'+cards.data[cardNum].title+'</h2><p>'+cards.data[cardNum].copy+'</p></div></li>';
	}
}();
