import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[heatDanger]',
  standalone: true
})
export class HeatDangerIndicatorDirective implements OnChanges {

  @Input() heatDanger!: number;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['heatDanger']) {
      this.setBackgroundColor(this.heatDanger);
    }
  }

  private setBackgroundColor(value: number): void {
    let color: string;
    if (value <= 90) {
      color = 'var(--caution-color)';
    } else if (value < 103) {
      color = 'var(--e-caution-color)';
    } else if (value < 126) {
      color = 'var(--danger-color)';
    } else {
      color = 'var(--e-danger-color)';
    }
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }
}
