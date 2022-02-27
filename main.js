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
    console.log(event.target.dataset.link);//클릭한 요소의 data-link: ex)#home
    const target=event.target;//클릭한 요소
    const link=target.dataset.link;//data-link: ex)#home
    if(link===null){//우리가 지정안한 버튼일때
        return;//그냥 반환시킴
    }
    console.log(event.target.dataset.link);
    const scrollTo=document.querySelector(link);
    scrollTo.scrollIntoView({behavior:"smooth"});
    //.scrollIntoView(): 그 요소가 있는 화면으로 스크롤이동(요소이름이 같은 화면으로 이동:#home/ navbar__menu__item의 data-link가 #home===화면이름도 #home)
})
