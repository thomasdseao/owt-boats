import {Injectable} from "@angular/core";
import {RouterStateSnapshot, TitleStrategy} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  /**
   * Constructs the TemplatePageTitleStrategy and injects the Angular Title service.
   * @param title Title service for manipulating the title of the document.
   */
  constructor(private readonly title: Title) {
    super();
  }

  /**
   * Overrides the default method to update the title based on the router state.
   * @param routerState The current router state snapshot.
   */
  override updateTitle(routerState: RouterStateSnapshot) {
    // Build the title based on the router state
    const title = this.buildTitle(routerState);

    // If a title is returned, update the document title
    if (title !== undefined) {
      this.title.setTitle(`OWT - ${title}`);
    }
  }
}
