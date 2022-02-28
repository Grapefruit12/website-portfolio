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
    scrollIntoView(link);
    
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


function scrollIntoView(selector){//요소가 있는 화면으로 스크롤이동
    const scrollTo=document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:"smooth"});//.scrollIntoView(): 그 요소가 있는 화면으로 스크롤이동(요소이름이 같은 화면으로 이동:#home/ navbar__menu__item의 data-link가 #home===화면이름도 #home)
}