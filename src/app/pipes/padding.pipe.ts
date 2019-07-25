import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padding'
})
export class PaddingPipe implements PipeTransform {

  transform(value: any, options: any): any {
    // Default options
    options.align = options.align || 1;
    options.width = options.width || 40;

    value = '' + value;
    if(value.length > options.width) {
      if(options.wrap) {
        let lines = [];
        let words = value.split(' ');
        let line = '';
        words.forEach(word => {
          if(word != '') {
            let merged = `${line} ${word}`;
            if(merged.length <= options.width) {
              line = merged;
            } else {
              lines.push(line);
              line = word;
            }
          }
        });
        if(line.length > 0) lines.push(line);
        for(let i = 0; i < lines.length; i++) {
          lines[i] = this.transform(lines[i], {width: options.width, align: options.align});
        }
        return lines.join("\n");
      } else {
        return value.substr(0, options.width);
      }
    }
    let padders = Array(options.width + 1).join(' ');
    if(options.align == 1) return (padders + value).slice(-options.width);
    else if(options.align == 2) return (value + padders).slice(0, options.width);
    else {
      let spaces = options.width - value.length
      if((spaces) % 2 == 1) {
        let left = Math.floor(spaces / 2);
        let right = spaces - left;
        return Array(left + 1).join(' ') + value + Array(right + 1).join(' ');
      } else {
        let left = Array(spaces / 2).join(' ');
        return left + value + left;
      }
    }
  }

}
