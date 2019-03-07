import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appWordShuffler]'
})
export class WordShufflerDirective implements OnInit {

  @Input('appWordShuffler') currentName: string;
  @Input() color: string;

  previousName: string;
  now: Date;
  then: Date;
  options = {
    fps: 30,
    timeOffset: 5,
    mixCapital : true,
    mixSpecialCharacters : true,
    needUpdate : true,
    colors : [
      '#f44336', '#e91e63', '#9c27b0',
      '#673ab7', '#3f51b5', '#2196f3',
      '#03a9f4', '#00bcd4', '#009688',
      '#4caf50', '#8bc34a', '#cddc39',
      '#ffeb3b', '#ffc107', '#ff9800',
      '#ff5722', '#795548', '#9e9e9e',
      '#607d8b',
    ]
  };
  chars = [
    'A', 'B', 'C', 'D',
    'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X',
    'Y', 'Z',
  ];
  specialCharacters = [
    '!', '§', '$', '%',
    '&', '/', '(', ')',
    '=', '?', '_', '<',
    '>', '^', '°', '*',
    '#', '-', ':', ';', '~',
  ];

  constructor(private el: ElementRef) {
    // el.nativeElement.innerHTML = this.currentName || 'Not defined!';
  }

  ngOnInit() {
    // console.log(this.specialCharacters);
    if (this.options.mixSpecialCharacters) {
      this.chars.concat(this.specialCharacters);
    }
    this.wordShuffler();
  }

  setCurrentName(name: string) {
    this.currentName = name;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.wordShuffler();
  }

  wordShuffler(name?: string) {

  }

  private getRandomColor(): string {
    const randomNum = Math.floor(Math.random() * this.options.colors.length);
    return this.options.colors[randomNum];
  }

  private getRandomCharacter(characterToReplace: string): string {
    // Move this validation to main function
    if (characterToReplace === ' ') {
      return ' ';
    }

    const randomNum = Math.floor(Math.random() * this.chars.length);
    let pickedChar = this.chars[randomNum];
    if (this.options.mixCapital) {
      pickedChar = ((Math.random() - .5) < 0 ) ? pickedChar : pickedChar.toLocaleLowerCase();
    }

    return pickedChar;
  }

  private generateSingleCharacter(color: string, character: string): HTMLElement {
    const span = document.createElement('span');
    span.style.color = color;
    span.innerHTML = character;
    return span;
  }

}
