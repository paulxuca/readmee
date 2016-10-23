(function(){
  var packageList = document.getElementsByClassName('packageName');

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  var debouncedSearchHandler = debounce(function(){
    var currentSearchValue = document.getElementById('searchInput').value;
    Array
      .from(packageList)
      .forEach(function(eachItem){
        eachItem.style['display'] = !eachItem.innerHTML.match(currentSearchValue) ? 'none' : 'block';
    });
    Array
      .from(document.querySelectorAll('.fileList.open'))
      .forEach(function(eachList){
        eachList.classList.remove('open');
    });
  }, 250);

  function handleClick(e) {
    if (e.target.classList.contains('packageName')) {
      handleSidebarClick(e);
    } else if(e.target.classList.contains('subItem')) {
      var selectSubitemIndex = e.target.getAttribute('data-index');
      var selectSubitemParent = e.target.parentNode.id;
      fetch('/' + selectSubitemParent + '/' + selectSubitemIndex)
      .then(function(data){
        return data.json();
      })
      .then(function(parsedData){
        document.getElementsByClassName('appContainer')[0].innerHTML = parsedData;        
      })
      .catch(function(error){
        if (error) {
          console.log(error);
        }
      });
      // fetch('/')
    }
  }

  function handleSidebarClick(e) {
    var selectedTabText = e.target.outerText;
    var selectedTab = document.getElementById(selectedTabText);
    var currentlySelectedTab = document.getElementsByClassName('open')[0];

    if (selectedTab && !selectedTab.classList.contains('open')) {
      selectedTab.classList.add('open');
    } else {
      selectedTab.classList.remove('open');
    }
  }

  function handleSubitemClick(e) {
    console.log(e);
  }

  function handleSearchInput(e) {
    (function(){
      debouncedSearchHandler();
    })(e);
  }

  document.getElementById('searchInput').addEventListener('keydown', handleSearchInput);
  document.body.addEventListener('click', handleClick);
})();