//Открытие навигационной панели
function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}
function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}

//Выполнение загрузки при нажатии
function completeBar(){
    const infos = document.querySelector('.infos')
    infos.style.position = 'none'
}

//Переход на следующую страницу после загрузки
function completeBar() {
    const preloader = document.querySelector('.preloader')
    preloader.style.display = 'flex';
    if (preloader.style.display)  {
        setTimeout(function() {
  window.location.href = './complete.html';
}, 3000);  
}}

