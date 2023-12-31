/* 
* Scroll to the top
*/

$(window).bind("scroll",display);
function display () {
    if($(document).scrollTop()>300) {
        //$("#top").show();
		$("#top").fadeIn(300);
    }else {
        //$("#top").hide();
		$("#top").fadeOut(300);
    }
}

/* 
* Tab of posts
*/
$(document).ready(function () {
	var tabContainer = $(".posts-tabs");
  if (tabContainer.length) {
    // var spans = document.getElementsByClassName("posts-tab-item");
    // $(spans[0]).bind("click",showTab01);
    // $(spans[1]).bind("click",showTab02);
    // $(spans[2]).bind("click",showTab03);
    // $(spans[3]).bind("click", showTab04);
    // $(spans[4]).bind("click", showTab05);
    // $(spans[5]).bind("click", showTab06);
    
    // $(spans[1]).bind("click",showtab(1));
    // $(spans[2]).bind("click",showtab(2));
    // $(spans[0]).bind("click",showtab(0));
    // $(spans[3]).bind("click",showtab(3));    

    $(".tab01").bind("click", showTab01);
    $(".tab02").bind("click", showTab02);
    $(".tab03").bind("click", showTab03);
    $(".tab04").bind("click", showTab04);
    $(".tab05").bind("click", showTab05);
    $(".tab06").bind("click", showTab06);
    $(".tab07").bind("click", showTab07);
  }
  function showtab(i) {
    hideAll();
    var spans = document.getElementsByClassName("posts-tab-item");
    $(spans[i]).addClass("active");
    var tablist = document.getElementsByClassName("posts-list");
    $(tablist[i]).removeClass("tab-hidden");
    var pagehoder = document.getElementsByClassName("page-holder");
    $(pagehoder[i]).removeClass("tab-hidden");

    alert(id);
  }
	function showTab01 () {
    hideAll();
		$(".tab01").addClass("active");
		$(".tab01-list").removeClass("tab-hidden");
		$(".page-holder01").removeClass("tab-hidden");
	}
	function showTab02 () {
    hideAll();
		$(".tab02").addClass("active");
		$(".tab02-list").removeClass("tab-hidden");
		$(".page-holder02").removeClass("tab-hidden");
	}
  function showTab03 () {   
    hideAll();     
    $(".tab03").addClass("active");
	  $(".tab03-list").removeClass("tab-hidden");
	  $(".page-holder-three").removeClass("tab-hidden");
  }
  function showTab04 () {     
    hideAll();   
    $(".tab04").addClass("active");
	  $(".tab04-list").removeClass("tab-hidden");
	  $(".page-holder-four").removeClass("tab-hidden");
  }
  function showTab05 () {     
    hideAll();   
    $(".tab05").addClass("active");
	  $(".tab05-list").removeClass("tab-hidden");
	  $(".page-holder-five").removeClass("tab-hidden");
  }
  function showTab06 () {     
    hideAll();   
    $(".tab06").addClass("active");
	  $(".tab06-list").removeClass("tab-hidden");
	  $(".page-holder-six").removeClass("tab-hidden");
  }
  function showTab07 () {     
    hideAll();   
    $(".tab07").addClass("active");
	  $(".tab07-list").removeClass("tab-hidden");
	  $(".page-holder-seven").removeClass("tab-hidden");
  }
  function hideAll() {
    $(".tab01").removeClass("active");
		$(".tab01-list").addClass("tab-hidden");
		$(".page-holder01").addClass("tab-hidden");

    $(".tab02").removeClass("active");
		$(".tab02-list").addClass("tab-hidden");
		$(".page-holder02").addClass("tab-hidden");

    $(".tab03").removeClass("active");
		$(".tab03-list").addClass("tab-hidden");
		$(".page-holder-three").addClass("tab-hidden");

    $(".tab04").removeClass("active");
		$(".tab04-list").addClass("tab-hidden");
		$(".page-holder-four").addClass("tab-hidden");

    $(".tab05").removeClass("active");
		$(".tab05-list").addClass("tab-hidden");
		$(".page-holder-five").addClass("tab-hidden");

    $(".tab06").removeClass("active");
		$(".tab06-list").addClass("tab-hidden");
    $(".page-holder-six").addClass("tab-hidden");
    
    $(".tab07").removeClass("active");
		$(".tab07-list").addClass("tab-hidden");
		$(".page-holder-seven").addClass("tab-hidden");
  }
})

/*
 * Pagination
 */
$(function(){
  /* initiate the plugin */
  // if not set, all posts in this container will be displayed
  // var pagehoder = document.getElementsByClassName("page-holder");
  // var length = $(".posts-tab-item").length;
  // alert("id: " + pagehoder[1].id);
  // for (var i = 0; i < length; i++) {
  //   $(pagehoder[i]).jPages({
  //     containerID  : pagehoder[i].id,
  //     previous: "«",
  //     next: "»",
  //     perPage      : 10,  /* num of items per page */
  //     startPage    : 1,
  //     startRange   : 1,
  //     midRange     : 4,
  //     endRange     : 1,
  //     direction    : "auto"
  //   });
  // }
  $("div.page-holder01").jPages({
      containerID  : "pag-itemContainer-one",
      previous: "«",
      next: "»",
      perPage      : 10,  /* num of items per page */
      startPage    : 1,
      startRange   : 1,
      midRange     : 4,
      endRange     : 1,
      direction    : "auto"
  });
  $("div.page-holder02").jPages({
      containerID  : "pag-itemContainer-two",
      previous: "«",
      next: "»",
      perPage      : 5,  /* num of items per page */
      startPage    : 1,
      startRange   : 1,
      midRange     : 4,
      endRange     : 1,
      direction    : "auto"
  });
});
