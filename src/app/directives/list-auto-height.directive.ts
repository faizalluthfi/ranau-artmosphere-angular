import { Directive, AfterViewChecked, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appListAutoHeight]'
})
export class ListAutoHeightDirective implements AfterViewChecked {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewChecked(): void {
    this.onresize();
  }

  @HostListener('window:resize')
  onresize() {
    if (!this.el.nativeElement) return;

    let navbar: HTMLElement = document.getElementById('navbar');
    let content = window.getComputedStyle(document.getElementById('content'));
    let cardHeader = document.getElementById('card-header');

    const cardContent = document.getElementById('card-content');
    let cardContentStyles = window.getComputedStyle(cardContent);
    
    let filter = document.getElementById('filter');

    let decreasedHeight = navbar.offsetHeight +
      parseInt(content.paddingTop) + parseInt(content.paddingBottom) +
      cardHeader.offsetHeight +
      (filter ? filter.offsetHeight : 0) +
      (cardContent ? ( parseInt(cardContentStyles.paddingTop) + parseInt(cardContentStyles.paddingBottom) ) : 0);
    this.renderer.setStyle(this.el.nativeElement, 'height', `${ Math.max(window.innerHeight - decreasedHeight, 400) }px`);
  }

}
