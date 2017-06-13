import {
  Component,
  Input,
  ViewContainerRef,
  ViewChild,
  ReflectiveInjector,
  ComponentFactoryResolver,
  Injector
} from '@angular/core';

import { User } from '../../../shared';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { ImageFeedItemComponent } from '../image-feed-item/image-feed-item.component';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.scss'],
  entryComponents: [ImageFeedItemComponent]
})



export class FeedItemComponent {
  public username: string;
  public isCommentVisible: boolean = false;
  public isRatingVisible: boolean = false;

  currentComponent = null;

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  @Input() public set componentData(data: { component: any, inputs: any }) {
    if (!data) {
      return;
    };
    let inputProviders = Object.keys(data.inputs).map((inputName) => { return { provide: inputName, useValue: data.inputs[inputName] }; });
    let resolvedInputs = ReflectiveInjector.resolve(inputProviders);
    // debugger;
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);

    let factory = this.resolver.resolveComponentFactory(data.component);

    let component = factory.create(injector);

    this.dynamicComponentContainer.insert(component.hostView);

    if (this.currentComponent) {
      this.currentComponent.destroy();
    }

    this.currentComponent = component;
    const user: FirebaseObjectObservable<User> = data.inputs['user'];
    user.subscribe(userSnap => {
      this.username = userSnap.firstname;
    });

  }

  constructor(private resolver: ComponentFactoryResolver) { }


  public showComment() {
    this.isCommentVisible = !this.isCommentVisible;
  }

  public showRating() {
    this.isRatingVisible = !this.isRatingVisible;
  }
}
