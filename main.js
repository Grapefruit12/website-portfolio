'use strict';

//navbar이 top일때 배경투명색으로 만들기
const navbar=document.querySelector("#navbar");
const navbarHeight=navbar.getBoundingClientRect().height;
//.getBoundingClientRect():텍스트 직사각형 그룹을 둘러싸는 텍스트 직사각형 개체를 반환합니다.

document.addEventListener("scroll",() => {

    if(window.scrollY>navbarHeight){
        //scroll이 navbar높이보다 더 많아졌을때
        navbar.classList.add("navbar--dark");
    }else{
        navbar.classList.remove("navbar--dark");
    }
})

//navbar menu button클릭하면 원하는 곳으로 스크롤링
const navbarMenu=document.querySelector(".navbar__menu");

navbarMenu.addEventListener("click",(event)=>{
    //console.log(event.target); //클릭한요소
    //console.log(event.target.dataset.link);//클릭한 요소의 data-link: ex)#home
    const target=event.target;//클릭한 요소
    const link=target.dataset.link;//data-link: ex)#home
    if(link===null){//우리가 지정안한 버튼일때
        return;//그냥 반환시킴
    }
    console.log(event.target.dataset.link);
    navbarMenu.classList.remove("open");
    scrollIntoView(link);
    
    
});

//핸드폰화면에서 navbar toggle button
const navbarToggleBtn=document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
    navbarMenu.classList.toggle("open");
});

//"contact me"버튼 클릭시 contact화면으로가기

const homeContactBtn=document.querySelector(".home__contact");

homeContactBtn.addEventListener("click",()=>{
    scrollIntoView("#contact");
});

//윈도우 스크롤시 home의 내용이 점점 투명하게 효과주기
const homeContainer=document.querySelector(".home__container");
const homeContainerHeight=homeContainer.getBoundingClientRect().height;

document.addEventListener("scroll",() => {
    /*console.log(homeContainerHeight);
    ->homeContainerHeight되는지 확인*/
    
    homeContainer.style.opacity=1-window.scrollY/homeContainerHeight;
    /*
      home컨테이너 높이에서 윈도우 스크롤높이에 따라, 점점 투명하게할지 짜보았음
      window.scrollY/homeContainerHeight=0(높이가 0일때)     opacity=1(투명도X)
      window.scrollY/homeContainerHeight=0.5(높이가 절반일때) opacity=0.5(투명도0.5)
      window.scrollY/homeContainerHeight=1(높이가 1일때)     opacity=0(투명O)
      
      ->(window.scrollY/homeContainerHeight)+ opacity =1으로써 계산함
      =>opacity=1-(window.scrollY/homeContainerHeight);
    */
})



//arrow버튼으로 화면 맨위로 올라가게, 화면높이0일때는 투명이다가 조금내려왔을때 버튼 보이기
const arrowBtn=document.querySelector(".arrow-btn");

document.addEventListener("scroll",() => {
    if(window.scrollY>homeContainerHeight/2){
        arrowBtn.classList.add("visible");
    }else{
        arrowBtn.classList.remove("visible");
    }
})

arrowBtn.addEventListener("click",() => {
    scrollIntoView("#home");
})
//->여기까지임

//Projects: 각각 버튼에 알맞은 project 들어오게끔 filtering
const workBtnContainer=document.querySelector(".work__categories");
const projectContainer=document.querySelector(".work__projects");
const projects=document.querySelectorAll(".project");
workBtnContainer.addEventListener("click",(e) => {
    const filter=e.target.dataset.filter || e.target.parentNode.dataset.filter;
    /*
    e.target.dataset.filter: 버튼 클릭하면 data-filter값O, 버튼안에 숫자클릭하면 undefined
    버튼안에 있는 숫자도 같은 버튼이니까 data-filter값이 같아야함
    그래서 or을 쓴것
    숫자클릭해서 undefined 나와도 || 버튼클릭해서 data-filter값나온것=>filter에 대입
    *e.target.parentNode.dataset.filter: 부모노드인 버튼 필터
    */
    if(filter===null){
        return;
    }
    
    //이전에 아이템 선택 지우고 새로운 아이템에 선택
    const active=document.querySelector(".category__btn.selected");
    active.classList.remove("selected");
    const target=
          e.target.nodeName==="BUTTON" ? e.target: e.target.parentNode;
    /*
    조건문?true일때 실행: false일때 실행;
    e.target이 button 또는 span일수도 있어서 조건문 만듬(button>span이니까 span의 부모노드는 button)
    */
    target.classList.add("selected");
    
    
    
    projectContainer.classList.add("anim-out");
    
    setTimeout(() => {
        projects.forEach((project) => {
        console.log(project.dataset.type);
        if(filter==="*" || filter===project.dataset.type){
            project.classList.remove("invisible");
        }else{
            project.classList.add("invisible");
        }
    });
        projectContainer.classList.remove("anim-out");
    },300);
})



//1. 모든 섹션 요소들을 가지고 온다
//2. IntersectionObserver를 이용해서 모든 섹션을 관찰한다
//3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.

const sectionIds=[
    "#home",
    "#about",
    "#projects",
    "#contact",
];
const sections=sectionIds.map(id => document.querySelector(id));
//map() 메서드는 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환합니다.
const navItems=sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));
//console.log(sections);
//console.log(navItems);
let selectedNavIndex=0;
let selectedNavItem=navItems[0];
//console.log(selectedNavItem);
function selectNavItem(selected){
    
    selectedNavItem.classList.remove("active");
    //console.log(selectedNavItem);
    selectedNavItem=selected;
    selectedNavItem.classList.add("active");
}
function scrollIntoView(selector){//요소가 있는 화면으로 스크롤이동
    const scrollTo=document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:"smooth"});//.scrollIntoView(): 그 요소가 있는 화면으로 스크롤이동(요소이름이 같은 화면으로 이동:#home/ navbar__menu__item의 data-link가 #home===화면이름도 #home)
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}
const observerOptions={
    root:null,
    rootMargin: "0px",
    threshold: 0.3,
};
const observerCallback=(entries,observer)=>{
    entries.forEach(entry=>{
        if(!entry.isintersecting && entry.intersectionRatio >0){//진입하지않을때,빠져나갈때(!===not)
            const index=sectionIds.indexOf(`#${entry.target.id}`);
            //console.log(index,entry.target.id);
            
            //스크롤링이 아래로 되어서 페이지가 올라옴
            if(entry.boundingClientRect.y<0){
                selectedNavIndex=index+1;
            }else{
                selectedNavIndex=index-1;
            }
            
        }
    });
};
const observer=new IntersectionObserver(observerCallback,observerOptions);
sections.forEach(section=>observer.observe(section));

window.addEventListener("wheel", () => { //wheel: "사용자"가 스스로 스크롤링 할때 발생되는 이벤트(scroll은 "모든 스크롤"이 해당하는 이벤트가 발생할때마다 생성되는 이벤트)
    if(window.scrollY===0){
        selectedNavIndex=0;
    }else if(window.scrollY + window.innerHeight===document.body.clientHeight){
        selectedNavIndex=navItems.length-1;
    }
    selectNavItem(navItems[selectedNavIndex]);
})