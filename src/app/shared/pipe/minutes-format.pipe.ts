import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesFormat'
})
export class MinutesFormatPipe implements PipeTransform {

  transform(value: number): unknown {
    if (isNaN(value) || value < 0) {
      return '00:00';
    }

    const minutes = Math.floor(value / 60);
    const seconds = value % 60;

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }

}
