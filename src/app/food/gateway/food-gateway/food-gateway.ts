import {Food} from '../../model/food';
import {Observable} from 'rxjs';

export abstract class FoodGateway {

  abstract retrieveAll(): Observable<Food[]>;


}
