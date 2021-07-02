import {Subject} from 'rxjs';
import {IRecordsList} from './RecordsList';


export class PanelHeight {
  public readonly trigger = new Subject<IRecordsList>();
}
