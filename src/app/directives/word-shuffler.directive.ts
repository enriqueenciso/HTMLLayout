import { Directive, ElementRef, HostListener, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appWordShuffler]'
})
export class WordShufflerDirective implements OnInit, OnChanges {

  @Input('appWordShuffler') currentName: string;
  @Input() color: string;

  currentNameAsArray: string[] = [];
  previousName: string;
  now: number;
  then: number = Date.now();
  time = 0;
  currentTimeOffset = 0;
  currentCharacter = 0;
  currentWordLength = 0;
  needsUpdate = true;
  options = {
    fps: 30,
    timeOffset: 10,
    mixCapital : true,
    interval: 1000 / 24, // default interval
    mixSpecialCharacters : true,
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
    'Y', 'Z', '0', '1',
    '2', '3', '4', '5',
    '6', '7', '8', '9',
    '_',
  ];
  specialCharacters = [
    '!', '§', '$', '%',
    '&', '/', '(', ')',
    '=', '?', '<', '~',
    '>', '^', '°', '*',
    '#', '-', ':', ';',
  ];

  constructor(private el: ElementRef) {
    if (this.options.mixSpecialCharacters) {
      this.chars = this.chars.concat(this.specialCharacters);
    }
    this.options.interval = 1000 / this.options.fps;
  }

  ngOnInit() {
    this.writeWord(this.currentName);
    this.update(this.time);
  }

  ngOnChanges(changes: SimpleChanges) {
     if (changes.currentName) {
       this.setCurrentName(changes.currentName.currentValue);
     }
  }

  setCurrentName(name: string) {
    this.writeWord(name);
    this.restart();
  }

  private wordShuffler(time: number) {
    this.now = Date.now();
    const delta = this.now - this.then;
    this.options.interval = 1000 / this.options.fps;

    if (delta > this.options.interval) {
      this.currentTimeOffset++;

      const word = [];
      if (this.currentTimeOffset === this.options.timeOffset &&
          this.currentCharacter !== this.currentWordLength) {
        this.currentCharacter++;
        this.currentTimeOffset = 0;
      }

      for (let i = 0; i < this.currentCharacter; i++) {
        word.push(this.currentName[i]);
      }

      for (let i = 0; i < this.currentWordLength - this.currentCharacter; i++) {
        if (this.currentName[this.currentCharacter + i] !== ' ') {
          word.push(this.getRandomCharacter(this.currentName[this.currentCharacter + i]));
        }
      }

      if (this.currentCharacter === this.currentWordLength) {
        this.needsUpdate = false;
      }
      this.el.nativeElement.innerHTML = '';
      word.forEach((character, index) => {
        let color = null;
        if (index > this.currentCharacter) {
          color = this.getRandomColor();
        } else {
          color = 'inherit';
        }

        this.el.nativeElement.appendChild(this.generateSingleCharacter(color, character));
      });

      this.then = this.now - (delta % this.options.interval);
    }
  }

  private getRandomColor(): string {
    const randomNum = Math.floor(Math.random() * this.options.colors.length);
    return this.options.colors[randomNum];
  }

  private getRandomCharacter(characterToReplace: string): string {
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
    span.classList.add('decoded');
    span.innerHTML = character;
    return span;
  }

  private writeWord(word: string) {
    this.currentName = word;
    this.currentNameAsArray = word.split('');
    this.currentWordLength = word.length;
  }

  private restart() {
    this.currentCharacter = 0;
    this.needsUpdate = true;
  }

  update = (time: number) => {
    this.time++;
    if (this.needsUpdate) {
      this.wordShuffler(time);
    }
    requestAnimationFrame(this.update);
  }

}
