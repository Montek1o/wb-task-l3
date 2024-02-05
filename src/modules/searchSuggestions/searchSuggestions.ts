import { Component } from "../component";
import html from './searchSuggestions.tpl.html'

const suggestions = [
  'чехол iphone 13 pro',
  'коляски agex',
  'яндекс станция 2',
];

class SearchSuggestions extends Component {
  render() {
    const suggestionsContainers = this.view.root.querySelectorAll('.searchSuggestions__item');

    suggestionsContainers.forEach((container, index) => {
      container.innerHTML = `<span class="searchSuggestions__example">${suggestions[index]}</span>`;
    })
  }
}

export const searchSuggestionsComp = new SearchSuggestions(html);