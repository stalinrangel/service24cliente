import { Pipe, PipeTransform } from '@angular/core';
import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import * as esLocale from 'date-fns/locale/es/index.js'
/**
 * Generated class for the RelativeTimePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'relativeTime',
})
export class RelativeTimePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
  	if (value.toString().indexOf(' ') >= 0) {
  		let toArray = value.split(" ");	
  		let date = toArray[0].split("-");
  		let hour = toArray[1].split(":");
    	return distanceInWordsToNow(new Date(parseInt(date[0]),parseInt(date[1])-1,parseInt(date[2]),parseInt(hour[0]),parseInt(hour[1]),parseInt(hour[2])), { addSuffix: true, locale: esLocale });
  	} else {
  		return distanceInWordsToNow(value, { addSuffix: true, locale: esLocale });
  	}  	
  }
} 