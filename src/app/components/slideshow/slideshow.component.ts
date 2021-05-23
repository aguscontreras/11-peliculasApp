import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Movie } from '../../interfaces/now-paying';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit, AfterViewInit {
  @Input() movies: Movie[];

  private swiper: Swiper;

  constructor() {}

  ngOnInit(): void {
    console.log(this.movies);
  }

  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper-container', {
      loop: true,
    });

    //  swiper.slideNext();
  }

  onSlidePrev() {
    this.swiper.slidePrev(300);
  }

  onSlideNext() {
    this.swiper.slideNext(300);
  }
}
