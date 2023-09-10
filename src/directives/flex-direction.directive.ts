import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appFlexDirection]'
})
export class FlexDirectionDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenWidth();
  }

  ngOnInit(): void {
    this.checkScreenWidth();
  } 

  isMobile() {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent) &&
      'ontouchstart' in window
    );
  }

  private checkScreenWidth(): void {
    const direction = this.isMobile() ? 'column' : 'row';
    this.renderer.setStyle(this.el.nativeElement, 'flex-direction', direction);

    const secondDiv = this.el.nativeElement.querySelector('.timeline');
    if (secondDiv) {
      if (this.isMobile()) {
        this.renderer.setStyle(secondDiv, 'margin-top', '10px');
        this.renderer.removeStyle(secondDiv, 'margin-left');
      } else {
        this.renderer.setStyle(secondDiv, 'margin-left', '10px');
        this.renderer.removeStyle(secondDiv, 'margin-top');
      }
    }
  }
}
