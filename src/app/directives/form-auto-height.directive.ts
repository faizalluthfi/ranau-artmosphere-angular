import { Directive, AfterViewChecked, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appFormAutoHeight]'
})
export class FormAutoHeightDirective implements AfterViewChecked {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewChecked(): void {
    this.onresize();
  }

  @HostListener('window:resize')
  onresize() {
    const element = this.el.nativeElement;
    if (!element) return;

    let navbar: HTMLElement = document.getElementById('navbar');
    let content = window.getComputedStyle(document.getElementById('content'));

    let cardHeaders = element.getElementsByClassName('header');
    let cardHeader;
    if (cardHeaders.length > 0) {
     cardHeader = cardHeaders[0];
    }

    let cardContents = element.getElementsByClassName('content');
    let cardContent;
    let cardContentStyles;
    if (cardContents.length > 0) {
     cardContent = cardContents[0];
     cardContentStyles = window.getComputedStyle(cardContent);
    }

    let formHeaders = element.getElementsByClassName('form-header');
    let formHeader;
    let formHeaderStyles;
    if (formHeaders.length > 0) {
     formHeader = formHeaders[0];
     formHeaderStyles = window.getComputedStyle(formHeader);
    };

    let formFooters = element.getElementsByClassName('form-footer');
    let formFooter;
    if (formFooters.length > 0) {
     formFooter = formFooters[0];
    };

    let formLists = element.getElementsByClassName('form-list');
    let formList;
    if (formLists.length > 0) {
      formList = formLists[0];
      let formListStyles = window.getComputedStyle(formList);
      let elementStyles = window.getComputedStyle(element);
      let decreasedHeight = navbar.offsetHeight +
        parseInt(content.paddingTop) + parseInt(content.paddingBottom) +
        (cardHeader ? cardHeader.offsetHeight : 0) +
        (cardContent ? ( parseInt(cardContentStyles.paddingTop) + parseInt(cardContentStyles.paddingBottom) ) : 0) +
        (formHeader ? (formHeader.offsetHeight + parseInt(formHeaderStyles.marginBottom)) : 0) +
        parseInt(formListStyles.marginBottom) +
        (formFooter ? formFooter.offsetHeight : 0)
        parseInt(elementStyles.marginBottom);
      this.renderer.setStyle(formList, 'height', `${ Math.max(window.innerHeight - decreasedHeight, 200) }px`);
    };

  }

}
