import {Component, OnInit, ElementRef, ViewChild, Input} from '@angular/core';
import {URL} from "../../api/url";

@Component({
    selector: 'lavs-slider',
    templateUrl: 'slider.template.html',
    styleUrls: ['slider.less']
})

export class LavsSlider implements OnInit {
    @ViewChild('sliderListVar') listEl: ElementRef;
    @ViewChild('sliderVar') sliderEl: ElementRef;

    @Input() intervalNumber: number;
    @Input() images: any[];

    sliderListWidth: number;
    numSlides: number;
    slideWidth: number;
    slider: HTMLElement;
    sliderList: HTMLElement;
    slides: HTMLCollection;

    offsetX: number = 0;
    interval: any;

    constructor() {}

    ngOnInit() {
        this.sliderInit();
    }

    sliderInit() {
        if(this.images && (this.images.length > 0)) {
            this.slider = this.sliderEl.nativeElement;
            this.sliderList = this.listEl.nativeElement;

            this.numSlides = this.images.length;
            this.slides = this.sliderList.children;

            this.setDimensions();
            this.setSliderInterval();
        }

    }

    setDimensions() {
        this.slideWidth = this.slider.clientWidth;
        this.sliderListWidth = this.numSlides * this.slideWidth;
    }

    slideLeft() {
        setTimeout(() => {
            let activeSlide = this.slider.querySelector('.active');
            let prevSlide = activeSlide.previousElementSibling;

            activeSlide.classList.remove("active");

            if (prevSlide) {
                prevSlide.classList.add('active');
            } else {
                this.sliderList.querySelector('.slider-list-item:last-child').classList.add('active');
            }

            let activeSlideIndex = Array.prototype.slice.call(this.slides).indexOf(this.sliderList.querySelector('.active'));

            this.offsetX = +(-activeSlideIndex * this.slideWidth);
        }, 200);

    }

    slideRight() {
        setTimeout(() => {
            let activeSlide = this.slider.querySelector('.active');
            let nextSlide = activeSlide.nextElementSibling;

            activeSlide.classList.remove("active");

            if (nextSlide) {
                nextSlide.classList.add('active');
            }
            else {
                this.sliderList.querySelector('.slider-list-item:first-child').classList.add('active');
            }

            let activeSlideIndex = Array.prototype.slice.call(this.slides).indexOf(this.sliderList.querySelector('.active'));

            this.offsetX = +(-activeSlideIndex * this.slideWidth);
        }, 200);
    }

    onResize() {
        this.setDimensions();
        this.offsetX = 0;
    }

    setSliderInterval(): any {
        if (this.intervalNumber) {
            this.interval = setInterval(
                () => this.slideRight(), this.intervalNumber
            )
        }
    }

    deleteInterval() {
        clearInterval(this.interval);
    }
}