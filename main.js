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