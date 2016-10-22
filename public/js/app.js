(function(){
  var sidebarLinks = document.getElementsByClassName('fileList');

  document.body.addEventListener('click', function(e){
    if (Array.from(e.target.classList).indexOf('packageName') !== -1) {
      var selectedTabText = e.target.outerText;
      var selectedTab = document.getElementById(selectedTabText);

      var currentlySelectedTab = document.getElementsByClassName('open')[0];
      if (currentlySelectedTab) {
        currentlySelectedTab.classList.remove('open');
      }
      selectedTab.classList.add('open'); 
    }
  });


})();